import { C } from "./VimConfig";

export interface Token {
  text: string;
  color: string;
}

// control-flow / operator keywords
const KEYWORDS = new Set([
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "return",
  "goto",
  "sizeof",
]);

// types & storage-class specifiers
const TYPES = new Set([
  "void",
  "char",
  "short",
  "int",
  "long",
  "float",
  "double",
  "unsigned",
  "signed",
  "const",
  "static",
  "extern",
  "inline",
  "volatile",
  "register",
  "struct",
  "union",
  "enum",
  "typedef",
  "size_t",
]);

// well-known constants / macros
const CONSTANTS = new Set(["NULL", "EOF", "true", "false"]);

export const highlightLine = (line: string): Token[] => {
  const trimmed = line.trim();

  // full-line comments (block or continuation)
  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("/*") ||
    trimmed.startsWith("*")
  ) {
    return [{ text: line, color: C.comment }];
  }

  // preprocessor directives (#include, #define, #ifndef, ...)
  if (trimmed.startsWith("#")) {
    return [{ text: line, color: C.foam }];
  }

  const parts = line.split(/([ ()[\]{}.,:;'"<>=/*&!+-])/);
  let inString = false;
  let stringChar = "";

  return parts.map((part, i) => {
    // strings & char literals
    if (inString) {
      if (part === stringChar) {
        inString = false;
        return { text: part, color: C.gold };
      }
      return { text: part, color: C.gold };
    }
    if (part === '"' || part === "'") {
      inString = true;
      stringChar = part;
      return { text: part, color: C.gold };
    }

    if (KEYWORDS.has(part)) return { text: part, color: C.pine };
    if (TYPES.has(part)) return { text: part, color: C.iris };
    if (CONSTANTS.has(part)) return { text: part, color: C.constant };

    // function call: identifier immediately followed by "("
    if (/^[A-Za-z_]\w*$/.test(part) && parts[i + 1] === "(") {
      return { text: part, color: C.rose };
    }

    // numeric literals
    if (/^\d+$/.test(part)) {
      return { text: part, color: C.constant };
    }

    // punctuation / operators
    if (/^[()[\]{}.,:;'"<>=/*&!+-]$/.test(part)) {
      return { text: part, color: C.muted };
    }

    // default (identifiers, whitespace)
    return { text: part, color: C.text };
  });
};
