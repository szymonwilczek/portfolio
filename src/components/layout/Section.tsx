function Section({ children, className = "", delay = "" }: { children: React.ReactNode, className?: string, delay?: string }) {
  return (
    <section className={`w-full max-w-3xl px-6 mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700 ${delay} ${className}`}>
      {children}
    </section>
  );
}


function SectionTitle({ icon: Icon, children }: { icon?: React.ElementType, children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-foreground mb-6">
      {Icon && <Icon className="w-6 h-6 text-primary" />}
      {children}
    </h3>
  );
}

export { Section, SectionTitle };
