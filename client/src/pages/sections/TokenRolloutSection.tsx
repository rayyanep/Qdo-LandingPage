import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const rolloutPhases = [
  {
    title: "Foundation Tokens",
    badge: "Phase 1 — Launch",
    badgeClassName: "bg-[#659acd] text-white",
    items: [
      {
        symbol: "USDT",
        label: "Tether — Stablecoin",
        src: "/figmaAssets/image-4.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "USDC",
        label: "Circle — Stablecoin",
        src: "/figmaAssets/image-3.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "ETH",
        label: "Ethereum",
        src: "/figmaAssets/eth--ethereum-.svg",
        alt: "Eth ethereum",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "BNB",
        label: "BNB Smart Chain",
        src: "/figmaAssets/image-1-1.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "POL",
        label: "Polygon",
        src: "/figmaAssets/image-2-1.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] object-cover",
      },
    ],
  },
  {
    title: "DeFi Primitives",
    badge: "Phase 2 — Expansion",
    badgeClassName: "bg-[#659acd] text-white",
    items: [
      {
        symbol: "WBTC",
        label: "Wrapped Bitcoin",
        src: "/figmaAssets/image-5.png",
        alt: "Image",
        wrapperClassName:
          "flex h-[38px] w-[38px] items-center justify-center rounded-[40px] bg-white",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "WETH",
        label: "Wrapped Ether",
        src: "/figmaAssets/image-6.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] rounded-[120px] object-cover",
      },
      {
        symbol: "DAI",
        label: "MakerDAO — Stablecoin",
        src: "/figmaAssets/image-7.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] rounded-[120px] object-cover",
      },
    ],
  },
  {
    title: "Wrapped & DeFi",
    badge: "Phase 3 — Growth",
    badgeClassName: "bg-[#1a3d6c] text-[#547ca2]",
    items: [
      {
        symbol: "XRP",
        label: "Wrapped XRP",
        src: "/figmaAssets/image-8.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] rounded-[120px] object-cover",
      },
      {
        symbol: "SOL",
        label: "Wrapped Solana",
        src: "/figmaAssets/image-9.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] object-cover",
      },
      {
        symbol: "DOGE",
        label: "Wrapped Dogecoin",
        src: "/figmaAssets/image-10.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px]",
      },
      {
        symbol: "LINK",
        label: "Chainlink Oracle",
        src: "/figmaAssets/image-11.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px] rounded-[40px] object-cover",
      },
      {
        symbol: "UNI",
        label: "Uniswap",
        src: "/figmaAssets/image-12.png",
        alt: "Image",
        imageClassName: "h-[38px] w-[38px]",
      },
    ],
  },
];

export const TokenRolloutSection = (): JSX.Element => {
  return (
    <section className="relative w-full px-4 py-8 sm:px-6 lg:px-0">
      <div className="mx-auto flex w-full max-w-[1123px] flex-col items-center gap-10 rounded-3xl bg-[#061237] px-5 pb-[60px] pt-14 sm:px-8 lg:px-20 lg:pt-20">
        <div className="flex w-full flex-col items-start gap-[54px]">
          <header className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col items-start">
              <h2 className="mt-[-1.00px] [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-white sm:text-[40px]">
                Thoughtfully curated
              </h2>
              <p className="-mt-1 sm:-mt-2 [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-[#659acd] sm:text-[40px]">
                token rollout
              </p>
            </div>
            <p className="max-w-[419px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#ffffffcc]">
              Every token goes through strict listing governance — market cap
              thresholds, multi-chain availability, verified contracts, and scam
              filtering.
            </p>
          </header>
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {rolloutPhases.map((phase) => (
              <Card
                key={phase.title}
                className="rounded-3xl border-0 bg-[#ffffff14] shadow-none"
              >
                <CardContent className="flex h-[400px] flex-col overflow-hidden rounded-3xl p-6">
                  <div className="mb-6">
                    <div
                      className={`inline-flex items-center justify-center rounded-3xl px-3 py-1 ${phase.badgeClassName}`}
                    >
                      <span className="mt-[-1.00px] whitespace-nowrap text-center [font-family:'Poppins',Helvetica] text-xs font-semibold leading-[22px] tracking-[0]">
                        {phase.badge}
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-8 [font-family:'Poppins_Latin-Bold',Helvetica] text-base font-bold leading-[normal] tracking-[0] text-white">
                    {phase.title}
                  </h3>
                  <ul className="flex w-full max-w-[257px] flex-col items-start justify-center gap-2">
                    {phase.items.map((item, index) => (
                      <li key={item.symbol} className="w-full">
                        <div className="flex items-center gap-4">
                          {item.wrapperClassName ? (
                            <div className={item.wrapperClassName}>
                              <img
                                className={item.imageClassName}
                                alt={item.alt}
                                src={item.src}
                              />
                            </div>
                          ) : (
                            <img
                              className={item.imageClassName}
                              alt={item.alt}
                              src={item.src}
                            />
                          )}

                          <div className="inline-flex flex-col items-start justify-center gap-0.5">
                            <p className="mt-[-1.00px] [font-family:'Poppins_Latin-SemiBold',Helvetica] text-sm font-semibold leading-[normal] tracking-[0] text-white">
                              {item.symbol}
                            </p>
                            <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-xs font-normal leading-[normal] tracking-[0] text-[#ffffff99]">
                              {item.label}
                            </p>
                          </div>
                        </div>
                        {index < phase.items.length - 1 && (
                          <div className="mt-2 h-px w-full bg-[#ffffff1f]" />
                        )}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          className="h-auto w-full max-w-[400px] rounded-2xl border border-solid border-white bg-transparent p-4 text-white hover:bg-white/5 hover:text-white"
        >
          <span className="font-medium [font-family:'Poppins',Helvetica] text-base leading-[22px] tracking-[0]">
            Get Early Access
          </span>
          <img
            className="h-8 w-8"
            alt="Arrow up right"
            src="/figmaAssets/arrow-up-right-7.svg"
          />
        </Button>
      </div>
    </section>
  );
};
