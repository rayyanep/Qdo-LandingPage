import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/QdoXyz", icon: Twitter },
  { label: "Telegram", href: "https://t.me/qdo_official", icon: Send },
  { label: "Discord", href: "https://discord.gg/Ty5qGPcYZ", icon: MessageCircle },
  { label: "GitHub", href: "#", icon: Github },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/qdowallet/",
    icon: Linkedin,
  },
  { label: "YouTube", href: "https://www.youtube.com/@QdoWallet", icon: Youtube },
];

const productLinks = ["Wallet", "Swap", "Buy/Sell", "Predictions"];
const resourceLinks = [
  "Documentation",
  "API Reference",
  "Token Listing",
  "Security Audit",
];
type CompanyLink = { label: string; href?: string; target?: string };

const companyLinks: CompanyLink[] = [
  { label: "About" },
  { label: "Contact", target: "waitlist" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy" },
];

type Status = "idle" | "loading" | "success" | "error";

export const FooterActionSection = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "You're on the list — we'll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Please try again.");
    }
  };

  return (
    <footer
      id="waitlist"
      className="relative w-full scroll-mt-24 bg-[#061237]"
    >
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
              <form
                onSubmit={handleSubmit}
                className="flex w-full flex-col gap-3"
                noValidate
              >
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-stretch">
                  <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") {
                        setStatus("idle");
                        setMessage("");
                      }
                    }}
                    disabled={status === "loading"}
                    className="h-auto min-h-[54px] flex-1 rounded-2xl border border-white/15 bg-white/[0.06] px-5 text-base text-white placeholder:text-white/40 focus-visible:border-[#659acd] focus-visible:ring-2 focus-visible:ring-[#659acd]/40 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-auto min-h-[54px] rounded-2xl bg-[#659acd] px-6 py-4 [font-family:'Poppins',Helvetica] text-base font-medium leading-[22px] text-white hover:bg-[#5089bd] sm:w-[210px]"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Joining…</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        <span>You're in</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
                {message ? (
                  <p
                    role={status === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={`[font-family:'Poppins',Helvetica] text-sm ${
                      status === "error"
                        ? "text-[#ff8a9b]"
                        : "text-[#9bcfa3]"
                    }`}
                  >
                    {message}
                  </p>
                ) : (
                  <p className="[font-family:'Poppins',Helvetica] text-sm text-white/50">
                    No spam — we'll only email you when access is ready.
                  </p>
                )}
              </form>
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
            <a
              href="mailto:info@qdo.xyz"
              className="inline-flex items-center gap-2 [font-family:'Poppins',Helvetica] text-base font-medium text-white transition-colors hover:text-[#659acd]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              info@qdo.xyz
            </a>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
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
              {companyLinks.map((item) => {
                const linkClass =
                  "h-auto w-fit [font-family:'Poppins',Helvetica] text-left text-base font-normal leading-[22px] tracking-[0] text-[#ffffffcc] transition-opacity hover:opacity-80";
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    ) : item.target ? (
                      <button
                        type="button"
                        className={linkClass}
                        onClick={() => {
                          document
                            .getElementById(item.target!)
                            ?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <button type="button" className={linkClass}>
                        {item.label}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </section>
      </div>
    </footer>
  );
};
