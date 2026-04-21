import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  {
    tier: "Tier 1",
    number: "1",
    title: "Direct Referral",
    description:
      "Earn on every trade, swap, and ramp transaction your referrals make",
  },
  {
    tier: "Tier 2",
    number: "2",
    title: "Sub-Affiliate",
    description:
      "Two-level system — earn when your referrals bring in their own users",
  },
];

export const CustodyTierSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <div className="flex w-full max-w-[600px] flex-col items-start gap-3">
        {tiers.map((item) => (
          <Card
            key={item.tier}
            className="w-full rounded-3xl border-0 bg-[#1a3d6c] shadow-none"
          >
            <CardContent className="flex flex-col items-start justify-center gap-5 px-10 py-8">
              <h3 className="mt-[-1.00px] [font-family:'Poppins',Helvetica] text-[28px] font-bold leading-[22px] tracking-[0] text-white">
                {item.tier}
              </h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#659acd]">
                  <span className="self-stretch [font-family:'Poppins',Helvetica] text-center text-xl font-semibold leading-[22px] tracking-[0] text-white">
                    {item.number}
                  </span>
                </div>
                <div className="flex flex-col items-start justify-center gap-1">
                  <h4 className="mt-[-1.00px] whitespace-nowrap [font-family:'Poppins',Helvetica] text-center text-lg font-semibold leading-[22px] tracking-[0] text-white">
                    {item.title}
                  </h4>
                  <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-xs font-normal leading-[normal] tracking-[0] text-white">
                    {item.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
