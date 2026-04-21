import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const featureTabs = [
  "Passkey Onboarding",
  "Instant Token Swaps",
  "Buy & Sell Crypto",
  "Multi-Chain, One Wallet",
  "Gasless Transactions",
  "Earn Yield",
];

const onboardingSteps = [
  { number: "1", label: "Tap to start" },
  { number: "2", label: "Biometric scan" },
  { number: "3", label: "Wallet ready" },
];

export const PasskeySecuritySection = (): JSX.Element => {
  const [activeFeature, setActiveFeature] = useState("Passkey Onboarding");

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
                <img
                  className="mb-6 h-[100px] w-[116px]"
                  alt="Passkey onboarding illustration"
                  src="/figmaAssets/group-2.png"
                />
                <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-2xl font-bold leading-[normal] tracking-[0] text-white">
                  Passkey Onboarding
                </h3>
                <p className="mt-4 max-w-[530px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[normal] tracking-[0] text-[#ffffffcc] md:text-lg">
                  Create your wallet with Face ID or fingerprint — no seed
                  phrases, no passwords. Powered by ERC-4337 account abstraction
                  and EIP-7702, your wallet lives securely on your device with
                  smart contract recovery built in.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <div className="grid grid-cols-[50px_auto] items-start gap-x-5 gap-y-10">
                  <div className="relative row-span-3 flex min-h-[280px] w-[50px] items-start justify-center">
                    <div className="absolute left-1/2 top-0 h-[280px] w-[50px] -translate-x-1/2 rounded-[32px] border-8 border-solid border-[#659acd]" />
                    {onboardingSteps.map((step, index) => {
                      const positions = ["top-0", "top-[115px]", "top-[230px]"];

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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
