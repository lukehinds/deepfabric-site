import { bundleMDX } from 'mdx-bundler';
import { codeToHtml } from 'shiki';

export async function renderMarkdown(content: string) {
  const result = await bundleMDX({
    source: content,
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeShiki,
      ];
      return options;
    },
  });

  return result;
}

async function rehypeShiki() {
  return async (tree: any) => {
    const { visit } = await import('unist-util-visit');

    visit(tree, 'element', (node: any) => {
      if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        const codeNode = node.children[0];
        const code = codeNode.children?.[0]?.value || '';
        const lang = codeNode.properties?.className?.[0]?.replace('language-', '') || 'text';

        // We'll handle syntax highlighting on the client side for simplicity
        node.properties = {
          ...node.properties,
          'data-language': lang,
        };
      }
    });
  };
}
