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
    wrapperClass:
      "absolute left-[74px] top-[174px] rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[40px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal text-[#00000099]",
    labelWidth: "w-[97px]",
  },
  {
    value: "3",
    label: "Chains Supported",
    wrapperClass:
      "absolute left-[587px] top-[255px] rounded-3xl border border-solid border-[#0000001f] bg-white",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[40px] font-semibold text-[#163d6c]",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal text-[#00000099]",
    labelWidth: "w-[97px]",
  },
  {
    value: "5 min",
    label: "Prediction Markets",
    wrapperClass: "absolute left-[170px] top-[517px] rounded-3xl bg-[#659acd]",
    valueClass:
      "[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[40px] font-semibold text-white",
    labelClass:
      "[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal text-white",
    labelWidth: "w-[92px]",
  },
];

export const LandingPage = (): JSX.Element => {
  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-screen w-full min-w-0 flex-col bg-white">
        <div className="relative w-full">
          <div className="relative mx-auto h-[760px] w-full max-w-none overflow-hidden">
            <HeroProductDisplaySection />
            <HeroMessagingSection />

            {statCards.map((card) => (
              <Card
                key={card.label}
                className={`${card.wrapperClass} shadow-none`}
              >
                <CardContent className="flex min-w-[150px] flex-col items-center gap-1 px-8 pb-6 pt-5">
                  <div
                    className={`relative self-stretch text-center tracking-[0] leading-[normal] ${card.valueClass}`}
                  >
                    {card.value === "5 min" ? (
                      <>
                        <span className="[font-family:'Poppins_Latin-SemiBold',Helvetica] text-[44px] font-semibold tracking-[0] text-white">
                          5{" "}
                        </span>
                        <span className="text-2xl">min</span>
                      </>
                    ) : (
                      card.value
                    )}
                  </div>
                  <div
                    className={`relative text-center tracking-[0] leading-tight ${card.labelClass}`}
                  >
                    {card.label}
                  </div>
                </CardContent>
              </Card>
            ))}

            <img
              className="absolute left-[219px] top-[146px] h-[534px] w-[442px]"
              alt="Iphone"
              src="/figmaAssets/iphone-15.png"
            />
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

        <section className="relative mx-auto w-full max-w-none overflow-hidden bg-white px-40 pb-24 pt-20">
          <div className="grid grid-cols-[298px_1fr] items-start gap-[116px]">
            <LivePriceSection />
            <MarketInsightsSection />
          </div>
        </section>
        <section className="mx-auto w-full max-w-none px-8 pb-14 pt-8">
          <TokenRolloutSection />
        </section>
        <section className="mx-auto flex w-full max-w-none flex-col gap-10 px-8 pb-16 pt-2">
          <div className="w-fit">
            <SelfCustodyIntroSection />
          </div>
          <SelfCustodyFeatureCardsSection />
        </section>
        <section className="mx-auto w-full max-w-none px-16 pb-16 pt-8">
          <header className="mb-10 inline-flex flex-col items-start">
            <h2 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#163d6c]">
              Self-custody means
            </h2>
            <p className="-mt-2 w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#659acd]">
              you own everything
            </p>
          </header>
          <div className="grid grid-cols-[1fr_1fr] items-start gap-12">
            <CustodyTierSection />
            <TierCalloutSection />
          </div>
        </section>
        <FooterActionSection />
      </div>
    </section>
  );
};
