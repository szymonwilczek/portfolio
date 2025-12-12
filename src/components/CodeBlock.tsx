"use client";

import { useState, useCallback, useMemo } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children?: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const getCodeText = useCallback((node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getCodeText).join("");
    if (node && typeof node === "object" && "props" in node) {
      const element = node as { props?: { children?: React.ReactNode } };
      return getCodeText(element.props?.children);
    }
    return "";
  }, []);

  const codeText = useMemo(() => getCodeText(children), [children, getCodeText]);
  const lineCount = useMemo(() => codeText.split("\n").length, [codeText]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [codeText]);

  const language = className?.split(" ").find(c => c.startsWith("language-"))?.replace("language-", "") || "";

  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-muted/30 my-6">
      <div className="flex items-center justify-between px-5 py-2.5 bg-muted/50 border-b border-border">
        <span className="text-sm font-mono font-semibold text-muted-foreground uppercase tracking-wide">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="flex overflow-x-auto">
        <div
          className="flex-shrink-0 select-none text-right pr-4 pl-5 py-4 text-sm text-muted-foreground/50 font-mono border-r border-border/50 bg-muted/20"
          style={{ lineHeight: '1.714rem' }}
        >
          {Array.from({ length: lineCount - 1 }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div className="flex-1 py-4 pl-4 pr-5">
          <pre
            className={`${className || ""} !m-0 !p-0 !bg-transparent !border-0`}
            style={{ lineHeight: '1.714rem' }}
          >
            <code className="text-sm">{children}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
