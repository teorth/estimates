import { REPLACABLE_SYMBOLS } from "../../../metadata/symbols";
import { SUPPORTED_VARIABLE_TYPES } from "../../../metadata/variables";
import LatexString from "../LatexString";

const LATEX_TRANSLATIONS = [
  ...SUPPORTED_VARIABLE_TYPES,
  ...REPLACABLE_SYMBOLS,
].reduce(
  (acc, type) => {
    acc[type.name] = type.symbol;
    return acc;
  },
  {} as Record<string, string>,
);

export default function RenderedNodeText({ text }: { text: string }) {
  const typePattern = [
    ...SUPPORTED_VARIABLE_TYPES.map((t) => t.name),
    ...REPLACABLE_SYMBOLS.map((t) => t.pattern),
  ].join("|");
  const parts = text.split(new RegExp(`(${typePattern})`, "g"));
  return (
    <span>
      {parts.map((part) => {
        if (LATEX_TRANSLATIONS[part]) {
          return <LatexString latex={LATEX_TRANSLATIONS[part]} />;
        }
        return part;
      })}
    </span>
  );
}
