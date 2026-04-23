import { Button } from "@/components/ui/button";

const aiCapabilities = [
  {
    label: "User Onboarding",
    type: "custom",
  },
  {
    label: "Market Analysis",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-6.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "Smart DCA",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-4.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "Portfolio Rebalancing",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-3.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "Risk Alerts & Insights",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-2.svg",
    iconAlt: "Arrow up right",
  },
] as const;

export const MarketInsightsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="flex w-full max-w-[560px] flex-col items-start gap-10">
        <header className="flex w-full flex-col items-start justify-center gap-4">
          <div className="inline-flex flex-col items-start">
            <h2 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#163d6c]">
              Your AI co-pilot for
            </h2>
            <p className="-mt-2 w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#659acd]">
              every step in crypto.
            </p>
          </div>
          <p className="w-full [font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal leading-[normal] tracking-[0] text-[#000000cc]">
            From your first wallet to advanced strategies, our AI guides you,
            analyzes the market in real time, and automates smart moves so you
            can grow your portfolio without the guesswork.
          </p>
        </header>
        <nav
          aria-label="AI flow capabilities"
          className="flex w-full flex-col items-start gap-3"
        >
          {aiCapabilities.map((item) => (
            <Button
              key={item.label}
              type="button"
              variant="ghost"
              className="h-auto inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-3xl bg-[#659acd1a] px-4 py-3 hover:bg-[#659acd26]"
            >
              {item.type === "custom" ? (
                <span className="relative my-[-1.00px] block h-6 w-6 shrink-0">
                  <span className="absolute left-2.5 top-0 h-[3px] w-1 bg-[#659acd]" />
                  <span className="absolute left-[11px] top-1.5 h-2 w-0.5 rounded-lg bg-[#659acd]" />
                  <span className="absolute left-[13px] top-2 h-[5px] w-0.5 rotate-45 rounded-lg bg-[#659acd66]" />
                  <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-[10px] border-2 border-solid border-[#659acd]" />
                </span>
              ) : (
                <img
                  className="relative my-[-1.00px] h-6 w-6 shrink-0"
                  alt={item.iconAlt}
                  src={item.iconSrc}
                />
              )}

              <span className="[font-family:'Poppins',Helvetica] text-center text-lg font-semibold leading-[22px] tracking-[0] text-[#1a3d6c] whitespace-nowrap">
                {item.label}
              </span>
            </Button>
          ))}
        </nav>
      </div>
    </section>
  );
};
