import { visit } from "unist-util-visit";
import type { Root, Text } from "mdast";

// My custom remark plugin to convert :icon[IconName]{.className} syntax to custom icon nodes
// Feel free to improve or modyfy as needed! You are more than welcome to!
// Usage in markdown: :icon[IconName]{.class1 .class2}
// Example: :icon[ShoppingCart]{.text-orange-500 .inline-block .mr-2}
export function remarkLucideIcons() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      // :icon[IconName]{.class1 .class2} pattern
      const iconRegex = /:icon\[([A-Za-z0-9]+)\](?:\{([^}]*)\})?/g;
      const text = node.value;

      if (!iconRegex.test(text)) return;
      iconRegex.lastIndex = 0;

      const newNodes: (
        | Text
        | {
            type: string;
            data: {
              hName: string;
              hProperties: { className: string; iconname: string };
            };
          }
      )[] = [];
      let lastIndex = 0;
      let match;

      while ((match = iconRegex.exec(text)) !== null) {
        // text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          } as Text);
        }

        const iconName = match[1];
        const classString = match[2] || "";

        // classes from {.class1 .class2} format
        const classes = classString
          .split(/\s+/)
          .filter((c) => c.startsWith("."))
          .map((c) => c.slice(1))
          .join(" ");

        // custom node that will be converted to HTML
        newNodes.push({
          type: "lucideIcon",
          data: {
            hName: "lucide-icon",
            hProperties: {
              className: classes || "inline-block h-5 w-5",
              iconname: iconName,
            },
          },
        });

        lastIndex = match.index + match[0].length;
      }

      // remaining text
      if (lastIndex < text.length) {
        newNodes.push({
          type: "text",
          value: text.slice(lastIndex),
        } as Text);
      }

      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...(newNodes as any));
      }
    });
  };
}
