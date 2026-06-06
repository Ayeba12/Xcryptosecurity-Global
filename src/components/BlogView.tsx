import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/LanguageContext';
import { blogPosts } from '../extendedData';
import { BlogPost } from '../types';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';
import { 
  Radio, 
  User, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  Tag, 
  ShieldCheck, 
  Search, 
  Filter, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  CheckCircle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb,
  Shield,
  Coins,
  ArrowUpRight,
  Share2,
  Printer,
  Bookmark,
  Award,
  Copy,
  Check,
  Flame,
  Fingerprint,
  Twitter,
  Linkedin,
  Send
} from 'lucide-react';
import { checkAddressSecurity, checkTokenSecurity } from '../utils/goplusApi';
import { jsPDF } from 'jspdf';
import { GlossaryText } from './GlossarySystem';

// Live interactive tutorial guides data
interface TutorialGuide {
  id: string;
  topic: string;
  category: string;
  difficulty: string;
  steps: string[];
  tips: string;
}

const SECURITY_TUTORIALS: TutorialGuide[] = [
  {
    id: "admin-check",
    category: "Security Checks",
    topic: "How to Spot a Fake Telegram/Discord Admin in 5 Seconds",
    difficulty: "Beginner",
    steps: [
      "Check the username handle vs the official member list strictly. Fake admins replace lowercase 'L' (l) with uppercase 'i' (I), or add hidden symbols like '_support' or '_bot'.",
      "Notice the contact initiative: Legitimate Admins never DM you first. If they start a conversation with 'Hello, did you successfully resolve your calibration task?', it is instantly fraudulent.",
      "Never accept files with extensions like .exe, .dmg, .apk, .zip, or connect your wallets to validation mirrors sent via DM."
    ],
    tips: "Pro Tip: Set your privacy settings on Telegram so that only verified mutual contacts can add you to unknown crypto channels or group chats automatically."
  },
  {
    id: "allowance-audit",
    category: "Smart Contracts",
    topic: "How to Identify & Revoke Malicious ERC-20 Unlimited Approvals",
    difficulty: "Intermediate",
    steps: [
      "Identify the signature type. When a web3 app prompts for signing a transaction, look closely for the 'approve()' or 'increaseAllowance()' standard calling signature.",
      "Inspect the amount indicator. If the transaction screen says 'Approve standard spender to access Unlimited USDT' (or has numerical hashes like 0xffffff...), you are signing over full assets control.",
      "Use verified web3 revocation hubs (like revoke.cash or official chain explorer contract tabs) periodically to clear out dormant smart addresses."
    ],
    tips: "Security Anchor: Keep distinct cold hardware wallets separated from active interaction hubs to lock down core savings from dynamic web approvals."
  },
  {
    id: "poisoning-defense",
    category: "Coins & Ledger",
    topic: "How to Intercept & Avoid Address-Poisoning Transfer Vectors",
    difficulty: "Advanced",
    steps: [
      "Confirm both start and end characters physically. Address-poisoners generate mock addresses that tail-match your real frequently used wallets.",
      "Check your historic feeds. Poisoners send 0 USDT or minuscule coin dust transactions to inject their look-alike addresses directly into your system's paste list.",
      "Secure alternative pathways: Instead of copying recipient wallets from previous transaction columns, utilize decentralized domain maps (like ENS or CNS) or save authorized address books directly."
    ],
    tips: "Hardware Rule: Verify every single digit of the destinatary string directly on your cold signer screen before approving. Never rely on keyboard clipboards."
  }
];

// Interactive Security Quizzes mapped to individual Blog Post IDs
interface SecurityQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZZES_BY_POST: Record<string, SecurityQuiz> = {
  "blog-scam-reversals": {
    question: "A service on Instagram claims they can hack a scammer's smart contract and recover your 500 USDT if you pay a $50 'network execution contract gas deposit' first. What is this?",
    options: [
      "A legitimate recovery action; blockchain networks always require execution gas for recoveries.",
      "A classic secondary 'Recovery Scam'; blockchains are mathematically immutable and recovery hacks are cryptographic impossibilities.",
      "A temporary escrow fee that is fully refunded after the token trace completes."
    ],
    correctIndex: 1,
    explanation: "Once a transaction is finalized on an immutable public blockchain, it cannot be reversed. Any service requesting upfront payments for physical coin recoveries is a fraudulent secondary trap."
  },
  "blog-p2p-naira-compliance": {
    question: "You are engaging in a P2P transaction in Nigeria, and the buyer requests you to type 'Crypto USDT settlement' or 'Naira web3 purchase' directly into the standard bank wire reference layout. What is the correct response?",
    options: [
      "Agree immediately; clear transaction descriptions prevent customer disputes.",
      "Decline and require a clean, blank reference or standard random numerical ID. Any crypto-related text references prompt automated bank account blocks under regulatory rules.",
      "Ask them to send the reference text via Telegram instead of typing it on-chain."
    ],
    correctIndex: 1,
    explanation: "Domestic fiat banking channels in certain regimes operate under strict regulatory supervision. Including crypto keywords inside manual wire reference fields triggers automated anti-money laundering blocklists."
  },
  "blog-mica-era-stablecoins": {
    question: "Under the upcoming European Union MiCA architecture, how will non-compliant stablecoins (like uncertified USD products) be restricted for retail users?",
    options: [
      "All non-compliant stablecoin wallets will be permanently confiscated and burned under EU custody laws.",
      "Trading volumes and redemption operations are capped daily (e.g. 200 million Euros) to prioritize certified compliant stablecoin products (like certified USDC and EURC equivalents).",
      "Retailers will be fined 15% of their net worth for holding non-certified stablecoins."
    ],
    correctIndex: 1,
    explanation: "MiCA regulates daily trading volumes for non-compliant USD-pegged stablecoins (limiting active usage to €200M/day) to safeguard local financial stability and encourage compliant alternatives."
  },
  "blog-meme-coin-fomo": {
    question: "You copy a viral meme coin token address, paste it into UniSwap, and get: 'Fail: TransferHelper_transferFrom failed'. You can buy but cannot sell. What is the likely smart contract issue?",
    options: [
      "The overall blockchain is congested. Try setting gas fee slippage limits to 99%.",
      "The token has an active 'honeypot' mechanism where developer settings modify ERC-20 transfer permissions, only allowing whitelisted accounts to sell.",
      "Your hot wallet does not hold sufficient native gas tokens to prove liquidity reserves."
    ],
    correctIndex: 1,
    explanation: "Honeypots are malicious contracts modified by creators to collect funds while blocking general accounts from calling 'sell' or transfer actions."
  },
  "blog-web3-phishing-defense": {
    question: "A DApp asks you for a 'permit' signature, which does not require gas execution. You sign it. What was the risk of this gasless prompt?",
    options: [
      "Zero risk; since it doesn't execute an active gas fee, it cannot compromise native crypto reserves.",
      "High risk; modern ERC-2612 permit messages allow standard spenders to transfer your entire asset balance off-chain without needing gas signatures.",
      "Medium risk; it only connects your screen layout to the public node tracker."
    ],
    correctIndex: 1,
    explanation: "Permit messages allow gasless off-chain approvals that grant complete spend authority of stablecoins to malicious contract spenders."
  },
  "blog-stablecoin-reserve-integrity": {
    question: "What distinguishes fully dollar-collateralized assets like USDC from decentralized synthetic stablecoin pegs like DAI during severe market crashes?",
    options: [
      "Fiat tokens are backed by liquid cash/US treasuries audited by accounting firms, whereas synthetic stablecoins rely on dynamic over-collateralization algorithms of onchain assets.",
      "Decentralized stablecoins have physical vaults containing genuine gold certificates stored in Switzerland.",
      "Fiat tokens are automatically backed by local gold mines, making them immune to absolute coin volatility."
    ],
    correctIndex: 0,
    explanation: "USDC maintains liquid fiat backing audited by major accounting firms, while DAI maintains its peg dynamically using over-collateralized crypto vaults on the blockchain."
  },
  "blog-layer2-account-abstraction": {
    question: "Under Account Abstraction (ERC-4337) on Layer 2 rollups, how can you set up secure wallet recovery if you lose your custom private keys?",
    options: [
      "Write a letter to the Ethereum core council to reissue keys.",
      "Designate pre-approved smart guardians (like family members or hardware keys) that can sign a smart contract to change the validation key without a seed phrase.",
      "Download a master utility backup scraper that pulls raw cache passwords from your browser storage logs."
    ],
    correctIndex: 1,
    explanation: "Social recovery via Guardians allows programmable smart accounts to safely rotate ownership credentials without requiring traditional seed phrases."
  },
  "blog-crypto-fundamentals": {
    question: "Which cryptographic principle guarantees that it is impossible for an attacker to compute a wallet's private signature keys using only its visible public transaction address?",
    options: [
      "The collision rate of double-spent SHA-512 nodes.",
      "Asymmetric key pair generation, which utilizes one-way mathematical algorithms.",
      "The automatic local synchronization frequency of public nodes."
    ],
    correctIndex: 1,
    explanation: "Public-private key pairs leverage asymmetric cryptographic algorithms (like ECDSA). While the public key is derived from the private key, the reverse calculation is mathematically locked."
  }
};

export const BlogView: React.FC = () => {
  const { language } = useLanguage();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    return localStorage.getItem('csg-selected-post-id');
  });

  useEffect(() => {
    if (selectedPostId) {
      localStorage.setItem('csg-selected-post-id', selectedPostId);
    } else {
      localStorage.removeItem('csg-selected-post-id');
    }
  }, [selectedPostId]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTutorialId, setExpandedTutorialId] = useState<string | null>("admin-check");
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);
  const [submissionForm, setSubmissionForm] = useState({
    type: 'phishing',
    target: '',
    evidence: '',
    senderEmail: ''
  });

  // Hot threat ticker state simulation
  const [currentTickerIdx, setCurrentTickerIdx] = useState(0);
  const tickers = [
    "☣️ ALERT: Spurious USDT 'claim air-drops' detected targeting Telegram chat communities.",
    "⚠️ REGULATION: MiCA compliance limits non-compliant stablecoin limits in the EU.",
    "🛡️ ADVOCACY: Verify your escrow partner names carefully before accepting Nigerian peer-to-peer bank transfers.",
    "⚙️ PROTOCOL: Dust poisoning vectors verified on several EVM chains. Do not copy historical addresses.",
  ];

  // PERSISTED BOOKMARKS DATABASE LOGIC using localStorage
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('csg_bookmarked_posts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // State to handle Dynamic Quiz
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState<boolean>(false);

  // States to handle sidebar utilities
  const [copiedLink, setCopiedLink] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  // High-fidelity clean styled PDF compilation routine
  const handleExportPDF = async (post: BlogPost) => {
    if (pdfGenerating) return;
    setPdfGenerating(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      let yPos = 24;

      // Outer border styling
      const drawPageBorder = (pageNum: number, totalPagesPlaceholder: boolean) => {
        doc.setLineWidth(0.4);
        doc.setDrawColor(0, 0, 0);
        doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);
        
        // Watermark warning at top
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7);
        doc.setTextColor(171, 54, 0); // brand primary
        doc.text("CRYPTO SAFETY GLOBAL // ONLINE DEFENSIVE BLUEPRINT", margin, margin - 1);
        
        // Date / Code stamp at right
        doc.setTextColor(120, 120, 120);
        doc.setFont("courier", "bold");
        doc.text(`REF: CSG-${post.id.toUpperCase()}`, pageWidth - margin - 35, margin - 1);

        // Standard footer
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text("Disseminated under Fair Use educational guidelines. Keep this copy offline & protected.", margin, pageHeight - margin + 3);
        doc.text(`Page ${pageNum}`, pageWidth - margin - 15, pageHeight - margin + 3);
      };

      // Header Banner
      doc.setFillColor(245, 245, 245);
      doc.rect(margin, yPos, contentWidth, 18, "F");
      doc.setLineWidth(0.6);
      doc.setDrawColor(0, 0, 0);
      doc.rect(margin, yPos, contentWidth, 18, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(171, 54, 0);
      doc.text("CASE DOSSIER REPORT", margin + 4, yPos + 6);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.text(`${post.category.toUpperCase()} // OFFICIAL CLASSIFICATION`, margin + 4, yPos + 12);
      
      yPos += 26;

      // Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      const titleLines = doc.splitTextToSize(post.title.toUpperCase(), contentWidth);
      doc.text(titleLines, margin, yPos);
      yPos += (titleLines.length * 8) + 1;

      // Horizontal separator line
      doc.setLineWidth(0.8);
      doc.setDrawColor(0, 0, 0);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 7;

      // Author and Date info box
      doc.setFillColor(250, 249, 246);
      doc.rect(margin, yPos, contentWidth, 12, "F");
      doc.setLineWidth(0.3);
      doc.setDrawColor(0, 0, 0);
      doc.rect(margin, yPos, contentWidth, 12, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text(`AUTHOR: ${post.author.toUpperCase()}`, margin + 4, yPos + 8);
      doc.text(`ISSUED: ${post.date.toUpperCase()}  |  DURATION: ${post.readTime.toUpperCase()}`, pageWidth - margin - 85, yPos + 8);
      yPos += 19;

      let currentPage = 1;
      drawPageBorder(currentPage, false);

      // Paragraph elements parsing and laying out
      const paragraphs = post.content.split('\n\n');
      
      const checkAndAddPage = (requiredHeight: number) => {
        if (yPos + requiredHeight > pageHeight - margin - 15) {
          doc.addPage();
          currentPage++;
          yPos = margin + 10;
          drawPageBorder(currentPage, false);
        }
      };

      for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
        const paragraph = paragraphs[pIdx];
        const lines = paragraph.split('\n');

        for (let lIdx = 0; lIdx < lines.length; lIdx++) {
          const line = lines[lIdx].trim();
          if (line === '') continue;

          if (line.startsWith('###')) {
            const headingText = line.replace(/^###\s*/, '').toUpperCase();
            checkAndAddPage(15);
            
            doc.setFillColor(171, 54, 0);
            doc.rect(margin, yPos + 2, 3, 6, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(10.5);
            doc.setTextColor(0, 0, 0);
            doc.text(headingText, margin + 6, yPos + 7);
            
            yPos += 12;
          } 
          else if (line.startsWith('##')) {
            const subheadText = line.replace(/^##\s*/, '').toUpperCase();
            checkAndAddPage(12);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`[ ${subheadText} ]`, margin, yPos + 6);
            
            yPos += 10;
          } 
          else if (line.startsWith('*')) {
            const bulletText = line.replace(/^\*\s*/, '');
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9.5);
            doc.setTextColor(60, 60, 60);

            const wrappedBullet = doc.splitTextToSize(bulletText, contentWidth - 8);
            const bulletHeight = wrappedBullet.length * 5;
            checkAndAddPage(bulletHeight + 4);

            doc.setFillColor(171, 54, 0);
            doc.rect(margin + 2, yPos + 1.5, 1.5, 1.5, "F");

            doc.text(wrappedBullet, margin + 8, yPos + 3);
            yPos += bulletHeight + 4;
          } 
          else {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9.5);
            doc.setTextColor(50, 50, 50);

            const wrappedText = doc.splitTextToSize(line, contentWidth);
            const paragraphHeight = wrappedText.length * 5;
            checkAndAddPage(paragraphHeight + 4);

            doc.text(wrappedText, margin, yPos + 3);
            yPos += paragraphHeight + 4;
          }
        }
        yPos += 1.5;
      }

      // Add verified compliance seal box
      checkAndAddPage(30);
      yPos += 3;
      
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, yPos, contentWidth, 20, "F");
      doc.setLineWidth(0.4);
      doc.setDrawColor(0, 135, 81); // Emerald green status
      doc.rect(margin, yPos, contentWidth, 20, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 135, 81);
      doc.text("VERIFIED OFFLINE SAFETY BLUEPRINT // SECURED", margin + 5, yPos + 6);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(80, 80, 80);
      doc.text("This document was generated as an official safety dossier reference from the Crypto Safety Global portal. Offline storage of threat profiles is recommended.", margin + 5, yPos + 11);
      doc.text("Ensure you physically audit contract parameters on physical peer servers before committing funds.", margin + 5, yPos + 15);

      doc.save(`csg-threat-alert-${post.id}.pdf`);
    } catch (e) {
      console.error(e);
      alert("Error occurred during compiling PDF case dossier.");
    } finally {
      setPdfGenerating(false);
    }
  };

  // States to handle systems architect's ledger interactive sandbox
  const [architectAuditAddress, setArchitectAuditAddress] = useState("0xdAC17F958D2ee523a2206206994597C13D831ec7");
  const [architectChainId, setArchitectChainId] = useState("1");
  const [architectConsoleMessage, setArchitectConsoleMessage] = useState("Enter hex contract address above, select network and click \"Audit\" or select quick-load templates to pull a live blockchain security report.");
  const [architectIsAuditing, setArchitectIsAuditing] = useState(false);

  const handleArchitectAuditRun = async (addrToAudit?: string) => {
    if (architectIsAuditing) return;
    setArchitectIsAuditing(true);
    const targetAddr = (addrToAudit || architectAuditAddress).trim();
    
    if (!targetAddr || targetAddr.length < 8) {
      setArchitectConsoleMessage("🛑 ERROR: INVALID TARGET IDENTIFIER!\n❌ Cryptographic address must start with '0x' and be a standard onchain hash.");
      setArchitectIsAuditing(false);
      return;
    }

    setArchitectConsoleMessage(`⚡ CONNECTING TO LIVE BLOCKCHAIN SECURITY PEER NODE...\n⚡ ESTABLISHING REAL-TIME CONNECTION TO WEBSOCKET API...\n⚡ DECRYPTING ASSEMBLY INSTRUCTIONS FOR TARGET:\n   ${targetAddr}\n\n⏳ ANALYZING BYTECODE VECTORS...`);

    try {
      // 1. Run Token Security check first
      const resToken = await checkTokenSecurity(targetAddr, architectChainId);
      
      if (resToken.success && resToken.data) {
        const item = resToken.data;
        setTimeout(() => {
          setArchitectConsoleMessage(prev => {
            const lines = prev.split('\n');
            if (lines[lines.length - 1].includes("⏳ ANALYZING")) {
              lines.pop(); // Remove pending analysis message
            }
            return lines.join('\n') + `\n\n✓ INTEL ACQUIRED: COMPILING STANDARD SMART-ABI TELEMETRY\n` + 
              `──────────────────────────────────────────────\n` +
              `✦ RECOGNIZED ERC-20: [ ${item.tokenName} ] (${item.tokenSymbol})\n` +
              `✦ BYTECODE VISIBILITY: ${item.isOpenSource ? "✓ OPEN SOURCE VERIFIED" : "❌ UNVERIFIED CODES (DANGER)"}\n` +
              `✦ LIQUIDITY TRAP: ${item.isHoneypot ? "🚨 DETECTED SCAM HONEYPOT TRAP" : "✓ Standard Liquidity Routes"}\n` +
              `✦ TRANSACTION TAX: Buy Tax: ${(item.buyTax * 100).toFixed(1)}% | Sell Tax: ${(item.sellTax * 100).toFixed(1)}%\n` +
              `✦ ON-CHAIN PERMS: Owner: ${item.ownerAddress.substring(0, 10)}...${item.ownerAddress.substring(item.ownerAddress.length - 8)}\n` +
              `✦ AUTHORITY ACCESS: Slippage Modifiable: ${item.canSlippageBeModified ? "⚠️ YES" : "✓ No"} | Blacklist: ${item.isBlacklisted ? "🚨 YES" : "✓ No"}\n` +
              `──────────────────────────────────────────────\n` +
              `🛡️ AUDIT CONCLUSION: ${item.riskCount === 0 ? "✓ NO SEVERE SECURITY THREATS" : `⚠️ ${item.riskCount} CORE HAZARDS DETECTED`}\n` +
              `✦ HUB DECISION: ${item.riskCount > 0 ? "AVOID TRANSACTION / DISCARD CORES" : "ACTIVE ACCREDITED SAFETY PROFILE"}`;
          });
          setArchitectIsAuditing(false);
        }, 1200);
      } else {
        // 2. If it's not a standard token, check if it's an address (EOA / Actor)
        const resAddr = await checkAddressSecurity(targetAddr, architectChainId);
        if (resAddr.success && resAddr.data) {
          const item = resAddr.data;
          setTimeout(() => {
            setArchitectConsoleMessage(prev => {
              const lines = prev.split('\n');
              if (lines[lines.length - 1].includes("⏳ ANALYZING")) {
                lines.pop();
              }
              return lines.join('\n') + `\n\n✓ INSTANT WEB3 ACTOR AUDIT DISPATCH COMPLETED\n` +
                `──────────────────────────────────────────────\n` +
                `👁️ ACCOUNT SIGNATURE DETECTED: WALLET / ENVELOPE OWNER\n` +
                `✦ CYBERCRIME RECORD LINK: ${item.cybercrime ? "🚨 DETECTED CRIMINAL SIGNAL" : "✓ Cleared"}\n` +
                `✦ PHISHING CAMPAIGN HOOK: ${item.phishingActivities ? "🚨 SCAM ACTIVE LAUNCHER" : "✓ Cleared"}\n` +
                `✦ PRIVACY COUPLING MIX: ${item.mixAddress ? "⚠️ MIXER COUPLING (TORNADO CASH)" : "✓ Cleared"}\n` +
                `✦ DRAINER WALLET LINK: ${item.stealingAttack ? "🚨 DRAINER SIGNATURE (CRITICAL THREAT)" : "✓ Cleared"}\n` +
                `✦ CREATED MALICIOUS CONT: ${item.numberMaliciousContractsCreated > 0 ? `🚨 Created ${item.numberMaliciousContractsCreated} Scams` : "✓ None"}\n` +
                `──────────────────────────────────────────────\n` +
                `🛡️ PEER SCORE: [ ${item.isMalicious ? "🚨 DANGER - FLAG ENFORCED" : "✓ SAFELY IDENTIFIED PEER" } ]\n` +
                `✦ RECOMMENDATION: ${item.isMalicious ? "IMMEDIATELY TERMINATE ALL INTERACTIONS" : "Normal peer escrow trading transactions permitted"}`;
            });
            setArchitectIsAuditing(false);
          }, 1200);
        } else {
          // If both fail
          setTimeout(() => {
            setArchitectConsoleMessage(prev => {
              const lines = prev.split('\n');
              if (lines[lines.length - 1].includes("⏳ ANALYZING")) {
                lines.pop();
              }
              return lines.join('\n') + `\n\n🛑 LIVE TELEMETRY ACQUISITION FAULT!\n` +
                `❌ GoPlus RPC ERROR: ${resToken.error || resAddr.error || "Onchain endpoint query timed out or node rate-limit."}\n` +
                `💡 Try targeting standard contracts (e.g. USDT: 0xdac17f958d2ee523a2206206994597c13d831ec7)`;
            });
            setArchitectIsAuditing(false);
          }, 1000);
        }
      }
    } catch (e: any) {
      setArchitectConsoleMessage(prev => prev + `\n🛑 PARSER TERMINATED: ${e?.message || "CORS restriction or unknown system network block."}`);
      setArchitectIsAuditing(false);
    }
  };

  useEffect(() => {
    const handleOpenPost = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedPostId(customEvent.detail);
      }
    };
    window.addEventListener('csg-open-post', handleOpenPost);
    return () => {
      window.removeEventListener('csg-open-post', handleOpenPost);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTickerIdx((prev) => (prev + 1) % tickers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [tickers.length]);

  useEffect(() => {
    if (!selectedPostId) {
      setScrollPercent(0);
      return;
    }

    // Scroll back to top instantly when article/post is opened
    window.scrollTo({ top: 0 });

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;
      if (totalScrollable > 0) {
        const percentage = (window.scrollY / totalScrollable) * 100;
        setScrollPercent(Math.min(100, Math.max(0, Math.round(percentage))));
      } else {
        setScrollPercent(0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedPostId]);

  // Reset quiz state whenever selected post ID changes
  useEffect(() => {
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setQuizCompleted(false);
    setIsQuizCorrect(false);
  }, [selectedPostId]);

  const selectedPost = blogPosts.find((p) => p.id === selectedPostId);

  const curPostIdx = selectedPostId ? blogPosts.findIndex((p) => p.id === selectedPostId) : -1;
  const prevPost = curPostIdx > 0 ? blogPosts[curPostIdx - 1] : null;
  const nextPost = curPostIdx !== -1 && curPostIdx < blogPosts.length - 1 ? blogPosts[curPostIdx + 1] : null;

  // Dynamic filter lists
  const categories = [
    'all', 
    ...Array.from(new Set(blogPosts.map((p) => p.category))),
    ...(bookmarks.length > 0 ? ['Saves / Bookmarks'] : [])
  ];

  // Advanced search and category filtering
  const filteredPosts = blogPosts.filter((post) => {
    let matchesCategory = false;
    if (selectedCategory === 'all') {
      matchesCategory = true;
    } else if (selectedCategory === 'Saves / Bookmarks') {
      matchesCategory = bookmarks.includes(post.id);
    } else {
      matchesCategory = post.category === selectedCategory;
    }

    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleTutorialToggle = (id: string) => {
    setExpandedTutorialId(expandedTutorialId === id ? null : id);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionForm.target || !submissionForm.evidence) {
      return;
    }
    setShowSubmissionSuccess(true);
    setTimeout(() => {
      setShowSubmissionSuccess(false);
      setSubmissionForm({ type: 'phishing', target: '', evidence: '', senderEmail: '' });
    }, 4000);
  };

  const toggleBookmark = (id: string) => {
    let next: string[];
    if (bookmarks.includes(id)) {
      next = bookmarks.filter(b => b !== id);
    } else {
      next = [...bookmarks, id];
    }
    setBookmarks(next);
    localStorage.setItem('csg_bookmarked_posts', JSON.stringify(next));
  };

  const handleCopyLink = (postId: string) => {
    const fullMockUrl = `${window.location.origin}${window.location.pathname}?post=${postId}`;
    navigator.clipboard.writeText(fullMockUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const getRelatedPosts = (currentPost: BlogPost, limit = 3): BlogPost[] => {
    return blogPosts
      .filter((post) => post.id !== currentPost.id)
      .map((post) => {
        let score = 0;
        // Same category gets 3 points
        if (post.category === currentPost.category) score += 3;
        // Shared tags get 1 point each
        const commonTags = post.tags.filter(t => currentPost.tags.includes(t));
        score += commonTags.length;
        return { post, score };
      })
      .filter((item) => item.score > 0 || currentPost.tags.length > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.post);
  };

  // High-fidelity markdown heading & sub-element parser for maximum visual polish
  const renderArticleContent = (content: string) => {
    const lines = content.split('\n');
    const blocks: React.ReactNode[] = [];
    let listItems: { text: string; type: 'bullet' | 'number' }[] = [];

    const parseLineWithBold = (text: string, key: string) => {
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          const plainText = text.substring(lastIndex, match.index);
          parts.push(<GlossaryText key={`plain-${lastIndex}-${key}`} text={plainText} />);
        }
        const boldText = match[1];
        parts.push(
          <strong key={`bold-${match.index}-${key}`} className="font-extrabold text-[#ab3600]">
            <GlossaryText text={boldText} />
          </strong>
        );
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < text.length) {
        const plainText = text.substring(lastIndex);
        parts.push(<GlossaryText key={`plain-${lastIndex}-${key}`} text={plainText} />);
      }
      return parts.length > 0 ? parts : <GlossaryText text={text} />;
    };

    const flushList = (key: string) => {
      if (listItems.length > 0) {
        const type = listItems[0].type;
        if (type === 'bullet') {
          blocks.push(
            <ul key={`list-ul-${key}`} className="list-disc pl-6 my-4 space-y-2 text-gray-800 font-sans text-sm tracking-normal leading-relaxed text-left">
              {listItems.map((item, index) => (
                <li key={index} className="leading-relaxed">
                  {parseLineWithBold(item.text, `li-b-${index}-${key}`)}
                </li>
              ))}
            </ul>
          );
        } else {
          blocks.push(
            <ol key={`list-ol-${key}`} className="list-decimal pl-6 my-4 space-y-2 text-gray-800 font-sans text-sm tracking-normal leading-relaxed text-left font-semibold">
              {listItems.map((item, index) => (
                <li key={index} className="leading-relaxed font-normal">
                  {parseLineWithBold(item.text, `li-ol-${index}-${key}`)}
                </li>
              ))}
            </ol>
          );
        }
        listItems = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        flushList(`gap-${i}`);
        continue;
      }

      if (line === '---') {
        flushList(`hr-${i}`);
        blocks.push(
          <hr key={`hr-${i}`} className="border-t-[2px] border-black/15 my-6" />
        );
      } else if (line.startsWith('####') || line.startsWith('###')) {
        flushList(`h3-${i}`);
        const cleanHeading = line.startsWith('####') ? line.replace(/^####\s*/, '') : line.replace(/^###\s*/, '');
        blocks.push(
          <h3 key={`h3-${i}`} className="font-sora text-sm sm:text-base font-black text-gray-950 uppercase tracking-tight mt-6 mb-3 border-l-4 border-l-[#ab3600] pl-3.5 py-1.5 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-[#ab3600] shrink-0" />
            <span>{parseLineWithBold(cleanHeading, `h3-content-${i}`)}</span>
          </h3>
        );
      } else if (line.startsWith('##')) {
        flushList(`h2-${i}`);
        blocks.push(
          <h4 key={`h2-${i}`} className="font-sora text-[13px] sm:text-[14px] font-extrabold text-[#ab3600] uppercase tracking-wider mt-5 mb-2.5 pb-1 border-b border-black/15 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#ab3600] rotate-45 shrink-0" />
            <span>{parseLineWithBold(line.replace(/^##\s*/, ''), `h2-content-${i}`)}</span>
          </h4>
        );
      } else if (line.startsWith('#')) {
        flushList(`h1-${i}`);
        blocks.push(
          <h2 key={`h1-${i}`} className="font-sora text-base sm:text-lg md:text-xl font-black text-gray-950 uppercase tracking-tight mt-6 mb-3">
            {parseLineWithBold(line.replace(/^#\s*/, ''), `h1-content-${i}`)}
          </h2>
        );
      } else if (line.startsWith('>')) {
        flushList(`quote-${i}`);
        blocks.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-l-[#ab3600]/85 bg-orange-50/15 p-4 my-4 font-sans text-sm italic text-gray-700 leading-relaxed text-left">
            {parseLineWithBold(line.replace(/^>\s*/, ''), `quote-content-${i}`)}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        const cleanItem = line.replace(/^[-*]\s*/, '');
        if (listItems.length > 0 && listItems[0].type !== 'bullet') {
          flushList(`flush-bullet-${i}`);
        }
        listItems.push({ text: cleanItem, type: 'bullet' });
      } else if (/^\d+\.\s/.test(line)) {
        const cleanItem = line.replace(/^\d+\.\s*/, '');
        if (listItems.length > 0 && listItems[0].type !== 'number') {
          flushList(`flush-number-${i}`);
        }
        listItems.push({ text: cleanItem, type: 'number' });
      } else {
        flushList(`para-${i}`);
        blocks.push(
          <p key={`p-${i}`} className="text-gray-800 text-[13px] sm:text-[14.5px] leading-relaxed break-words whitespace-normal font-medium tracking-normal mb-3 text-left">
            {parseLineWithBold(line, `p-content-${i}`)}
          </p>
        );
      }
    }
    flushList(`end`);
    return <div className="space-y-4">{blocks}</div>;
  };

  const getTableOfContents = (content: string) => {
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('###'))
      .map((line, index) => {
        const text = line.replace(/^###\s*/, '');
        return { index, text };
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Dynamic Viewport Top Reading Progress Bar */}
      {selectedPostId && selectedPost && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-[#ab3600]/15 z-50 pointer-events-none">
          <div 
            className="bg-[#ab3600] h-full transition-all duration-75 border-b border-black/20"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      )}
      
      {/* Live Threat Broadcast Ticker (Creative Addition) */}
      <div className="bg-black text-[#72ff70] border-heavy px-4 py-2 flex items-center justify-between gap-4 font-mono text-[10.5px] select-none overflow-hidden relative shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping shrink-0" />
          <span className="font-extrabold uppercase text-[9px] tracking-widest text-red-500 border border-red-500/30 px-1 bg-red-950/20">
            LIVE BROADCAST Threat Feed:
          </span>
        </div>
        <div className="flex-1 text-left truncate font-bold ml-1 transition-all duration-300">
          {tickers[currentTickerIdx]}
        </div>
        <div className="shrink-0 text-gray-500 text-[8.5px] font-black hidden sm:block">
          NODE: CSG-SEC90
        </div>
      </div>

      {selectedPostId && selectedPost ? (
        // ==========================================
        // ENHANCED DETAILED BLOG READ VIEW WITH SPLIT GRID & SIDEBAR
        // ==========================================
        <div className="space-y-6 animate-fade-in-up">
          
          {/* Header navigation with Reading scroll progress indicators */}
          <div className="sticky top-[74px] z-30 bg-brand-surface border-b-4 border-black py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-[subtle]">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-heavy neo-shadow-sm hover:bg-brand-surface-container text-xs font-mono font-black uppercase transition-all duration-150 cursor-pointer active-press shrink-0"
              id="exit-bulletin-feed-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Articles Feed
            </button>

            <div className="flex-grow flex items-center gap-3 font-mono text-[10px] md:text-xs bg-white border-heavy px-3 py-2 neo-shadow-sm/5">
              <span className="font-black text-[#ab3600] uppercase tracking-wider shrink-0">BULLETIN READING PROGRESS:</span>
              <div className="flex-grow bg-gray-100 border border-black h-2.5 overflow-hidden relative">
                <div 
                  className="bg-[#ab3600] h-full transition-all duration-75"
                  style={{ width: `${scrollPercent}%` }}
                />
              </div>
              <span className="font-extrabold text-gray-950 shrink-0 min-w-[35px] text-right">{scrollPercent}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT MAIN COLUMN: Highly polished layout parsed with typographic headers */}
            <div className="lg:col-span-8 space-y-6">
              
              <article className="bg-white border-heavy neo-shadow p-4 sm:p-8 space-y-6 text-left">
                
                {/* Visual Category Block */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-[#fff0ea] border border-[#ab3600] text-[#ab3600] font-mono text-[9px] font-black px-2 py-0.5 uppercase">
                      {selectedPost.category}
                    </span>
                    <span className="font-mono text-[8.5px] text-[#008751] font-black uppercase border border-[#008751]/25 px-1.5 py-0.5 bg-emerald-50 shrink-0 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#008751]" />
                      VERIFIED ACCURATE INFO
                    </span>
                    {bookmarks.includes(selectedPost.id) && (
                      <span className="font-mono text-[8.5px] text-purple-700 font-black uppercase border border-purple-200 px-1.5 py-0.5 bg-purple-50 shrink-0">
                        ⭐ BOOKMARKED CASE
                      </span>
                    )}
                  </div>
                  
                  <h2 className="font-sora text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 uppercase leading-snug tracking-tight">
                    {selectedPost.title}
                  </h2>

                  {/* Metadata bar */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 border-t border-black/10 text-xs font-mono text-gray-500">
                    <div className="flex items-center gap-1.5 font-bold text-gray-800">
                      <User className="w-4 h-4 text-[#ab3600] shrink-0" />
                      <span>BY {selectedPost.author.toUpperCase()}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 shrink-0" />
                      <span>{selectedPost.date}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Main Visual Frame */}
                {selectedPost.imageSrc && (
                  <div className="w-full h-52 sm:h-72 md:h-[354px] overflow-hidden border-heavy neo-shadow-sm relative">
                    <img
                      src={selectedPost.imageSrc}
                      alt={selectedPost.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.96]"
                    />
                    <div className="absolute bottom-3 left-3 bg-black text-white px-2.5 py-1 text-[8px] sm:text-[9.5px] font-mono font-black uppercase tracking-wider border border-white max-w-[90%] truncate">
                      FORENSIC THREAT ATTACHMENT CASE // {selectedPost.id.toUpperCase()}
                    </div>
                  </div>
                )}

                {/* Collapsible Mobile Content Outline Tracker */}
                <div className="bg-brand-surface border border-black/10 p-3.5 font-mono text-[11px] block lg:hidden">
                  <div className="font-bold text-[#ab3600] uppercase mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>ARTICLE SECTIONS INDEX</span>
                  </div>
                  <div className="space-y-1 pl-1">
                    {getTableOfContents(selectedPost.content).map((toc) => (
                      <div key={toc.index} className="flex gap-2 text-gray-700 leading-tight">
                        <span className="text-[#ab3600]">↳</span>
                        <span>{toc.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamically Parsed Polish Core Text Content */}
                <div className="pt-2 text-left space-y-1.5">
                  {renderArticleContent(selectedPost.content)}
                </div>

                {/* Action Caution Reminder Block */}
                <div className="bg-[#fffdf2] border-heavy border-l-[6px] border-l-amber-500 p-4 font-mono text-[11px] leading-relaxed text-gray-700 space-y-2.5 mt-8">
                  <div className="flex items-center gap-1.5 text-amber-800 font-black uppercase">
                    <Lightbulb className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                    <span>SECURE OPERATING PROTOCOL NOTICE </span>
                  </div>
                  <p>
                    This security notice is published solely to facilitate defensive literacy worldwide. Crypto Safety Global never requests mnemonic passphrases, deposits, or private API keys. Always keep key layers isolated.
                  </p>
                </div>

                {/* Forensic Metadata Tags Deck */}
                <div className="pt-6 border-t border-black/10 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    CASE METADATA:
                  </span>
                  {selectedPost.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="border border-black bg-gray-50 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase shrink-0"
                    >
                      #{tag.replace(/\s+/g, '').toUpperCase()}
                    </span>
                  ))}
                </div>

              </article>

              {/* DYNAMIC SECURITY INTERACTIVE QUIZ CARD - Premium Addition */}
              {QUIZZES_BY_POST[selectedPost.id] && (
                <div className="bg-white border-heavy p-5 sm:p-6 neo-shadow text-left space-y-4 rounded-none">
                  <div className="flex items-center justify-between border-b border-black pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#008751] shrink-0" />
                      <h4 className="font-sora text-xs sm:text-sm font-black text-gray-950 uppercase">
                        THREAT DEFENSE CHECKUP QUIZ
                      </h4>
                    </div>
                    <span className="font-mono text-[8.5px] bg-[#008751]/10 text-[#008751] font-black border border-[#008751]/20 px-2 py-0.5">
                      SECURE SHIELD BONUS
                    </span>
                  </div>

                  <p className="font-mono text-[11.5px] text-gray-900 font-bold leading-relaxed bg-[#fffcf5] p-3 border-l-4 border-l-[#ab3600]">
                    QUESTION: {QUIZZES_BY_POST[selectedPost.id].question}
                  </p>

                  <div className="space-y-2.5 font-mono text-xs">
                    {QUIZZES_BY_POST[selectedPost.id].options.map((option, idx) => {
                      const isSelected = quizSelectedOption === idx;
                      let optionStyle = "bg-white border-black text-gray-800 hover:bg-gray-50";
                      
                      if (quizSubmitted) {
                        const correctId = QUIZZES_BY_POST[selectedPost.id].correctIndex;
                        if (idx === correctId) {
                          optionStyle = "bg-[#d2ffdb] border-[#008751] text-[#006e16] font-bold";
                        } else if (isSelected) {
                          optionStyle = "bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]";
                        } else {
                          optionStyle = "bg-white border-black/20 text-gray-400";
                        }
                      } else if (isSelected) {
                        optionStyle = "bg-[#fff0ea] border-[#ab3600] text-[#ab3600] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() => setQuizSelectedOption(idx)}
                          className={`w-full p-3 border-2 text-left rounded-none transition-all flex items-center gap-3 ${optionStyle} ${!quizSubmitted ? 'cursor-pointer active-press' : 'cursor-default'}`}
                        >
                          <span className={`w-5 h-5 border-heavy rounded-full shrink-0 flex items-center justify-center font-black text-[9px] ${
                            isSelected ? 'bg-black text-white' : 'bg-white text-black'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="break-words leading-relaxed text-[11px] sm:text-xs">
                            {option}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      type="button"
                      disabled={quizSelectedOption === null}
                      onClick={() => {
                        if (quizSelectedOption === null) return;
                        setQuizSubmitted(true);
                        setIsQuizCorrect(quizSelectedOption === QUIZZES_BY_POST[selectedPost.id].correctIndex);
                      }}
                      className={`w-full font-mono text-[10px] font-black uppercase py-2.5 border-heavy transition-all active-press ${
                        quizSelectedOption === null 
                          ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                          : 'bg-[#ab3600] text-white hover:bg-black cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      ✦ SUBMIT SHIELD SECURITY ASSESSMENT ANSWER
                    </button>
                  ) : (
                    <div className="space-y-3 pt-1 border-t border-black/10">
                      <div className={`p-4 border-heavy font-mono text-[11px] leading-relaxed ${
                        isQuizCorrect 
                          ? 'bg-[#d2ffdb]/50 text-[#006e16] border-[#008751]' 
                          : 'bg-[#ffdad6]/40 text-[#ba1a1a] border-[#ba1a1a]'
                      }`}>
                        <div className="flex items-center gap-2 font-black text-xs uppercase mb-1.5">
                          {isQuizCorrect ? (
                            <>
                              <CheckCircle className="w-4.5 h-4.5 shrink-0" />
                              <span>SECURE ASSESSMENT CONCLUDED: CORRECT!</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-4.5 h-4.5 shrink-0 animate-pulse" />
                              <span>INCORRECT STRATEGIC VECTOR CHOSEN</span>
                            </>
                          )}
                        </div>
                        <p className="font-semibold">{QUIZZES_BY_POST[selectedPost.id].explanation}</p>
                      </div>

                      {!isQuizCorrect && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuizSelectedOption(null);
                            setQuizSubmitted(false);
                          }}
                          className="font-mono text-[9px] font-bold uppercase px-3 py-1.5 bg-white border border-black hover:bg-amber-50 active-press cursor-pointer"
                        >
                          Retry Question
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Sequential Blog Post Navigation Footer */}
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white border-heavy p-4 gap-4 neo-shadow-sm font-mono text-xs mt-6">
                {prevPost ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(prevPost.id);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white border-heavy text-gray-700 hover:text-[#ab3600] text-left hover:bg-neutral-50 font-bold uppercase transition duration-150 cursor-pointer active-press"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" />
                    {language === 'es' ? 'ANTERIOR BOLETÍN' : 'PREVIOUS BULLETIN'}
                  </button>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(nextPost.id);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#ab3600] text-white hover:bg-[#ab3600]/90 border-heavy font-black uppercase transition duration-150 cursor-pointer active-press"
                  >
                    {language === 'es' ? 'SIGUIENTE BOLETÍN' : 'NEXT BULLETIN'}
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPostId(null);
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black text-[#72ff70] hover:bg-neutral-900 border-heavy font-black uppercase transition duration-150 cursor-pointer active-press"
                  >
                    ✓ {language === 'es' ? 'ALERTA FINAL LEÍDA' : 'ALL BULLETINS READ'}
                  </button>
                )}
              </div>

            </div>

            {/* RIGHT SIDE PANEL: Actions Consol, Bookmarks Index, and RELATED POSTS CARD */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[142px] lg:self-start lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto scrollbar-thin pr-2 pb-6">
              
              {/* DEFENSIVE CONSOLE CONTROL CARD */}
              <div className="bg-white border-heavy p-5 neo-shadow-sm rounded-none text-left space-y-4">
                
                <div className="flex items-center gap-2 border-b-2 border-black pb-3">
                  <Fingerprint className="w-5 h-5 text-[#ab3600] shrink-0" />
                  <h4 className="font-sora text-xs sm:text-sm font-black text-gray-950 uppercase tracking-tight">
                    DEFENSIVE ACTIONS PANEL
                  </h4>
                </div>

                <p className="font-mono text-[10.5px] text-gray-600 leading-relaxed">
                  Utilize these local forensic agency utility settings to handle, print, or share this verified alert bulletin.
                </p>

                <div className="space-y-2.5 font-mono text-[10.5px]">
                  
                  {/* Save Bookmark Toggle with Solid/Filled states */}
                  <button
                    type="button"
                    onClick={() => toggleBookmark(selectedPost.id)}
                    className={`w-full py-2 px-3 border border-black transition-colors flex items-center justify-between gap-2 cursor-pointer active-press uppercase font-bold ${
                      bookmarks.includes(selectedPost.id)
                        ? 'bg-purple-950 hover:bg-purple-900 text-white'
                        : 'bg-white hover:bg-purple-50 text-purple-900'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Bookmark className={`w-4 h-4 shrink-0 ${bookmarks.includes(selectedPost.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      <span>{bookmarks.includes(selectedPost.id) ? 'Save Cancel / Remove' : 'Save To Bookmarks'}</span>
                    </span>
                    <span className="text-[9px] bg-black/10 px-1 border border-black/15">SAVES</span>
                  </button>

                  {/* Share Case File button with mock payload toast */}
                  <button
                    type="button"
                    onClick={() => handleCopyLink(selectedPost.id)}
                    className="w-full py-2 px-3 bg-white hover:bg-[#fff0ea] border border-black text-gray-900 transition-colors flex items-center justify-between gap-2 cursor-pointer active-press uppercase font-bold"
                  >
                    <span className="flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-[#ab3600] shrink-0" />
                      <span>Copy Referral Link</span>
                    </span>
                    <span className="text-[9px] bg-black/5 px-1 font-bold">SHARE</span>
                  </button>

                  {/* Copy Alert Toast notification */}
                  {copiedLink && (
                    <div className="bg-[#fffbeb] border border-amber-300 p-2 text-[9px] text-amber-900 font-extrabold flex items-center gap-1.5 animate-bounce">
                      <Check className="w-3.5 h-3.5 text-[#ab3600] shrink-0" />
                      <span>✓ LINK RETRIEVED: REFERRAL COPY FINALISED</span>
                    </div>
                  )}

                  {/* High Polished Social Sharing Deck */}
                  <div className="pt-3 border-t border-dashed border-black/20 space-y-2">
                    <span className="block text-[8.5px] font-mono text-gray-400 font-extrabold uppercase tracking-widest text-[#ab3600]">
                      ⚡ SOCIAL TRANSMISSION CHANNELS
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                          `🚨 IMMINENT SECURITY THREAT: ${selectedPost.title} — Dissection & safety audit details:`
                        )}&url=${encodeURIComponent(`${window.location.origin}${window.location.pathname}?post=${selectedPost.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-black uppercase text-center border border-black flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)] active-press"
                        title="Broadcast alert on Twitter / X"
                      >
                        <Twitter className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>X / Twitter</span>
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                          `${window.location.origin}${window.location.pathname}?post=${selectedPost.id}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 bg-[#0a66c2] hover:bg-[#004182] text-white font-mono text-[9px] font-black uppercase text-center border border-black flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)] active-press"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-white shrink-0" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(
                        `${window.location.origin}${window.location.pathname}?post=${selectedPost.id}`
                      )}&text=${encodeURIComponent(
                        `🚨 WEB3 THREAT WARNING: ${selectedPost.title}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-2 bg-[#229ed9] hover:bg-[#1d82b3] text-white font-mono text-[9px] font-black uppercase text-center border border-black flex items-center justify-center gap-1.5 transition-colors shadow-[1px_1px_0px_rgba(0,0,0,1)] active-press"
                      title="Forward to Telegram"
                    >
                      <Send className="w-3.5 h-3.5 rotate-45 text-white shrink-0" />
                      <span>Forward Alert to Telegram</span>
                    </a>
                  </div>

                  {/* Real high quality PDF export */}
                  <button
                    type="button"
                    onClick={() => handleExportPDF(selectedPost)}
                    disabled={pdfGenerating}
                    className="w-full py-2.5 px-3 bg-neutral-900 hover:bg-black text-white border border-black transition-colors flex items-center justify-between gap-2 cursor-pointer active-press uppercase font-extrabold"
                  >
                    <span className="flex items-center gap-1.5">
                      <Printer className="w-4 h-4 text-[#72ff70] shrink-0" />
                      <span>{pdfGenerating ? 'Compiling PDF File...' : 'Export formatted PDF'}</span>
                    </span>
                    <span className="text-[9px] bg-red-600 text-white font-black px-1.5 py-0.5 border border-red-500 rounded-none shrink-0 animate-pulse">EXPORT</span>
                  </button>

                  {/* Mock print dispatch */}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full py-2 px-3 bg-white hover:bg-emerald-50 border border-black text-gray-900 transition-colors flex items-center justify-between gap-2 cursor-pointer active-press uppercase font-bold"
                  >
                    <span className="flex items-center gap-1.5">
                      <Printer className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Print Alert Bulletin</span>
                    </span>
                    <span className="text-[9px] text-gray-400">PDF</span>
                  </button>

                </div>

              </div>

              {/* TABLE OF CONTENTS INDEX SHEET - Desktop Only */}
              <div className="bg-[#fffdfb] border-heavy p-5 neo-shadow-sm rounded-none text-left space-y-3.5 hidden lg:block">
                <span className="font-mono text-[9px] text-[#ab3600] font-black tracking-wider uppercase block">
                  🛡️ ADVANCED CONTEXT EXPLORER
                </span>
                <h4 className="font-sora text-xs font-black text-gray-950 uppercase">
                  BULLETIN OUTLINE MANUAL
                </h4>
                <div className="space-y-2 border-l-2 border-gray-200 pl-3">
                  {getTableOfContents(selectedPost.content).map((toc) => (
                    <div 
                      key={toc.index} 
                      className="font-mono text-[10.5px] text-gray-600 leading-normal hover:text-black cursor-default font-medium"
                    >
                      ✦ <span className="font-black text-gray-400">SECT {toc.index + 1}:</span> {toc.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* RELATED BULLETIN WARNING CARDS */}
              <div className="bg-white border-heavy p-5 neo-shadow-sm text-left space-y-4 rounded-none">
                <div className="flex items-center gap-2 border-b-2 border-black pb-3">
                  <Flame className="w-5 h-5 text-[#ab3600] shrink-0 animate-pulse" />
                  <h4 className="font-sora text-xs sm:text-sm font-black text-gray-950 uppercase tracking-tight">
                    RELATED WARNING BULLETINS
                  </h4>
                </div>

                <div className="space-y-4">
                  {getRelatedPosts(selectedPost).map((relPost) => (
                    <div 
                      key={relPost.id}
                      onClick={() => setSelectedPostId(relPost.id)}
                      className="group border border-black p-3 hover:bg-neutral-50 transition-colors cursor-pointer text-left space-y-2"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="bg-[#fff0ea] border border-[#ab3600]/30 text-[#ab3600] font-mono text-[8px] font-black px-1.5 py-0.5 uppercase tracking-wide">
                          {relPost.category}
                        </span>
                        <span className="font-mono text-[8.5px] text-gray-400 font-bold">{relPost.date}</span>
                      </div>

                      <h5 className="font-sora text-xs font-extrabold text-[#111] group-hover:text-[#ab3600] transition-colors leading-tight uppercase line-clamp-2">
                        {relPost.title}
                      </h5>

                      <p className="font-mono text-[9.5px] text-gray-600 line-clamp-2 leading-relaxed">
                        {relPost.excerpt}
                      </p>

                      <div className="pt-2 border-t border-dashed border-black/10 flex items-center justify-between text-[9px] font-mono font-bold text-gray-500">
                        <span>{relPost.readTime}</span>
                        <span className="text-[#ab3600] hover:underline group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          READ NOW <ArrowRight className="w-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        // ==========================================
        // MAIN BULLETIN BLOG BOARD FEED
        // ==========================================
        <div className="space-y-8">
          
          {/* Creative Newsroom Layout & Hero Header Banner */}
          <div className="bg-[#fffbf9] border-heavy p-5 sm:p-8 neo-shadow relative overflow-hidden text-left flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4 max-w-3xl z-10">
              <div className="inline-flex items-center gap-1.5 bg-black text-white px-3 py-1 font-mono text-[9.5px] font-black uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-brand-primary animate-pulse shrink-0" />
                LATEST SECURITY ALERT BULLETIN
              </div>
              <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-950 uppercase leading-none">
                {blogPosts[0]?.title || "WEB3 DEEP DIVES & COIN THREAT ALERTS"}
              </h1>
              <p className="font-mono text-xs sm:text-[13px] text-gray-700 leading-relaxed font-bold">
                {blogPosts[0]?.excerpt || "Protect your coins under local jurisdiction constraints. Browse onchain alerts compiled by verified investigators. Dissect malicious approving logs, stablecoin MiCA changes, currency blocks, and regulatory compliance."}
              </p>
              
              {/* Interactive Read Latest CTA */}
              {blogPosts[0] && (
                <div className="pt-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedPostId(blogPosts[0].id)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#ab3600] hover:bg-black text-white font-mono text-[10px] font-black uppercase border-heavy shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-colors cursor-pointer active-press"
                  >
                    ✦ Read Latest Alert bulletin <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {/* Creative Quick Stats bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2.5 max-w-xl font-mono">
                <div className="bg-white border-heavy p-2 text-center neo-shadow-xs">
                  <div className="text-xs text-gray-500 font-bold uppercase leading-none">THREAT INDEX</div>
                  <div className="text-base font-black text-[#ab3600] mt-1">SEVERE</div>
                </div>
                <div className="bg-white border-heavy p-2 text-center neo-shadow-xs">
                  <div className="text-xs text-gray-500 font-bold uppercase leading-none">BULLETINS</div>
                  <div className="text-base font-black text-gray-950 mt-1">{blogPosts.length} POSTS</div>
                </div>
                <div className="bg-white border-heavy p-2 text-center neo-shadow-xs">
                  <div className="text-xs text-gray-500 font-bold uppercase leading-none">BOOKMARKS</div>
                  <div className="text-base font-black text-[#008751] mt-1">{bookmarks.length} SAVED</div>
                </div>
                <div className="bg-white border-heavy p-2 text-center neo-shadow-xs">
                  <div className="text-xs text-gray-500 font-bold uppercase leading-none">COINS KEY</div>
                  <div className="text-base font-black text-purple-700 mt-1">USDT/USDC</div>
                </div>
              </div>
            </div>

            {/* Enhanced Systems Architect's Ledger Card (Interactive) */}
            <div className="hidden lg:block bg-neutral-950 text-white p-4 border-4 border-black w-[280px] text-left font-mono text-[10px] space-y-2.5 self-start select-none shadow-[4px_4px_0px_rgba(171,54,0,1)] relative overflow-hidden">
              {/* Retro horizontal scanning line decor */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/20 pb-2">
                <div className="flex items-center gap-1.5 text-orange-500 font-extrabold">
                  <Fingerprint className="w-4 h-4 animate-pulse text-[#ab3600] shrink-0" />
                  <span className="tracking-widest text-[9px] uppercase font-black">SYSTEMS ARCHITECT</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#72ff70] animate-pulse" title="Sentry node live" />
                  <span className="text-[7.5px] text-[#72ff70] font-bold">ONLINE</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="bg-neutral-900 border border-neutral-800 p-2 text-gray-400 text-[8.5px] leading-normal">
                  <span className="text-orange-400 font-bold block mb-0.5">SENTRY RADAR DEPLOYED:</span>
                  Active on-chain trace algorithm monitors threat vectors. <span className="text-rose-400 font-extrabold uppercase">⚠️ DISCLAIMER:</span> Genuine contract integrity verification mandates deep static-analyzers (e.g., Slither) or block explorer checks.
                </div>

                {/* Live ledger heights */}
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[8px]">
                  <div className="bg-neutral-900/80 border border-neutral-800 p-1 text-center">
                    <span className="text-gray-500 uppercase block text-[7px] font-bold">BLOCK HEIGHT</span>
                    <span className="text-white font-extrabold text-[9px]">20,891,416</span>
                  </div>
                  <div className="bg-neutral-900/80 border border-neutral-800 p-1 text-center">
                    <span className="text-gray-500 uppercase block text-[7px] font-bold">SCANNED POOLS</span>
                    <span className="text-[#72ff70] font-extrabold text-[9px]">142 active</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Scanner Sandbox */}
              <div className="border border-dashed border-white/20 p-2 bg-neutral-900/30 space-y-2 rounded-none">
                <div className="flex items-center justify-between text-[7.5px] font-black text-orange-400 uppercase tracking-wider">
                  <span>✦ ADDR INTEGRITY AUDITER</span>
                  <span className="bg-neutral-850 px-1 text-white border border-neutral-800 text-[7px]">v3.2</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    <select
                      value={architectChainId}
                      onChange={(e) => {
                        setArchitectChainId(e.target.value);
                      }}
                      className="bg-black text-[#72ff70] border border-neutral-800 text-[8px] p-1 focus:outline-none focus:border-[#ab3600] font-mono shrink-0 cursor-pointer"
                    >
                      <option value="1">ETH</option>
                      <option value="56">BSC</option>
                      <option value="137">MATIC</option>
                      <option value="42161">ARB</option>
                      <option value="8453">BASE</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Contract address..."
                      aria-label="Audit target address"
                      value={architectAuditAddress}
                      onChange={(e) => setArchitectAuditAddress(e.target.value)}
                      className="bg-black text-[#72ff70] border border-neutral-800 text-[8px] p-1 flex-1 focus:outline-none focus:border-[#ab3600] font-mono tracking-tight min-w-0"
                    />
                    <button
                      type="button"
                      disabled={architectIsAuditing}
                      onClick={() => handleArchitectAuditRun()}
                      className={`font-black px-1.5 text-[8px] uppercase transition-all duration-100 shrink-0 ${
                        architectIsAuditing 
                          ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                          : 'bg-[#ab3600] hover:bg-orange-600 text-white cursor-pointer active-press border border-black'
                      }`}
                    >
                      Audit
                    </button>
                  </div>

                  {/* Terminal console message container */}
                  <div className="bg-black/90 p-1.5 border border-neutral-800 text-[8px] text-[#72ff70] font-mono h-14 overflow-y-auto break-all whitespace-pre-line leading-normal scrollbar-thin">
                    {architectConsoleMessage}
                  </div>

                  {/* Quick-select samples */}
                  <div className="flex items-center gap-1 flex-wrap pt-0.5">
                    <span className="text-gray-500 text-[7px] font-bold uppercase shrink-0">LOAD:</span>
                    <button
                      type="button"
                      onClick={() => {
                        const addr = "0x6982508145454ce325ddbe47a25d4ec3d2311933"; // PEPE on ETH
                        setArchitectChainId("1");
                        setArchitectAuditAddress(addr);
                        handleArchitectAuditRun(addr);
                      }}
                      className="bg-neutral-900 hover:bg-neutral-850 text-amber-400 border border-neutral-800 text-[6.5px] px-1 py-0.2"
                    >
                      PEPE
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const addr = "0xdAC17F958D2ee523a2206206994597C13D831ec7"; // USDT on ETH
                        setArchitectChainId("1");
                        setArchitectAuditAddress(addr);
                        handleArchitectAuditRun(addr);
                      }}
                      className="bg-neutral-900 hover:bg-neutral-850 text-emerald-400 border border-neutral-800 text-[6.5px] px-1 py-0.2"
                    >
                      USDT
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const addr = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // WBNB on BSC
                        setArchitectChainId("56");
                        setArchitectAuditAddress(addr);
                        handleArchitectAuditRun(addr);
                      }}
                      className="bg-neutral-900 hover:bg-neutral-850 text-[#72ff70] border border-neutral-800 text-[6.5px] px-1 py-0.2"
                    >
                      WBNB
                    </button>
                  </div>
                </div>
              </div>

              {/* Hardened system metrics footer */}
              <div className="pt-2 border-t border-white/10 text-[7.5px] text-gray-500 space-y-0.5">
                <div className="flex justify-between items-center">
                  <span>P2P ESCROWS:</span>
                  <span className="text-white font-bold">29 ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>SYSTEM FEED:</span>
                  <span className="text-[#72ff70] font-black uppercase">REAL-TIME</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filtering and Free-Text Search Command Deck */}
          <div className="bg-white border-heavy p-4 sm:p-5 neo-shadow-sm flex flex-col md:flex-row items-stretch justify-between gap-4">
            
            {/* Quick Keyword Search Input */}
            <div className="relative flex-grow max-w-xl">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-[#ab3600]" />
              </span>
              <input
                type="text"
                placeholder="Query security vectors, coins (MiCA, naira, USDT, recovery, check)..."
                value={searchQuery}
                aria-label="Search target articles"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 bg-brand-surface border-heavy font-mono text-xs text-gray-950 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-0 rounded-none"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-gray-400 hover:text-black font-mono font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Search Tag Filters */}
            <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-clean scrollable-row pb-1 sm:pb-0 max-w-full">
              <span className="font-mono text-[9px] text-[#ab3600] font-black uppercase tracking-wider hidden lg:block shrink-0">
                <Filter className="w-3.5 h-3.5 inline mr-1" />
                FILTER CHANNEL:
              </span>
              <div className="flex gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 border-heavy font-mono text-[10px] font-black uppercase transition-all duration-100 cursor-pointer active-press shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#ab3600] text-white shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                        : 'bg-white text-gray-800 hover:bg-orange-50'
                    }`}
                  >
                    {cat === 'all' ? 'ALL ARCHIVES' : cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Large Split layout: Blog grid vs Security How-To guides / Report center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Grid of filtered Blog posts (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {filteredPosts.length === 0 ? (
                <div className="bg-brand-surface border-heavy p-12 text-center font-mono space-y-3">
                  <div className="text-2xl">🔍</div>
                  <h3 className="font-black text-gray-950 uppercase">No Matching Threat Bulletins</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
                    We couldn't locate any active threat alerts or compliance posts containing "{searchQuery}". Try searching general terms like "tax", "USDT", "approve", "P2P", or "seed".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="border border-black bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase hover:bg-brand-surface-container transition-colors"
                  >
                    Reset Filter Query
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white border-heavy neo-shadow hover:translate-y-[-2px] duration-150 transition-all flex flex-col justify-between overflow-hidden text-left group"
                    >
                      <div className="min-w-0">
                        {post.imageSrc && (
                          <div 
                            onClick={() => setSelectedPostId(post.id)}
                            className="w-full h-44 sm:h-48 overflow-hidden border-b-4 border-black relative cursor-pointer"
                          >
                            <img
                              src={post.imageSrc}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover filter contrast-[1.02] saturate-[0.95] group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider border border-white">
                              CASE EVIDENCE PREVIEW
                            </div>
                          </div>
                        )}

                        <div className="p-6 space-y-4 flex-grow">
                          <div className="flex justify-between items-center gap-2">
                            <span className="bg-[#fff0ea] border border-[#ab3600] text-[#ab3600] font-mono text-[8.5px] font-black px-1.5 py-0.5 uppercase tracking-wide">
                              {post.category}
                            </span>
                            <span className="font-mono text-[9px] text-gray-400 font-bold uppercase">{post.date}</span>
                          </div>

                          <h3
                            onClick={() => setSelectedPostId(post.id)}
                            className="font-sora text-base sm:text-base md:text-lg font-black text-gray-950 group-hover:text-[#ab3600] cursor-pointer transition-colors leading-tight uppercase line-clamp-2"
                          >
                            {post.title}
                          </h3>

                          <p className="font-mono text-[11px] text-gray-600 leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 py-4 border-t-2 border-black bg-brand-surface flex items-center justify-between text-[11px] font-mono shrink-0 font-bold">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock className="w-3.5 h-3.5 text-brand-primary" />
                          <span>{post.readTime}</span>
                        </div>

                        <button
                          onClick={() => setSelectedPostId(post.id)}
                          className="flex items-center gap-1 font-black text-[#ab3600] hover:text-[#7d2700] hover:underline cursor-pointer group-hover:translate-x-0.5 transition-transform uppercase text-[10.5px]"
                          id={`read-article-link-${post.id}`}
                        >
                          READ ARTICLE
                          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Advisory Warning Panel */}
              <div className="bg-[#fffbeb] border-heavy border-l-[8px] border-l-amber-500 p-5 font-mono text-left space-y-3 shadow-sm rounded-none">
                <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>ONCHAIN PROTECTION PROTOCOL IN REVOLUTION</span>
                </div>
                <p className="text-[11px] text-gray-700 leading-relaxed">
                  Cybercrime rings exploit rapid settlement windows, seed compromises, and artificial peer accounts to seize stablecoins and decentralized coin networks. CSG publishes physical directories and safety scripts to harden client profiles.
                </p>
              </div>

            </div>

            {/* RIGHT SIDE: Interactive "How-To" Security Tutorials & Report Phish Center (4 cols) */}
            <div className="lg:col-span-4 space-y-6 text-left lg:sticky lg:top-[142px] lg:self-start lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto scrollbar-thin pr-2 pb-6">
              
              {/* How-To Security Handbook (Dropdowns Accordion) */}
              <div className="bg-white border-heavy p-5 neo-shadow-sm rounded-none space-y-4">
                <div className="flex items-center gap-2 border-b-2 border-black pb-3">
                  <BookOpen className="w-5 h-5 text-[#ab3600] shrink-0" />
                  <h3 className="font-sora text-xs sm:text-sm font-black text-gray-950 uppercase tracking-tight">
                    HOW-TO DEFENSE HANDBOOK
                  </h3>
                </div>

                <p className="font-mono text-[10.5px] text-gray-600 leading-relaxed">
                  Quick, practical operational blueprints to secure onchain operations. Click a handbook guide to open:
                </p>

                <div className="space-y-3 pt-1">
                  {SECURITY_TUTORIALS.map((tut) => {
                    const isExpanded = expandedTutorialId === tut.id;
                    return (
                      <div key={tut.id} className="border-heavy bg-white neo-shadow-sm overflow-hidden text-left hover:translate-y-[-1px] duration-150 transition-all">
                        <button
                          onClick={() => handleTutorialToggle(tut.id)}
                          className="w-full text-left p-3 bg-white hover:bg-orange-50/20 flex items-center justify-between gap-1.5 transition-colors font-mono cursor-pointer"
                        >
                          <span className="text-[10px] font-black text-gray-900 uppercase leading-snug">
                            {tut.topic}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                          )}
                        </button>

                        {isExpanded && (
                          <div className="p-3.5 bg-brand-surface border-t border-black/10 font-mono text-[10.5px] space-y-3 text-left">
                            <div className="flex items-center justify-between text-[8px] text-gray-400 font-extrabold pb-1.5 border-b border-black/5">
                              <span>CATEGORY: {tut.category.toUpperCase()}</span>
                              <span className="bg-orange-100 text-[#ab3600] px-1 border border-orange-200">
                                {tut.difficulty} LEVEL
                              </span>
                            </div>

                            <ol className="space-y-2 list-decimal list-inside text-gray-700">
                              {tut.steps.map((st, i) => (
                                <li key={i} className="leading-relaxed pl-1">
                                  <span className="text-gray-900 font-extrabold">{i + 1}.</span> {st}
                                </li>
                              ))}
                            </ol>

                            <div className="bg-[#fffdeb] border border-amber-200 p-2 text-[9.5px] text-amber-900 font-semibold leading-relaxed flex items-start gap-1.5">
                              <span className="shrink-0">🧙</span>
                              <span>{tut.tips}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* REPORT COIN / COMPLIANCE THREAT SUBMISSION NODE (Creative Interactive) */}
              <div className="bg-neutral-900 text-white border-heavy p-5 neo-shadow-sm rounded-none space-y-4 text-left">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Shield className="w-5 h-5 text-red-400 shrink-0" />
                  <h3 className="font-sora text-xs sm:text-sm font-black uppercase tracking-tight text-white">
                    ALERT FORENSIC SUBMISSION
                  </h3>
                </div>

                <p className="font-mono text-[9.5px] text-neutral-400 leading-normal">
                  Spotted a malicious address, phishing link, fake exchange agent or an anonymous stablecoin exploit? Submit its data anonymously to help seed our Scams Database.
                </p>

                {showSubmissionSuccess ? (
                  <div className="bg-[#123115]/50 border border-emerald-500 p-4 font-mono text-[10px] text-emerald-400 space-y-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>SUBMISSION LOGGED SUCCESSFULLY</span>
                    </div>
                    <p className="leading-relaxed">
                      Thank you. Our forensic scanning registry has indexed this data block. We will inspect its signature telemetry for threat scoring.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleReportSubmit} className="space-y-3 font-mono text-[10px]" id="scam-threat-submission-form">
                    <div className="space-y-1">
                      <label htmlFor="threat-type" className="text-neutral-400 uppercase tracking-wider block">THREAT SCENARIO CATEGORY:</label>
                      <select
                        id="threat-type"
                        value={submissionForm.type}
                        onChange={(e) => setSubmissionForm({...submissionForm, type: e.target.value})}
                        className="w-full bg-[#1e1e1e] text-white border border-white/15 p-1.5 text-[10.5px] rounded-none focus:outline-none focus:border-brand-primary"
                      >
                        <option value="phishing">Phishing Mirror URL</option>
                        <option value="allowance">Unlimited Token Spender Address</option>
                        <option value="telegram">Fake Official / Telegram Impostor Handle</option>
                        <option value="poisoning">Target Address Poisoning String</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="threat-target" className="text-neutral-400 uppercase tracking-wider block">ATTACKER ADDRESS / SITE URL:</label>
                      <input
                        id="threat-target"
                        type="text"
                        required
                        placeholder="e.g. 0xa9059cbb... or https://claim-tether.net"
                        value={submissionForm.target}
                        onChange={(e) => setSubmissionForm({...submissionForm, target: e.target.value})}
                        className="w-full bg-[#1e1e1e] text-[#72ff70] border border-white/15 p-1 text-[10px] rounded-none focus:outline-none focus:border-brand-primary font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="threat-evidence" className="text-neutral-400 uppercase tracking-wider block">BRIEF LOG OBSERVATIONS:</label>
                      <textarea
                        id="threat-evidence"
                        rows={2}
                        required
                        placeholder="Pasted transaction hex strings, fake chat messages, or specific descriptions..."
                        value={submissionForm.evidence}
                        onChange={(e) => setSubmissionForm({...submissionForm, evidence: e.target.value})}
                        className="w-full bg-[#1e1e1e] text-white border border-white/15 p-1 text-[10px] rounded-none focus:outline-none focus:border-brand-primary resize-none font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="threat-reporter" className="text-neutral-400 uppercase tracking-wider block">YOUR ENCRYPTED CONTACT (OPTIONAL):</label>
                      <input
                        id="threat-reporter"
                        type="email"
                        placeholder="email@example.com (keeps clean anonymity)"
                        value={submissionForm.senderEmail}
                        onChange={(e) => setSubmissionForm({...submissionForm, senderEmail: e.target.value})}
                        className="w-full bg-[#1e1e1e] text-white border border-white/15 p-1 text-[10px] rounded-none focus:outline-none"
                      />
                    </div>

                    <div className="pt-1.5">
                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white border-2 border-black font-black uppercase py-2 tracking-widest text-[9.5px] cursor-pointer inline-flex items-center justify-center gap-1.5 active-press"
                      >
                        🚀 UPLOAD EXPOSE REPORT
                      </button>
                    </div>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      <ReportInaccuracyButton pageName="Blog & Alerts" />
    </div>
  );
};
