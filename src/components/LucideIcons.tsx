import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { type LucideProps } from "lucide-react";

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

interface LucideIconRendererProps extends Omit<LucideProps, "ref"> {
  iconname: string;
  className?: string;
}

export function LucideIconRenderer({ iconname, className = "inline-block h-5 w-5", ...props }: LucideIconRendererProps) {
  const kebabName = toKebabCase(iconname);

  if (!(kebabName in dynamicIconImports)) {
    console.warn(`[LucideIcons] Unknown icon: "${iconname}" (kebab: "${kebabName}")`);
    return null;
  }

  const Icon = dynamic(dynamicIconImports[kebabName as keyof typeof dynamicIconImports]);

  return <Icon className={className} {...props} />;
}
