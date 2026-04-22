import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import iPhoneSwapImage from "@assets/iPhone_13_Pro_1776824127185.png";
import multiChainImage from "@assets/Layer_1_1776824309628.png";
import earnYieldArrow from "@assets/Vector_112_1776824503736.png";
import iconUSDT from "@assets/image_4_1776824613430.png";
import iconUSDC from "@assets/image_3_(1)_1776824613430.png";
import iconETH from "@assets/ETH_(Ethereum)_1776824613430.png";
import iconBNB from "@assets/image_1_(1)_1776824613430.png";
import iconPOL from "@assets/image_2_(1)_1776824613430.png";
import iconWBTC from "@assets/Frame_91_1776824613431.png";
import iconWETH from "@assets/image_6_1776824613431.png";
import iconDAI from "@assets/image_7_1776824613431.png";

type FeatureKey =
  | "Passkey Onboarding"
  | "Instant Token Swaps"
  | "Buy & Sell Crypto"
  | "Multi-Chain, One Wallet"
  | "Gasless Transactions"
  | "Earn Yield";

const featureTabs: FeatureKey[] = [
  "Passkey Onboarding",
  "Instant Token Swaps",
  "Buy & Sell Crypto",
  "Multi-Chain, One Wallet",
  "Gasless Transactions",
  "Earn Yield",
];

const featureContent: Record<
  FeatureKey,
  {
    title: string;
    description: string;
    illustration: string;
    illustrationAlt: string;
    rightImage: string;
    rightAlt: string;
  }
> = {
  "Passkey Onboarding": {
    title: "Passkey Onboarding",
    description:
      "Create your wallet with Face ID or fingerprint — no seed phrases, no passwords. Powered by ERC-4337 account abstraction and EIP-7702, your wallet lives securely on your device with smart contract recovery built in.",
    illustration: "/figmaAssets/group-2.png",
    illustrationAlt: "Passkey onboarding illustration",
    rightImage: "",
    rightAlt: "",
  },
  "Instant Token Swaps": {
    title: "Instant Token Swaps",
    description:
      "Swap any supported token with best-price routing through DEX aggregators. Cross-chain swaps across Ethereum, BSC, and Polygon — all in a single tap.",
    illustration: "",
    illustrationAlt: "Token swap illustration",
    rightImage: iPhoneSwapImage,
    rightAlt: "Swap interface preview on iPhone",
  },
  "Buy & Sell Crypto": {
    title: "Buy & Sell Crypto",
    description:
      "Top up with your card or bank in minutes. Funds land directly in your self-custody wallet with full transparency and competitive rates — no custodian holding your assets.",
    illustration: "/figmaAssets/group-1-1.png",
    illustrationAlt: "Buy and sell illustration",
    rightImage: "/figmaAssets/image-4.png",
    rightAlt: "Buy and sell interface preview",
  },
  "Multi-Chain, One Wallet": {
    title: "Multi-Chain, One Wallet",
    description:
      "Ethereum, BSC, and Polygon — unified under a single interface. Smart chain defaults route your transactions to the most cost-effective network automatically.",
    illustration: "",
    illustrationAlt: "Multi-chain illustration",
    rightImage: multiChainImage,
    rightAlt: "Connected chains illustration",
  },
  "Gasless Transactions": {
    title: "Gasless Transactions",
    description:
      "No more fumbling with gas tokens. Qdo handles gas fees behind the scenes via account abstraction — pay fees in any token or let us sponsor them entirely.",
    illustration: "",
    illustrationAlt: "Gasless transactions illustration",
    rightImage: "",
    rightAlt: "Supported gas payment tokens",
  },
  "Earn Yield": {
    title: "Earn Yield",
    description:
      "Lock collateral in longer-dated prediction positions and earn yield while you wait. Your capital works for you even when markets are quiet.",
    illustration: "",
    illustrationAlt: "Earn yield illustration",
    rightImage: earnYieldArrow,
    rightAlt: "Yield growth chart",
  },
};

const onboardingSteps = [
  { number: "1", label: "Tap to start" },
  { number: "2", label: "Biometric scan" },
  { number: "3", label: "Wallet ready" },
];

export const PasskeySecuritySection = (): JSX.Element => {
  const [activeFeature, setActiveFeature] = useState<FeatureKey>(
    "Passkey Onboarding",
  );
  const content = featureContent[activeFeature];

  return (
    <section className="w-full bg-[#061237] px-6 py-20 md:px-10 lg:px-16 xl:px-24 xl:py-[120px] 2xl:py-[160px]">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-6 2xl:max-w-[1600px] 2xl:gap-10">
        <header className="flex w-full flex-col items-start gap-[54px]">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="flex flex-col items-start">
              <h2 className="mt-[-1.00px] [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-white md:text-[40px] 2xl:text-[52px]">
                Everything you need.
              </h2>
              <p className="-mt-2 [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-[#659acd] md:text-[40px] 2xl:text-[52px]">
                Nothing you don&#39;t.
              </p>
            </div>
            <p className="max-w-[419px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#ffffffcc] md:text-lg 2xl:max-w-[520px] 2xl:text-xl">
              A complete crypto wallet experience designed for simplicity — no
              seed phrases, no confusing gas settings, no learning curve.
            </p>
          </div>
          <nav
            aria-label="Wallet features"
            className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 md:gap-x-4 lg:flex-nowrap lg:justify-between"
          >
            {featureTabs.map((feature) => {
              const isActive = feature === activeFeature;

              return (
                <Button
                  key={feature}
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveFeature(feature)}
                  className={`h-auto min-w-0 shrink whitespace-nowrap rounded-[50px] px-5 py-3 [font-family:'Poppins',Helvetica] text-center text-[14px] font-semibold leading-[22px] tracking-[0] ${
                    isActive
                      ? "bg-white text-[#1B2B4B] hover:bg-white/95"
                      : "bg-[#659acd]/80 text-white hover:bg-[#659acd]"
                  }`}
                >
                  {feature}
                </Button>
              );
            })}
          </nav>
        </header>
        <Card className="w-full overflow-hidden rounded-2xl border-0 bg-[#ffffff14] shadow-none lg:h-[400px]">
          <CardContent className="h-full p-0">
            <div className="grid h-full min-h-[350px] grid-cols-1 gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[45%_55%] lg:items-stretch lg:gap-0 lg:p-10">
              <div className="flex h-full flex-col items-start lg:justify-start">
                {activeFeature === "Buy & Sell Crypto" || activeFeature === "Multi-Chain, One Wallet" || activeFeature === "Gasless Transactions" || activeFeature === "Earn Yield" ? null : activeFeature === "Instant Token Swaps" ? (
                  <div
                    className="mb-6 flex h-[80px] w-[80px] flex-col items-center justify-center gap-2 text-[#f5a623]"
                    aria-label={content.illustrationAlt}
                  >
                    <svg
                      width="96"
                      height="28"
                      viewBox="0 0 96 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 14h78m0 0L70 2m14 12L70 26"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <svg
                      width="96"
                      height="28"
                      viewBox="0 0 96 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M90 14H12m0 0l14-12M12 14l14 12"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    className="mb-6 h-[80px] w-[80px] object-contain"
                    alt={content.illustrationAlt}
                    src={content.illustration}
                  />
                )}
                <div className="flex flex-col items-start">
                <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-[22px] font-bold leading-[normal] tracking-[0] text-white">
                  {content.title}
                </h3>
                <p className="mt-4 max-w-[530px] [font-family:'Poppins_Latin-Regular',Helvetica] text-[15px] font-normal leading-[1.7] tracking-[0] text-[#ffffffcc]">
                  {content.description}
                </p>
                {activeFeature === "Buy & Sell Crypto" && (
                  <div className="mt-8 inline-flex h-auto items-center justify-center rounded-3xl bg-[#659acd] px-5 py-3 [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[22px] tracking-[0] text-white">
                    On/Off Ramp
                  </div>
                )}
                {activeFeature === "Multi-Chain, One Wallet" && (
                  <div className="mt-8 inline-flex h-auto items-center justify-center rounded-3xl bg-[#a87a3d] px-5 py-3 [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[22px] tracking-[0] text-white">
                    3 Chains
                  </div>
                )}
                {activeFeature === "Gasless Transactions" && (
                  <div className="mt-8 inline-flex h-auto items-center justify-center rounded-3xl bg-[#a87a3d] px-5 py-3 [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[22px] tracking-[0] text-white">
                    ERC-4337
                  </div>
                )}
                {activeFeature === "Earn Yield" && (
                  <div className="mt-8 inline-flex h-auto items-center justify-center rounded-3xl bg-[#a87a3d] px-5 py-3 [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[22px] tracking-[0] text-white">
                    Phase 2
                  </div>
                )}
                </div>
              </div>
              <div
                className={`flex items-center justify-center lg:justify-start ${
                  activeFeature === "Multi-Chain, One Wallet"
                    ? "-mx-6 -mb-8 -mt-8 self-stretch md:-mx-10 md:-mb-10 md:-mt-10 lg:-my-[60px] lg:-mr-16 lg:ml-0 lg:justify-end"
                    : activeFeature === "Instant Token Swaps"
                      ? "lg:pl-[15%] 2xl:-mb-10 2xl:self-stretch 2xl:pt-[15px]"
                      : activeFeature === "Buy & Sell Crypto"
                        ? "h-full lg:items-center lg:justify-center lg:pl-0"
                        : "lg:pl-[15%]"
                }`}
              >
                {activeFeature === "Buy & Sell Crypto" ? (
                  <div className="relative flex aspect-square w-full max-w-[720px] items-center justify-center lg:-translate-y-[140px]">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[36px] border-solid border-white/5" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[510px] w-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-solid border-white/10" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[27px] border-solid border-white/[0.07]" />
                    <div className="relative z-10 flex h-[210px] w-[210px] items-center justify-center rounded-full bg-[#f5a623]">
                      <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-[108px] font-light leading-none tracking-[0] text-white">
                        $
                      </span>
                    </div>
                  </div>
                ) : activeFeature === "Passkey Onboarding" ? (
                  <div className="relative flex h-full w-full max-w-[360px] items-stretch lg:min-h-[280px]">
                    <div className="relative w-[40px] shrink-0">
                      <div className="absolute left-1/2 top-[20px] h-[calc(100%-40px)] w-[2px] -translate-x-1/2 bg-[#659acd]" />
                      <ul className="relative z-10 flex h-full flex-col items-center justify-evenly">
                        {onboardingSteps.map((step) => (
                          <li
                            key={step.number}
                            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-solid border-white bg-[#061237]"
                          >
                            <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-none tracking-[0] text-white">
                              {step.number}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <ul className="ml-5 flex h-full flex-1 flex-col justify-evenly">
                      {onboardingSteps.map((step) => (
                        <li
                          key={step.label}
                          className="flex h-[40px] items-center"
                        >
                          <p className="[font-family:'Poppins_Latin-Medium',Helvetica] text-[18px] font-medium leading-none tracking-[0] text-white">
                            {step.label}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : activeFeature === "Multi-Chain, One Wallet" ? (
                  <img
                    src={content.rightImage}
                    alt={content.rightAlt}
                    className="h-full max-h-none w-full self-stretch object-cover object-left lg:rounded-r-3xl"
                  />
                ) : activeFeature === "Earn Yield" ? (
                  <div className="relative flex aspect-square w-full max-w-[720px] items-center justify-center lg:-translate-y-[140px]">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[36px] border-solid border-white/5" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[510px] w-[510px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[30px] border-solid border-white/10" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[27px] border-solid border-white/[0.07]" />
                    <span className="pointer-events-none absolute left-1/2 top-[6%] -translate-x-1/2 [font-family:'Poppins_Latin-Regular',Helvetica] text-3xl font-light leading-none tracking-[0] text-[#ffffffaa]">
                      −
                    </span>
                    <span className="pointer-events-none absolute right-[18%] top-[14%] [font-family:'Poppins_Latin-Regular',Helvetica] text-2xl font-light leading-none tracking-[0] text-[#ffffffaa]">
                      $
                    </span>
                    <span className="pointer-events-none absolute left-[18%] top-[32%] flex items-center gap-1 [font-family:'Poppins_Latin-Medium',Helvetica] text-base font-medium leading-none tracking-[0] text-[#ffffffcc]">
                      <span aria-hidden="true">↑</span> up
                    </span>
                    <span className="pointer-events-none absolute right-[10%] bottom-[32%] flex items-center gap-1 [font-family:'Poppins_Latin-Medium',Helvetica] text-base font-medium leading-none tracking-[0] text-[#ffffffcc]">
                      <span aria-hidden="true">↓</span> down
                    </span>
                    <span className="pointer-events-none absolute bottom-[14%] left-1/2 -translate-x-1/2 [font-family:'Poppins_Latin-Regular',Helvetica] text-2xl font-light leading-none tracking-[0] text-[#ffffffaa]">
                      +
                    </span>
                    <img
                      src={content.rightImage}
                      alt={content.rightAlt}
                      className="relative z-10 w-[58%] max-w-[280px] object-contain"
                    />
                  </div>
                ) : activeFeature === "Gasless Transactions" ? (
                  <div
                    className="relative w-full max-w-[460px] overflow-hidden lg:max-w-[520px]"
                    style={{
                      maskImage:
                        "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                      WebkitMaskImage:
                        "linear-gradient(180deg, transparent 0%, #000 12%, #000 88%, transparent 100%)",
                    }}
                  >
                    <ul className="flex max-h-[420px] flex-col overflow-hidden py-6">
                      {[
                        { sym: "USDT", name: "Tether — Stablecoin", icon: iconUSDT },
                        { sym: "USDC", name: "Circle — Stablecoin", icon: iconUSDC },
                        { sym: "ETH", name: "Ethereum", icon: iconETH },
                        { sym: "BNB", name: "BNB Smart Chain", icon: iconBNB },
                        { sym: "POL", name: "Polygon", icon: iconPOL },
                        { sym: "WBTC", name: "Wrapped Bitcoin", icon: iconWBTC },
                        { sym: "WETH", name: "Wrapped Ether", icon: iconWETH },
                        { sym: "DAI", name: "Dai Stablecoin", icon: iconDAI },
                      ].map((token, idx, arr) => (
                        <li
                          key={token.sym}
                          className={`flex items-center gap-4 px-2 py-4 ${
                            idx < arr.length - 1
                              ? "border-b border-white/10"
                              : ""
                          }`}
                        >
                          <img
                            src={token.icon}
                            alt={token.sym}
                            className="h-10 w-10 shrink-0 rounded-full object-contain"
                          />
                          <div className="flex flex-col">
                            <span className="[font-family:'Poppins_Latin-Bold',Helvetica] text-base font-bold leading-tight tracking-[0] text-white">
                              {token.sym}
                            </span>
                            <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal leading-tight tracking-[0] text-[#ffffffaa]">
                              {token.name}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <img
                    src={content.rightImage}
                    alt={content.rightAlt}
                    className="max-h-[320px] w-auto max-w-full object-contain object-bottom 2xl:max-h-none 2xl:h-full"
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
