import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import proofReducer from "./features/proof/proofSlice";
import pyodideReducer from "./features/pyodide/pyodideSlice";
import { codegenListenerMiddleware } from "./features/pyodide/pyodideSlice";
import uiReducer from "./features/ui/uiSlice";

export const createStore = () => {
  return configureStore({
    reducer: {
      proof: proofReducer,
      pyodide: pyodideReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(codegenListenerMiddleware.middleware),
  });
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
