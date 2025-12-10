function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-left text-pretty leading-relaxed text-muted-foreground text-lg">
      {children}
    </p>
  );
}

export { Paragraph };
