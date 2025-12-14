import { type LucideIcon } from "lucide-react";

function Section({
  children,
  className = "",
  delay = "",
  noAnimation = false
}: {
  children: React.ReactNode,
  className?: string,
  delay?: string,
  noAnimation?: boolean
}) {
  const animation = noAnimation ? "" : `animate-in slide-in-from-bottom-8 fade-in duration-500 ${delay}`;

  return (
    <section className={`w-full max-w-3xl px-6 mb-16 ${animation} ${className}`}
      style={{ animationFillMode: "both" }}
    >
      {children}
    </section>
  );
}


function SectionTitle({ icon: Icon, children }: { icon?: LucideIcon, children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-3xl font-bold font-outfit tracking-wider text-foreground mb-6">
      {Icon && <Icon className="w-6 h-6 text-primary" />}
      {children}
    </h3>
  );
}

export { Section, SectionTitle };
