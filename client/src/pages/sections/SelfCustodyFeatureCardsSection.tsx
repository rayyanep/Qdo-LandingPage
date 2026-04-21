import { Card, CardContent } from "@/components/ui/card";

const featureCards = [
  {
    title: "True Self-Custody",
    description:
      "Private keys are generated and stored on your device using hardware-backed secure enclaves. Qdo never has access to your keys or funds — ever.",
    icon: {
      type: "image",
      src: "/figmaAssets/arrow-up-right-5.svg",
      alt: "Arrow up right",
    },
  },
  {
    title: "Passkey Security (ERC-4337)",
    description:
      "Account abstraction enables passkey-based authentication with smart contract wallets. Social recovery, session keys, and spending limits — all without seed phrases.",
    icon: {
      type: "image",
      src: "/figmaAssets/arrow-up-right-9.svg",
      alt: "Arrow up right",
    },
  },
  {
    title: "Verified Contracts Only",
    description:
      "Every token listed passes strict governance — verified contract addresses, market cap thresholds, multi-chain availability checks, and community voting.",
    icon: {
      type: "verified",
    },
  },
  {
    title: "Scam Token Filtering",
    description:
      "Built-in protection against honeypot tokens, rug pulls, and fake airdrops. Our token listing framework filters malicious contracts before they reach your wallet.",
    icon: {
      type: "image",
      src: "/figmaAssets/arrow-up-right-10.svg",
      alt: "Arrow up right",
    },
  },
] as const;

export const SelfCustodyFeatureCardsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
        {featureCards.map((card) => (
          <Card
            key={card.title}
            className="border-0 bg-[#659acd1a] shadow-none rounded-3xl"
          >
            <CardContent className="flex h-full flex-col items-start gap-4 px-6 pt-6 pb-10">
              {card.icon.type === "image" ? (
                <img
                  className="h-10 w-10"
                  alt={card.icon.alt}
                  src={card.icon.src}
                />
              ) : (
                <div className="relative h-10 w-10">
                  <div className="absolute left-[25px] top-[22px] h-[15px] w-2 rotate-[135deg] rounded-[24px_24px_0px_0px] bg-[#659acd66]" />
                  <div className="absolute left-0.5 top-[3px] h-7 w-7 rounded-[14px] border-4 border-solid border-[#659acd]" />
                </div>
              )}

              <h3 className="text-left text-xl font-semibold leading-[22px] tracking-[0] text-[#1a3d6c] [font-family:'Poppins',Helvetica]">
                {card.title}
              </h3>
              <p className="self-stretch text-left text-base font-normal tracking-[0] text-[#00000099] [font-family:'Poppins_Latin-Regular',Helvetica] leading-[normal]">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
