import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';


const getCodeStr  = (code: string, language: string, highlight?: string) => `
\`\`\`${language} ${highlight ? ` {${highlight}}` : ''} showLineNumbers
${code}
\`\`\`
`


export async function highlightCode(code: string, language: string, highlight?: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
        theme: 'dracula',
    })
    .use(rehypeStringify)
    .process(getCodeStr(code, language, highlight));

  return String(file);
}