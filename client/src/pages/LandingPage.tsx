import { Card, CardContent } from "@/components/ui/card";
import { CustodyTierSection } from "./sections/CustodyTierSection";
import { FooterActionSection } from "./sections/FooterActionSection";
import { HeroMessagingSection } from "./sections/HeroMessagingSection";
import { HeroProductDisplaySection } from "./sections/HeroProductDisplaySection";
import { MarketInsightsSection } from "./sections/MarketInsightsSection";
import { PasskeySecuritySection } from "./sections/PasskeySecuritySection";
import { ProductValueSection } from "./sections/ProductValueSection";
import { SelfCustodyFeatureCardsSection } from "./sections/SelfCustodyFeatureCardsSection";
import { SelfCustodyIntroSection } from "./sections/SelfCustodyIntroSection";
import { TokenRolloutSection } from "./sections/TokenRolloutSection";
import heroPhoneImage from "@assets/iPhone_151_1777102084280.png";

const statCards = [
  {
    value: "0",
    label: "Seed\nPhrases",
    desktopPosition: "xl:absolute xl:left-[74px] xl:top-[174px]",
    wrapperClass:
      "aspect-square rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[37px] font-semibold text-[#163d6c]",
    labelClass:
      "whitespace-pre-line [font-family:'Poppins_Latin-Regular',Helvetica] text-xs sm:text-sm font-normal text-[#00000099]",
  },
  {
    value: "3",
    label: "Chains Supported",
    desktopPosition: "xl:absolute xl:left-[587px] xl:top-[255px]",
    wrapperClass:
      "aspect-square rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[37px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-xs sm:text-sm font-normal text-[#00000099]",
  },
  {
    value: "AI",
    label: "Powered\nWallet",
    desktopPosition: "xl:absolute xl:left-[170px] xl:top-[517px]",
    wrapperClass: "aspect-square rounded-3xl bg-[#659acd]",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[32px] sm:text-[37px] font-semibold text-white",
    labelClass:
      "whitespace-pre-line [font-family:'Poppins_Latin-Regular',Helvetica] text-xs sm:text-sm font-normal text-white",
  },
  {
    value: "Gasless",
    label: "Transactions",
    desktopPosition: "xl:absolute xl:right-[40px] xl:bottom-[60px]",
    wrapperClass:
      "aspect-square rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[22px] sm:text-[24px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-xs sm:text-sm font-normal text-[#00000099]",
  },
];

export const LandingPage = (): JSX.Element => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-white">
        <HeroProductDisplaySection />
        <div className="relative w-full">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-4 py-10 sm:px-6 xl:grid-cols-[minmax(0,720px)_minmax(0,1fr)] xl:items-center xl:gap-10 xl:px-10 xl:py-16">
            <div className="order-2 xl:order-none">
              <div className="relative mx-auto w-full max-w-[497px] xl:max-w-none xl:h-[660px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[110%] max-w-[640px] rounded-full border-[30px] border-solid border-[#f5f6fa] bg-transparent xl:w-[640px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[95%] max-w-[555px] rounded-full border-[20px] border-solid border-white/60 bg-transparent xl:w-[555px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[80%] max-w-[470px] rounded-full border-[50px] border-solid border-[#eef0f5] bg-transparent xl:w-[470px]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square w-[45%] max-w-[260px] rounded-full border-[50px] border-solid border-white/70 bg-transparent xl:w-[260px]"
                />
                <img
                  className="hero-phone-anim relative mx-auto block h-auto w-full max-w-[746px] xl:absolute xl:left-1/2 xl:top-1/2 xl:h-[900px] xl:w-[746px] xl:-translate-x-1/2 xl:-translate-y-1/2 object-contain"
                  alt="Qdo wallet on iPhone"
                  src={heroPhoneImage}
                />

                <Card
                  className={`hero-card-float-1 hidden xl:flex absolute top-[30px] xl:right-[calc(50%+258px)] xl:w-[132px] xl:h-[132px] ${statCards[0].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex h-full w-full min-w-[120px] flex-col items-center justify-center gap-2 px-3 py-2">
                    <div
                      className={`relative self-stretch text-center leading-none tracking-[0] ${statCards[0].valueClass}`}
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
                  className={`hero-card-float-2 hidden xl:flex absolute right-[30px] top-[140px] xl:w-[132px] xl:h-[132px] ${statCards[1].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex h-full w-full min-w-[120px] flex-col items-center justify-center gap-2 px-3 py-2">
                    <div
                      className={`relative self-stretch text-center leading-none tracking-[0] ${statCards[1].valueClass}`}
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
                  className={`hero-card-float-3 hidden xl:flex absolute bottom-[10px] left-[70px] xl:w-[132px] xl:h-[132px] ${statCards[2].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex h-full w-full min-w-[120px] flex-col items-center justify-center gap-2 px-3 py-2">
                    <div
                      className={`relative self-stretch text-center leading-none tracking-[0] ${statCards[2].valueClass}`}
                    >
                      <span className="hero-ai-shimmer [font-family:'Poppins_Latin-SemiBold',Helvetica] text-[40px] font-semibold tracking-[0]">
                        AI
                      </span>
                    </div>
                    <div
                      className={`relative text-center leading-tight tracking-[0] ${statCards[2].labelClass}`}
                    >
                      {statCards[2].label}
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className={`hero-card-float-4 hidden xl:flex absolute bottom-[60px] right-[40px] xl:w-[132px] xl:h-[132px] ${statCards[3].wrapperClass} shadow-none`}
                >
                  <CardContent className="flex h-full w-full min-w-[120px] flex-col items-center justify-center gap-2 px-3 py-2">
                    <div
                      className={`relative self-stretch text-center leading-none tracking-[0] ${statCards[3].valueClass}`}
                    >
                      {statCards[3].value}
                    </div>
                    <div
                      className={`relative text-center leading-tight tracking-[0] ${statCards[3].labelClass}`}
                    >
                      {statCards[3].label}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 xl:hidden">
                {statCards.map((card, idx) => {
                  const floatClass =
                    idx === 0
                      ? "hero-card-float-1"
                      : idx === 1
                      ? "hero-card-float-2"
                      : idx === 2
                      ? "hero-card-float-3"
                      : "hero-card-float-4";
                  return (
                    <Card
                      key={card.label}
                      className={`${floatClass} ${card.wrapperClass} shadow-none`}
                    >
                      <CardContent className="flex h-full min-h-[96px] flex-col items-center justify-center gap-1 px-2 py-3 sm:min-h-[120px] sm:px-4 sm:py-4">
                        <div
                          className={`relative self-stretch text-center leading-none tracking-[0] ${card.valueClass}`}
                        >
                          {card.value === "AI" ? (
                            <span className="hero-ai-shimmer">{card.value}</span>
                          ) : (
                            card.value
                          )}
                        </div>
                        <div
                          className={`relative text-[10px] sm:text-xs text-center leading-tight tracking-[0] ${card.labelClass}`}
                        >
                          {card.label}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <div className="order-1 xl:order-none">
              <HeroMessagingSection />
            </div>
          </div>
        </div>
        <ProductValueSection />
        <div id="features" className="scroll-mt-24">
          <PasskeySecuritySection />
        </div>
        <section className="onboarding-section">
          <div className="container">
            <div className="headline">
              <span className="headline-badge" aria-hidden="true">
                <span className="headline-badge-dot" />
                60-second onboarding
              </span>
              <h1>
                From zero to crypto
                <span className="light">in under 60 seconds</span>
              </h1>
              <p>
                No downloads, no recovery phrases, no crypto knowledge required.
                Just your passkey and you&#39;re in.
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
                <h3>Use your passkey</h3>
                <p>Authenticate with Face ID, fingerprint, or device PIN. Your passkey creates a secure wallet instantly.</p>
              </div>

              <div className="marker m3" />
              <div className="step step-3">
                <h3>Fund Your Wallet</h3>
                <p>Buy crypto with your card, bank transfer or receive directly onchain. Only you have access to the assets and control the funds.</p>
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

        <section
          id="ai-pilot"
          className="relative mx-auto w-full max-w-none scroll-mt-24 overflow-hidden bg-white px-4 pb-16 pt-4 sm:px-6 sm:pt-12 md:px-10 lg:px-16 xl:px-40 xl:pb-24 xl:pt-20"
        >
          <MarketInsightsSection />
        </section>
        <section
          id="tokens"
          className="mx-auto w-full max-w-none scroll-mt-24 px-4 pb-14 pt-8 sm:px-6 md:px-8"
        >
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
            <h2 className="w-fit [font-family:'Poppins_Latin-SemiBold',Helvetica] text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#163d6c] sm:text-[42px] md:text-[52px] xl:text-[58px]">
              Self-custody means
            </h2>
            <p className="mt-[10px] w-fit [font-family:'Poppins_Latin-SemiBold',Helvetica] text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#659acd] sm:text-[42px] md:text-[52px] xl:text-[58px]">
              you own everything
            </p>
          </header>
          <CustodyTierSection />
        </section>
        <FooterActionSection />
      </div>
    </section>
  );
};
