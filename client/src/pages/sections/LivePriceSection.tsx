import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const marketOptions = [
  {
    value: "down",
    label: "down",
    payout: "Payout 2.08x",
    iconSrc: "/figmaAssets/arrow-up-right-1.svg",
    iconAlt: "Down market direction",
    bgClass: "bg-[#fde0df]",
    textClass: "text-[#ff5a75]",
    borderClass:
      "border border-transparent data-[state=on]:border-[#ff5a75]/25",
  },
  {
    value: "up",
    label: "up",
    payout: "Payout 1.92x",
    iconSrc: "/figmaAssets/arrow-up-right.svg",
    iconAlt: "Up market direction",
    bgClass: "bg-[#cdf2e7]",
    textClass: "text-[#43beb9]",
    borderClass:
      "border border-transparent data-[state=on]:border-[#43beb9]/25",
  },
];

const metadata = ["Settlement: USDC", "Oracle: Chainlink"];

export const LivePriceSection = (): JSX.Element => {
  return (
    <section className="relative w-full max-w-[455px]">
      <div className="flex flex-col items-start gap-12">
        <div className="flex w-full flex-col items-start gap-8">
          <header className="flex items-center gap-[22px]">
            <img
              className="h-10 w-10 shrink-0"
              alt="Btc"
              src="/figmaAssets/btc.svg"
            />
            <h2 className="w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#000000b2]">
              BTC/USD
            </h2>
          </header>
          <Card className="w-full rounded-[24px] border border-solid border-[#0000001f] bg-white shadow-none">
            <CardContent className="flex flex-col items-center gap-2 px-8 py-6">
              <p className="[font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
                67,842,50
              </p>
              <div className="inline-flex items-end gap-2">
                <img
                  className="h-3.5 w-[15.86px] shrink-0"
                  alt="Polygon"
                  src="/figmaAssets/polygon-1.svg"
                />
                <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal leading-[normal] tracking-[0] text-[#000000cc]">
                  +2.4% today
                </p>
              </div>
            </CardContent>
          </Card>
          <ToggleGroup
            type="single"
            className="grid w-full grid-cols-2 gap-10"
            defaultValue="up"
            aria-label="Market direction options"
          >
            {marketOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className={`h-auto w-full rounded-lg px-6 py-3 data-[state=on]:opacity-100 ${option.bgClass} ${option.textClass} ${option.borderClass} hover:${option.bgClass} hover:${option.textClass} flex flex-col items-center gap-0.5`}
                aria-label={option.label}
              >
                <div className="inline-flex items-center gap-2 pr-3">
                  <img
                    className="h-8 w-8 shrink-0"
                    alt={option.iconAlt}
                    src={option.iconSrc}
                  />
                  <span
                    className={`[font-family:'Poppins_Latin-Bold',Helvetica] text-lg font-bold leading-[normal] tracking-[0] ${option.textClass}`}
                  >
                    {option.label}
                  </span>
                </div>
                <span
                  className={`[font-family:'Poppins_Latin-Medium',Helvetica] text-xs font-medium leading-[normal] tracking-[0] ${option.textClass}`}
                >
                  {option.payout}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <footer className="flex w-full items-center justify-between gap-4">
          {metadata.map((item) => (
            <p
              key={item}
              className="[font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-[#00000099]"
            >
              {item}
            </p>
          ))}
        </footer>
      </div>
    </section>
  );
};
