import React from 'react';

const Highlight = ({ text, highlight }: { text: string, highlight: string }) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      { parts.map((part: any, i: number) =>
        <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>
      )}
    </>
  );
}

export default Highlight;