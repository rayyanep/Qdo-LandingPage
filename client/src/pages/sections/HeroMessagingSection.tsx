import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const headingLines = [
  { text: "Your keys.", color: "text-[#659acd]" },
  { text: "Your crypto.", color: "text-[#1a3d6c]" },
  { text: "Zero friction.", color: "text-[#659acd]" },
];

const actions = [
  {
    label: "Get Early Access",
    variant: "primary" as const,
    hasIcon: true,
  },
  {
    label: "See Hoe It Works",
    variant: "secondary" as const,
    hasIcon: false,
  },
];

export const HeroMessagingSection = (): JSX.Element => {
  return (
    <section className="relative w-full xl:pt-[180px]">
      <div className="flex w-full max-w-[455px] flex-col items-start gap-8 md:gap-10 xl:ml-auto xl:max-w-none xl:gap-12">
        <header className="flex w-full flex-col items-start gap-4">
          <h1 className="flex w-full flex-wrap items-baseline gap-x-2 [font-family:'Poppins_Latin-Bold',Helvetica] text-[28px] font-bold leading-[1.15] tracking-[0] sm:text-[32px] xl:flex-nowrap xl:whitespace-nowrap xl:text-[26px]">
            {headingLines.map((line) => (
              <span key={line.text} className={`${line.color} w-fit`}>
                {line.text}
              </span>
            ))}
          </h1>
          <p className="max-w-[360px] [font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal leading-[1.5] tracking-[0] text-[#00000099] sm:text-lg">
            Sign in with a passkey, swap tokens, buy &amp; sell crypto, and
            trade prediction markets. All in one place.
          </p>
        </header>
        <nav
          aria-label="Hero actions"
          className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          {actions.map((action) => {
            const isPrimary = action.variant === "primary";

            return (
              <Button
                key={action.label}
                type="button"
                className={`h-auto min-h-[54px] flex-1 rounded-2xl px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] tracking-[0] ${
                  isPrimary
                    ? "bg-[#1a3d6c] text-white hover:bg-[#16355d]"
                    : "border border-[#1a3d6c] bg-white text-[#00000099] hover:bg-[#f8fbff]"
                }`}
                variant={isPrimary ? "default" : "outline"}
              >
                <span className="whitespace-nowrap text-center">
                  {action.label}
                </span>
                {action.hasIcon ? (
                  <ArrowUpRightIcon
                    className="h-8 w-8 shrink-0"
                    aria-hidden="true"
                  />
                ) : null}
              </Button>
            );
          })}
        </nav>
      </div>
    </section>
  );
};
