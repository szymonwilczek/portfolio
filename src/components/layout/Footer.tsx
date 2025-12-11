export function Footer() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row max-w-screen-2xl mx-auto px-4 max-md:py-6 md:px-8">

        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Szymon Wilczek</span>.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
