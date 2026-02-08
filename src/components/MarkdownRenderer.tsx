import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-invert max-w-none text-[var(--color-text-muted)] [&_h1]:text-[var(--color-text)] [&_h2]:text-[var(--color-text)] [&_h3]:text-[var(--color-text)] [&_a]:text-[var(--color-accent)] [&_strong]:text-[var(--color-text)] [&_code]:rounded [&_code]:bg-[var(--color-surface-elevated)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
