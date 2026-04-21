import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    label: "Features",
    href: "https://qdo.xyz/#features",
  },
  {
    label: "Predictions",
    href: "https://qdo.xyz/#predictions",
  },
  {
    label: "Tokens",
  },
  {
    label: "About us",
  },
];

export const HeroProductDisplaySection = (): JSX.Element => {
  return (
    <header className="relative z-10 w-full border-b border-[#0000001f] bg-white">
      <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-16 xl:px-40">
        <a
          href="/"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2 rounded-sm"
          aria-label="Qdo home"
        >
          <img
            className="h-10 w-[120px]"
            alt="Qdo"
            src="/figmaAssets/group-1.png"
          />
        </a>
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center"
        >
          <ul className="flex items-center gap-[3px]">
            {navigationItems.map((item) => (
              <li key={item.label} className="flex">
                {item.href ? (
                  <a
                    className="inline-flex h-[72px] items-center justify-center px-4 py-2.5 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-[#000000cc] whitespace-nowrap transition-colors hover:text-[#1a3d6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2 rounded-sm"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="inline-flex h-[72px] items-center justify-center px-4 py-2.5 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-[#000000cc] whitespace-nowrap transition-colors hover:text-[#1a3d6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2 rounded-sm"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <Button
          type="button"
          className="h-auto min-w-[160px] rounded-2xl bg-[#1a3d6c] px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-[#16345c] sm:min-w-[200px]"
        >
          Get Early Access
        </Button>
      </div>
    </header>
  );
};
