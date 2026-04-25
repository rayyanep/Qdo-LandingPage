import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  {
    label: "Features",
    href: "https://qdo.xyz/#features",
  },
  {
    label: "AI Pilot",
    href: "https://qdo.xyz/#ai-pilot",
  },
  {
    label: "Tokens",
  },
  {
    label: "Contact us",
  },
];

export const HeroProductDisplaySection = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  return (
    <header className="relative z-30 w-full border-b border-[#0000001f] bg-white">
      <div className="mx-auto flex h-20 w-full max-w-none items-center justify-between gap-4 px-4 sm:px-6 lg:px-16 xl:px-40">
        <a
          href="/"
          className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2"
          aria-label="Qdo home"
        >
          <img
            className="h-8 w-auto sm:h-10"
            alt="Qdo"
            src="/figmaAssets/group-1.png"
          />
        </a>
        <nav
          aria-label="Primary navigation"
          className="hidden xl:flex items-center"
        >
          <ul className="flex items-center gap-[3px]">
            {navigationItems.map((item) => (
              <li key={item.label} className="flex">
                {item.href ? (
                  <a
                    className="inline-flex h-[72px] items-center justify-center whitespace-nowrap rounded-sm px-4 py-2.5 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-[#000000cc] transition-colors hover:text-[#1a3d6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className="inline-flex h-[72px] items-center justify-center whitespace-nowrap rounded-sm px-4 py-2.5 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-[#000000cc] transition-colors hover:text-[#1a3d6c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2"
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
          onClick={() => {
            document
              .getElementById("waitlist")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="hidden h-auto min-w-[160px] rounded-2xl bg-[#1a3d6c] px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-[#16345c] sm:inline-flex md:min-w-[200px]"
        >
          Get Early Access
        </Button>
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#0000001f] text-[#1a3d6c] xl:hidden"
        >
          {mobileOpen ? (
            <XIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-40 border-b border-[#0000001f] bg-white shadow-lg xl:hidden"
        >
          <ul className="flex flex-col px-4 py-4 sm:px-6">
            {navigationItems.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    className="block w-full rounded-lg px-3 py-3 [font-family:'Poppins',Helvetica] text-base font-medium text-[#000000cc] hover:bg-[#f5f7fb] hover:text-[#1a3d6c]"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full rounded-lg px-3 py-3 text-left [font-family:'Poppins',Helvetica] text-base font-medium text-[#000000cc] hover:bg-[#f5f7fb] hover:text-[#1a3d6c]"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
            <li className="mt-2">
              <Button
                type="button"
                className="h-auto w-full rounded-2xl bg-[#1a3d6c] px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-[#16345c]"
                onClick={() => {
                  setMobileOpen(false);
                  setTimeout(() => {
                    document
                      .getElementById("waitlist")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 50);
                }}
              >
                Get Early Access
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
};
