export default function TutorialArticle({
  children,
}: { children: React.ReactNode }): React.ReactElement {
  return (
    <article className="prose lg:prose-md max-w-none lg:max-w-xl text-justify">
      {children}
    </article>
  );
}
