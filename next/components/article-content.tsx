"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface ArticleContentProps {
  content: any;
}

export function ArticleContent({ content }: ArticleContentProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="prose prose-lg prose-gray max-w-none article-content">
      <BlocksRenderer 
        content={content}
        blocks={{
          paragraph: ({ children }: any) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
          heading: ({ children, level }: any) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            const className = level === 2 ? "text-2xl font-bold text-accent mt-8 mb-4" : "text-xl font-semibold text-accent mt-6 mb-3";
            return <Tag className={className}>{children}</Tag>;
          },
          list: ({ children, format }: any) => {
            const ListTag = format === 'ordered' ? 'ol' : 'ul';
            const className = format === 'ordered' 
              ? "list-decimal list-inside space-y-2 mb-6 ml-4" 
              : "list-disc list-inside space-y-2 mb-6 ml-4";
            return <ListTag className={className}>{children}</ListTag>;
          },
          quote: ({ children }: any) => (
            <blockquote className="border-l-4 border-primary pl-6 italic text-gray-700 my-6">
              {children}
            </blockquote>
          ),
          code: ({ children }: any) => (
            <pre className="bg-gray-100 rounded-lg p-4 overflow-x-auto mb-6">
              <code className="text-sm text-gray-800">{children}</code>
            </pre>
          ),
          link: ({ children, url }: any) => (
            <a href={url} className="text-primary hover:text-primary-dark underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      />
    </div>
  );
}