import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, Sparkles } from "lucide-react";

const tiers = [
  {
    eyebrow: "For everyone",
    title: "A wallet that everyone can use",
    description:
      "No seed phrases, no jargon. Anyone — your parents, your friends, your first-time-crypto colleague — can sign up and start using crypto in minutes.",
    icon: Users,
    accent: "from-[#659acd]/20 via-transparent to-transparent",
    iconBg: "bg-[#659acd]/20 text-[#659acd]",
    badgeBg: "bg-[#659acd]/15 text-[#9bbfe5]",
  },
  {
    eyebrow: "As simple as email",
    title: "Creating a wallet feels like creating an email",
    description:
      "Just your face or fingerprint — and your wallet is ready, secure, and fully yours. No backups to lose, no passwords to forget.",
    icon: Mail,
    accent: "from-[#43beb9]/20 via-transparent to-transparent",
    iconBg: "bg-[#43beb9]/20 text-[#43beb9]",
    badgeBg: "bg-[#43beb9]/15 text-[#7ed6d2]",
  },
];

export const CustodyTierSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {tiers.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group relative w-full overflow-hidden rounded-3xl border border-white/5 bg-[#1a3d6c] shadow-[0_20px_60px_-30px_rgba(22,61,108,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(22,61,108,0.8)]"
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent}`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-2xl"
              />
              <CardContent className="relative flex h-full flex-col items-start gap-6 p-8 sm:p-10">
                <div className="flex items-center justify-between gap-4 self-stretch">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 [font-family:'Poppins',Helvetica] text-xs font-semibold uppercase tracking-wider ${item.badgeBg}`}
                  >
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {item.eyebrow}
                  </span>
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-2xl font-bold leading-[1.2] tracking-[-0.01em] text-white sm:text-[28px]">
                  {item.title}
                </h3>

                <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[1.55] tracking-[0] text-white/75">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
