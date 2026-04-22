import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const TierCalloutSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="w-full max-w-[455px] rounded-3xl border-0 bg-[#eeeff4] shadow-none overflow-hidden">
        <CardContent className="relative flex min-h-[456px] flex-col p-8">
          <p className="max-w-[391px] [font-family:'Poppins_Latin-Medium',Helvetica] text-lg font-medium leading-normal tracking-[0] text-[#000000cc]">
            Your keys never leave your device. No custodians, no intermediaries,
            no single points of failure.
          </p>

          <div className="relative mt-auto h-[280px] w-full">
            {/* Dollar icon top-right */}
            <div className="absolute right-[10px] top-[10px] flex h-[71px] w-[71px] items-center justify-center rounded-full bg-white shadow-sm">
              <span className="[font-family:'Poppins',Helvetica] text-3xl font-bold text-[#cb7e1f]">$</span>
            </div>

            {/* Anti-Fraud Engine - top, slight tilt left */}
            <Button
              type="button"
              variant="secondary"
              className="absolute left-[80px] top-[35px] h-auto w-fit rotate-[-8deg] rounded-3xl border-0 bg-[#1a3d6c] px-5 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] text-white shadow-sm hover:bg-[#1a3d6c]/90"
            >
              Anti-Fraud Engine
            </Button>

            {/* Gamified Rewards - middle, tilted right */}
            <Button
              type="button"
              variant="secondary"
              className="absolute left-[90px] top-[110px] h-auto w-fit rotate-[20deg] rounded-3xl border-0 bg-white px-5 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] text-[#cb7e1f] shadow-sm hover:bg-white/90"
            >
              Gamified Rewards
            </Button>

            {/* Real-Time Payouts - right side, tilted left */}
            <Button
              type="button"
              variant="secondary"
              className="absolute right-[-30px] top-[120px] h-auto w-fit rotate-[-12deg] rounded-3xl border-0 bg-[#659acd] px-5 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] text-white shadow-sm hover:bg-[#659acd]/90"
            >
              Real-Time Payouts
            </Button>

            {/* Wallet icon - centered above On-Chain Tracking */}
            <div className="absolute bottom-[14px] left-[33px] flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#659acd] shadow-sm">
              <img
                src="/figmaAssets/button-1.svg"
                alt="Wallet"
                className="h-[57px] w-[57px]"
              />
            </div>

            {/* On-Chain Tracking - bottom-left */}
            <Button
              type="button"
              variant="secondary"
              className="absolute bottom-[-32px] left-[-10px] h-auto w-fit rounded-3xl border-0 bg-[#1a3d6c] px-5 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] text-white shadow-sm hover:bg-[#1a3d6c]/90"
            >
              On-Chain Tracking
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
