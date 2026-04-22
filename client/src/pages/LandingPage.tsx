import { Card, CardContent } from "@/components/ui/card";
import { CustodyTierSection } from "./sections/CustodyTierSection";
import { FooterActionSection } from "./sections/FooterActionSection";
import { HeroMessagingSection } from "./sections/HeroMessagingSection";
import { HeroProductDisplaySection } from "./sections/HeroProductDisplaySection";
import { LivePriceSection } from "./sections/LivePriceSection";
import { MarketInsightsSection } from "./sections/MarketInsightsSection";
import { PasskeySecuritySection } from "./sections/PasskeySecuritySection";
import { ProductValueSection } from "./sections/ProductValueSection";
import { SelfCustodyFeatureCardsSection } from "./sections/SelfCustodyFeatureCardsSection";
import { SelfCustodyIntroSection } from "./sections/SelfCustodyIntroSection";
import { TierCalloutSection } from "./sections/TierCalloutSection";
import { TokenRolloutSection } from "./sections/TokenRolloutSection";

const statCards = [
  {
    value: "0",
    label: "Seed Phrases",
    desktopPosition: "xl:absolute xl:left-[74px] xl:top-[174px]",
    wrapperClass:
      "aspect-square rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[40px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-sm sm:text-base font-normal text-[#00000099]",
  },
  {
    value: "3",
    label: "Chains Supported",
    desktopPosition: "xl:absolute xl:left-[587px] xl:top-[255px]",
    wrapperClass:
      "aspect-square rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[40px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-sm sm:text-base font-normal text-[#00000099]",
  },
  {
    value: "5 min",
    label: "Prediction Markets",
    desktopPosition: "xl:absolute xl:left-[170px] xl:top-[517px]",
    wrapperClass: "aspect-square rounded-3xl bg-[#659acd]",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[40px] font-semibold text-white",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-sm sm:text-base font-normal text-white",
  },
];

export const LandingPage = (): JSX.Element => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-white">
        <HeroProductDisplaySection />
        <div className="relative w-full">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-4 py-10 sm:px-6 xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)] xl:items-center xl:gap-16 xl:px-16 xl:py-16">
            <div className="order-2 xl:order-none">
              <div className="relative mx-auto w-full max-w-[442px] xl:max-w-none xl:h-[600px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[110%] max-w-[640px] rounded-full border border-solid border-[#e8edf5] bg-[#f3f5fa]/60 xl:w-[640px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[80%] max-w-[470px] rounded-full border border-solid border-[#dde3ee] bg-[#eaeef6]/70 xl:w-[470px]"
                />
                <img
                  className="relative mx-auto block h-auto w-full max-w-[442px] xl:absolute xl:left-1/2 xl:top-1/2 xl:h-[534px] xl:w-[442px] xl:-translate-x-1/2 xl:-translate-y-1/2"
                  alt="Iphone"
                  src="/figmaAssets/iphone-15.png"
                />

                <Card
                  className={`hidden xl:flex absolute left-0 top-[40px] ${statCards[0].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex min-w-[150px] flex-col items-center gap-1 px-8 pb-6 pt-5">
                    <div
                      className={`relative self-stretch text-center leading-[normal] tracking-[0] ${statCards[0].valueClass}`}
                    >
                      {statCards[0].value}
                    </div>
                    <div
                      className={`relative text-center leading-tight tracking-[0] ${statCards[0].labelClass}`}
                    >
                      {statCards[0].label}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`hidden xl:flex absolute right-0 top-[140px] ${statCards[1].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex min-w-[150px] flex-col items-center gap-1 px-8 pb-6 pt-5">
                    <div
                      className={`relative self-stretch text-center leading-[normal] tracking-[0] ${statCards[1].valueClass}`}
                    >
                      {statCards[1].value}
                    </div>
                    <div
                      className={`relative text-center leading-tight tracking-[0] ${statCards[1].labelClass}`}
                    >
                      {statCards[1].label}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`hidden xl:flex absolute bottom-[10px] left-[40px] ${statCards[2].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex min-w-[150px] flex-col items-center gap-1 px-8 pb-6 pt-5">
                    <div
                      className={`relative self-stretch text-center leading-[normal] tracking-[0] ${statCards[2].valueClass}`}
                    >
                      <span className="[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[44px] font-semibold tracking-[0] text-white">
                        5{" "}
                      </span>
                      <span className="text-2xl">min</span>
                    </div>
                    <div
                      className={`relative text-center leading-tight tracking-[0] ${statCards[2].labelClass}`}
                    >
                      {statCards[2].label}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:hidden">
                {statCards.map((card) => (
                  <Card
                    key={card.label}
                    className={`${card.wrapperClass} shadow-none`}
                  >
                    <CardContent className="flex flex-col items-center gap-1 px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4">
                      <div
                        className={`relative self-stretch text-center leading-[normal] tracking-[0] ${card.valueClass}`}
                      >
                        {card.value === "5 min" ? (
                          <>
                            <span className={card.valueClass}>5 </span>
                            <span className="text-xl sm:text-2xl">min</span>
                          </>
                        ) : (
                          card.value
                        )}
                      </div>
                      <div
                        className={`relative text-center leading-tight tracking-[0] ${card.labelClass}`}
                      >
                        {card.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="order-1 xl:order-none">
              <HeroMessagingSection />
            </div>
          </div>
        </div>
        <ProductValueSection />
        <PasskeySecuritySection />
        <section className="onboarding-section">
          <div className="container">
            <div className="headline">
              <h1>
                From zero to crypto
                <span className="light">in under 60 seconds</span>
              </h1>
              <p>
                No downloads, no recovery phrases, no crypto knowledge required.
                Just your fingerprint and you&#39;re in.
              </p>
            </div>

            <svg
              className="road-svg"
              viewBox="0 0 2000 1552"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M -120 870 C 50 1010, 180 1100, 360 1065 C 560 1025, 650 920, 760 810 C 900 670, 1010 430, 1210 410 C 1440 385, 1700 390, 1760 760 C 1795 970, 1840 1170, 2025 1415"
                fill="none"
                stroke="#e3e5ea"
                strokeWidth={78}
                strokeLinecap="round"
              />
              <path
                d="M -120 870 C 50 1010, 180 1100, 360 1065 C 560 1025, 650 920, 760 810 C 900 670, 1010 430, 1210 410 C 1440 385, 1700 390, 1760 760 C 1795 970, 1840 1170, 2025 1415"
                fill="none"
                stroke="rgba(255,255,255,0.72)"
                strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray="36 42"
              />
            </svg>

            <div className="steps-mobile">
              <div className="marker m1" />
              <div className="step step-1">
                <h3>Open the App</h3>
                <p>Launch Qdo on any device. No app store required — works on web, iOS, and Android.</p>
              </div>

              <div className="marker m2" />
              <div className="step step-2">
                <h3>Scan Your Fingerprint</h3>
                <p>Authenticate with Face ID, fingerprint, or device PIN. Your passkey creates a secure wallet instantly.</p>
              </div>

              <div className="marker m3" />
              <div className="step step-3">
                <h3>Fund Your Wallet</h3>
                <p>Buy crypto with your card or bank transfer. Funds arrive directly in your self-custody wallet.</p>
              </div>

              <div className="marker m4" />
              <div className="step step-4">
                <h3>Swap, Trade &amp; Earn</h3>
                <p>Swap tokens, trade prediction markets, and earn yield — all from a single, beautiful interface.</p>
              </div>
            </div>

            <div className="bottom-curve" />
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-none overflow-hidden bg-white px-4 pb-16 pt-12 sm:px-6 md:px-10 lg:px-16 xl:px-40 xl:pb-24 xl:pt-20">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[298px_1fr] lg:gap-[116px]">
            <LivePriceSection />
            <MarketInsightsSection />
          </div>
        </section>
        <section className="mx-auto w-full max-w-none px-4 pb-14 pt-8 sm:px-6 md:px-8">
          <TokenRolloutSection />
        </section>
        <section className="mx-auto flex w-full max-w-none flex-col gap-10 px-4 pb-16 pt-2 sm:px-6 md:px-8">
          <div className="w-fit">
            <SelfCustodyIntroSection />
          </div>
          <SelfCustodyFeatureCardsSection />
        </section>
        <section className="mx-auto w-full max-w-none px-4 pb-16 pt-8 sm:px-6 md:px-10 lg:px-16">
          <header className="mb-10 inline-flex flex-col items-start">
            <h2 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[28px] font-bold leading-[normal] tracking-[0] text-[#163d6c] sm:text-[34px] md:text-[40px]">
              Self-custody means
            </h2>
            <p className="-mt-2 w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[28px] font-bold leading-[normal] tracking-[0] text-[#659acd] sm:text-[34px] md:text-[40px]">
              you own everything
            </p>
          </header>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <CustodyTierSection />
            <TierCalloutSection />
          </div>
        </section>
        <FooterActionSection />
      </div>
    </section>
  );
};
