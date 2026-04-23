import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Twitter, Github, Linkedin, Youtube, Send, MessageCircle } from "lucide-react";

const socialLinks = [
  { label: "X (Twitter)", href: "#", icon: Twitter },
  { label: "Telegram", href: "#", icon: Send },
  { label: "Discord", href: "#", icon: MessageCircle },
  { label: "GitHub", href: "#", icon: Github },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "YouTube", href: "#", icon: Youtube },
];

const productLinks = ["Wallet", "Swap", "Buy/Sell", "Predictions"];
const resourceLinks = [
  "Documentation",
  "API Reference",
  "Token Listing",
  "Security Audit",
];
const companyLinks = ["About", "Contact", "Terms", "Privacy"];

export const FooterActionSection = (): JSX.Element => {
  return (
    <footer className="relative w-full bg-[#061237]">
      <div className="mx-auto flex w-full max-w-none flex-col gap-12 px-6 py-16 sm:px-10 lg:gap-20 lg:px-20 lg:py-[100px] xl:px-40">
        <section className="flex w-full flex-col gap-10 lg:gap-[54px]">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
            <header className="flex shrink-0 flex-col items-start">
              <h2 className="mt-[-1.00px] [font-family:'Poppins_Latin-Bold',Helvetica] text-4xl font-bold leading-[1.5] tracking-[0] text-white sm:text-5xl">
                Ready to own
              </h2>
              <p className="[font-family:'Poppins_Latin-Bold',Helvetica] text-4xl font-bold leading-[1.5] tracking-[0] text-[#659acd] sm:text-5xl">
                your crypto?
              </p>
            </header>
            <div className="flex w-full max-w-[632px] flex-col gap-6 lg:flex-1 lg:self-stretch">
              <p className="mt-[-1.00px] self-stretch [font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal tracking-[0] text-[#ffffffcc]">
                Join the waitlist and be among the first to experience
                self-custody without the complexity.
              </p>
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  type="button"
                  className="h-auto min-h-[54px] flex-1 rounded-2xl bg-[#659acd] px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-[#659acd]/90"
                >
                  <span>Get Early Access</span>
                  <img
                    className="h-8 w-8"
                    alt="Arrow up right"
                    src="/figmaAssets/arrow-up-right-7.svg"
                  />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-auto min-h-[54px] flex-1 rounded-2xl border border-solid border-white bg-[#061237] px-4 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-white/5 hover:text-white"
                >
                  See Hoe It Works
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Separator className="bg-[#ffffff1f]" />
        <section className="flex w-full flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[332px] flex-col items-start gap-6">
            <img
              className="h-10 w-[120px]"
              alt="Qdo"
              src="/figmaAssets/group-1-1.png"
            />
            <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-base font-normal tracking-[0] text-[#ffffffcc]">
              Self-custody made simple. Your keys, your crypto, zero friction.
              <br />
              Built for everyone.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:border-[#659acd] hover:bg-[#659acd]/20 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:w-auto lg:grid-cols-3 lg:gap-16"
          >
            <ul className="flex flex-col items-start justify-center gap-5">
              {productLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="h-auto w-fit [font-family:'Poppins',Helvetica] text-left text-base font-normal leading-[22px] tracking-[0] text-[#ffffffcc] transition-opacity hover:opacity-80"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col items-start justify-center gap-5">
              {resourceLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="h-auto w-fit [font-family:'Poppins',Helvetica] text-left text-base font-normal leading-[22px] tracking-[0] text-[#ffffffcc] transition-opacity hover:opacity-80"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col items-start justify-center gap-5">
              {companyLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    className="h-auto w-fit [font-family:'Poppins',Helvetica] text-left text-base font-normal leading-[22px] tracking-[0] text-[#ffffffcc] transition-opacity hover:opacity-80"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
};
