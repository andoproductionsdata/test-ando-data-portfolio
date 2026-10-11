"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export function SqlCodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="sql"
      style={vscDarkPlus}
      customStyle={{
        borderRadius: "0.75rem",
        border: "1px solid hsl(var(--border))",
        fontSize: "0.8rem",
        lineHeight: "1.6",
        margin: 0,
      }}
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  )
}
