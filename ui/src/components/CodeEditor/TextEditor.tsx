import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { selectCode, setCode } from "../../features/pyodide/pyodideSlice";
import { CODE_EDIT_MODE, setEditMode } from "../../features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "../../store";

export default function TextEditor() {
  const code = useAppSelector(selectCode);
  const dispatch = useAppDispatch();

  return (
    <AceEditor
      mode="python"
      theme="tomorrow"
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      onChange={(code) => {
        dispatch(setEditMode(CODE_EDIT_MODE));
        dispatch(setCode(code));
      }}
      value={code}
      height="100%"
      width="100%"
      fontSize={14}
      lineHeight={20}
    />
  );
}
