import { useEffect } from "react";
import { Link } from "wouter";

type TableRow = { category: string; data: string; purpose: string };

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { columns: [string, string, string]; rows: TableRow[] };
};

const sections: Section[] = [
  {
    heading: "",
    paragraphs: [
      'This Privacy Policy ("Policy") describes how Qdo Tech LLC, doing business as Qdo Wallet ("Qdo," "we," "us," or "our"), collects, uses, stores, shares, and protects your personal information ("Personal Data") when you access or use our website (qdo.xyz), mobile applications, browser extensions, and related products and services (collectively, the "Services").',
      "By accessing or using our Services, you acknowledge that you have read and understood this Policy and consent to the collection, processing, storage, and transfer of your Personal Data as described herein. This Policy applies in conjunction with our Terms of Service and any other applicable agreements.",
      "Qdo Wallet is a self-custody wallet. We are committed to data minimization and collect only the information strictly necessary to provide and improve our Services. We do not store your private keys, passkey credentials, or wallet recovery information on our servers at any time.",
    ],
  },
  {
    heading: "1. Our Relationship with You",
    paragraphs: [
      "Your right to privacy and the protection of your Personal Data is of fundamental importance to Qdo. We act as the Data Controller for Personal Data processed through our Services. We are committed to transparency in our data practices and will only collect data when it is strictly necessary to deliver, secure, and improve our Services.",
      "By using Qdo's Services — including visiting our website, using our mobile application, interacting on social media or community channels, or participating in events — you acknowledge and accept the practices described in this Policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    paragraphs: [
      "We collect information in the following categories. Following the principle of data minimization, we endeavor to collect only the minimum amount of data necessary to provide our Services.",
    ],
  },
  {
    heading: "2.1 When You Use the Qdo Wallet Application",
    paragraphs: [
      "As a self-custody wallet user, your wallet is created and managed locally on your device. We do not collect your private keys, passkey credentials, seed phrases, or wallet passwords.",
    ],
    table: {
      columns: ["Category", "Types of Data", "Purpose"],
      rows: [
        {
          category: "Wallet Information",
          data: "Public wallet address (on-chain). Your private keys and passkey credentials are stored locally on your device and are never transmitted to Qdo.",
          purpose:
            "To facilitate wallet functionality, display balances, and enable transaction broadcasting to blockchain networks.",
        },
        {
          category: "Transaction Information",
          data: "On-chain transaction data including timestamps, public wallet addresses, transaction amounts, and token types. This data is publicly available on the blockchain.",
          purpose:
            "To display transaction history, facilitate transaction execution, and provide portfolio analytics within the application.",
        },
        {
          category: "Device Information",
          data: "Device model, operating system and version, app version, unique device identifiers, language and locale settings.",
          purpose:
            "To deliver and optimize the application, provide technical support, ensure compatibility, and detect security threats.",
        },
        {
          category: "Usage Data",
          data: "Feature usage patterns, screen views, interaction data, session duration, crash logs, and performance metrics.",
          purpose:
            "To improve the user experience, diagnose technical issues, and inform product development.",
        },
        {
          category: "Passkey Metadata",
          data: "Authentication event metadata (success/failure status, timestamps). The passkey credential itself is never transmitted to or stored by Qdo.",
          purpose: "To ensure the security and integrity of authentication processes.",
        },
      ],
    },
  },
  {
    heading: "2.2 When You Use Specific Features",
    table: {
      columns: ["Feature", "Additional Data Collected", "Purpose"],
      rows: [
        {
          category: "Swap Transactions",
          data: "Swap parameters (token pairs, amounts, slippage settings), selected DEX aggregator routes.",
          purpose:
            "To route swap requests to third-party DEX aggregators and display transaction results.",
        },
        {
          category: "Fiat On/Off Ramp",
          data: "Data collected by the third-party fiat provider (which may include identity verification data, payment information). Qdo does not directly collect or store this data.",
          purpose:
            "To facilitate the integration with third-party fiat service providers. KYC/AML data is processed directly by the third-party provider.",
        },
        {
          category: "Prediction Markets",
          data: "Position data (market selections, collateral amounts, outcomes), market interaction history.",
          purpose:
            "To facilitate prediction market participation, display position status, and process settlements.",
        },
        {
          category: "Referral Program",
          data: "Referral codes, referrer/referee wallet addresses, referral activity metrics.",
          purpose:
            "To track referral relationships, calculate and distribute referral rewards, and detect fraudulent activity.",
        },
        {
          category: "AI Features",
          data: "Natural language inputs, transaction intent data, interaction patterns with AI features.",
          purpose:
            "To process natural language commands, generate transaction suggestions, provide scam detection alerts, and improve AI model performance.",
        },
      ],
    },
  },
  {
    heading: "2.3 When You Visit Our Website",
    table: {
      columns: ["Category", "Types of Data", "Purpose"],
      rows: [
        {
          category: "Contact Information",
          data: "Email address, name, or other information you voluntarily provide when contacting support or subscribing to communications.",
          purpose:
            "To respond to inquiries, provide customer support, and send requested communications.",
        },
        {
          category: "Technical Data",
          data: "IP address, browser type and version, operating system, referral URLs, pages visited, time spent on pages.",
          purpose:
            "To maintain website security, analyze usage patterns, and improve website performance.",
        },
        {
          category: "Cookie Data",
          data: "Functional and analytics cookies, as described in Section 3.",
          purpose: "To ensure website functionality and improve user experience.",
        },
      ],
    },
  },
  {
    heading: "2.4 Information Collected Automatically",
    paragraphs: [
      "Certain information is collected automatically when you interact with the Services, including IP address (which may be anonymized), device and browser fingerprint data, access timestamps, and error/crash reports. We use this data solely for security monitoring, fraud prevention, and service improvement.",
    ],
  },
  {
    heading: "2.5 Information We Do Not Collect",
    paragraphs: ["Qdo Wallet does not collect or store:"],
    list: [
      "Private keys or passkey credentials",
      "Seed phrases, mnemonic words, or wallet recovery secrets",
      "Wallet passwords or PINs",
      "Biometric data (biometric authentication is processed entirely on your device)",
      "Government-issued identification documents (KYC data for fiat services is collected directly by third-party providers, not by Qdo)",
      "Bank account numbers, credit card numbers, or payment credentials",
    ],
  },
  {
    heading: "3. Use of Cookies and Similar Technologies",
    paragraphs: [
      "Our website and application may use cookies and similar tracking technologies to enhance your experience. Cookies are small data files stored on your device.",
      "We use the following types of cookies:",
    ],
    list: [
      "Strictly Necessary Cookies: Required for the operation of the website. These cannot be disabled.",
      "Analytics Cookies: Used to understand how visitors interact with the website, helping us improve functionality and content. These are anonymized where possible.",
      "Preference Cookies: Used to remember your settings and preferences (such as language and theme selection).",
    ],
  },
  {
    heading: "",
    paragraphs: [
      "We do not use advertising or targeted marketing cookies. You can manage your cookie preferences through your browser settings or through our cookie consent mechanism on the website. Disabling certain cookies may affect the functionality of the Services.",
    ],
  },
  {
    heading: "4. How We Use Your Personal Data",
    paragraphs: ["We use your Personal Data for the following purposes:"],
    list: [
      "Service Delivery: To provide, maintain, and operate the Services, including wallet functionality, transaction broadcasting, swap routing, prediction market settlement, and referral tracking.",
      "Security and Fraud Prevention: To detect, prevent, and respond to fraud, abuse, security incidents, and illegal activity. This includes AI-powered scam detection features.",
      "Service Improvement: To analyze usage patterns, diagnose issues, conduct internal research, and develop new features.",
      "Communications: To send important notices, software updates, security alerts, and support-related communications. We will only send marketing communications with your explicit consent.",
      "Legal Compliance: To comply with applicable laws, regulations, legal processes, or governmental requests.",
      "AI Feature Improvement: To train and improve AI models used within the Services, using aggregated and anonymized interaction data. Individual personal data is not used for AI training without explicit consent.",
    ],
  },
  {
    heading: "5. How and Why We Share Your Data",
    paragraphs: [
      "We do not sell, trade, or rent your Personal Data to third parties. We may share your data in the following circumstances:",
    ],
    list: [
      "Third-Party Service Providers: We share data with service providers who assist in operating the Services, including hosting providers, analytics services, customer support tools, and infrastructure providers. These providers are contractually obligated to process your data only on our behalf and in accordance with this Policy.",
      "Fiat On/Off Ramp Partners: When you use fiat services, you interact directly with third-party providers who collect and process your data under their own privacy policies. Qdo facilitates the integration but does not receive or store your KYC or payment data.",
      "DEX Aggregator Providers: Swap transaction parameters are transmitted to third-party DEX aggregators to execute your swap requests.",
      "Blockchain Networks: Transaction data broadcast to blockchain networks becomes publicly visible. Qdo has no control over the public nature of blockchain data.",
      "Legal Requirements: We may disclose your data if required by law, regulation, subpoena, court order, or governmental request, or if we believe disclosure is necessary to protect our rights, the safety of our users, or the public interest.",
      "Business Transfers: In connection with a merger, acquisition, reorganization, sale of assets, or bankruptcy, your data may be transferred as part of the transaction. We will notify you of any such transfer and any choices you may have regarding your data.",
      "With Your Consent: We may share your data with third parties when you have given us explicit consent to do so.",
    ],
  },
  {
    heading: "6. International Transfer of Personal Data",
    paragraphs: [
      "Your Personal Data may be transferred to, stored, and processed in countries other than your country of residence. These countries may have data protection laws that differ from the laws of your country. When we transfer data internationally, we implement appropriate safeguards to ensure your data remains protected, including standard contractual clauses, data processing agreements, or other legally recognized transfer mechanisms.",
    ],
  },
  {
    heading: "7. Data Security",
    paragraphs: [
      "We implement industry-standard technical and organizational security measures to protect your Personal Data against unauthorized access, alteration, disclosure, or destruction. These measures include:",
    ],
    list: [
      "Encryption of data in transit (TLS/SSL) and at rest.",
      "Access controls and authentication requirements for internal systems.",
      "Regular security assessments, penetration testing, and code audits.",
      "Employee training on data protection and security best practices.",
      "Incident response procedures for potential data breaches.",
    ],
  },
  {
    heading: "",
    paragraphs: [
      "While we strive to protect your Personal Data, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security. You are responsible for maintaining the security of your device, passkey credentials, and any recovery methods associated with your wallet.",
    ],
  },
  {
    heading: "8. Data Retention",
    paragraphs: [
      "We retain your Personal Data only for as long as necessary to fulfill the purposes described in this Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Specific retention periods depend on the type of data and the purpose for which it was collected:",
    ],
    list: [
      "Usage and analytics data: Retained for up to 24 months, then aggregated or deleted.",
      "Support correspondence: Retained for up to 36 months after resolution.",
      "Legal and compliance records: Retained as required by applicable law.",
    ],
  },
  {
    heading: "",
    paragraphs: [
      "On-chain data (such as public wallet addresses and transaction records) is permanently recorded on the blockchain and cannot be deleted by Qdo or any party.",
    ],
  },
  {
    heading: "9. Your Privacy Rights",
    paragraphs: [
      "Depending on your jurisdiction, you may have the following rights with respect to your Personal Data:",
    ],
    list: [
      "Right to Access: Request a copy of the Personal Data we hold about you.",
      "Right to Rectification: Request correction of inaccurate or incomplete Personal Data.",
      "Right to Erasure: Request deletion of your Personal Data, subject to legal retention requirements. Note that on-chain data cannot be deleted.",
      "Right to Restriction: Request that we restrict the processing of your Personal Data under certain circumstances.",
      "Right to Portability: Request a machine-readable copy of your Personal Data for transfer to another service.",
      "Right to Object: Object to the processing of your Personal Data for certain purposes, including direct marketing.",
      "Right to Withdraw Consent: Where processing is based on consent, you have the right to withdraw your consent at any time without affecting the lawfulness of prior processing.",
    ],
  },
  {
    heading: "",
    paragraphs: [
      "To exercise any of these rights, please contact us using the details provided in Section 13. We will respond to your request within the timeframes required by applicable law.",
    ],
  },
  {
    heading: "10. Children's Privacy",
    paragraphs: [
      "Our Services are not intended for individuals under the age of eighteen (18) or the age of legal majority in their jurisdiction, whichever is greater. We do not knowingly collect Personal Data from minors. If we become aware that we have collected Personal Data from a minor, we will take immediate steps to delete such data. If you believe a minor has provided us with Personal Data, please contact us immediately.",
    ],
  },
  {
    heading: "11. Third-Party Links and Services",
    paragraphs: [
      "The Services may contain links to or integrations with third-party websites, applications, and services that are not operated by Qdo. This includes DEX aggregators, fiat ramp providers, blockchain explorers, and DeFi protocols. We are not responsible for the privacy practices or content of these third-party services. We encourage you to review the privacy policies of any third-party service before providing personal information or using their services.",
      "When you access third-party services through the Qdo application, our Privacy Policy no longer applies to data collected by those services. You are solely responsible for understanding and accepting the privacy practices of third-party services.",
    ],
  },
  {
    heading: "12. Changes to This Policy",
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or for other operational reasons. If we make material changes, we will notify you by posting the updated Policy on our website, within the application, or through other reasonable means of communication. The "Last Updated" date at the top of this Policy indicates when the most recent revisions were made.',
      "Your continued use of the Services after any changes to this Policy constitutes your acceptance of the updated Policy. If you do not agree with the revised Policy, you must stop using the Services.",
    ],
  },
  {
    heading: "13. Contact Information",
    paragraphs: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or the processing of your Personal Data, please contact us at:",
      "Qdo Tech LLC (Qdo Wallet)",
      "Email: info@qdo.xyz",
      "Website: https://qdo.xyz",
      "We will endeavor to respond to all privacy-related inquiries within thirty (30) days of receipt.",
    ],
  },
];

export const PrivacyPage = (): JSX.Element => {
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
            Privacy Policy
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
              {section.paragraphs?.map((paragraph, pIdx) => (
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
              {section.table ? (
                <div className="mt-2 flex flex-col gap-4">
                  {section.table.rows.map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="rounded-2xl border border-[#0000001a] bg-[#f7faff] p-5 sm:p-6"
                    >
                      <p className="[font-family:'Poppins_Latin-SemiBold',Helvetica] text-base font-semibold text-[#061237]">
                        {row.category}
                      </p>
                      <div className="mt-3 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="[font-family:'Poppins',Helvetica] text-xs font-medium uppercase tracking-[0.12em] text-[#659acd]">
                            {section.table!.columns[1]}
                          </p>
                          <p className="mt-1.5 text-sm leading-[1.6] text-[#1a1a1a]/85">
                            {row.data}
                          </p>
                        </div>
                        <div>
                          <p className="[font-family:'Poppins',Helvetica] text-xs font-medium uppercase tracking-[0.12em] text-[#659acd]">
                            {section.table!.columns[2]}
                          </p>
                          <p className="mt-1.5 text-sm leading-[1.6] text-[#1a1a1a]/85">
                            {row.purpose}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default PrivacyPage;
