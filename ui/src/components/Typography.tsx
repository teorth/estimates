import classNames from "classnames";
import type React from "react";

export function TypographyH1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return <h2 className={classNames("font-semibold", className)}>{children}</h2>;
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>;
}

export function TypographyH4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="scroll-m-20 font-semibold tracking-tight">{children}</h4>
  );
}

export function TypographyLead({ children }: { children: React.ReactNode }) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}

export function TypographyMuted({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium">{children}</p>;
}
