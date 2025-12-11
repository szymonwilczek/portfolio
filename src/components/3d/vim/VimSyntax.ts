import { C } from "./VimConfig";

export interface Token {
  text: string;
  color: string;
}

export const highlightLine = (line: string): Token[] => {
  const trimmed = line.trim();

  // comments
  if (trimmed.startsWith("//") || trimmed.startsWith("{/*")) {
    return [{ text: line, color: C.muted }];
  }

  const parts = line.split(/([ \(\)\{\}\[\]\.,:;'"<>=/])/);
  let inString = false;
  let stringChar = "";

  return parts.map((part) => {
    // strings
    if (inString) {
      if (part === stringChar) {
        inString = false;
        return { text: part, color: C.gold };
      }
      return { text: part, color: C.gold };
    }
    if ((part === '"' || part === "'" || part === "`") && !inString) {
      inString = true;
      stringChar = part;
      return { text: part, color: C.gold };
    }

    // react props / attributes
    if (
      [
        "className",
        "src",
        "alt",
        "href",
        "lang",
        "content",
        "name",
        "width",
        "height",
        "rel",
        "target",
      ].includes(part)
    ) {
      return { text: part, color: C.iris };
    }

    // html tags
    if (
      [
        "html",
        "body",
        "head",
        "title",
        "meta",
        "div",
        "main",
        "section",
        "article",
        "nav",
        "header",
        "footer",
        "span",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "ul",
        "ol",
        "li",
        "a",
        "button",
        "img",
        "form",
        "input",
        "label",
        "textarea",
      ].includes(part)
    ) {
      return { text: part, color: C.love };
    }

    // keywords
    if (
      [
        "import",
        "from",
        "export",
        "default",
        "function",
        "const",
        "let",
        "var",
        "return",
        "if",
        "else",
        "interface",
        "type",
        "async",
        "await",
      ].includes(part)
    ) {
      return { text: part, color: C.pine };
    }

    // components & types
    if (/^[A-Z]/.test(part) && part.length > 1) {
      return { text: part, color: C.foam };
    }

    // digits
    if (/^\d+$/.test(part)) {
      return { text: part, color: C.iris };
    }

    // specials in react
    if (
      [
        "console",
        "log",
        "useState",
        "useEffect",
        "useRef",
        "map",
        "filter",
        "find",
        "reduce",
      ].includes(part)
    ) {
      return { text: part, color: C.rose };
    }

    // signs and operators
    if (
      [
        "=",
        "=>",
        ":",
        ";",
        ".",
        ",",
        "{",
        "}",
        "(",
        ")",
        "<",
        ">",
        "[",
        "]",
        "/",
        "+",
        "-",
        "*",
        "!",
      ].includes(part)
    ) {
      return { text: part, color: C.muted };
    }

    // default
    return { text: part, color: C.text };
  });
};
