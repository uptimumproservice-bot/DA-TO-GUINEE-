import React from 'react';

/**
 * Highlights any occurrence of "DA-TO GUINEE SA" in bold within a text string.
 */
export function formatBrandText(text: string): React.ReactNode {
  return text;
}

export function BrandText({
  text,
  children,
  className,
}: {
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const content = text ?? children;
  if (typeof content === 'string') {
    return <span className={className}>{formatBrandText(content)}</span>;
  }
  return <span className={className}>{content}</span>;
}
