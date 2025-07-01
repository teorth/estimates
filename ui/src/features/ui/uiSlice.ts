import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const isMobile = () => {
  if (typeof navigator === "undefined") {
    return false;
  }
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
};

export const CODE_EDIT_MODE = "code";
export const VISUAL_EDIT_MODE = "visual";

interface UISlice {
  showTutorial: boolean;
  showCode: boolean;
  mode: "assumptions" | "tactics";
  executionMode: "auto" | "manual";
  isMobile: boolean;
  editMode: typeof CODE_EDIT_MODE | typeof VISUAL_EDIT_MODE;
  showExamplesModal: boolean;
}

const initialState: UISlice = {
  showTutorial: false,
  showCode: true,
  mode: "assumptions",
  executionMode: "auto",
  isMobile: isMobile(),
  editMode: VISUAL_EDIT_MODE,
  showExamplesModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowTutorial: (state, action: PayloadAction<boolean>) => {
      state.showTutorial = action.payload;
    },
    setShowCode: (state, action: PayloadAction<boolean>) => {
      state.showCode = action.payload;
    },
    setMode: (state, action: PayloadAction<"assumptions" | "tactics">) => {
      state.mode = action.payload;
    },
    setExecutionMode: (state, action: PayloadAction<"auto" | "manual">) => {
      state.executionMode = action.payload;
    },
    setEditMode: (
      state,
      action: PayloadAction<typeof CODE_EDIT_MODE | typeof VISUAL_EDIT_MODE>,
    ) => {
      state.editMode = action.payload;
    },
    setShowExamplesModal: (state, action: PayloadAction<boolean>) => {
      state.showExamplesModal = action.payload;
    },
  },
});

export const {
  setShowTutorial,
  setShowCode,
  setMode,
  setExecutionMode,
  setEditMode,
  setShowExamplesModal,
} = uiSlice.actions;

export const selectShowTutorial = (state: RootState) => state.ui.showTutorial;
export const selectShowCode = (state: RootState) => state.ui.showCode;
export const selectMode = (state: RootState) => state.ui.mode;
export const selectExecutionMode = (state: RootState) => state.ui.executionMode;
export const selectIsMobile = (state: RootState) => state.ui.isMobile;
export const selectEditMode = (state: RootState) => state.ui.editMode;
export const selectShowExamplesModal = (state: RootState) =>
  state.ui.showExamplesModal;
export default uiSlice.reducer;
