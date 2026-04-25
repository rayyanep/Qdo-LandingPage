import { Card, CardContent } from "@/components/ui/card";

const headingLines = [
  {
    text: "Self-custody means",
    className:
      "[font-family:'Poppins_Latin-Bold',Helvetica] font-bold text-[#163d6c] text-[32px] sm:text-[40px] tracking-[-0.01em] leading-[1.1]",
  },
  {
    text: "you own everything",
    className:
      "[font-family:'Poppins_Latin-Bold',Helvetica] font-bold text-[#659acd] text-[32px] sm:text-[40px] tracking-[-0.01em] leading-[1.1] -mt-1 sm:-mt-2",
  },
];

const description =
  "Your keys never leave your device. No custodians, no intermediaries, no single points of failure.";

export const SelfCustodyIntroSection = (): JSX.Element => {
  return (
    <section className="w-full">
      <Card className="h-full w-full max-w-[560px] border-0 bg-transparent shadow-none">
        <CardContent className="flex flex-col items-start justify-center gap-4 p-0">
          <header className="flex flex-col items-start">
            {headingLines.map((line) => (
              <h2 key={line.text} className={line.className}>
                {line.text}
              </h2>
            ))}
          </header>
          <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-base sm:text-lg font-normal tracking-[0] leading-[1.5] text-[#000000cc]">
            {description}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};
