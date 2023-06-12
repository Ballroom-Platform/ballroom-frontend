import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  source: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;