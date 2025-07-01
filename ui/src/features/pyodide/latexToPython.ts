const LATEX_TO_PYTHON_REPLACEMENTS = [
  {
    latexRegex: /\\lor/g,
    replacement: "|",
  },
  {
    latexRegex: /\\land/g,
    replacement: "&",
  },
  {
    latexRegex: /\\neg/g,
    replacement: "~",
  },
  {
    latexRegex: /\\implies/g,
    replacement: "->",
  },
  {
    latexRegex: /\\iff/g,
    replacement: "<->",
  },
  {
    latexRegex: /\\exists/g,
    replacement: "exists",
  },
  {
    latexRegex: /\\forall/g,
    replacement: "forall",
  },
  {
    latexRegex: /\\in/g,
    replacement: "in",
  },
  {
    latexRegex: /\\cup/g,
    replacement: "union",
  },
  {
    latexRegex: /\\cap/g,
    replacement: "intersection",
  },
];

const PYTHON_TO_LATEX_REPLACEMENTS = [
  {
    pythonRegex: /\|/g,
    replacement: "\\lor",
  },
  {
    pythonRegex: /&/g,
    replacement: "\\land",
  },
  {
    pythonRegex: /~/,
    replacement: "\\neg",
  },
  {
    pythonRegex: /->/,
    replacement: "\\implies",
  },
];

export const latexToPython = (latex: string) => {
  let newLatex = latex;
  for (const replacement of LATEX_TO_PYTHON_REPLACEMENTS) {
    newLatex = newLatex.replace(
      replacement.latexRegex,
      replacement.replacement,
    );
  }
  return newLatex;
};

export const pythonToLatex = (python: string) => {
  let newPython = python;
  for (const replacement of PYTHON_TO_LATEX_REPLACEMENTS) {
    newPython = newPython.replace(
      replacement.pythonRegex,
      replacement.replacement,
    );
  }
  return newPython;
};
