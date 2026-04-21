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

const onboardingSteps = [
  {
    title: "Open the App",
    description:
      "Launch Qdo on any device. No app store required — works on web, iOS, and Android.",
    alignment: "items-start text-left",
  },
  {
    title: "Scan Your Fingerprint",
    description:
      "Authenticate with Face ID, fingerprint, or device PIN. Your passkey creates a secure wallet instantly.",
    alignment: "items-start text-left",
  },
  {
    title: "Fund Your Wallet",
    description:
      "Buy crypto with your card or bank transfer. Funds arrive directly in your self-custody wallet.",
    alignment: "items-center text-center",
  },
  {
    title: "Swap, Trade & Earn",
    description:
      "Swap tokens, trade prediction markets, and earn yield — all from a single, beautiful interface.",
    alignment: "items-start text-left",
  },
];

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

const onboardingWaypoints = [
  { left: "8.5%", top: "72%", textAlign: "left" as const, textOffset: { left: "10%", top: "55%" }, width: "200px" },
  { left: "33%", top: "55%", textAlign: "left" as const, textOffset: { left: "34.5%", top: "60%" }, width: "210px" },
  { left: "58%", top: "20%", textAlign: "left" as const, textOffset: { left: "59.5%", top: "27%" }, width: "200px" },
  { left: "85%", top: "55%", textAlign: "left" as const, textOffset: { left: "75%", top: "65%" }, width: "200px" },
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
        <section className="relative mx-auto w-full max-w-none overflow-hidden bg-white px-40 pb-24 pt-20">
          <header className="inline-flex flex-col items-start justify-center gap-4">
            <div className="inline-flex flex-col items-start">
              <h2 className="mt-[-1.00px] [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#163d6c]">
                From zero to crypto
              </h2>
              <p className="-mt-2 [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[normal] tracking-[0] text-[#659acd]">
                in under 60 seconds
              </p>
            </div>
            <p className="w-[412px] [font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal leading-[normal] tracking-[0] text-[#000000cc]">
              No downloads, no recovery phrases, no crypto knowledge required.
              Just your fingerprint and you&#39;re in.
            </p>
          </header>

          <div className="relative mt-12 h-[560px] w-full">
            <img
              className="pointer-events-none absolute left-0 top-0 h-full w-full object-contain"
              alt="Onboarding road"
              src="/figmaAssets/vector-109.svg"
            />
            <img
              className="pointer-events-none absolute left-0 top-0 h-full w-full object-contain"
              alt=""
              src="/figmaAssets/vector-110.svg"
            />

            {onboardingWaypoints.map((point, index) => (
              <div
                key={`waypoint-${index}`}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: point.left, top: point.top }}
              >
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-[6px] border-white bg-white shadow-md">
                  <div className="flex h-full w-full items-center justify-center rounded-full border-[5px] border-[#659acd] bg-white">
                    <div className="h-3 w-3 rounded-full bg-[#1a3d6c]" />
                  </div>
                </div>
              </div>
            ))}

            {onboardingSteps.map((step, index) => {
              const point = onboardingWaypoints[index];
              return (
                <div
                  key={step.title}
                  className="absolute flex flex-col gap-1.5"
                  style={{
                    left: point.textOffset.left,
                    top: point.textOffset.top,
                    width: point.width,
                  }}
                >
                  <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
                    {step.title}
                  </h3>
                  <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[1.5] tracking-[0] text-[#0000008a]">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid grid-cols-[298px_1fr] items-start gap-[116px]">
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
