import katex from "katex";
import { useMemo } from "react";

export default function LatexString({ latex }: { latex: string }) {
  const renderedContent = useMemo(() => {
    if (!latex) return "";
    try {
      const rendered = katex.renderToString(latex);
      return rendered;
    } catch (error) {
      console.error(error);
      return latex;
    }
  }, [latex]);
  // biome-ignore lint/security/noDangerouslySetInnerHtml: we trust Katex output
  return <span dangerouslySetInnerHTML={{ __html: renderedContent }} />;
}
