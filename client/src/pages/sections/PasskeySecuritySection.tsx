import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import iPhoneSwapImage from "@assets/iPhone_13_Pro_1776824127185.png";
import multiChainImage from "@assets/Layer_1_1776824309628.png";

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
      "Put idle stablecoins to work. Earn competitive on-chain yield through vetted protocols with one tap — withdraw anytime, no lockups, full transparency.",
    illustration: "/figmaAssets/group-1.png",
    illustrationAlt: "Earn yield illustration",
    rightImage: "/figmaAssets/image-7.png",
    rightAlt: "Earn yield preview",
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
    <section className="w-full bg-[#061237] px-6 py-20 md:px-10 lg:px-16 xl:px-40 xl:py-[120px]">
      <div className="mx-auto flex w-full max-w-none flex-col items-start gap-6">
        <header className="flex w-full flex-col items-start gap-[54px]">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <div className="flex flex-col items-start">
              <h2 className="mt-[-1.00px] [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-white md:text-[40px]">
                Everything you need.
              </h2>
              <p className="-mt-2 [font-family:'Poppins_Latin-Bold',Helvetica] text-[32px] font-bold leading-[normal] tracking-[0] text-[#659acd] md:text-[40px]">
                Nothing you don&#39;t.
              </p>
            </div>
            <p className="max-w-[419px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#ffffffcc] md:text-lg">
              A complete crypto wallet experience designed for simplicity — no
              seed phrases, no confusing gas settings, no learning curve.
            </p>
          </div>
          <nav
            aria-label="Wallet features"
            className="flex w-full flex-wrap items-center gap-[17px]"
          >
            {featureTabs.map((feature) => {
              const isActive = feature === activeFeature;

              return (
                <Button
                  key={feature}
                  type="button"
                  variant="ghost"
                  onClick={() => setActiveFeature(feature)}
                  className={`h-auto rounded-3xl px-4 py-3 [font-family:'Poppins',Helvetica] text-center text-sm font-semibold leading-[22px] tracking-[0] ${
                    isActive
                      ? "bg-white text-[#000000cc] hover:bg-white/95"
                      : "bg-[#659acd] text-white hover:bg-[#659acd]/90"
                  }`}
                >
                  {feature}
                </Button>
              );
            })}
          </nav>
        </header>
        <Card className="w-full overflow-hidden rounded-3xl border-0 bg-[#ffffff14] shadow-none">
          <CardContent className="p-0">
            <div className="grid min-h-[400px] grid-cols-1 gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,530px)_minmax(0,1fr)] lg:items-center lg:gap-12 lg:px-16 lg:py-[60px]">
              <div className="flex flex-col items-start">
                {activeFeature === "Buy & Sell Crypto" || activeFeature === "Multi-Chain, One Wallet" || activeFeature === "Gasless Transactions" ? null : activeFeature === "Instant Token Swaps" ? (
                  <div
                    className="mb-6 flex h-[100px] w-[116px] flex-col items-center justify-center gap-2 text-[#f5a623]"
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
                    className="mb-6 h-[100px] w-[116px] object-contain"
                    alt={content.illustrationAlt}
                    src={content.illustration}
                  />
                )}
                <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-2xl font-bold leading-[normal] tracking-[0] text-white">
                  {content.title}
                </h3>
                <p className="mt-4 max-w-[530px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#ffffffcc] md:text-lg">
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
              </div>
              <div
                className={`flex items-center justify-center lg:justify-start ${
                  activeFeature === "Multi-Chain, One Wallet"
                    ? "-mx-6 -mb-8 -mt-8 self-stretch md:-mx-10 md:-mb-10 md:-mt-10 lg:-my-[60px] lg:-mr-16 lg:ml-0 lg:justify-end"
                    : ""
                }`}
              >
                {activeFeature === "Buy & Sell Crypto" ? (
                  <div className="relative flex aspect-square w-full max-w-[480px] items-center justify-center">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[24px] border-solid border-white/5" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[20px] border-solid border-white/10" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[18px] border-solid border-white/[0.07]" />
                    <div className="relative z-10 flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[#f5a623]">
                      <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-[72px] font-light leading-none tracking-[0] text-white">
                        $
                      </span>
                    </div>
                  </div>
                ) : activeFeature === "Passkey Onboarding" ? (
                  <div className="grid grid-cols-[50px_auto] items-start gap-x-5 gap-y-10">
                    <div className="relative row-span-3 flex min-h-[280px] w-[50px] items-start justify-center">
                      <div className="absolute left-1/2 top-0 h-[280px] w-[50px] -translate-x-1/2 rounded-[32px] border-8 border-solid border-[#659acd]" />
                      {onboardingSteps.map((step, index) => {
                        const positions = [
                          "top-0",
                          "top-[115px]",
                          "top-[230px]",
                        ];

                        return (
                          <div
                            key={step.number}
                            className={`absolute left-1/2 flex h-[50px] w-[50px] -translate-x-1/2 items-center justify-center rounded-[32px] border-8 border-solid border-white bg-transparent ${positions[index]}`}
                          >
                            <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-xl font-normal leading-[normal] tracking-[0] text-[#ffffffcc]">
                              {step.number}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    {onboardingSteps.map((step) => (
                      <div
                        key={step.label}
                        className="flex min-h-[50px] items-center"
                      >
                        <p className="[font-family:'Poppins_Latin-Medium',Helvetica] text-xl font-medium leading-[normal] tracking-[0] text-[#ffffffcc]">
                          {step.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : activeFeature === "Multi-Chain, One Wallet" ? (
                  <img
                    src={content.rightImage}
                    alt={content.rightAlt}
                    className="h-full max-h-none w-full self-stretch object-cover object-left lg:rounded-r-3xl"
                  />
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
                    <ul className="flex max-h-[340px] flex-col gap-3 overflow-hidden py-6 pr-1">
                      {[
                        { sym: "USDT", name: "Tether — Stablecoin", color: "#26a17b" },
                        { sym: "USDC", name: "Circle — Stablecoin", color: "#2775ca" },
                        { sym: "ETH", name: "Ethereum", color: "#627eea" },
                        { sym: "BNB", name: "BNB Smart Chain", color: "#f3ba2f" },
                        { sym: "POL", name: "Polygon", color: "#8247e5" },
                        { sym: "WBTC", name: "Wrapped Bitcoin", color: "#f7931a" },
                        { sym: "WETH", name: "Wrapped Ether", color: "#3c3c3d" },
                        { sym: "DAI", name: "Dai Stablecoin", color: "#f5ac37" },
                      ].map((token) => (
                        <li
                          key={token.sym}
                          className="flex items-center gap-4 rounded-2xl bg-white/[0.04] px-4 py-3"
                        >
                          <div
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                            style={{ backgroundColor: token.color }}
                          >
                            {token.sym}
                          </div>
                          <div className="flex flex-col">
                            <span className="[font-family:'Poppins_Latin-Bold',Helvetica] text-sm font-bold leading-tight tracking-[0] text-white">
                              {token.sym}
                            </span>
                            <span className="[font-family:'Poppins_Latin-Regular',Helvetica] text-xs font-normal leading-tight tracking-[0] text-[#ffffffaa]">
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
                    className="max-h-[320px] w-auto max-w-full object-contain"
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
