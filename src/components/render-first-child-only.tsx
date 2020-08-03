import React, { ReactNode } from "react";

export function RenderFirstChildOnly({ children }: { children: ReactNode }) {
  return (React.Children.toArray(children)[0] as JSX.Element) || null;
}
