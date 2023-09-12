import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownRendererProps {
  source: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ source }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} className='markdown' components={{
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, '')}
          style={dark}
          language={match[1]}
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
    }
  }}>{source}</ReactMarkdown>;
};

export default MarkdownRenderer;
