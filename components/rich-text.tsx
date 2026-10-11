type Block =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }

function parse(text: string): Block[] {
  const lines = text.split("\n")
  const blocks: Block[] = []
  let currentBullets: string[] = []

  const flushBullets = () => {
    if (currentBullets.length > 0) {
      blocks.push({ type: "bullets", items: [...currentBullets] })
      currentBullets = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()
    if (/^-\s*\S/.test(trimmed) || trimmed === "-") {
      currentBullets.push(trimmed.replace(/^-\s*/, ""))
    } else {
      flushBullets()
      if (trimmed) blocks.push({ type: "paragraph", text: trimmed })
    }
  }
  flushBullets()
  return blocks
}

export function RichText({ text, className = "" }: { text: string; className?: string }) {
  if (!text?.trim()) return null
  const blocks = parse(text)

  return (
    <div className={`space-y-3 text-pretty leading-relaxed text-muted-foreground ${className}`}>
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return <p key={i}>{block.text}</p>
        }
        return (
          <ul key={i} className="space-y-1.5">
            {block.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/60" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        )
      })}
    </div>
  )
}
