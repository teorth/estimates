export type VariableType =
  | "pos_real"
  | "real"
  | "int"
  | "bool"
  | "pos_int"
  | "nonneg_real";

export const SUPPORTED_VARIABLE_TYPES: {
  name: VariableType;
  description: string;
  symbol: string;
}[] = [
  {
    name: "real",
    description: "Real",
    symbol: "\\mathbb{R}",
  },
  {
    name: "int",
    description: "Integer",
    symbol: "\\mathbb{Z}",
  },
  {
    name: "pos_real",
    description: "Positive real",
    symbol: "\\mathbb{R}^+",
  },
  {
    name: "pos_int",
    description: "Positive integer",
    symbol: "\\mathbb{Z}^+",
  },
  {
    name: "nonneg_real",
    description: "Nonnegative real",
    symbol: "\\mathbb{R}_{\\geq 0}",
  },
  {
    name: "bool",
    description: "Boolean",
    symbol: "\\mathbb{B}",
  },
];
