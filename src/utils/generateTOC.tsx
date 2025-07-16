import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";

export type TocItem = {
  id: string;
  text: string;
  depth: number;
}

export const generateToc = (markdown: string): TocItem[] => {
  const tree = unified().use(remarkParse).parse(markdown);
  const toc: TocItem[] = [];

  visit(tree, "heading", (node: any) => {
    const text = node.children?.map((child: any) => child.value).join("") || "";
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    toc.push({
      id,
      text,
      depth: node.depth,
    });
  });

  return toc;
};