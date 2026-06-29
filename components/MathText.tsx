'use client';
import 'katex/dist/katex.min.css';
// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex';

export default function MathText({ text }: { text?: string }) {
  // Perlindungan agar tidak error jika text undefined
  const safeText = text || "";

  // Jika teks tidak mengandung simbol '$', render sebagai teks biasa
  if (!safeText.includes('$')) {
    return <span>{safeText}</span>;
  }

  const parts = safeText.split(/(\$\$.*?\$\$|\$.*?\$)/g);

  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          return <BlockMath key={index} math={part.slice(2, -2)} />;
        }
        if (part.startsWith('$') && part.endsWith('$')) {
          return <InlineMath key={index} math={part.slice(1, -1)} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}