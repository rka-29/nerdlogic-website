function highlightText(body: string, highlights: string[]) {
  if (!highlights.length) return body;

  const escaped = highlights
    .slice()
    .sort((a, b) => b.length - a.length)
    .map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = body.split(pattern);

  return parts.map((part, index) => {
    const isHighlight = highlights.some(
      (item) => item.toLowerCase() === part.toLowerCase(),
    );
    if (!isHighlight) return <span key={`${part}-${index}`}>{part}</span>;
    return (
      <span key={`${part}-${index}`} className="text-[#9CBFFF]">
        {part}
      </span>
    );
  });
}

export { highlightText };
