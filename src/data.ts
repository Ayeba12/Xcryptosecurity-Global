import { CryptoScam, RoadmapStep, LocalExchange, P2PChecklistItem } from './types';

// News items for the moving banner ticker
export const tickerNews = [
  "🚨 INBOUND SCAM WARNING: Active 'Address Poisoning' bots targeting high-frequency users in EVM networks.",
  "🇳🇬 SEC NIGERIA ADVISORY: Always verify registration on SEC's licensed VASPs portal before investing.",
  "⛓️ SECURITY PROTOCOL: Never capture seed phrases on your phone's screenshot or clipboard managers.",
  "⚠️ PHISHING ALERT: Malicious copycats of Luno and Quidax mobile apps detected on unofficial app stores.",
  "🔒 WALLET MASTERCLASS: Cold storage remains the ultimate shield. Revoke Smart Contract approvals weekly."
];

// Education roadmap steps for "Start Here"
export const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "1. SET UP IMMUTABLE COLD STORAGE",
    description: "The hard boundary between your assets and the internet. Explore how cold hardware wallets secure the physical environment.",
    subtext: "STEP 1 OF THE IMMUTABLE PROTOCOL",
    readTime: "7 min read",
    points: [
      "Hardware wallets keep private keys completely offline.",
      "The host screen must always be used to verify destination addresses, not your computer monitor (malware can hijack your clipboard).",
      "Reject pre-configured hardware cards; always generate a clean, random 24-word seed recovery phrase on the physical device itself.",
      "Store recovery phrases separately from the device."
    ],
    imageSrc: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Crypto hardware safety cold storage setup"
  },
  {
    id: 2,
    title: "2. HARDEN SEED PHRASE REDUNDANCY",
    description: "The 12 or 24 words represent ultimate ownership. Learn physical protection rules that bulletproof your seed redundancy.",
    subtext: "STEP 2 OF THE IMMUTABLE PROTOCOL",
    readTime: "5 min read",
    points: [
      "No digital storage. Never take photos, screenshot, type on sticky notes on desktop, or send seed phrases via chat apps.",
      "Consider premium solid-steel backing plates (e.g., Cryptosteel) to survive fires, high heat, and extreme chemical damage.",
      "Implement split configurations (e.g., store 12 words in Vault A, other 12 words in Vault B) only if using math-proven multi-sig setups.",
      "Do not tell family or friends the exact stash coordinates, but draft explicit inheritance protocols in sealed legal envelopes."
    ],
    imageSrc: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Cryptographic steel backup plates and key records"
  },
  {
    id: 3,
    title: "3. AUDIT DESKTOP INTEGRATIONS & Extensions",
    description: "How browser interfaces communicate with network nodes. Implement restrictive policies to shut down malicious script extensions.",
    subtext: "STEP 3 OF THE IMMUTABLE PROTOCOL",
    readTime: "6 min read",
    points: [
      "Dedicate an exclusive, sandboxed browser profile for crypto operations (disable all other unnecessary extensions).",
      "Enable hardware token 2FA (Yubikey) on all major connected exchanges. SMS-based 2FA is highly vulnerable to SIM swap attacks.",
      "Always bookmark important Web3 decentralized hubs (DeFi, staking). Cybercriminals run paid search ads with matching domain typos.",
      "Strictly check smart contract allowance levels. Regularly use tools like revoke.cash to clean unused token approvals."
    ],
    imageSrc: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Web dashboard security verification graphics"
  },
  {
    id: 4,
    title: "4. MASTER CONTRACT VERIFICATION & DECENTRALIZED INTERACTIONS",
    description: "The final layer of execution. Learn how to parse raw hex approvals, verify hashes, and inspect contract states.",
    subtext: "STEP 4 OF THE IMMUTABLE PROTOCOL",
    readTime: "8 min read",
    points: [
      "Understand standard token approvals: 'Approve Unlimited' exposes your entire wallet balance to the target contract's vulnerabilities.",
      "Inspect source code status. Authentic Web3 dapps have verified open-source representations on block explorers like Etherscan or BscScan.",
      "Observe transaction simulations inside modern software interfaces. If estimated gas fee is abnormal, do not sign.",
      "Use cold wallets for storage and disposable 'burn wallets' for experimental minting or decentralized Web3 testing."
    ],
    imageSrc: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600",
    imageAlt: "Command line interface blockchain raw data analysis"
  }
];

// Active Security Scams Database
export const scamsDatabase: CryptoScam[] = [
  {
    id: "scam-ice-phishing",
    title: "The 'Ice Phishing' Smart Contract Trap",
    subtitle: "Dapp Permissions Abuse Protocol",
    category: "phishing",
    severity: "CRITICAL",
    description: "Unlike traditional phishing that steals passwords, Ice Phishing tricks you into signing a malicious transaction approval, granting full transfer rights of all your tokens to the scammer's wallet.",
    details: "Attack vectors: A fake website mimics a legitimate staking pool or NFT giveaway. Instead of calling standard interactions, it asks the user to approve high allowances on the USDT or native token address. Once signed, the scammer draws out assets synchronously. Prevention: Never sign 'DecreaseAllowance' or 'Approve' payloads on unverified sites. Always use a revocation tool to erase approvals.",
    iconName: "ShieldAlert"
  },
  {
    id: "scam-address-poisoning",
    title: "Address Poisoning (EVM Copycats)",
    subtitle: "Exploiting Human Visual Laziness",
    category: "poisoning",
    severity: "ACTIVE",
    description: "Malicious bots scan high-volume accounts and send dust transactions (worth $0) from an address containing the very same first and last 5 letters as your common counterpart, hoping you blindly copy it from history.",
    details: "How it works: Scammers generate millions of addresses until they find matches that mimic yours. They send a tiny amount. The next time you quickly click transaction history to copy the destination, you grab their address. Prevention: Pin verified contacts. Always inspect the full 42 hexadecimal digits before pressing send, never just the first and last characters.",
    iconName: "Binary"
  },
  {
    id: "scam-elon-giveaway",
    title: "Deepfake AI & Social 'Giveaway' Scams",
    subtitle: "Synthesized Impersonator Streams",
    category: "giveaway",
    severity: "MODERATE",
    description: "Impersonators stream looped videos of crypto founders on YouTube or social platforms offering to 'double your deposit' instantly. Hundreds of thousands in assets are sent directly to fixed ledger addresses.",
    details: "How it works: High-profile accounts are hijacked and broadcast deepfake promotional materials. They present a beautiful QR code or address promising immediate smart returns. There are no returns; the funds are split and moved instantly. Prevention: Genuine builders never run matches or double reward programs. Treat any free distribution requiring an initial deposit as instant fraud.",
    iconName: "Video"
  },
  {
    id: "scam-clipboard-malware",
    title: "Clipboard Hijacking Crypto Malware",
    subtitle: "Silent Background Script Interception",
    category: "malware",
    severity: "CRITICAL",
    description: "Silent trojans install on browser clients or desktop devices. When the script detects a standard cryptographic address sequence in your clipboard, it replaces it instantly with the scammer's destination.",
    details: "Details: Spread via cracked game updates, fake torrent packages, or custom chromium extension stores. When you hit copy on Etherscan and paste into Metamask, it looks similar but redirects all assets directly to a dark liquidity mixer. Prevention: Double-check physical addresses on hardware monitors. Use custom sandbox operating systems or physical verification tags.",
    iconName: "Terminal"
  },
  {
    id: "scam-support-impersonation",
    title: "Vocal Admin Impersonation",
    subtitle: "Fake Telegram and Discord Moderation",
    category: "impersonation",
    severity: "MODERATE",
    description: "Fraudsters lurk in popular Telegram channels or Discord servers, and DM users experiencing technical errors under full replica admin tags, requesting wallet setups to restore their dashboard.",
    details: "How it works: Standard scammers mimic profile bios, logos, and support lines. They direct users to custom 'onboarding forms' that request their 12-word seed recovery phrase or API dashboard tokens to analyze logs. Prevention: Admins never send direct private messages first. Never input recovery phrases on any visual page or form.",
    iconName: "MessageCircleWarning"
  }
];

// Licensed / Active Exchanges in Nigeria Focus
export const nigerianExchanges: LocalExchange[] = [
  {
    id: "ex-quidax",
    name: "Quidax Exchange",
    status: "SAFE",
    rating: 4.8,
    description: "The first indigenous digital asset platform to capture official provisional licensing from Nigeria's SEC (Securities and Exchange Commission). Highly tailored for clean local fiat gateway activities.",
    pros: [
      "Officially registered with provisional SEC licensing.",
      "Instant naira (NGN) peer-to-peer integrated checkout system.",
      "High liquidity margins on major global pairs (BTC, USDT)."
    ],
    supportStatus: "Active 24/7 dedicated local support lanes.",
    liquidity: "VERY HIGH (Local)",
    badgeColorClass: "border-brand-tertiary bg-[#d2ffdb] text-brand-tertiary",
    alerts: "Ensure you only utilize the official app store build. Do not proceed under third-party agent links."
  },
  {
    id: "ex-luno",
    name: "Luno Nigeria",
    status: "SECURED",
    rating: 4.5,
    description: "A secure global asset veteran with a stellar reputation in Nigeria for educational transparency and bank-grade custody frameworks. Operates with rigid regulatory compliance focus.",
    pros: [
      "Rigorous institutional-grade assets protection strategies.",
      "Clear visual indicators for beginners with detailed help centers.",
      "Excellent historical record of transaction safety."
    ],
    supportStatus: "Email, interactive live FAQ assistance.",
    liquidity: "HIGH",
    badgeColorClass: "border-[#0040e0] bg-[#eef3ff] text-[#0040e0]",
    alerts: "Limit use to mainstream tokens. Excellent for high-durability long-term storage safety."
  },
  {
    id: "ex-binance",
    name: "Binance P2P",
    status: "CAUTION",
    rating: 3.9,
    description: "While containing the absolute highest liquidity for local peer-to-peer traders, international regulatory actions and localized bans require strict care. High scam risks in trading channels.",
    pros: [
      "Infinite asset combinations and ultimate depth volumes.",
      "Vibrant competitive P2P naira merchant index."
    ],
    supportStatus: "Automated center dashboard with standard wait lines.",
    liquidity: "MAXIMUM (Global)",
    badgeColorClass: "border-[#ab3600] bg-[#fff0ea] text-[#ab3600]",
    alerts: "High risk of trade scam disputes. Utilize maximum validation protocols before matching Nigeria merchants."
  }
];

// 12-point P2P Safety Checklist specifically for Nigerian P2P traders
export const p2pSafetyChecklist: P2PChecklistItem[] = [
  { id: "p2p-name-match", text: "Match Verified Names: NEVER transfer local naira funds to accounts where the name does not match the customer's verified platform name.", isImportant: true },
  { id: "p2p-chat-scams", text: "Ignore Chat Directives: Reject merchants who write 'Charge 1% extra fee' or ask for contact details to arrange transactions outside the official application framework.", isImportant: true },
  { id: "p2p-third-party", text: "Ban Third-Party Escrow: Never accept a payment that comes from a different individual's legal bank account. Reject and file a service dispute.", isImportant: true },
  { id: "p2p-release-funds", text: "Never Pre-Release: Do not tap the 'Confirm Received' or 'Release' button until you verify the exact naira balance in your physical bank dashboard. Screenshots can be forged.", isImportant: true },
  { id: "p2p-chargebacks", text: "Avoid Transaction Remarks: Never include crypto terms ('crypto', 'BTC', 'USDT') in the banking transfer description. It triggers automatic bank compliance holds.", isImportant: true },
  { id: "p2p-merchant-rating", text: "Harden Merchant Filtration: Only trade with established merchants who have completed more than 500 orders with a success rate above 97%.", isImportant: false },
  { id: "p2p-phone-scams", text: "Ignore Voice Calls claiming to be 'Dapp Support' asking you to cancel the transaction. Scammers try to panic you.", isImportant: false },
  { id: "p2p-faked-sms", text: "Fake SMS Alert Validation: Always double check your official bank app balance. Do not trust incoming SMS notifications that look like transaction alerts.", isImportant: true },
  { id: "p2p-small-test", text: "Run Initial Trial Trades: Start with minor naira values to confirm fast processing and clean response patterns.", isImportant: false },
  { id: "p2p-support-dispute", text: "Record Video & Screenshots of your transfers. Use the platform's official dispute channels immediately if any issue pops up.", isImportant: false },
  { id: "p2p-safe-connection", text: "Disconnect public Wi-Fi profiles; do not enter banking credentials on unsecured networks.", isImportant: false },
  { id: "p2p-fast-processing", text: "Observe the settlement timer carefully. Auto-cancel if the counterparty goes silent for more than 15 minutes.", isImportant: false }
];
