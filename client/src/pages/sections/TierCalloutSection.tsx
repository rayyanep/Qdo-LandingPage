import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const badges = [
  {
    label: "Gamified Rewards",
    className:
      "self-center -mt-1 rotate-[30deg] bg-white text-[#cb7e1f] shadow-sm",
  },
  {
    label: "Real-Time Payouts",
    className:
      "ml-auto -mt-2 rotate-[-15deg] bg-[#659acd] text-white shadow-sm",
  },
  {
    label: "On-Chain Tracking",
    className: "-mt-1 bg-[#1a3d6c] text-white shadow-sm",
  },
  {
    label: "Anti-Fraud Engine",
    className: "ml-16 -mb-1 w-fit bg-[#1a3d6c] text-white shadow-sm",
  },
];

const decorativeButtons = [
  {
    src: "/figmaAssets/button.svg",
    alt: "Decorative button",
    className: "h-[71px] w-[71px] self-end mr-2 -mb-3",
  },
  {
    src: "/figmaAssets/button-1.svg",
    alt: "Decorative button",
    className: "h-[74px] w-[74px] self-start ml-8 -mt-14",
  },
];

export const TierCalloutSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="w-full max-w-[455px] rounded-3xl border-0 bg-[#eeeff4] shadow-none overflow-hidden">
        <CardContent className="flex min-h-[456px] flex-col p-8">
          <p className="max-w-[391px] [font-family:'Poppins_Latin-Medium',Helvetica] text-lg font-medium leading-normal tracking-[0] text-[#000000cc]">
            Your keys never leave your device. No custodians, no intermediaries,
            no single points of failure.
          </p>
          <div className="mt-auto flex flex-col">
            <div className="flex justify-end">
              {decorativeButtons.slice(0, 1).map((item) => (
                <img
                  key={item.src}
                  className={item.className}
                  alt={item.alt}
                  src={item.src}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="secondary"
                className={`h-auto w-fit rounded-3xl border-0 px-4 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] hover:bg-white/90 ${badges[0].className}`}
              >
                {badges[0].label}
              </Button>
              <div className="flex items-start justify-between gap-4">
                {decorativeButtons.slice(1).map((item) => (
                  <img
                    key={item.src}
                    className={item.className}
                    alt={item.alt}
                    src={item.src}
                  />
                ))}

                <Button
                  type="button"
                  variant="secondary"
                  className={`h-auto w-fit rounded-3xl border-0 px-4 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] hover:bg-[#659acd]/90 ${badges[1].className}`}
                >
                  {badges[1].label}
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                className={`h-auto w-fit rounded-3xl border-0 px-4 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] hover:bg-[#1a3d6c]/90 ${badges[2].className}`}
              >
                {badges[2].label}
              </Button>
              <Button
                type="button"
                variant="secondary"
                className={`h-auto rounded-3xl border-0 px-4 py-3 text-center [font-family:'Poppins',Helvetica] text-base font-semibold leading-[22px] tracking-[0] hover:bg-[#1a3d6c]/90 ${badges[3].className}`}
              >
                {badges[3].label}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
