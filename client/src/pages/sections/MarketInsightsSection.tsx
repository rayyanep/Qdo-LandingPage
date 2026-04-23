import {
  Sparkles,
  LineChart,
  Repeat,
  Scale,
  ShieldAlert,
  Wand2,
  ShieldCheck,
} from "lucide-react";

const aiCapabilities = [
  {
    label: "User Onboarding",
    description:
      "A friendly assistant walks you through wallet setup, security, and your first transaction.",
    icon: Wand2,
    tone: "from-[#659acd]/20 to-[#659acd]/5",
    iconBg: "bg-[#659acd]/15 text-[#1f4a85]",
  },
  {
    label: "Market Analysis",
    description:
      "Real-time signals across BTC, ETH, and majors — distilled into clear, plain-language insights.",
    icon: LineChart,
    tone: "from-[#43beb9]/20 to-[#43beb9]/5",
    iconBg: "bg-[#43beb9]/15 text-[#0f7a76]",
  },
  {
    label: "Smart DCA",
    description:
      "Automated dollar-cost averaging that adapts to volatility and your risk profile.",
    icon: Repeat,
    tone: "from-[#f5a623]/20 to-[#f5a623]/5",
    iconBg: "bg-[#f5a623]/15 text-[#a86c11]",
  },
  {
    label: "Portfolio Rebalancing",
    description:
      "Keeps your allocations aligned with your strategy — automatically and gas-efficiently.",
    icon: Scale,
    tone: "from-[#9b6cf2]/20 to-[#9b6cf2]/5",
    iconBg: "bg-[#9b6cf2]/15 text-[#5b3aa6]",
  },
  {
    label: "Risk Alerts & Insights",
    description:
      "Proactive warnings on suspicious tokens, drawdowns, and unusual on-chain activity.",
    icon: ShieldAlert,
    tone: "from-[#ff5a75]/20 to-[#ff5a75]/5",
    iconBg: "bg-[#ff5a75]/15 text-[#b8324a]",
  },
  {
    label: "Fraud Prevention",
    description:
      "AI continuously scans transactions, contracts, and counterparties to block scams, phishing, and malicious approvals before they touch your funds.",
    icon: ShieldCheck,
    tone: "from-[#1f9d55]/20 to-[#1f9d55]/5",
    iconBg: "bg-[#1f9d55]/15 text-[#0f6e3a]",
  },
];

export const MarketInsightsSection = (): JSX.Element => {
  return (
    <section className="relative w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(101,154,205,0.18)_0%,_rgba(101,154,205,0)_70%)] blur-2xl"
      />
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-12">
        <header className="flex w-full max-w-[760px] flex-col items-center gap-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#659acd]/30 bg-[#659acd]/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-[#1f4a85] [font-family:'Poppins',Helvetica]">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Powered by AI
          </span>
          <div className="inline-flex flex-col items-center">
            <h2 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-[#163d6c] sm:text-[48px]">
              Your AI co-pilot for
            </h2>
            <p className="mt-1 [font-family:'Poppins_Latin-Bold',Helvetica] text-[40px] font-bold leading-[1.1] tracking-[-0.02em] text-[#659acd] sm:text-[48px]">
              every step in crypto.
            </p>
          </div>
          <p className="max-w-[620px] [font-family:'Poppins_Latin-Regular',Helvetica] text-lg font-normal leading-[1.55] tracking-[0] text-[#000000cc]">
            From your first wallet to advanced strategies, our AI guides you,
            analyzes the market in real time, and automates smart moves so you
            can grow your portfolio without the guesswork.
          </p>
        </header>

        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-fr">
          {aiCapabilities.map(({ label, description, icon: Icon, tone, iconBg }) => (
            <article
              key={label}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#163d6c]/10 bg-white p-6 shadow-[0_10px_40px_-20px_rgba(22,61,108,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(22,61,108,0.35)]"
            >
              <div
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${tone} opacity-80`}
              />
              <div className="relative flex h-full flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBg}`}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-xl font-bold leading-tight tracking-[-0.01em] text-[#163d6c]">
                    {label}
                  </h3>
                  <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-[15px] font-normal leading-[1.5] text-[#000000a6]">
                    {description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex w-full max-w-[760px] flex-col items-center gap-4 rounded-3xl border border-[#659acd]/20 bg-gradient-to-r from-[#163d6c] via-[#1f4a85] to-[#659acd] p-8 text-center text-white shadow-[0_20px_60px_-20px_rgba(22,61,108,0.55)] sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <p className="[font-family:'Poppins_Latin-Bold',Helvetica] text-lg font-bold tracking-[-0.01em]">
                Always learning. Always with you.
              </p>
              <p className="[font-family:'Poppins_Latin-Regular',Helvetica] text-sm font-normal text-white/75">
                And much more — new capabilities ship every month.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#43beb9] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#43beb9]" />
            </span>
            Live in beta
          </div>
        </div>
      </div>
    </section>
  );
};
