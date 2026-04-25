import { useEffect } from "react";
import { Link } from "wouter";

const sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }> = [
  {
    heading: "",
    paragraphs: [
      'Qdo Tech LLC (also referred to as "Qdo," "Qdo Wallet," "we," "our," or "us") operates the Qdo Wallet platform, which is accessible through our website at qdo.app, our mobile applications, browser extensions, and any related products and services (collectively, the "Services" or "Platform"). These Terms of Service (the "Terms") constitute a legally binding agreement between Qdo and you ("you" or "user") and govern your access to and use of the Services.',
      "IMPORTANT: By accessing or using any of our Services, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree with these Terms, you must not access or use our Services. We do not provide financial, investment, tax, or legal advice. All decisions to transact in digital assets are made solely by you.",
      "PLEASE READ THESE TERMS CAREFULLY. THEY CONTAIN IMPORTANT INFORMATION ABOUT YOUR RIGHTS AND OBLIGATIONS, LIMITATIONS OF LIABILITY, AND DISPUTE RESOLUTION PROCEDURES.",
    ],
  },
  {
    heading: "1. Agreement to Terms",
    paragraphs: [
      "By downloading, installing, accessing, or using any of our Services, you acknowledge and agree that: (i) you have read and understood these Terms; (ii) you agree to comply with and be bound by these Terms; and (iii) you are legally capable of entering into a binding agreement. These Terms apply to all visitors, users, and others who access or use the Services.",
      "Your continued use of the Services following any modifications to these Terms constitutes your acceptance of such modifications. If you do not agree with any amended Terms, you must discontinue your use of the Services immediately.",
    ],
  },
  {
    heading: "2. Privacy Policy",
    paragraphs: [
      "Your use of the Services is also governed by our Privacy Policy, which describes how we collect, use, store, and share your information. By using our Services, you consent to our collection and use of your data as described in our Privacy Policy. Our Privacy Policy is incorporated into and forms part of these Terms.",
    ],
  },
  {
    heading: "3. Updates to Terms",
    paragraphs: [
      "We reserve the right to update, modify, or replace these Terms at any time at our sole discretion. If material changes are made, we will notify you by posting the revised Terms on our website, within the application, or through other reasonable means of communication. Revised Terms shall take effect immediately upon posting unless otherwise stated. You are responsible for reviewing these Terms regularly. Your continued use of the Services after any changes constitutes acceptance of the revised Terms.",
      "We may also change, suspend, or discontinue all or any part of the Services at any time, with or without notice, at our sole discretion.",
    ],
  },
  {
    heading: "4. Eligibility",
    paragraphs: [
      "To be eligible to access and use the Services, you represent and warrant that:",
    ],
    list: [
      "You are at least eighteen (18) years of age, or the age of legal majority in your jurisdiction, whichever is greater, and have full legal capacity to enter into these Terms.",
      "If using the Services on behalf of a legal entity, you are duly authorized to bind such entity to these Terms and the entity is validly organized under applicable law.",
      "You are not located in, nor a citizen, national, or resident of, any jurisdiction subject to comprehensive sanctions imposed by the United States (including OFAC), the United Nations, the European Union, the United Kingdom, or any other applicable sanctions authority. Restricted jurisdictions include, but are not limited to: Cuba, Iran, North Korea, Syria, and the Crimea, Donetsk, and Luhansk regions of Ukraine.",
      "You are not listed on any sanctions, denied persons, or restricted parties list maintained by any governmental authority.",
      "Your use of the Services is permitted under the laws of your jurisdiction, and you will only use the Services with legally obtained funds that rightfully belong to you.",
    ],
  },
  {
    heading: "5. Description of Services",
    paragraphs: [
      'Qdo Wallet is a self-custody digital wallet designed for digital assets including cryptocurrencies, stablecoins, and tokens ("Digital Assets"). As a self-custody wallet, you—and only you—maintain full control over your Digital Assets. Qdo does not hold, manage, or have access to your private keys or funds at any time.',
      "The Services enable you to:",
    ],
    list: [
      "Create and manage wallet accounts using passkey-based authentication (biometric or device-based credentials) through ERC-4337 account abstraction and EIP-7702 smart account technology, without the need for traditional seed phrases or mnemonic recovery words.",
      "Send and receive Digital Assets across supported blockchain networks, including Ethereum, BNB Smart Chain (BSC), and Polygon.",
      "Swap Digital Assets using integrated third-party decentralized exchange (DEX) aggregators.",
      "Purchase and sell Digital Assets through integrated third-party fiat on-ramp and off-ramp services.",
      "Participate in prediction markets for binary outcome events, utilizing on-chain settlement through conditional tokens.",
      "Earn referral rewards through the on-chain affiliate and referral program.",
      "Access AI-powered features including natural language transaction processing, smart DCA (dollar-cost averaging), scam and risk detection alerts, and an onboarding copilot.",
      "View portfolio analytics and asset pricing information provided by third-party data providers.",
    ],
  },
  {
    heading: "5.1 Passkey Authentication and Account Abstraction",
    paragraphs: [
      "Qdo Wallet uses passkey-based authentication and smart account technology (ERC-4337 / EIP-7702) to simplify wallet creation and transaction signing. Unlike traditional wallets that rely on seed phrases or mnemonic words, Qdo creates smart contract accounts controlled by your device's biometric or PIN-based passkey credentials.",
      "You acknowledge and understand that:",
    ],
    list: [
      "Your passkey credentials are stored on your device and are never transmitted to or stored by Qdo.",
      "If you lose access to your device and all registered passkey credentials, you may permanently lose access to your wallet and all associated Digital Assets.",
      "Qdo cannot recover, reset, or restore your wallet access if all passkey credentials are lost. You are solely responsible for maintaining backup recovery methods as provided within the application.",
      "Smart contract wallets operate differently from externally owned accounts (EOAs). Transaction execution, gas sponsorship, and account recovery mechanisms are governed by on-chain smart contract logic.",
    ],
  },
  {
    heading: "5.2 Swap Services",
    paragraphs: [
      "The swap functionality within Qdo Wallet is facilitated by independent third-party DEX aggregators. Qdo acts solely as an interface that routes your swap requests to these third-party protocols. You acknowledge that:",
    ],
    list: [
      "Qdo is not a party to any swap transaction and does not act as a broker, dealer, exchange, or counterparty.",
      "Swap execution, pricing, slippage, and fees are determined by the underlying third-party protocols and prevailing market conditions.",
      "Qdo may charge a service fee on swap transactions, which will be clearly disclosed before you confirm any transaction.",
      "You bear all risks associated with swap transactions, including price fluctuations, failed transactions, and smart contract risks.",
    ],
  },
  {
    heading: "5.3 Fiat On-Ramp and Off-Ramp Services",
    paragraphs: [
      "Qdo Wallet integrates third-party fiat on-ramp and off-ramp service providers to allow you to purchase Digital Assets with fiat currency and sell Digital Assets for fiat currency. These services are provided entirely by independent third-party partners and are subject to their own terms of service, privacy policies, KYC/AML requirements, and fee structures.",
      "Qdo does not process, hold, or transmit fiat currency at any time. Any identity verification, compliance checks, or payment processing required for fiat transactions is conducted directly by the third-party provider. Qdo bears no responsibility for delays, failures, or disputes arising from your use of third-party fiat services.",
    ],
  },
  {
    heading: "5.4 Prediction Markets",
    paragraphs: [
      "Qdo Wallet may offer access to binary prediction markets, which allow users to take positions on the outcome of real-world events. These markets are settled on-chain using conditional tokens and resolved through decentralized oracle services.",
      "You acknowledge and agree that:",
    ],
    list: [
      "Prediction markets involve significant financial risk. You may lose all collateral deposited into a prediction position.",
      "Qdo does not guarantee the accuracy, timeliness, or reliability of oracle data used for market resolution.",
      "Prediction market participation may be subject to additional regulatory restrictions in certain jurisdictions. It is your sole responsibility to determine whether participation is lawful in your jurisdiction.",
      "Qdo may charge fees on prediction market activity, including taker fees on winning positions, which will be disclosed within the application.",
      "Idle collateral deposited in prediction markets may be deployed to third-party DeFi yield protocols. Such deployment is subject to the risks of those protocols, including smart contract vulnerabilities and liquidity risks.",
    ],
  },
  {
    heading: "5.5 Affiliate and Referral Program",
    paragraphs: [
      "Qdo Wallet operates an on-chain affiliate and referral program that rewards users for inviting new users to the platform. Referral rewards are calculated based on activity generated by referred users across applicable revenue surfaces (swaps, on/off ramp, prediction markets).",
      "You agree that:",
    ],
    list: [
      "Referral rewards are subject to anti-fraud mechanisms. Qdo reserves the right to withhold, claw back, or cancel rewards in cases of suspected fraud, self-referral, or abuse.",
      "Reward rates, tiers, and structures may be modified at any time at Qdo's sole discretion.",
      "Referral program participation is subject to the laws of your jurisdiction. You are solely responsible for any tax obligations arising from referral income.",
    ],
  },
  {
    heading: "5.6 AI-Powered Features",
    paragraphs: [
      "Qdo Wallet integrates AI-powered features to enhance the user experience, including natural language transaction processing, scam and risk detection, smart DCA automation, and an onboarding copilot. These features are provided for convenience and informational purposes only.",
      "You acknowledge that:",
    ],
    list: [
      "AI-generated outputs, suggestions, alerts, and transaction recommendations are not financial advice and should not be relied upon as the sole basis for any financial decision.",
      "AI features may produce inaccurate, incomplete, or misleading results. Qdo does not guarantee the accuracy or reliability of any AI-generated output.",
      "You are solely responsible for reviewing and confirming all transactions before execution, regardless of any AI-generated suggestion.",
      "AI features may collect and process transaction data and usage patterns to improve service quality, subject to our Privacy Policy.",
    ],
  },
  {
    heading: "6. Self-Custody and User Responsibility",
    paragraphs: [
      "Qdo Wallet is a self-custody, non-custodial wallet. This means that Qdo does not at any time hold, store, manage, or have access to your private keys, passkey credentials, Digital Assets, or funds.",
      "You bear exclusive and sole responsibility for:",
    ],
    list: [
      "The security and safekeeping of your passkey credentials, device access, and any backup recovery methods.",
      "All transactions initiated from your wallet, whether authorized by you or not.",
      "Ensuring the accuracy of recipient addresses, transaction amounts, and network selections before confirming any transaction.",
      "Understanding and accepting the risks associated with blockchain technology, smart contracts, and digital asset management.",
    ],
  },
  {
    heading: "7. Fees and Charges",
    paragraphs: [
      "Qdo may charge fees for certain Services, including but not limited to swap transaction fees, prediction market taker fees, and fiat on/off ramp commissions. All applicable fees will be clearly displayed to you before you confirm any transaction.",
      "In addition to Qdo's fees, you may incur blockchain network fees (gas fees) for on-chain transactions. Network fees are determined by the respective blockchain network and are not controlled by Qdo. For certain transactions, Qdo may sponsor or subsidize gas fees at its sole discretion; such sponsorship may be modified or discontinued at any time without notice.",
      "Third-party service providers integrated into the Platform (including DEX aggregators, fiat ramp providers, and oracle services) may impose their own fees. These fees are separate from Qdo's fees and are governed by the respective third-party's terms.",
    ],
  },
  {
    heading: "8. Third-Party Services and Content",
    paragraphs: [
      'The Services may incorporate, link to, or enable access to third-party services, protocols, content, and applications ("Third-Party Services"), including but not limited to DEX aggregators, fiat on/off ramp providers, oracle services, DeFi protocols, and blockchain explorers.',
      "You acknowledge and agree that:",
    ],
    list: [
      "Qdo does not control, endorse, or assume responsibility for any Third-Party Services.",
      "Your use of Third-Party Services is at your own risk and may be subject to those parties' own terms and privacy policies.",
      "Qdo shall have no liability for any loss, damage, or claim arising from your use of or reliance on Third-Party Services.",
      "Qdo reserves the right to change, suspend, or discontinue integration with any Third-Party Service at any time without notice.",
    ],
  },
  {
    heading: "9. Prohibited Uses",
    paragraphs: [
      "You agree not to use the Services for any unlawful, abusive, or prohibited purpose, including but not limited to:",
    ],
    list: [
      "Engaging in money laundering, terrorist financing, sanctions evasion, fraud, or any illegal activity.",
      "Violating any applicable law, regulation, or third-party rights.",
      "Attempting to exploit, hack, reverse-engineer, decompile, or disassemble any part of the Services or underlying smart contracts.",
      "Using automated scripts, bots, or tools to interact with the Services in a manner not expressly authorized by Qdo.",
      "Manipulating prediction markets, engaging in wash trading, or artificially inflating referral metrics.",
      "Interfering with or disrupting the integrity or performance of the Services or related systems.",
      "Impersonating any person or entity, or misrepresenting your affiliation with any person or entity.",
    ],
  },
  {
    heading: "10. Intellectual Property",
    paragraphs: [
      "All intellectual property rights in the Services, including but not limited to the software, code, design, logos, trademarks, documentation, and content, are owned by or licensed to Qdo. Nothing in these Terms grants you any right, title, or interest in the Services or our intellectual property, except for the limited, non-exclusive, non-transferable, revocable license to use the Services in accordance with these Terms.",
      "You may not copy, modify, distribute, sell, or lease any part of the Services or included software, nor may you reverse-engineer or attempt to extract the source code of the software, unless applicable law expressly permits such activity.",
    ],
  },
  {
    heading: "11. Disclaimers",
    paragraphs: [
      'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.',
      "Without limiting the foregoing, Qdo does not warrant or represent that:",
    ],
    list: [
      "The Services will be uninterrupted, timely, secure, or error-free.",
      "The results obtained from the Services will be accurate or reliable.",
      "Any defects or errors in the Services will be corrected.",
      "The Services will be compatible with your device, operating system, or other software.",
    ],
  },
  {
    heading: "12. Limitation of Liability",
    paragraphs: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, QDO, ITS DIRECTORS, OFFICERS, EMPLOYEES, AFFILIATES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, DIGITAL ASSETS, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO USE) THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY.",
      "In no event shall Qdo's total aggregate liability to you for all claims arising out of or relating to these Terms or the Services exceed the greater of (a) the total fees paid by you to Qdo during the twelve (12) months preceding the event giving rise to the claim, or (b) one hundred United States dollars (USD $100).",
      "Some jurisdictions do not allow the exclusion or limitation of certain damages. In such jurisdictions, our liability shall be limited to the maximum extent permitted by law.",
    ],
  },
  {
    heading: "13. Indemnification",
    paragraphs: [
      "You agree to indemnify, defend, and hold harmless Qdo and its officers, directors, employees, agents, affiliates, and licensors from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your access to or use of the Services; (b) your violation of these Terms; (c) your violation of any applicable law, regulation, or third-party right; or (d) any content or data you submit or transmit through the Services.",
    ],
  },
  {
    heading: "14. Governing Law and Dispute Resolution",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Croc Networks Ltd is incorporated, without regard to conflict of law principles.",
      "Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall first be attempted to be resolved through good-faith negotiation between the parties for a period of thirty (30) days. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in accordance with the rules of the applicable arbitration body in the relevant jurisdiction.",
      "You agree that any dispute resolution proceedings will be conducted on an individual basis and not as part of a class, consolidated, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration against Qdo.",
    ],
  },
  {
    heading: "15. Termination",
    paragraphs: [
      "You may stop using the Services at any time. As a self-custody wallet, your Digital Assets remain under your control on the relevant blockchain networks regardless of whether you continue to use the Services.",
      "Qdo reserves the right to suspend, restrict, or terminate your access to the Services at any time, with or without cause, and with or without notice, including but not limited to situations where: (a) you breach these Terms; (b) we are required to do so by law, regulation, or court order; (c) we reasonably believe your use poses a security risk; or (d) we discontinue the Services.",
      "Upon termination, your right to use the Services ceases immediately. Provisions of these Terms that by their nature should survive termination shall survive, including but not limited to Sections 6, 11, 12, 13, 14, and 16.",
    ],
  },
  {
    heading: "16. Risk Disclosures",
    paragraphs: ["By using the Services, you acknowledge and accept the following risks:"],
    list: [
      "Digital Asset Volatility: The value of Digital Assets can fluctuate significantly. You may lose some or all of the value of your Digital Assets.",
      "Regulatory Risk: The regulatory environment for Digital Assets is evolving and varies by jurisdiction. Changes in laws or regulations may adversely affect the use, transfer, or value of Digital Assets.",
      "Technology Risk: Blockchain networks and smart contracts may contain bugs, vulnerabilities, or be subject to hacking, network congestion, or forks that could result in the loss of Digital Assets.",
      "Irreversibility of Transactions: Blockchain transactions are generally irreversible. Qdo cannot reverse, cancel, or refund any transaction once it has been broadcast to the blockchain.",
      "Smart Contract Risk: The smart contracts underlying Qdo's account abstraction, prediction markets, and other features may contain undiscovered vulnerabilities despite auditing.",
      "Oracle Risk: Prediction market resolution depends on third-party oracle data, which may be inaccurate, delayed, or manipulated.",
      "Loss of Access: Loss of your device, passkey credentials, or recovery methods may result in permanent, irrecoverable loss of access to your Digital Assets.",
    ],
  },
  {
    heading: "17. General Provisions",
    paragraphs: [],
  },
  {
    heading: "17.1 Entire Agreement",
    paragraphs: [
      "These Terms, together with the Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Qdo with respect to the Services and supersede all prior or contemporaneous agreements, understandings, and communications.",
    ],
  },
  {
    heading: "17.2 Severability",
    paragraphs: [
      "If any provision of these Terms is held to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
  {
    heading: "17.3 Waiver",
    paragraphs: [
      "The failure of Qdo to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
    ],
  },
  {
    heading: "17.4 Assignment",
    paragraphs: [
      "You may not assign or transfer your rights or obligations under these Terms without Qdo's prior written consent. Qdo may assign its rights and obligations under these Terms without restriction.",
    ],
  },
  {
    heading: "17.5 Force Majeure",
    paragraphs: [
      "Qdo shall not be liable for any delay or failure to perform resulting from causes outside its reasonable control, including but not limited to natural disasters, war, terrorism, epidemics, government actions, blockchain network failures, or internet outages.",
    ],
  },
  {
    heading: "17.6 No Agency",
    paragraphs: [
      "Nothing in these Terms creates any agency, partnership, joint venture, or employment relationship between you and Qdo.",
    ],
  },
  {
    heading: "17.7 Ownership",
    paragraphs: [
      "Qdo Wallet and all its future developments is fully owned and operated by Navan Consultancy LLC-FZ 2536660, registered in Meydan FZ, Dubai, UAE. www.nvn.tech",
    ],
  },
  {
    heading: "18. Contact Information",
    paragraphs: [
      "If you have any questions, concerns, or complaints regarding these Terms or the Services, please contact us at:",
      "Qdo Tech LLC",
      "Email: info@qdo.xyz",
      "Website: https://qdo.xyz",
    ],
  },
];

export const TermsPage = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <header className="sticky top-0 z-30 w-full border-b border-[#0000001f] bg-white">
        <div className="mx-auto flex h-20 w-full max-w-none items-center px-4 sm:px-6 lg:px-16 xl:px-40">
          <Link
            href="/"
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d6c] focus-visible:ring-offset-2"
            aria-label="Qdo home"
          >
            <img
              className="h-8 w-auto sm:h-10"
              alt="Qdo"
              src="/figmaAssets/group-1.png"
            />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:py-20">
        <div className="mb-10 flex flex-col gap-3">
          <p className="[font-family:'Poppins',Helvetica] text-sm font-medium uppercase tracking-[0.18em] text-[#659acd]">
            QDO Wallet
          </p>
          <h1 className="[font-family:'Poppins_Latin-Bold',Helvetica] text-4xl font-bold leading-[1.15] tracking-[-0.01em] text-[#061237] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="[font-family:'Poppins',Helvetica] text-sm text-[#00000099]">
            Last Updated: April 2026
          </p>
        </div>

        <article className="flex flex-col gap-8 [font-family:'Poppins_Latin-Regular',Helvetica] text-base leading-[1.7] text-[#1a1a1a]">
          {sections.map((section, idx) => (
            <section key={idx} className="flex flex-col gap-4">
              {section.heading ? (
                <h2 className="[font-family:'Poppins_Latin-SemiBold',Helvetica] text-xl font-semibold leading-tight tracking-[0] text-[#1a3d6c] sm:text-2xl">
                  {section.heading}
                </h2>
              ) : null}
              {section.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx} className="text-[#1a1a1a]/85">
                  {paragraph}
                </p>
              ))}
              {section.list ? (
                <ul className="ml-5 flex list-disc flex-col gap-3 text-[#1a1a1a]/85 marker:text-[#659acd]">
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx} className="pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-2xl border border-[#1a3d6c] bg-white px-6 py-3 [font-family:'Poppins',Helvetica] text-base font-medium text-[#1a3d6c] transition-colors hover:bg-[#f5f9ff]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
