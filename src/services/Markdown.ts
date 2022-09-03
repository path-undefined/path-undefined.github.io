import { marked } from 'marked';

export function useMarkdown() {
  return (source: string) => {
    return marked.parseInline(source);
  };
}
