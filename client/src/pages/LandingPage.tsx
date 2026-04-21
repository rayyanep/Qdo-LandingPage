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

const connectorRings = [
  "absolute left-[145px] top-[2593px] h-[86px] w-[86px] rounded-[70px] border-8 border-solid border-white",
  "absolute left-[516px] top-[2443px] h-[86px] w-[86px] rounded-[70px] border-8 border-solid border-white",
  "absolute left-[913px] top-[2154px] h-[86px] w-[86px] rounded-[70px] border-8 border-solid border-white",
  "absolute left-[1214px] top-[2538px] h-[86px] w-[86px] rounded-[70px] border-8 border-solid border-white",
];

const connectorMiddleRings = [
  "absolute left-[161px] top-[2609px] h-[54px] w-[54px] rounded-[32px] border-8 border-solid border-[#659acd]",
  "absolute left-[532px] top-[2459px] h-[54px] w-[54px] rounded-[32px] border-8 border-solid border-[#659acd]",
  "absolute left-[929px] top-[2170px] h-[54px] w-[54px] rounded-[32px] border-8 border-solid border-[#659acd]",
  "absolute left-[1230px] top-[2554px] h-[54px] w-[54px] rounded-[32px] border-8 border-solid border-[#659acd]",
];

const connectorInnerRings = [
  "absolute left-[172px] top-[2620px] h-8 w-8 rounded-[32px] border-8 border-solid border-[#1a3d6c]",
  "absolute left-[543px] top-[2470px] h-8 w-8 rounded-[32px] border-8 border-solid border-[#1a3d6c]",
  "absolute left-[940px] top-[2181px] h-8 w-8 rounded-[32px] border-8 border-solid border-[#1a3d6c]",
  "absolute left-[1241px] top-[2565px] h-8 w-8 rounded-[32px] border-8 border-solid border-[#1a3d6c]",
];

const vectorPaths = [
  {
    className: "absolute left-[-160px] top-[2194px] h-[654px] w-[1605px]",
    src: "/figmaAssets/vector-109.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[-160px] top-[2194px] h-[654px] w-[1605px]",
    src: "/figmaAssets/vector-110.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[7.08%] top-[42.45%] h-[7.38%] w-[35.83%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[14.17%] top-[43.91%] h-[4.45%] w-[21.60%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[21.31%] top-[45.38%] h-0 w-[7.36%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[6.74%] top-0 h-[7.66%] w-[38.68%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[14.37%] top-[3.45%] h-[4.62%] w-[23.33%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
  },
  {
    className: "absolute left-[22.08%] top-[4.98%] h-0 w-[7.99%]",
    src: "/figmaAssets/vector.svg",
    alt: "Vector",
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
            {vectorPaths.slice(5).map((vector, index) => (
              <img
                key={`hero-vector-${index}`}
                className={vector.className}
                alt={vector.alt}
                src={vector.src}
              />
            ))}

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
          {vectorPaths.slice(0, 5).map((vector, index) => (
            <img
              key={`onboarding-vector-${index}`}
              className={vector.className}
              alt={vector.alt}
              src={vector.src}
            />
          ))}

          {connectorRings.map((className, index) => (
            <div key={`connector-ring-${index}`} className={className} />
          ))}
          {connectorMiddleRings.map((className, index) => (
            <div key={`connector-middle-${index}`} className={className} />
          ))}
          {connectorInnerRings.map((className, index) => (
            <div key={`connector-inner-${index}`} className={className} />
          ))}

          <div className="absolute left-[161px] top-[2486px] flex w-[212px] flex-col items-start gap-1.5">
            <h3 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
              {onboardingSteps[0].title}
            </h3>
            <p className="self-stretch [font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-[#0000008a]">
              {onboardingSteps[0].description}
            </p>
          </div>
          <div className="absolute left-[610px] top-[2458px] inline-flex flex-col items-start gap-1.5">
            <h3 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
              {onboardingSteps[1].title}
            </h3>
            <p className="self-stretch [font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-[#0000008a]">
              {onboardingSteps[1].description}
            </p>
          </div>
          <div className="absolute left-[860px] top-[2248px] flex w-[193px] flex-col items-center gap-1.5">
            <h3 className="mt-[-1.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
              {onboardingSteps[2].title}
            </h3>
            <p className="self-stretch text-center [font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-[#0000008a]">
              {onboardingSteps[2].description}
            </p>
          </div>
          <div className="absolute left-[1013px] top-[2554px] flex w-[193px] flex-col items-start gap-1.5">
            <h3 className="mt-[-1.00px] mr-[-5.00px] w-fit [font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-[normal] tracking-[0] text-[#1a3d6c]">
              {onboardingSteps[3].title}
            </h3>
            <p className="self-stretch [font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-[normal] tracking-[0] text-[#0000008a]">
              {onboardingSteps[3].description}
            </p>
          </div>
          <div className="mt-[360px] grid grid-cols-[298px_1fr] items-start gap-[116px]">
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
