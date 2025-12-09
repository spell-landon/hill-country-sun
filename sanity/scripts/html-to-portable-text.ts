import { parseDocument } from "htmlparser2";
import { Element, Text, ChildNode } from "domhandler";

type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: PortableTextSpan[];
  markDefs: MarkDef[];
  listItem?: string;
  level?: number;
};

type PortableTextSpan = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type MarkDef = {
  _type: string;
  _key: string;
  href?: string;
};

let keyCounter = 0;

function generateKey(): string {
  return `key${keyCounter++}`;
}

function isElement(node: ChildNode): node is Element {
  return node.type === "tag";
}

function isText(node: ChildNode): node is Text {
  return node.type === "text";
}

function getTextContent(node: ChildNode): string {
  if (isText(node)) {
    return node.data;
  }
  if (isElement(node)) {
    return node.children.map(getTextContent).join("");
  }
  return "";
}

function processInlineNodes(
  nodes: ChildNode[],
  marks: string[] = [],
  markDefs: MarkDef[] = []
): { spans: PortableTextSpan[]; markDefs: MarkDef[] } {
  const spans: PortableTextSpan[] = [];

  for (const node of nodes) {
    if (isText(node)) {
      const text = node.data;
      if (text.trim() || text.includes(" ")) {
        spans.push({
          _type: "span",
          _key: generateKey(),
          text,
          marks: [...marks],
        });
      }
    } else if (isElement(node)) {
      let newMarks = [...marks];

      switch (node.name) {
        case "strong":
        case "b":
          newMarks.push("strong");
          break;
        case "em":
        case "i":
          newMarks.push("em");
          break;
        case "u":
          newMarks.push("underline");
          break;
        case "a": {
          const href = node.attribs?.href;
          if (href) {
            const linkKey = generateKey();
            markDefs.push({
              _type: "link",
              _key: linkKey,
              href,
            });
            newMarks.push(linkKey);
          }
          break;
        }
      }

      const result = processInlineNodes(node.children, newMarks, markDefs);
      spans.push(...result.spans);
    }
  }

  return { spans, markDefs };
}

function createBlock(
  style: string,
  children: ChildNode[],
  listItem?: string,
  level?: number
): PortableTextBlock {
  const { spans, markDefs } = processInlineNodes(children);

  // Ensure at least one span
  if (spans.length === 0) {
    spans.push({
      _type: "span",
      _key: generateKey(),
      text: "",
      marks: [],
    });
  }

  const block: PortableTextBlock = {
    _type: "block",
    _key: generateKey(),
    style,
    children: spans,
    markDefs,
  };

  if (listItem) {
    block.listItem = listItem;
    block.level = level || 1;
  }

  return block;
}

function processListItems(
  items: ChildNode[],
  listType: "bullet" | "number",
  level: number = 1
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];

  for (const item of items) {
    if (isElement(item) && item.name === "li") {
      // Get direct text/inline content
      const inlineContent: ChildNode[] = [];
      const nestedLists: Element[] = [];

      for (const child of item.children) {
        if (isElement(child) && (child.name === "ul" || child.name === "ol")) {
          nestedLists.push(child);
        } else {
          inlineContent.push(child);
        }
      }

      blocks.push(createBlock("normal", inlineContent, listType, level));

      // Process nested lists
      for (const nestedList of nestedLists) {
        const nestedType = nestedList.name === "ul" ? "bullet" : "number";
        blocks.push(...processListItems(nestedList.children, nestedType, level + 1));
      }
    }
  }

  return blocks;
}

export function htmlToPortableText(html: string): PortableTextBlock[] {
  // Reset key counter for each conversion
  keyCounter = 0;

  const blocks: PortableTextBlock[] = [];
  const doc = parseDocument(html.trim());

  function processNode(node: ChildNode) {
    if (!isElement(node)) return;

    switch (node.name) {
      case "p":
        blocks.push(createBlock("normal", node.children));
        break;
      case "h1":
        blocks.push(createBlock("h2", node.children)); // Map h1 to h2 (Sanity doesn't have h1)
        break;
      case "h2":
        blocks.push(createBlock("h2", node.children));
        break;
      case "h3":
        blocks.push(createBlock("h3", node.children));
        break;
      case "h4":
        blocks.push(createBlock("h4", node.children));
        break;
      case "blockquote":
        blocks.push(createBlock("blockquote", node.children));
        break;
      case "ul":
        blocks.push(...processListItems(node.children, "bullet"));
        break;
      case "ol":
        blocks.push(...processListItems(node.children, "number"));
        break;
      case "div":
      case "article":
      case "section":
        // Process children of container elements
        for (const child of node.children) {
          processNode(child);
        }
        break;
      default:
        // For other elements, try to process children
        if (node.children?.length) {
          for (const child of node.children) {
            processNode(child);
          }
        }
    }
  }

  for (const node of doc.children) {
    processNode(node);
  }

  return blocks;
}
