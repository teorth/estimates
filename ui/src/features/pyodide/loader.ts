import {
  type PyodideInterface,
  loadPyodide,
  version as pyodideVersion,
} from "pyodide";

async function initPyodide({
  stdout = (message: string) => console.log(message),
}: {
  stdout: (message: string) => void;
}): Promise<PyodideInterface> {
  const pyodide = await loadPyodide({
    indexURL: `https://cdn.jsdelivr.net/pyodide/v${pyodideVersion}/full/`,
    stdout,
  });
  return pyodide;
}

export async function loadAndRunPyodide({
  stdout = (message: string) => console.log(message),
}: {
  stdout: (message: string) => void;
}): Promise<PyodideInterface | undefined> {
  try {
    const pyodide = await initPyodide({
      stdout,
    });
    await pyodide.loadPackage("micropip");
    await pyodide.runPythonAsync(`
        import micropip
        await micropip.install("micropip")
        await micropip.install("sympy")
    `);

    await pyodide.runPythonAsync(`
        import micropip
        await micropip.install("https://microsoft.github.io/z3guide/z3_solver-4.13.4.0-py3-none-pyodide_2024_0_wasm32.whl")
        await micropip.install(
          "https://cdn.jsdelivr.net/gh/leohentschker/estimates-ui@gh-pages/estimates-0.3.0-py3-none-any.whl"
        )

    `);

    console.log("Completed installations");
    return pyodide;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
