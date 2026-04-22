import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const TierCalloutSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="w-full max-w-[455px] rounded-3xl border-0 bg-[#eeeff4] shadow-none overflow-hidden">
        <CardContent className="relative flex min-h-[400px] flex-col p-5 sm:min-h-[456px] sm:p-8">
          <p className="max-w-[391px] [font-family:'Poppins_Latin-Medium',Helvetica] text-base font-medium leading-normal tracking-[0] text-[#000000cc] sm:text-lg">
            Your keys never leave your device. No custodians, no intermediaries,
            no single points of failure.
          </p>

          <div className="relative mt-auto h-[240px] w-full sm:h-[280px]">
            {/* Dollar icon top-right */}
            <div className="absolute right-[5px] top-[80px] flex h-[55px] w-[55px] rotate-[30deg] items-center justify-center rounded-full bg-white shadow-sm sm:right-[10px] sm:top-[100px] sm:h-[71px] sm:w-[71px]">
              <span className="[font-family:'Poppins',Helvetica] text-2xl font-light text-[#cb7e1f] sm:text-3xl">
                $
              </span>
            </div>

            {/* Anti-Fraud Engine - top */}
            <Button
              type="button"
              variant="secondary"
              className="absolute left-[80px] top-[110px] h-auto w-fit rotate-0 rounded-3xl border-0 bg-[#1a3d6c] px-3 py-2 text-center [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[20px] tracking-[0] text-white shadow-sm hover:bg-[#1a3d6c]/90 sm:left-[120px] sm:top-[140px] sm:px-5 sm:py-3 sm:text-base sm:leading-[22px]"
            >
              Anti-Fraud Engine
            </Button>

            {/* Gamified Rewards - middle, tilted right */}
            <Button
              type="button"
              variant="secondary"
              className="absolute left-[75px] bottom-[40px] h-auto w-fit rotate-[25deg] origin-bottom-left rounded-3xl border-0 bg-white px-3 py-2 text-center [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[20px] tracking-[0] text-[#cb7e1f] shadow-sm hover:bg-white/90 sm:left-[105px] sm:bottom-[47px] sm:px-5 sm:py-3 sm:text-base sm:leading-[22px]"
            >
              Gamified Rewards
            </Button>

            {/* Real-Time Payouts - right side, tilted left */}
            <Button
              type="button"
              variant="secondary"
              className="absolute right-[-15px] top-[150px] h-auto w-fit rotate-[-12deg] rounded-3xl border-0 bg-[#659acd] px-3 py-2 text-center [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[20px] tracking-[0] text-white shadow-sm hover:bg-[#659acd]/90 sm:right-[-30px] sm:top-[180px] sm:px-5 sm:py-3 sm:text-base sm:leading-[22px]"
            >
              Real-Time Payouts
            </Button>

            {/* Wallet icon - centered above On-Chain Tracking */}
            <div className="absolute bottom-[10px] left-[35px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#659acd] shadow-sm sm:bottom-[14px] sm:left-[48px] sm:h-[60px] sm:w-[60px]">
              <img
                src="/figmaAssets/button-1.svg"
                alt="Wallet"
                className="h-[100px] w-[100px] sm:h-[140px] sm:w-[140px]"
              />
            </div>

            {/* On-Chain Tracking - bottom-left */}
            <Button
              type="button"
              variant="secondary"
              className="absolute bottom-[-20px] left-[-5px] h-auto w-fit rounded-3xl border-0 bg-[#1a3d6c] px-3 py-2 text-center [font-family:'Poppins',Helvetica] text-sm font-semibold leading-[20px] tracking-[0] text-white shadow-sm hover:bg-[#1a3d6c]/90 sm:bottom-[-32px] sm:left-[-10px] sm:px-5 sm:py-3 sm:text-base sm:leading-[22px]"
            >
              On-Chain Tracking
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
