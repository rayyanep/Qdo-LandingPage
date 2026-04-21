import { Button } from "@/components/ui/button";

const marketInsights = [
  {
    label: "5-Minute Markets",
    type: "custom",
  },
  {
    label: "Chainlink Oracle Resolution",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-6.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "USDC Settlement",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-4.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "Gnosis Conditional Tokens",
    type: "image",
    iconSrc: "/figmaAssets/arrow-up-right-3.svg",
    iconAlt: "Arrow up right",
  },
  {
    label: "Yield on Locked Collateral",
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
              Will BTC go up or down?
            </h2>
            <p className="-mt-2 w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#659acd]">
              5-minute markets.
            </p>
          </div>
          <p className="w-full [font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal leading-[normal] tracking-[0] text-[#000000cc]">
            Simple binary prediction markets on BTC price action. Pick a
            direction, lock your USDC, and settle in 5 minutes. Powered by
            Chainlink oracles.
          </p>
        </header>
        <nav
          aria-label="Market insights features"
          className="flex w-full flex-col items-start gap-3"
        >
          {marketInsights.map((item) => (
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
