// MarkdownInput.jsx
import React from 'react';

function MarkdownInput({ text }) {
  // Function to parse markdown text
  const parseMarkdown = (text) => {
    if (!text) {
      return null;
    }

    // Split text by double new lines (to separate paragraphs)
    const paragraphs = text.split('\n\n');

    return paragraphs.map((paragraph, index) => {
      // Split paragraph by single new lines
      const lines = paragraph.split('\n');

      const renderedLines = lines.map((line, lineIndex) => {
        // Handle headings
        if (line.startsWith('### ')) {
          return <h3 key={lineIndex} className="text-xl font-bold">{parseFormattedText(line.substring(4))}</h3>;
        } else if (line.startsWith('## ')) {
          return <h2 key={lineIndex} className="text-2xl font-bold">{parseFormattedText(line.substring(3))}</h2>;
        } else if (line.startsWith('# ')) {
          return <h1 key={lineIndex} className="text-3xl font-bold">{parseFormattedText(line.substring(2))}</h1>;
        } else {
          return <span key={lineIndex}>{parseFormattedText(line)}<br /></span>;
        }
      });

      return <p key={index}>{renderedLines}</p>;
    });
  };

  // Function to parse formatted text (bold and underline)
  const parseFormattedText = (text) => {
    // Split text by "**" and "__" to check for bold and underline
    const parts = text.split(/(\*\*.*?\*\*|\__.*?\__)/);

    return parts.map((part, index) => {
      // If part is bold text, remove "**" and wrap in <strong>
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      // If part is underlined text, remove "__" and wrap in <u>
      if (part.startsWith('__') && part.endsWith('__')) {
        return <u key={index}>{part.slice(2, -2)}</u>;
      }
      return part;
    });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-md">
      {parseMarkdown(text)}
    </div>
  );
}

export default MarkdownInput;