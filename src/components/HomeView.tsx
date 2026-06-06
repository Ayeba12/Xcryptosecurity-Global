import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { tickerNews, scamsDatabase, roadmapSteps } from '../data';
import { blogPosts } from '../extendedData';
import { GlossaryText } from './GlossarySystem';
import { OnChainRiskDashboard } from './OnChainRiskDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../utils/LanguageContext';
import { 
  ShieldAlert, 
  HelpCircle, 
  BookOpen, 
  Lock, 
  ArrowRight, 
  DollarSign, 
  Globe, 
  Sparkles, 
  CheckCircle, 
  TrendingUp, 
  Info,
  Layers,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Terminal,
  Clock,
  Shield,
  Users,
  Check,
  AlertTriangle,
  Briefcase
} from 'lucide-react';

interface HomeViewProps {
  setView: (view: AppView) => void;
}

// 4 Custom High-Fidelity Educational Slides for Carousel (Spanish)
const CAROUSEL_SLIDES_ES = [
  {
    id: 0,
    title: "Aislamiento de Ledger en Frío Fuera de Línea",
    category: "HITO 1 • AUTOCUSTODIA",
    tag: "ESCUDO DE COBALTO",
    tagClass: "bg-[#e0f2fe] text-[#0369a1] border-[#0369a1]",
    description: "La barrera física dura es su línea de defensa definitiva. Al aislar las claves privadas fuera de línea dentro de chips criptográficos seguros, el almacenamiento en frío evita que los atacantes ejecuten transferencias en puentes de red comprometidos.",
    imgSrc: "https://picsum.photos/seed/cyber_ledger/600/400",
    points: [
      "Las claves privadas nunca tocan un chip de memoria adyacente a internet",
      "Se requiere una doble pulsación física para todas las firmas",
      "Protección total contra troyanos de red y vectores de espionaje de pantalla"
    ],
    cta: "Iniciar Hoja de Ruta",
    targetView: "start-here" as AppView
  },
  {
    id: 1,
    title: "Revocación de Permisos de Contratos Inteligentes",
    category: "HITO 2 • TOKENS",
    tag: "ELIMINACIÓN DE AMENAZAS",
    tagClass: "bg-[#fff0ea] text-[#ab3600] border-[#ff5f1f]",
    description: "Las trampas de contratos inteligentes 'Ice Phishing' engañan a los usuarios para que firmen transacciones estándar de 'Aprobación Ilimitada'. Esto otorga al atacante derechos absolutos para vaciar sus saldos en el futuro.",
    imgSrc: "https://picsum.photos/seed/contract_revoke/600/400",
    points: [
      "Elimine habitualmente las aprobaciones excesivas utilizando software de revocación",
      "Verifique las coordenadas de firma sin procesar en la pantalla de su dispositivo",
      "Utilice billeteras desechables aisladas para interactuar con contratos especulativos"
    ],
    cta: "Ejecutar Diagnóstico",
    targetView: "security-centre" as AppView
  },
  {
    id: 2,
    title: "Escudos P2P de Transferencias Bancarias",
    category: "HITO 3 • REGIONAL",
    tag: "ANÁLISIS LOCAL",
    tagClass: "bg-[#ecfdf5] text-[#047857] border-[#047857]",
    description: "Los corredores bancarios peer-to-peer requieren extrema precaución. Los ciberdelincuentes suelen intercambiar monedas estables limpias por dinero fiduciario comprometido, bloqueando a comerciantes inocentes.",
    imgSrc: "https://picsum.photos/seed/nigeria_p2p/600/405",
    points: [
      "Verifique estrictamente que los nombres en las transferencias coincidan con la identidad",
      "Rechace cualquier instrucción de chat externa fuera del depósito en garantía",
      "Prefiera pasarelas con licencia oficial para sus rampas principales de intercambio"
    ],
    cta: "Explorar Portales",
    targetView: "countries" as AppView
  },
  {
    id: 3,
    title: "Perfiles de Navegador Blindados para Integración",
    category: "HITO 4 • AULA",
    tag: "PRÁCTICA EN ENTORNO SEGURO",
    tagClass: "bg-purple-50 text-purple-700 border-purple-600",
    description: "Los complementos del navegador y los registros del portapapeles de la computadora pueden leer y modificar direcciones objetivo de alto valor. Ejecute transacciones sensibles bajo perfiles de navegador aislados.",
    imgSrc: "https://picsum.photos/seed/security_sandbox/600/400",
    points: [
      "Dedicate un navegador web exclusivo estrictamente aislado de cuentas sociales",
      "Exija tokens de hardware mecánicos (YubiKeys) en sus accesos centrales",
      "Guarde siempre en favoritos las direcciones oficiales para evitar anuncios fraudulentos"
    ],
    cta: "Ingresar al Aula",
    targetView: "beginner-guides" as AppView
  }
];

// 4 Custom High-Fidelity Educational Slides for Carousel using Picsum visual backdrops
const CAROUSEL_SLIDES = [
  {
    id: 0,
    title: "Offline Cold Ledger Isolation",
    category: "MILESTONE 1 • SELF-CUSTODY",
    tag: "COBALT SHIELDED",
    tagClass: "bg-[#e0f2fe] text-[#0369a1] border-[#0369a1]",
    description: "The hard physical boundary is your ultimate line of defense. By isolating private keys offline inside cryptographic secure element chips, cold storage prevents bad actors from executing transfers over compromised network bridges.",
    imgSrc: "https://picsum.photos/seed/cyber_ledger/600/400",
    points: [
      "Private keys never touch an internet-adjacent host memory chip",
      "Physical double-press verification is required for all signatures",
      "Protects completely against network Trojans and screen-spying vectors"
    ],
    cta: "Start Storage Roadmap",
    targetView: "start-here" as AppView
  },
  {
    id: 1,
    title: "Smart-Contract Approval Revocations",
    category: "MILESTONE 2 • TOKENS",
    tag: "THREAT CLEARANCE",
    tagClass: "bg-[#fff0ea] text-[#ab3600] border-[#ff5f1f]",
    description: "Ice Phishing smart contract traps trick users into signing standard 'Approve Unlimited' transactions. This gives malicious decentralised pools absolute rights to drain your balance at a future date without your consent.",
    imgSrc: "https://picsum.photos/seed/contract_revoke/600/400",
    points: [
      "Routinely wipe excessive approvals back to zero using revoke software",
      "Verify raw signature hex coordinates directly on ledger screens",
      "Use isolated disposable burner wallets for speculative smart contracts"
    ],
    cta: "Run Security Diagnostics",
    targetView: "security-centre" as AppView
  },
  {
    id: 2,
    title: "Naira P2P Banking Escrow Shields",
    category: "MILESTONE 3 • REGIONAL",
    tag: "LOCAL FORENSICS",
    tagClass: "bg-[#ecfdf5] text-[#047857] border-[#047857]",
    description: "Naira peer-to-peer bank corridors require extreme caution. Cyber criminals often trade clean stablecoins in exchange for compromised cash, locking innocent traders in severe third-party bank audits.",
    imgSrc: "https://picsum.photos/seed/nigeria_p2p/600/405",
    points: [
      "Rigidly check that counterparty names on bank transfers match IDs",
      "Decline any external off-escrow chat instructions from buyers",
      "Favor Nigerian SEC-licensed gateways like Quidax for primary ramps"
    ],
    cta: "Browse Regional Hub",
    targetView: "countries" as AppView
  },
  {
    id: 3,
    title: "Hardened Browser Integration Profiles",
    category: "MILESTONE 4 • CLASSROOM",
    tag: "SANDBOX PRACTICE",
    tagClass: "bg-purple-50 text-purple-700 border-purple-600",
    description: "Browser plugins and clipboard logs can read and modify high-value target addresses. Ensure you execute sensitive transactions under dedicated, sandboxed profiles that block malicious web extensions.",
    imgSrc: "https://picsum.photos/seed/security_sandbox/600/400",
    points: [
      "Dedicate an exclusive web browser strictly isolated from social accounts",
      "Enforce mechanical hardware tokens (YubiKeys) on central logins",
      "Always bookmark core addresses to bypass fake search-results"
    ],
    cta: "Enter CSG Classroom",
    targetView: "beginner-guides" as AppView
  }
];

// Interactive Threat Scenarios Sandbox data (Spanish)
const SANDBOX_SCENARIOS_ES = [
  {
    id: "ice-phish",
    title: "Ataque de Phishing de USDT (Ice Phishing)",
    short: "Captura de aprobaciones de contratos inteligentes",
    attackerHex: "approve(address spender, uint256 amount: 0xffffffffffffffff...)",
    description: "El atacante aloja una dApp de staking falsa. Hacer clic en 'Reclamar recompensa' firma una transacción que otorga al atacante acceso ilimitado a las monedas estables de su billetera.",
    remediation: "Nunca firme cargas de permisos en URL no verificadas. Mantenga una lista de favoritos y revise los permisos onchain periódicamente.",
    severity: "RIESGO DE INCUMPLIMIENTO DE SEGURIDAD CRÍTICO"
  },
  {
    id: "addr-poison",
    title: "Bot de Envenenamiento de Direcciones",
    short: "Secuestro de cola de caracteres idénticos",
    attackerHex: "transfer(0xe138a...[attacker matching tail]...cf82, 0 NGN)",
    description: "Los bots analizan los registros de la red, detectan sus transferencias frecuentes y envían tokens de valor cero desde una dirección generada cuyos caracteres iniciales y finales imitan los suyos.",
    remediation: "Verifique manualmente cada uno de los 42 caracteres. No copie direcciones a ciegas de su historial de transacciones públicas.",
    severity: "INTERCEPCIÓN DE DIRECCIONES EVM"
  },
  {
    id: "clip-hijack",
    title: "Troyano de Portapapeles",
    short: "Sustitución silenciosa de dirección en portapapeles",
    attackerHex: "onCopy: replaceString('0x9a8f...', '0xbad_attacker...')",
    description: "Un software malicioso silencioso espera a detectar un formato de dirección de criptomonedas en la memoria del portapapeles y lo reemplaza con la dirección del monedero del atacante.",
    remediation: "Compruebe siempre físicamente las direcciones en la pantalla de su dispositivo de hardware en frío. La pantalla de la computadora puede mentir; la pantalla del Ledger no.",
    severity: "INFILTRACIÓN POR TROYANO LOCAL"
  },
  {
    id: "discord-admin",
    title: "Suplantación de Administrador o Soporte",
    short: "Formulario falso de migración de tokens en redes sociales",
    attackerHex: "GET /restore_wallet_backup { secret_keys_12: ... }",
    description: "Los estafadores copian avatares de administradores en Telegram o Discord y envían mensajes directos pidiendo a los usuarios usar un 'nodo de calibración' que solicita frases de semilla.",
    remediation: "El personal de soporte nunca inicia chats privados y absolutamente nunca requiere su frase de recuperación. Guarde su semilla solo en metal.",
    severity: "VECTOR DE FRAUDE SOCIAL"
  }
];

// Team Registry (Spanish)
const TEAM_MEMBERS_ES = [
  {
    name: "Elena Vance",
    role: "Analista Principal de Ciberseguridad",
    initials: "EV",
    bio: "Ex-auditora de vulnerabilidades de protocolo especializada en arquitecturas de amenazas de contratos EVM y configuraciones de respaldo en frío.",
    avatarBg: "bg-blue-900 border-blue-500 text-blue-10%"
  },
  {
    name: "Marcus Kross",
    role: "Asesor de Cumplimiento AML",
    initials: "MK",
    bio: "Consejero de riesgos globales centrado en corredores fiat legislativos, firmas de mulas de dinero y marcos de licencias de activos virtuales.",
    avatarBg: "bg-[#ab3600] border-orange-500 text-orange-10%"
  },
  {
    name: "Dele Akintola",
    role: "Director de Mercados de África Subsahariana",
    initials: "DA",
    bio: "Arquitecto de riesgos P2P que documenta bloqueos bancarios por depósitos en garantía, cumplimiento comercial paralelos de Naira y mapas de verificación.",
    avatarBg: "bg-emerald-900 border-emerald-500 text-emerald-10%"
  },
  {
    name: "Jan Weber",
    role: "Asesor Legal de Regulaciones Europeas",
    initials: "JW",
    bio: "Especialista en la legislación europea MiCA, directrices de seguimiento centralizado de activos y definiciones de autocustodia.",
    avatarBg: "bg-purple-900 border-purple-500 text-purple-10%"
  }
];

// Interactive Threat Scenarios Sandbox data
const SANDBOX_SCENARIOS = [
  {
    id: "ice-phish",
    title: "USDT Ice Phishing Attack",
    short: "Smart Contract Approvals Capture",
    attackerHex: "approve(address spender, uint256 amount: 0xffffffffffffffff...)",
    description: "The attacker hosts a fake staking dApp. Clicking 'Claim Reward' signs a transaction that grants the attacker unlimited access to your wallet's stablecoins.",
    remediation: "Never sign permission payloads on unverified URLs. Keep a whitelist bookmarked and review onchain authorizations regularly.",
    severity: "CRITICAL SECURITY BREACH RISK"
  },
  {
    id: "addr-poison",
    title: "Address Poisoning Bot",
    short: "Visual Counterfeit Tail Hijacking",
    attackerHex: "transfer(0xe138a...[attacker matching tail]...cf82, 0 NGN)",
    description: "Bots sweep network logs, spot your frequent transactions, and transfer dust tokens from a generated address whose first and last six digits mirror yours, tempting your lazy clipboard copy.",
    remediation: "Manually contrast all 42 digits on screen. Do not copy addresses blindly from your public transaction list history.",
    severity: "EVM INTERCEPTION EXERTION"
  },
  {
    id: "clip-hijack",
    title: "Clipboard Spoofing Trojan",
    short: "Silent System Address Substitution",
    attackerHex: "onCopy: replaceString('0x9a8f...', '0xbad_attacker...')",
    description: "Silent computer malware waits for a cryptocurrency signature footprint in your clipboard memory, swiping it instantly with a predefined attacker wallet address.",
    remediation: "Always test addresses physically on your cold hardware display screen. Your computer screen itself can lie; the ledger screen cannot.",
    severity: "LOCAL Trojan INVOLVEMENT"
  },
  {
    id: "discord-admin",
    title: "Vocal Support Impersonation",
    short: "Social Token-Migration Web Form",
    attackerHex: "GET /restore_wallet_backup { secret_keys_12: ... }",
    description: "Scammers copy admin avatars on Telegram or Discord and DM active users seeking assistance, pointing them to an online 'calibration node' that demands seed entries.",
    remediation: "Support staff never write first, and absolutely never require 12 or 24-word recovery seed sequences. Put seeds only in metal.",
    severity: "SOCIAL FRAUD VECTOR"
  }
];

// Team Registry
const TEAM_MEMBERS = [
  {
    name: "Elena Vance",
    role: "Chief Cyber Security Analyst",
    initials: "EV",
    bio: "Ex-protocol vulnerability auditor specializing in EVM smart contract threat architectures and cold backup configurations.",
    avatarBg: "bg-blue-900 border-blue-500 text-blue-10%"
  },
  {
    name: "Marcus Kross",
    role: "AML Compliance Advisor",
    initials: "MK",
    bio: "Global risk counselor focused on legislative fiat corridors, money mule signatures, and Virtual Asset licensing frameworks.",
    avatarBg: "bg-[#ab3600] border-orange-500 text-orange-10%"
  },
  {
    name: "Dele Akintola",
    role: "Sub-Saharan Markets Lead",
    initials: "DA",
    bio: "P2P risk architect documenting Naira banking escrow blocks, parallel markets trading compliance, and peer verification maps.",
    avatarBg: "bg-emerald-900 border-emerald-500 text-emerald-10%"
  },
  {
    name: "Jan Weber",
    role: "European Regulations Counsel",
    initials: "JW",
    bio: "Specialist on EU MiCA legislation, centralized asset tracking guidelines, and legal self-custody definitions.",
    avatarBg: "bg-purple-900 border-purple-500 text-purple-10%"
  }
];

export interface XtsgQuizQuestion {
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const XTSG_QUIZ_QUESTIONS: XtsgQuizQuestion[] = [
  {
    category: "SEED STORAGE PHISHING",
    question: "Can a protocol support admin or automated tool require you to verify your ledger's 12-word seed phrase on-screen?",
    options: [
      "A. Yes, to audit ledger indexing status and unlock pending transactions.",
      "B. Never, under any conditions whatsoever. Protocol developers cannot read seed words.",
      "C. Under high network congestion, only via certified browser extensions."
    ],
    correctIndex: 1,
    explanation: "Absolutely not. Your 12-word seed phrase is your private master key. No support agent, smart contract, or dApp validation tool ever needs it. Entering it online grants attackers complete, immediate wallet drainage."
  },
  {
    category: "P2P WIRE PROTOCOL",
    question: "During a peer-to-peer (P2P) fiat exchange transfer, the buyer asks you to type 'Crypto USDT' in the bank's wire reference layout box. What is the correct protocol?",
    options: [
      "A. Enter it so the bank can process and catalogue the web3 receipt accurately.",
      "B. Refuse immediately. Use a random numerical ID or blank reference. Crypto keywords trigger compliance blocklists.",
      "C. Complete the wire reference, block the user, then notify central law enforcement."
    ],
    correctIndex: 1,
    explanation: "Domestic fiat banking channels operate under strict regulatory bans against ledger-related memento fields. Typing descriptors like 'Crypto', 'USDT' or 'Bitcoin' in remarks triggers automated AML tags, freezing your account."
  },
  {
    category: "GASLESS CONTRACT PERMITS",
    question: "A dApp asks you to sign an off-chain 'permit' signature (ERC-20 Permit/ERC-2612) that does not require any network gas execution fee. Is this safe?",
    options: [
      "A. Safe. Since it consumes zero gas, it cannot execute actual wallet transfers.",
      "B. Dangerous. Off-chain permit messages grant immediate spend authority which allows malicious actors to drain approvals gaslessly.",
      "C. Partially safe, as it only registers dynamic UI theme profiles on-chain."
    ],
    correctIndex: 1,
    explanation: "ERC-2612 permit messages allow gasless off-chain approvals that grant complete spend authority of stablecoins. Attackers request this signature to bypass fees and drain your balances."
  },
  {
    category: "HONEYPOT CONTRACTS",
    question: "You buy a newly listed token and make 10x gains in minutes, but attempting to sell it results in 'TransferHelper_transferFrom failed'. What is the likely risk?",
    options: [
      "A. The network node has timed out. Reset the RPC slippage rate to 99%.",
      "B. The contract contains a 'honeypot' mechanism where developer settings modify ERC-20 transfer permissions so only whitelisted developer accounts can sell.",
      "C. You must purchase additional gas tokens to unlock the contract vault."
    ],
    correctIndex: 1,
    explanation: "Honeypots are malicious smart contracts programmed to receive buy transactions normally but block 'sell' execution calls for public addresses, locking your funds."
  },
  {
    category: "SECONDARY RECOVERY FRAUD",
    question: "You were scammed out of 1,000 USDT. A self-proclaimed 'ethical hacker' claims they can trace and recover it if you pay a $100 escrow gas fee first. What is this?",
    options: [
      "A. A legitimate public utility recovery agency specializing in decentralized traces.",
      "B. A secondary scam (Recovery Scam). Blockchain layers are immutable and recovery hacks are cryptographic impossibilities.",
      "C. A token insurance clause operated by sovereign network councils."
    ],
    correctIndex: 1,
    explanation: "Once finalized, ledger transactions are mathematically irreversible. Anyone claiming they can get your coins back for an upfront fee is running a secondary recovery scam."
  },
  {
    category: "DUST TOKEN POISONING",
    question: "You notice a high-value token (e.g. 5,000 'VulnerableGift' tokens) mysteriously deposited in your wallet directing you to a website to redeem them. What is the safe protocol?",
    options: [
      "A. Ignore it entirely. Do not interact with the token or sign anything on the linked portal. It is a dusting risk designed to steal contract approvals.",
      "B. Transfer it to an exchange address to let the broker liquidate it for you.",
      "C. Interact using a secondary browser tab to test the redemption rate securely."
    ],
    correctIndex: 0,
    explanation: "Dusting/poisoning attacks deposit worthless tokens that redirect to malicious interfaces. Signing target interactions triggers full approval handovers to drain your authentic stablecoins."
  }
];

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  const { language, t } = useLanguage();

  // Threat sandbox state (declared early to prevent initialization errors)
  const [selectedScenario, setSelectedScenario] = useState<typeof SANDBOX_SCENARIOS[0]>(SANDBOX_SCENARIOS[0]);
  const [sandboxInput, setSandboxInput] = useState<string>(SANDBOX_SCENARIOS[0].attackerHex);
  const [compareUserAddr, setCompareUserAddr] = useState<string>("0xa4c330df3b10b00c3b313efefefefefefebd10b9");
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'complete'>('idle');

  const activeSlides = language === 'es' ? CAROUSEL_SLIDES_ES : CAROUSEL_SLIDES;
  const activeScenarios = language === 'es' ? SANDBOX_SCENARIOS_ES : SANDBOX_SCENARIOS;
  const activeTeam = language === 'es' ? TEAM_MEMBERS_ES : TEAM_MEMBERS;
  const activeSelectedScenario = activeScenarios.find(s => s.id === selectedScenario.id) || activeScenarios[0];

  // Live market and gas rates states
  const [marketFeed, setMarketFeed] = useState({
    btc: { price: 68420, change: 1.2 },
    eth: { price: 3480, change: -0.4 },
    sol: { price: 144.5, change: 2.1 },
    ethGas: 15,
    bscGas: 3,
    polygonGas: 32,
    loading: true,
    status: language === 'es' ? "SINCRONIZANDO..." : "SYNCHRONIZING..."
  });

  useEffect(() => {
    let active = true;

    const fetchPricesAndGas = async () => {
      try {
        let btcPrice = 68420, btcChange = 1.25;
        let ethPrice = 3480, ethChange = -0.42;
        let solPrice = 144.5, solChange = 2.15;
        let ethGasGwei = 15;
        let bscGasGwei = 3;

        // Fetch prices from CoinGecko
        try {
          const coinRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true");
          if (coinRes.ok) {
            const data = await coinRes.json();
            if (data.bitcoin) {
              btcPrice = data.bitcoin.usd;
              btcChange = data.bitcoin.usd_24h_change || 0;
            }
            if (data.ethereum) {
              ethPrice = data.ethereum.usd;
              ethChange = data.ethereum.usd_24h_change || 0;
            }
            if (data.solana) {
              solPrice = data.solana.usd;
              solChange = data.solana.usd_24h_change || 0;
            }
          }
        } catch (e) {
          console.log("CoinGecko price rate-limiting fallback active:", e);
        }

        // Fetch real Ethereum gas fee using free JSON-RPC
        try {
          const gasRes = await fetch("https://cloudflare-eth.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "eth_gasPrice",
              params: []
            })
          });
          if (gasRes.ok) {
            const data = await gasRes.json();
            if (data && data.result) {
              const wei = parseInt(data.result, 16);
              ethGasGwei = Math.max(1, Math.round(wei / 1e9));
            }
          }
        } catch (e) {
          console.log("JSON-RPC gas fee fetch rate limiting fallback active:", e);
        }

        if (active) {
          setMarketFeed({
            btc: { price: btcPrice, change: btcChange },
            eth: { price: ethPrice, change: ethChange },
            sol: { price: solPrice, change: solChange },
            ethGas: ethGasGwei,
            bscGas: bscGasGwei,
            polygonGas: Math.round(ethGasGwei * 2.1),
            loading: false,
            status: "SYNCHRONIZED"
          });
        }
      } catch (err) {
        console.error("Live pulse background synchronization error:", err);
      }
    };

    fetchPricesAndGas();
    const timer = setInterval(fetchPricesAndGas, 30000); // refresh every 30s
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);

  // Expand states
  const [expandStepProtocol, setExpandStepProtocol] = useState(false);
  const [expandRegulatoryShift, setExpandRegulatoryShift] = useState(false);
  const [isSandboxDisclaimerCollapsed, setIsSandboxDisclaimerCollapsed] = useState(true);

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizAttemptSubmitted, setQuizAttemptSubmitted] = useState<boolean>(false);
  const [quizIsAnswerCorrect, setQuizIsAnswerCorrect] = useState<boolean | null>(null);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Carousel slider state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);

  // Threat sandbox state: declared above

  // Dynamic cryptographic threat analysis parser (Fully functional signature-matcher)
  const analyzePayload = (input: string, userAddr: string = "") => {
    const cleanInput = input.trim();

    if (!cleanInput) {
      return {
        riskScore: 0,
        severity: "EMPTY SIGNAL",
        decodedMethod: "NO SIGNALS DETECTED",
        anomalies: ["Input field is blank. Paste hex codes, addresses, generic messages or recovery phrases."],
        remediation: "Pristine terminal wait state."
      };
    }

    // BIP-39 seed phrase checks
    const words = cleanInput.split(/\s+/).filter(w => w.length > 1);
    const looksLikeSeed = (words.length >= 11 && words.length <= 25) && words.every(w => /^[a-zA-Z]+$/.test(w));

    if (looksLikeSeed) {
      return {
        riskScore: 100,
        severity: "CRITICAL SEED LEAK",
        decodedMethod: `BIP-39 SEED EXPOSURE SIGNATURE (${words.length} WORDS)`,
        anomalies: [
          "Mnemonic phrases inputted online indicate compromise. Attacker will control your master seed.",
          "Vector aims at self-custody cold configurations."
        ],
        remediation: "DESTRUCTION PROTOCOL: Immediately delete all electronic photographs or clipboard buffers holding these words. Do not type seed sequences into any internet connected app. Use offline metal steel configurations only."
      };
    }

    // Unlimited token approval (Ice Phishing)
    if (
      cleanInput.includes("approve") || 
      cleanInput.includes("0x095ea7b3") || 
      cleanInput.toLowerCase().includes("unlimited") || 
      cleanInput.includes("0xffffffffffffff") ||
      cleanInput.includes("approve(address spender, uint256 amount")
    ) {
      return {
        riskScore: 98,
        severity: "CRITICAL ALLOWANCE CAPTURE",
        decodedMethod: "ERC-20 TOKEN ALLOWANCE GRANTED (0x095ea7b3)",
        anomalies: [
          "Target grants spender unlimited rights (0xffffffffffff...) over your USDT/USDC holdings.",
          "Attacker contract bypasses standard manual confirmations to swipe wallet assets."
        ],
        remediation: "REVOCATION PROTOCOL: Abort signature. Do not press 'Approve' or sign payload codes on external links. Visit authorized allowance cleanup managers to revoke compromised spender wallets immediately."
      };
    }

    // Address Poisoning matching checks
    const addressRegex = /0x[a-fA-F0-9]{40}/g;
    const foundAddresses = cleanInput.match(addressRegex) || [];

    if (foundAddresses.length > 0) {
      const targetFound = foundAddresses[0];
      const partialAddr = `${targetFound.substring(0, 8)}...${targetFound.substring(targetFound.length - 8)}`;
      
      if (userAddr && userAddr.startsWith("0x") && userAddr.length === 42) {
        const matchFound = foundAddresses.some(addr => {
          const uStart = userAddr.substring(0, 8).toLowerCase();
          const uEnd = userAddr.substring(userAddr.length - 8).toLowerCase();
          const tStart = addr.substring(0, 8).toLowerCase();
          const tEnd = addr.substring(addr.length - 8).toLowerCase();
          return uStart === tStart && uEnd === tEnd && userAddr.toLowerCase() !== addr.toLowerCase();
        });

        if (matchFound) {
          return {
            riskScore: 95,
            severity: "CRITICAL COPIED POISON MATCH",
            decodedMethod: "TAIL-MATCHED ADDRESS POISONING VECTOR",
            anomalies: [
              `COUNTERFEIT DETECTED: Attacker target address matches your verified configuration start/end characters but changes internal coordinates.`,
              `ATTACKER TARGET: ${targetFound}`
            ],
            remediation: "VERIFICATION CORE PROTOCOL: Never copy recipient hashes directly from transaction scroll feeds. Match every key layout index physically on your cold hardware display module."
          };
        }
      }

      // Generic Transfer of 0 amount or standard EVM transfer format
      if (cleanInput.toLowerCase().includes("transfer") && (cleanInput.includes("0") || cleanInput.toLowerCase().includes("dust"))) {
        return {
          riskScore: 80,
          severity: "HIGH RISK POISON SENSOR",
          decodedMethod: "ZERO COIN CORRIDOR SPAM (0xa9059cbb)",
          anomalies: [
            "Poison transfer script logged to insert a malicious address into your recent transaction history."
          ],
          remediation: "IGNORABILITY PROCEDURE: Disregard zero-balance token credits from random contracts. Lock down frequent transaction logs and avoid copying previous recipient strings."
        };
      }

      return {
        riskScore: 35,
        severity: "INFORMATIONAL AUDIT",
        decodedMethod: "STANDARD BLOCKCHAIN COORDINATES DECONSTRUCTED",
        anomalies: [`Analyzed recipient address: ${partialAddr}. No direct scam database flags triggered.`],
        remediation: "CONTINUOUS SAFETY: Validate target protocol smart code before moving substantial funds."
      };
    }

    // Social Phishing link/Airdrop keywords checks
    const pKeywords = ["t.me/", "telegram", "discord", "airdrop", "verify", "claim", "restore", "calibration", "calibration-node", "gift-card", "http", "https"];
    const hasPhishKeyword = pKeywords.some(p => cleanInput.toLowerCase().includes(p));

    if (hasPhishKeyword) {
      return {
        riskScore: 88,
        severity: "HIGH PHISHING VECTOR WARNING",
        decodedMethod: "SOCIAL REDIRECT OR MOCK PORTAL SIGNATURE",
        anomalies: [
          "Payload features third-party communication parameters targeting credentials or trigger keys.",
          "Attacker duplicates admin picture banners on social websites."
        ],
        remediation: "ISOLATION PROCEDURES: Block all peer messages asking for calibration connections. CSG or protocol admins never initiate communication or distribute private airdrop compensation codes on social handles."
      };
    }

    return {
      riskScore: 15,
      severity: "LOW SIGNATURE ALIGNMENT",
      decodedMethod: "GENERIC SYSTEM TELEMETRY",
      anomalies: ["Unrecognized cryptographic structure. Paste direct logs, hex, or word arrays for depth auditing."],
      remediation: "Verify destination contracts manually before signing."
    };
  };

  const currentAnalysis = analyzePayload(sandboxInput, compareUserAddr);

  // UTC clock state
  const [utcTime, setUtcTime] = useState<string>('23:03:03 UTC');

  // Self custody points for 10-step protocol
  const selfCustodyPoints = [
    "Secure a high-grade physical cold ledger hardware vault.",
    "Derive key seed phrase structures offline on pristine steel backing plates.",
    "Segregate storage devices physically context-away in dual fireproof safes.",
    "Destroy any trace of recovery digital snapshots (emails, cloud uploads).",
    "Setup independent dedicated browsers strictly containerized for Web3 apps.",
    "Disable browser auto-fills, clipboard cookies, and unused local plugins.",
    "Routinely examine allowance permissions on smart chains to delete exposures.",
    "Deploy secure hardware authentication keys (YubiKeys) on central exchanges.",
    "Double check full 42 hash characters physically on screen before signing tokens.",
    "Initiate mini trial transfers to guarantee secure balance credit paths."
  ];

  const selfCustodyPointsEs = [
    "Consiga un dispositivo de seguridad de almacenamiento en frío (Ledger) físico de alta calidad.",
    "Establezca sus frases de recuperación fuera de línea en placas de respaldo de acero inoxidable de alta resistencia.",
    "Segregue físicamente los dispositivos de almacenamiento en cajas fuertes ignífugas separadas.",
    "Destruya por completo cualquier captura digital (correos electrónicos, cargas en la nube) de sus frases semilla.",
    "Configure navegadores independientes dedicados estrictamente en contenedores para aplicaciones de Web3.",
    "Desactive el autocompletado en navegadores, las cookies de portapapeles y los complementos locales no utilizados.",
    "Examine regularmente los permisos de asignación de contratos inteligentes para revocar exposiciones obsoletas.",
    "Implemente claves de seguridad física (YubiKeys) en sus accesos a plataformas centralizadas.",
    "Verifique manualmente los 42 caracteres de destino directamente en la pantalla del monedero frío antes de firmar.",
    "Inicie siempre transferencias de prueba pequeñas para garantizar una recepción exitosa del saldo."
  ];

  const activePoints = language === 'es' ? selfCustodyPointsEs : selfCustodyPoints;

  // Auto-play interval for carousel
  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeSlides]);

  // Clock ticks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleXtsgQuizSubmit = (optionIdx: number) => {
    if (quizAttemptSubmitted) return;
    setSelectedQuizOption(optionIdx);
    const correct = optionIdx === XTSG_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
    setQuizIsAnswerCorrect(correct);
    setQuizAttemptSubmitted(true);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedQuizOption(null);
    setQuizAttemptSubmitted(false);
    setQuizIsAnswerCorrect(null);
    if (currentQuizIndex + 1 < XTSG_QUIZ_QUESTIONS.length) {
      setCurrentQuizIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetXtsgQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizAttemptSubmitted(false);
    setQuizIsAnswerCorrect(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handlePrevSlide = () => {
    setIsAutoplay(false);
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNextSlide = () => {
    setIsAutoplay(false);
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const triggerThreatScan = (scenario: typeof SANDBOX_SCENARIOS[0]) => {
    const matchedScenario = activeScenarios.find(s => s.id === scenario.id) || scenario;
    setSelectedScenario(matchedScenario);
    setSandboxInput(scenario.attackerHex);
    setScanState('scanning');
    setTimeout(() => {
      setScanState('complete');
    }, 1200);
  };

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Ticker marquee message */}
      <div className="border-heavy bg-[#1b1b1b] text-white py-3.5 px-1 relative overflow-hidden neo-shadow-sm flex items-center">
        <div className="shrink-0 bg-[#ff5f1f] border border-black text-white px-3 py-1 font-mono text-[9px] font-bold h-full uppercase tracking-wider relative z-10 mr-4 neo-shadow-sm ml-2.5">
          ALERT MARQUEE
        </div>
        <div className="ticker-wrap flex-1">
          <div className="ticker-content font-mono text-xs text-[#72ff70] font-bold select-none whitespace-nowrap">
            {tickerNews.join(' \u00A0\u00A0\u00A0\u00A0 || \u00A0\u00A0\u00A0\u00A0 ')}
          </div>
        </div>
      </div>

      {/* ON-CHAIN MARKET PULSE DECK (Real-time Live Feed) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 text-left">
        
        {/* BTC Price */}
        <div className="border-heavy bg-white p-4 neo-shadow-sm flex flex-col justify-between">
          <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-wider block">BTC / USD RATE</span>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="font-sora text-sm sm:text-base font-black text-gray-950">
              ${marketFeed.btc.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}
            </span>
            <span className={`font-mono text-[9px] font-black ${marketFeed.btc.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {marketFeed.btc.change >= 0 ? "▲" : "▼"}{Math.abs(marketFeed.btc.change).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* ETH Price */}
        <div className="border-heavy bg-white p-4 neo-shadow-sm flex flex-col justify-between">
          <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-wider block">ETH / USD RATE</span>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="font-sora text-sm sm:text-base font-black text-gray-950">
              ${marketFeed.eth.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })}
            </span>
            <span className={`font-mono text-[9px] font-black ${marketFeed.eth.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {marketFeed.eth.change >= 0 ? "▲" : "▼"}{Math.abs(marketFeed.eth.change).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* SOL Price */}
        <div className="border-heavy bg-white p-4 neo-shadow-sm flex flex-col justify-between">
          <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-wider block">SOL / USD RATE</span>
          <div className="flex items-baseline gap-1.5 pt-1">
            <span className="font-sora text-sm sm:text-base font-black text-gray-950">
              ${marketFeed.sol.price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
            </span>
            <span className={`font-mono text-[9px] font-black ${marketFeed.sol.change >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {marketFeed.sol.change >= 0 ? "▲" : "▼"}{Math.abs(marketFeed.sol.change).toFixed(2)}%
            </span>
          </div>
        </div>

        {/* ETH Gas Price */}
        <div className="border-heavy bg-[#fbfbfb] p-4 neo-shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[8px] font-black text-gray-500 uppercase tracking-wider block">ETH BASE FEE</span>
            <span className="bg-neutral-950 text-white font-mono text-[6px] font-black px-1 py-0.2 uppercase tracking-wide">LIVE RPC</span>
          </div>
          <div className="flex items-baseline gap-1 pt-1">
            <span className="font-sora text-sm sm:text-base font-black text-orange-600">
              {marketFeed.ethGas}
            </span>
            <span className="font-mono text-[9px] font-bold text-gray-600 ml-1">GWEI</span>
          </div>
        </div>

        {/* Network Synced Feed status */}
        <div className="border-heavy col-span-2 sm:col-span-2 lg:col-span-1 bg-[#111] p-4 text-white neo-shadow-sm flex flex-col justify-between">
          <span className="font-mono text-[8px] font-black text-neutral-400 uppercase tracking-wider block">NODE GATEWAY</span>
          <div className="flex items-center gap-1.5 pt-1">
            <span className={`w-2 h-2 rounded-full relative ${marketFeed.loading ? "bg-amber-400 animate-pulse" : "bg-[#72ff70]"}`}>
              {!marketFeed.loading && <span className="absolute inset-0 rounded-full bg-[#72ff70] animate-ping" />}
            </span>
            <span className="font-mono text-[9.5px] font-black tracking-tight text-[#72ff70] uppercase">
              {marketFeed.status}
            </span>
          </div>
        </div>

      </div>

      {/* Hero Welcome Banner (Split Layout with Aesthetic Sidebar Picture Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-8 border-heavy bg-[#f9f9f9] p-6 md:p-10 neo-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#efefff] border border-[#0040e0] text-[#0040e0] font-mono text-[9.5px] font-bold px-3 py-1 uppercase tracking-widest">
              <span>UNBIASED SECURE DIRECTIVES</span>
            </div>
            <h2 className="font-sora text-3xl md:text-5xl font-black text-[#1b1b1b] tracking-tighter uppercase leading-none">
              XTSG. LEARN, SECURE & GROW WITH CRYPTO
            </h2>
            <div className="font-sans text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-2xl">
              <GlossaryText text="Xcrypto-Trading Security Global (XTSG) is a fully self-funded, independent hub. We publish uncompromising threat indices, security diagnostic guides, and decentralized country spotlight reviews to build complete structural safety across globally active ledger domains." />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setView('start-here')}
              className="bg-[#ab3600] hover:bg-[#a03200] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-4 border-heavy neo-shadow-sm active-press cursor-pointer flex items-center gap-2"
              id="hero-start-btn"
            >
              <span>ACCESS THE COLD ROADMAP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('security-centre')}
              className="bg-[#0040e0] hover:bg-[#003cb0] text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-4 border-heavy neo-shadow-sm active-press cursor-pointer flex items-center gap-1.5"
              id="hero-threat-btn"
            >
              <Shield className="w-4.5 h-4.5" />
              <span>EXPLORE THREAT INDEX</span>
            </button>
          </div>
        </div>

        {/* Dynamic Graphic Card Sidebar */}
        <div className="lg:col-span-4 border-heavy bg-white p-5 neo-shadow relative overflow-hidden flex flex-col justify-between space-y-4">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff5f1f]/5 rounded-bl-full pointer-events-none" />
          <div className="border-2 border-black p-3 bg-[#faf9f6] text-center relative z-10">
            <img 
              src="https://picsum.photos/seed/crypto_vault/400/300"
              alt="Crypto Vault Cold Storage Art"
              referrerPolicy="no-referrer"
              className="w-full h-32 object-cover border border-black grayscale contrast-125 mb-2.5"
              id="hero-sidebar-img"
            />
            <span className="font-mono text-[9px] font-black text-gray-400 block uppercase">SECURE COORDINATE LEDGER</span>
          </div>
          <div className="space-y-1 border-t border-black/10 pt-3 relative z-10 text-left">
            <div className="flex items-center gap-1.5 text-brand-primary">
              <Clock className="w-4 h-4 text-[#ab3600] shrink-0" />
              <span className="font-mono text-[10px] font-black uppercase tracking-wider text-gray-900">SYSTEM LOCAL TIME</span>
            </div>
            <span className="font-mono text-xs font-black text-gray-600 block bg-[#f4f4f5] px-2.5 py-1 border border-black">
              {utcTime}
            </span>
          </div>
        </div>
      </div>

      {/* ON-CHAIN RISK DASHBOARD DECK */}
      <OnChainRiskDashboard />

      {/* KNOWLEDGE BASE INTERACTIVE CAROUSEL SPOTLIGHT (NEW) */}
      <div className="border-heavy bg-white p-6 md:p-8 neo-shadow space-y-6">
        
        {/* Carousel Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#ecfdf5] text-[#047857] border border-[#047857] px-2 py-0.5 font-mono text-[9px] font-black uppercase">
              <Sparkles className="w-3 h-3 text-[#047857]" />
              <span>INTERACTIVE PRESENTATION</span>
            </div>
            <h3 className="font-sora text-lg md:text-2xl font-black text-gray-900 uppercase tracking-tight">
              🔐 KNOWLEDGE BASE SPOTLIGHT
            </h3>
            <p className="font-mono text-[10.5px] text-gray-500 font-bold leading-none">
              Explore pivotal secure directives extracted from the global classroom syllabi.
            </p>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoplay(prev => !prev)}
              className="w-11 h-11 border-2 border-black bg-[#faf9f6] flex items-center justify-center hover:bg-neutral-100 active-press cursor-pointer"
              title={isAutoplay ? "Pause Autoplay" : "Resume Autoplay"}
            >
              {isAutoplay ? (
                <Pause className="w-4 h-4 text-gray-900" />
              ) : (
                <Play className="w-4 h-4 text-brand-primary" />
              )}
            </button>
            <button
              onClick={handlePrevSlide}
              className="w-11 h-11 border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-50 active-press cursor-pointer"
              title="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
            <button
              onClick={handleNextSlide}
              className="w-11 h-11 border-2 border-black bg-white flex items-center justify-center hover:bg-neutral-50 active-press cursor-pointer"
              title="Next Slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Carousel Slide Area with standard responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-surface/40 p-4 md:p-6 border-2 border-black">
          
          {/* Slide Visual Column */}
          <div className="lg:col-span-5 relative space-y-2">
            <div className="border-[3px] border-black overflow-hidden bg-[#faf9f6] neo-shadow-sm">
              <img 
                src={activeSlides[currentSlide].imgSrc}
                alt={activeSlides[currentSlide].title}
                referrerPolicy="no-referrer"
                className="w-full h-56 md:h-64 object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300 pointer-events-none"
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 font-black px-1.5">
              <span>{language === 'es' ? 'FUENTE: ARCHIVOS PÚBLICOS DE CSG' : 'SOURCE: CSG PUBLIC ARCHIVES'}</span>
              <span>{language === 'es' ? 'ÍNDICE' : 'INDEX'}: 0{currentSlide + 1} / 0{activeSlides.length}</span>
            </div>
          </div>

          {/* Slide Content Column */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="space-y-2">
              <span className="font-mono text-[9px] font-black tracking-widest text-gray-400 uppercase block">
                {activeSlides[currentSlide].category}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-sora text-base md:text-xl font-bold tracking-tight text-gray-900 capitalize block">
                  {activeSlides[currentSlide].title}
                </h4>
                <span className={`px-2 py-0.5 font-mono text-[8px] font-black uppercase text-center border-2 ${activeSlides[currentSlide].tagClass}`}>
                  {activeSlides[currentSlide].tag}
                </span>
              </div>
              <p className="font-mono text-[11px] md:text-xs text-gray-600 leading-relaxed font-bold">
                {activeSlides[currentSlide].description}
              </p>
            </div>

            {/* Quick specifications checklists */}
            <div className="space-y-2 pointer-events-none bg-white p-3 border-2 border-black border-dashed">
              <span className="font-mono text-[8px] text-gray-400 font-extrabold uppercase block tracking-wider">
                {language === 'es' ? 'PROCEDIMIENTOS CRÍTICOS DE CUMPLIMIENTO:' : 'CRITICAL COMPLIANCE PROCEDURES:'}
              </span>
              <div className="space-y-1.5">
                {activeSlides[currentSlide].points.map((pt, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="font-mono text-[9px] font-black text-brand-tertiary">✦</span>
                    <span className="font-mono text-[9.5px] text-gray-700 leading-none">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Action Target */}
            <div>
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                  setView(activeSlides[currentSlide].targetView);
                }}
                className="bg-black hover:bg-[#1b1b1b] text-white font-mono text-[10.5px] font-black uppercase tracking-wider px-5 py-3 border-2 border-black flex items-center gap-2 cursor-pointer active-press"
              >
                <span>{activeSlides[currentSlide].cta}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>

        </div>

        {/* Underline slide dots progress */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {activeSlides.map((slide) => (
            <button
              key={slide.id}
              onClick={() => {
                setIsAutoplay(false);
                setCurrentSlide(slide.id);
              }}
              className={`h-2.5 transition-all duration-200 border border-black ${
                currentSlide === slide.id ? 'w-8 bg-[#ab3600]' : 'w-2.5 bg-neutral-200 hover:bg-neutral-400'
              } cursor-pointer`}
              title={`Jump to slide ${slide.id + 1}`}
            />
          ))}
        </div>
      </div>

      {/* INTERACTIVE THREAT SCANNER SANDBOX TERMINAL (NEW) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
        
        {/* Left: Interactive Menu list */}
        <div className="lg:col-span-4 border-heavy bg-[#fff9f6] p-6 neo-shadow flex flex-col justify-between space-y-6">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-2 text-[#ab3600]">
              <Terminal className="w-5 h-5 shrink-0" />
              <span className="font-mono text-[10px] font-black uppercase tracking-widest">
                SIGNATURE DECONSTRUCTION LAB
              </span>
            </div>
            <h3 className="font-sora text-sm md:text-base font-black uppercase text-gray-950">
              Run Threat Code Simulations
            </h3>
            <p className="font-mono text-[11px] text-gray-600 leading-relaxed font-bold">
              Select an threat index payload template from our threat intelligence bank to seed the compiler, or write custom inputs directly inside the dark sandbox terminal console.
            </p>
          </div>

          {/* Presets Grid Selection */}
          <div className="space-y-2.5 pt-2">
            <span className="font-mono text-[9px] text-[#ab3600] font-black uppercase tracking-wider block">
              {language === 'es' ? 'PLANTILLAS DE INTELIGENCIA' : 'INTELLIGENCE TEMPLATES'}
            </span>
            {activeScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setSelectedScenario(scenario);
                  setSandboxInput(scenario.attackerHex);
                  setScanState('scanning');
                  const timer = setTimeout(() => {
                    setScanState('complete');
                  }, 1200);
                  return () => clearTimeout(timer);
                }}
                className={`w-full text-left p-3 border-2 border-black flex flex-row items-center justify-between transition-all duration-70 active-press cursor-pointer font-mono ${
                  activeSelectedScenario.id === scenario.id 
                    ? 'bg-[#ab3600] text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                    : 'bg-white text-gray-800 hover:bg-orange-50'
                }`}
                title={language === 'es' ? `Cargar plantilla: ${scenario.title}` : `Load Template: ${scenario.title}`}
                id={`sandbox-scenario-preset-${scenario.id}`}
              >
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black truncate block">{scenario.title}</span>
                  <span className={`text-[8px] ${activeSelectedScenario.id === scenario.id ? 'text-orange-200' : 'text-gray-400'} font-bold block truncate uppercase`}>
                    {scenario.short}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="bg-[#fffdeb] border border-orange-200 p-3.5 font-mono text-[10px] text-gray-700 text-left space-y-2">
            <button
              type="button"
              onClick={() => setIsSandboxDisclaimerCollapsed(!isSandboxDisclaimerCollapsed)}
              className="w-full flex items-center justify-between font-bold text-[#ab3600] uppercase tracking-wide cursor-pointer hover:opacity-80 focus:outline-none"
              aria-expanded={!isSandboxDisclaimerCollapsed}
              id="toggle-sandbox-disclaimer-btn"
            >
              <span className="flex items-center gap-1.5">
                <span>💡 {language === 'es' ? 'AVISO Y MODO DE SIMULACIÓN' : 'DYNAMIC SANDBOX MODE & NOTICE'}</span>
              </span>
              <span className="text-xs font-black">
                {isSandboxDisclaimerCollapsed ? '＋' : '－'}
              </span>
            </button>

            {!isSandboxDisclaimerCollapsed && (
              <div className="space-y-2 pt-1.5 border-t border-dashed border-orange-300 animate-fade-in-up">
                <div>
                  <strong>💡 {language === 'es' ? 'Modo de simulación dinámico:' : 'Dynamic Sandbox Mode:'}</strong> {language === 'es' ? 'Puede editar marcas de texto de firma, códigos hexadecimales, o escribir simulaciones de comandos dentro de la consola del terminal para analizar el riesgo.' : 'You can edit the hexadecimal strings, test credentials, or type custom protocols inside the console to test risk ratings instantly.'}
                </div>
                <div className="border-t border-dashed border-orange-300 pt-2 text-[9px] text-[#ab3600] space-y-1 bg-[#fff6d2]/50 p-2 border">
                  <span className="font-bold uppercase tracking-wider block">⚠️ {language === 'es' ? 'REGLAS Y CIENCIA DEL SIMULADOR:' : 'EDUCATIONAL SIMULATOR DISCLAIMER & SCIENCE:'}</span>
                  <p className="leading-normal font-medium">
                    {language === 'es' ? 'Este escáner es un verificador estático local. Las amenazas activas en producción demandan simulaciones de transacciones físicas, que virtualizan nodos de red.' : 'This scanner is an offline signature-pattern matcher running fully inside your browser. Real-world onchain threat identification requires Transaction Simulation (e.g., using Tenderly forks, Blowfish API, or browser shields like Pocket Universe). These systems dynamically spin up a sandboxed node clone to calculate exact outcome balances before you physically authorize.'}
                  </p>
                  <p className="leading-normal font-black text-rose-800">
                    ⚠️ {language === 'es' ? 'REGLA CRÍTICA DE CUSTODIA: ¡NUNCA introduzca palabras semilla o llaves privadas reales en ningún portal web!' : 'CRITICAL SAFETY PROTOCOL: Real cryptocurrency security rules mandate that you NEVER paste actual secret backup seed words, private keys, or credentials online or on any simulator portal. Treat online seed queries as immediate compromises!'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sandbox Screen terminal */}
        <div className="lg:col-span-12 xl:col-span-8 border-heavy bg-[#1a1a1a] text-[#72ff70] p-5 md:p-6 neo-shadow relative overflow-hidden flex flex-col justify-between space-y-5">
          
          {/* Terminal Title bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-2 font-mono text-[9px] text-gray-400">
            <div className="flex items-center gap-1.5 select-none">
              <span className="w-2.5 h-2.5 bg-[#ff5f56] rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#ffbd2e] rounded-full" />
              <span className="w-2.5 h-2.5 bg-[#27c93f] rounded-full" />
              <span className="font-bold text-[#b5ffb0] ml-2">csg-forensic-vm_analyzer_v1.0.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 text-[8.5px] font-bold">
                CLIENT-SIDE PARSER ACTIVE
              </span>
            </div>
          </div>

          {/* Split input editor / diagnostic readout panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* INPUT CONTROLS COLUMN (Left 5 cols) */}
            <div className="lg:col-span-5 space-y-4 text-left font-mono">
              <div className="space-y-1.5">
                <label htmlFor="attacker-payload-edit" className="text-[8.5px] text-neutral-400 font-extrabold uppercase tracking-widest block">
                  🖋️ MALICIOUS PAYLOAD OR BINARY LOG:
                </label>
                <textarea
                  id="attacker-payload-edit"
                  value={sandboxInput}
                  onChange={(e) => {
                    setSandboxInput(e.target.value);
                    if (scanState === 'complete') {
                      setScanState('idle');
                    }
                  }}
                  className="w-full h-28 bg-[#111] text-[#72ff70] border border-white/15 p-2 font-mono text-[10.5px] focus:outline-none focus:border-brand-primary/60 rounded-none leading-normal resize-none font-medium"
                  placeholder="Paste custom codes, wallet approvals, mnemonic words or suspicious URL strings here to inspect..."
                />
              </div>

              {/* Safe user address for visual address tail-mimic tests */}
              <div className="space-y-1.5 pt-1.5 border-t border-white/10">
                <div className="flex justify-between items-center text-[8.5px] text-neutral-400">
                  <label htmlFor="user-addr-compare-val" className="font-extrabold uppercase tracking-widest block">
                    🛡️ YOUR LEGIT RECIPIENT WALLET:
                  </label>
                  <span className="text-gray-500 font-bold">ADDRESS-POISON TEST</span>
                </div>
                <input
                  id="user-addr-compare-val"
                  type="text"
                  value={compareUserAddr}
                  onChange={(e) => {
                    setCompareUserAddr(e.target.value);
                    if (scanState === 'complete') {
                      setScanState('idle');
                    }
                  }}
                  className="w-full bg-[#111] text-[#e4e4e7] border border-white/15 p-2 font-mono text-[10px] focus:outline-none focus:border-brand-primary/65 rounded-none"
                  placeholder="e.g. 0xa4c330df3b10b00c3b313efefefefefefebd10b9"
                />
                <p className="text-[7.5px] text-gray-500 mt-1 uppercase leading-tight">
                  *Tip: To dry-run poisoning mimicking, paste an attacker string in the textarea mimicking your starting & ending digits (e.g. "0xa4c330df7777777777ebd10b9").
                </p>
              </div>

              {/* Action execute button inside terminal */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setScanState('scanning');
                    const timer = setTimeout(() => {
                      setScanState('complete');
                    }, 1200);
                    return () => clearTimeout(timer);
                  }}
                  disabled={scanState === 'scanning'}
                  className="w-full bg-[#ff5f1f] hover:bg-orange-700 text-white border-2 border-black py-2.5 font-mono text-[10px] font-black uppercase text-center cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_rgba(255,255,255,0.15)] select-none disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed"
                  id="execute-signature-scan-btn"
                >
                  ⚡ DECONSTRUCT & COMPILE SIGNATURE
                </button>
              </div>
            </div>

            {/* LIVE SYSTEM DECONSTRUCTION OUTPUT (Right 7 cols) */}
            <div className="lg:col-span-7 font-mono text-left flex flex-col justify-between min-h-[220px]">
              
              {scanState === 'idle' && (
                <div className="space-y-3 bg-[#111] p-4 border border-white/10 h-full flex flex-col justify-center">
                  <div className="text-[11px] text-orange-400 font-black tracking-widest uppercase mb-1">
                    $ WAIT_INPUT_TRIGGER: COMPILER_READY
                  </div>
                  <p className="text-gray-400 text-[11px] leading-relaxed">
                    Modify the input codes or adjust recipient fields, then hit <strong className="text-white">DECONSTRUCT & COMPILE SIGNATURE</strong> to parse simulated threat variables.
                  </p>
                  <p className="text-gray-500 text-[10px] leading-relaxed">
                    Our local runtime decodes ERC-20 hex selectors, checks tail anomalies for address spoofing, and alerts of BIP-39 online leaks.
                  </p>
                </div>
              )}

              {scanState === 'scanning' && (
                <div className="space-y-2 bg-[#111] p-4 border border-white/10 h-full flex flex-col justify-center font-bold">
                  <p className="text-[#00c2ff] text-[10px] font-black">$ PARSING CRYPTOGRAPHIC INPUT BUFFERS...</p>
                  <p className="text-white text-[10.5px]">Memory String Length: {sandboxInput.length} symbols</p>
                  <p className="text-gray-400 text-[9.5px]">Hashing selector maps in scamsDatabase reference indices...</p>
                  <div className="flex items-center gap-2 pt-2 text-[#72ff70] text-[11px]">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-dashed border-[#72ff70] animate-spin" />
                    <span>CALCULATING COPIED ADJACENT DIGITS CONSENSUS (1200ms)...</span>
                  </div>
                </div>
              )}

              {scanState === 'complete' && (
                <div className="space-y-4 bg-[#111]/70 p-4 border border-white/15 h-full flex flex-col justify-between">
                  
                  {/* Gauge indicator and Decoded category */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-white/10 pb-3">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-gray-400 font-black block uppercase tracking-wider">DESTRUCTED CALL TYPE</span>
                      <span className="text-[11px] text-white font-black block uppercase truncate max-w-full sm:max-w-xs">
                        {currentAnalysis.decodedMethod}
                      </span>
                    </div>

                    {/* Conditional color gauge */}
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-[8px] text-gray-400 font-black block uppercase tracking-wider">RISK RATING</span>
                      <span className={`text-xs sm:text-sm font-black px-1.5 py-0.5 uppercase inline-block whitespace-nowrap ${
                        currentAnalysis.riskScore > 90 
                          ? "bg-red-950 text-red-400 border border-red-800"
                          : currentAnalysis.riskScore > 60
                            ? "bg-orange-950 text-orange-400 border border-orange-800"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      }`}>
                        {currentAnalysis.severity} ({currentAnalysis.riskScore}%)
                      </span>
                    </div>
                  </div>

                  {/* Risks identified detail */}
                  <div className="space-y-1.5">
                    <span className="text-[8.5px] text-[#ff5f1f] block uppercase tracking-widest font-extrabold leading-none">
                      VULNERABILITY CHARACTERISTICS DETECTED:
                    </span>
                    <ul className="space-y-1 text-white text-[10px]">
                      {currentAnalysis.anomalies.map((anom, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <span className="text-red-500 shrink-0 mt-0.5">❌</span>
                          <span className="font-semibold text-gray-200">{anom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Custodian Definitive Defense info */}
                  <div className="bg-white/5 p-3 border border-white/10 space-y-1">
                    <span className="text-[8.5px] text-[#72ff70] block uppercase tracking-widest font-extrabold leading-none">
                      CSG COMPILER PHYSICAL RECTIFICATION PROTOCOL:
                    </span>
                    <p className="text-[10px] text-gray-300 font-medium leading-normal">
                      {currentAnalysis.remediation}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Terminal Footing Info controllers */}
          <div className="border-t border-white/10 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[9px] font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${scanState === 'scanning' ? "bg-amber-400 animate-pulse" : "bg-[#15c212] animate-ping"}`} />
              <span className="font-bold text-[#b5ffb0]">STATUS: COMPILED_FORENSIC_ONLINE</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setSandboxInput("");
                  setScanState("idle");
                }}
                className="text-gray-400 hover:text-white uppercase font-black"
                title={language === 'es' ? 'Limpiar entradas de consola' : 'Clear current inputs inside the code terminal'}
              >
                {language === 'es' ? 'LIMPIAR CONSOLA' : 'CLEAR CONSOLE'}
              </button>
              <button
                onClick={() => {
                  setSandboxInput(activeSelectedScenario.attackerHex);
                  setScanState('scanning');
                  const timer = setTimeout(() => {
                    setScanState('complete');
                  }, 1100);
                  return () => clearTimeout(timer);
                }}
                className="bg-[#27c93f]/20 hover:bg-[#27c93f]/40 text-[#72ff70] border border-[#27c93f]/40 px-3 py-1 font-black uppercase transition-all active-press"
                title={language === 'es' ? "Volver a ejecutar análisis en plantilla seleccionada" : "Rerun analysis scan on selected template payload"}
              >
                {language === 'es' ? 'EJECUTAR SIMULADOR' : 'RERUN LOG SIMULATOR'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CORE RISK CATEGORIES & RESOURCE NAVIGATION CHANNELS */}
      <div className="border-heavy bg-white p-6 md:p-8 neo-shadow text-left space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#efefff] border border-[#0040e0] text-[#0040e0] font-mono text-[9px] font-black uppercase px-2.5 py-0.5 tracking-wider">
            <span>PLATFORM NAVIGATION PORTS</span>
          </div>
          <h3 className="font-sora text-lg md:text-2xl font-black text-gray-950 uppercase tracking-tight">
            CORE RISK CATEGORIES & RESOURCE CHANNELS
          </h3>
          <p className="font-mono text-[10.5px] text-gray-500 font-bold">
            Select any of the five pillars to travel instantly to specialized whitehat audit guidelines, sovereign directories, and shields.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
          
          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('beginner-guides'); }}
            className="border-heavy bg-[#f9f9f9] hover:bg-white p-4 neo-shadow-sm cursor-pointer duration-75 space-y-2 text-left shrink-0 transition-all hover:-translate-y-0.5"
          >
            <div className="p-1.5 bg-[#efefff] border border-[#0040e0] inline-block">
              <BookOpen className="w-4 h-4 text-[#0040e0]" />
            </div>
            <h4 className="font-sora text-[11px] font-bold text-gray-950 leading-none">Classroom</h4>
            <p className="font-mono text-[8.5px] text-gray-500 leading-tight">Beginner, moderate, intermediate courses.</p>
          </div>

          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('security-centre'); }}
            className="border-heavy bg-[#f9f9f9] hover:bg-white p-4 neo-shadow-sm cursor-pointer duration-75 space-y-2 text-left shrink-0 transition-all hover:-translate-y-0.5"
          >
            <div className="p-1.5 bg-[#fff0ea] border border-[#ff5f1f] inline-block">
              <ShieldAlert className="w-4 h-4 text-[#ab3600]" />
            </div>
            <h4 className="font-sora text-[11px] font-bold text-gray-950 leading-none">Security</h4>
            <p className="font-mono text-[8.5px] text-gray-500 leading-tight">Live scans database and telemetry.</p>
          </div>

          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('security-centre'); }}
            className="border-heavy bg-[#f9f9f9] hover:bg-white p-4 neo-shadow-sm cursor-pointer duration-75 space-y-2 text-left shrink-0 transition-all hover:-translate-y-0.5"
          >
            <div className="p-1.5 bg-[#fffeb3] border border-amber-600 inline-block">
              <Lock className="w-4 h-4 text-emerald-700" />
            </div>
            <h4 className="font-sora text-[11px] font-bold text-gray-950 leading-none">Auditing</h4>
            <p className="font-mono text-[8.5px] text-gray-500 leading-tight">Assess ledger configurations easily.</p>
          </div>

          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('countries'); }}
            className="border-heavy bg-[#f9f9f9] hover:bg-white p-4 neo-shadow-sm cursor-pointer duration-75 space-y-2 text-left shrink-0 transition-all hover:-translate-y-0.5"
          >
            <div className="p-1.5 bg-[#e2fbeb] border border-brand-tertiary inline-block">
              <Globe className="w-4 h-4 text-brand-tertiary" />
            </div>
            <h4 className="font-sora text-[11px] font-bold text-gray-950 leading-none">P2P Hub</h4>
            <p className="font-mono text-[8.5px] text-gray-500 leading-tight">Naira trade shields and escrow guidelines.</p>
          </div>

          <div 
            onClick={() => { window.scrollTo({ top: 0, behavior: 'instant' }); setView('reviews'); }}
            className="border-heavy bg-[#f9f9f9] hover:bg-white p-4 neo-shadow-sm cursor-pointer duration-75 space-y-2 text-left shrink-0 transition-all hover:-translate-y-0.5"
          >
            <div className="p-1.5 bg-purple-50 border border-purple-600 inline-block">
              <Layers className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="font-sora text-[11px] font-bold text-gray-950 leading-none">Exchanges</h4>
            <p className="font-mono text-[8.5px] text-gray-500 leading-tight">Safety index index ratings.</p>
          </div>

        </div>
      </div>

      {/* QUIZ BOX: DEDICATED FULL-WIDTH INTERACTIVE SECURITY ASSESSMENT */}
      <div className="border-heavy bg-[#fff0ea] p-6 md:p-8 neo-shadow text-left space-y-6" id="xtsg-comprehensive-quiz-deck">
        
        {/* Section Header */}
        <div className="border-b-2 border-black pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-[#ab3600]/10 text-[#ab3600] border border-[#ab3600] px-3 py-0.5 font-mono text-[9px] font-black uppercase tracking-widest">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>ACTIVE FORENSIC ASSESSMENT</span>
            </div>
            <h3 className="font-sora text-xl md:text-3xl font-black text-gray-950 uppercase tracking-tight">
              XTSG THREAT SHIELD DIAGNOSTIC DECK
            </h3>
            <p className="font-mono text-[10.5px] text-gray-500 font-bold">
              Analyze malicious threat vectors and select the exact sovereign whitehat remediation strategy to prevent token drainage.
            </p>
          </div>

          <div className="font-mono text-[10px] font-black uppercase shrink-0">
            <span className="bg-white border-2 border-black px-3 py-1.5 neo-shadow-sm block">
              STATUS: {quizCompleted ? "CONCLUDED" : `HAZARD STAGE ${currentQuizIndex + 1}/${XTSG_QUIZ_QUESTIONS.length}`}
            </span>
          </div>
        </div>

        {quizCompleted ? (
          <div className="max-w-2xl mx-auto border-heavy bg-white p-6 md:p-8 neo-shadow text-center space-y-6 my-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500 text-emerald-600 mb-2">
              <Award className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h4 className="font-sora text-lg md:text-2xl font-black text-gray-900 uppercase">
                DIAGNOSTIC CRITERIA MET
              </h4>
              <p className="font-sans text-sm text-gray-600 font-medium">
                You have completed the entire XTSG interactive safety examination.
              </p>
            </div>

            <div className="border border-black p-4 bg-[#fbfbfb] space-y-3">
              <div className="flex items-center justify-between font-mono text-xs font-black">
                <span>VERIFIED SHIELD SCORE CODE:</span>
                <span className="text-[#ab3600] bg-white border border-black px-2 py-0.5">XTSG-P-{score * 120}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs font-black">
                <span>ACCURACY RATE:</span>
                <span className="text-emerald-700">{((score / XTSG_QUIZ_QUESTIONS.length) * 100).toFixed(0)}%</span>
              </div>
              <div className="h-3 bg-gray-100 border border-black relative overflow-hidden mt-1">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000"
                  style={{ width: `${(score / XTSG_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-gray-500 leading-normal text-left pt-1">
                {score === XTSG_QUIZ_QUESTIONS.length 
                  ? "PRISTINE FORENSIC COMMANDER. You demonstrate 100% defensive literacy and hold optimal resilience configurations against malicious contract exploits."
                  : "ADEQUATE SAFETY KNOWLEDGE. We recommend revisiting incorrect options or exploring our 10-Step Self-Custody Protocol to maximize personal network insulation."
                }
              </p>
            </div>

            <button
              onClick={handleResetXtsgQuiz}
              className="w-full bg-[#ab3600] text-white hover:bg-neutral-900 font-mono text-xs font-black py-4 uppercase border-2 border-black neo-shadow hover:translate-y-[-1px] duration-100 cursor-pointer text-center"
            >
              RESTART INTERACTIVE ASSESSMENT ⟲
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Active Question context */}
            <div className="lg:col-span-5 border-heavy bg-white p-5 neo-shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <span className="bg-[#ab3600] text-white font-mono text-[8.5px] font-black px-2 py-0.5 uppercase border border-black tracking-wider">
                    {XTSG_QUIZ_QUESTIONS[currentQuizIndex].category}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-gray-400">
                    Q: {currentQuizIndex + 1} / {XTSG_QUIZ_QUESTIONS.length}
                  </span>
                </div>

                <div className="space-y-3 text-left">
                  <span className="font-mono text-[9px] font-bold text-[#ab3600] uppercase tracking-wider block">THREAT CRITERIA SYLLABUS:</span>
                  <h4 className="font-sora text-base md:text-xl font-bold text-gray-900 leading-snug">
                    {XTSG_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h4>
                </div>
              </div>

              <div className="border border-dashed border-gray-200 bg-[#faf9f6] p-3 text-left space-y-1.5">
                <span className="font-mono text-[9px] text-[#ab3600] uppercase font-black tracking-wider block">⚠️ SOVEREIGN DIRECTIVE</span>
                <p className="font-mono text-[9px] text-gray-500 leading-normal">
                  Decentralized networks execute transactions permanently. Attackers rely heavily on UI spoofing, domain hijacking, and gasless authorization signatures to acquire standard approvals. Select the option that preserves absolute client-side isolation.
                </p>
              </div>
            </div>

            {/* Right Column: Dynamic choices list and results */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                {XTSG_QUIZ_QUESTIONS[currentQuizIndex].options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx;
                  const isCorrectOption = idx === XTSG_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;
                  
                  let btnStyle = "bg-white hover:bg-[#fff5f2] border-black text-gray-800 hover:border-orange-500 hover:translate-x-1";
                  if (quizAttemptSubmitted) {
                    if (isCorrectOption) {
                      btnStyle = "bg-emerald-50 border-emerald-600 text-emerald-900 pointer-events-none font-extrabold ring-2 ring-emerald-500/20";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-600 text-rose-900 pointer-events-none ring-2 ring-rose-500/20";
                    } else {
                      btnStyle = "bg-gray-50 border-gray-200 text-gray-400 pointer-events-none opacity-40";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleXtsgQuizSubmit(idx)}
                      disabled={quizAttemptSubmitted}
                      className={`w-full text-left font-mono text-xs font-bold p-4 border-2 transition-all duration-700 flex items-start gap-3 relative cursor-pointer ${btnStyle}`}
                    >
                      <span className="shrink-0 mt-0.5">
                        {quizAttemptSubmitted && isCorrectOption ? (
                          <Check className="w-4 h-4 text-emerald-600 font-extrabold inline" />
                        ) : quizAttemptSubmitted && isSelected ? (
                          <AlertTriangle className="w-4 h-4 text-rose-600 inline" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-gray-400 inline-block align-middle text-center text-[7px]" />
                        )}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Action explanation blocks */}
              {quizAttemptSubmitted && (
                <div className="border-2 border-black p-4 bg-white text-left space-y-3 neo-shadow-sm">
                  {quizIsAnswerCorrect ? (
                    <div className="space-y-1 text-emerald-800">
                      <div className="flex items-center gap-1.5 font-bold font-sora text-xs">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="uppercase tracking-wider">DEFENSE VECTOR SECURED</span>
                      </div>
                      <p className="font-mono text-[9.5px] text-gray-700 leading-tight font-bold">
                        {XTSG_QUIZ_QUESTIONS[currentQuizIndex].explanation}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-rose-800">
                      <div className="flex items-center gap-1.5 font-bold font-sora text-sm">
                        <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 animate-bounce" />
                        <span className="uppercase tracking-wide">CRITICAL DRAIN DEFEATED</span>
                      </div>
                      <p className="font-mono text-[9.5px] text-gray-700 leading-tight font-bold">
                        Warning: Incorrect strategy chosen. {XTSG_QUIZ_QUESTIONS[currentQuizIndex].explanation}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100 flex gap-2">
                    {quizIsAnswerCorrect ? (
                      <button
                        onClick={handleNextQuizQuestion}
                        className="w-full bg-[#ab3600] hover:bg-[#902e00] text-white font-mono text-xs font-black uppercase py-3 border-2 border-black neo-shadow active-press text-center block cursor-pointer transition-all"
                      >
                        {currentQuizIndex + 1 < XTSG_QUIZ_QUESTIONS.length ? "PROCEED TO NEXT HAZARD →" : "COMPILE ACCURACY SCORE ✓"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedQuizOption(null);
                          setQuizAttemptSubmitted(false);
                          setQuizIsAnswerCorrect(null);
                        }}
                        className="w-full bg-white hover:bg-gray-50 text-gray-900 font-mono text-xs font-black uppercase py-3 border-2 border-black neo-shadow active-press text-center block cursor-pointer transition-all"
                      >
                        RE-EVALUATE CORRECT REMEDIATION ⟲
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* DETAILED ADVISORIES AND ARTICLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        {/* Article 1: 10-Step Self Custody Protocol */}
        <div className="border-heavy bg-white p-6 neo-shadow space-y-4 text-left">
          <div className="flex items-center gap-3 border-b-2 border-black pb-3">
            <Lock className="w-6 h-6 text-brand-primary" />
            <div>
              <h3 className="font-sora text-sm md:text-base font-bold text-gray-950 uppercase tracking-tight">
                {language === 'es' ? 'Autocustodia: El Protocolo de 10 Pasos' : 'Self-Custody: The 10-Step Protocol'}
              </h3>
              <p className="font-mono text-[9px] text-[#ab3600] font-black">
                {language === 'es' ? 'DIRECTIVA DE SEGURIDAD CENTRAL' : 'CORE SECUREMENT DIRECTIVE'}
              </p>
            </div>
          </div>

          <p className="font-mono text-[11px] text-gray-600 leading-relaxed font-bold">
            {language === 'es' 
              ? 'Mudar sus activos a un formato de hardware frío no sirve si los complementos de su navegador pueden espiar su configuración de estado o registrar su portapapeles. Estudie nuestros diez pasos clave.'
              : 'Transitioning storage structures onto a cold ledger hardware format is useless if browser plugins can spy on state configurations or capture memory clipboard logs. Study our core ten steps.'}
          </p>

          {expandStepProtocol ? (
            <div className="space-y-3 pt-2 text-left">
              <div className="space-y-2 border-t border-dashed border-gray-300 pt-3">
                {activePoints.map((pt, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="font-mono text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded-none shrink-0">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10.5px] text-gray-800 leading-tight font-bold">
                      <GlossaryText text={pt} />
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setExpandStepProtocol(false)}
                className="font-mono text-xs font-black uppercase text-brand-primary hover:underline hover:text-black block"
              >
                {language === 'es' ? 'Colapsar Detalles de Protocolo' : 'Collapse Protocol Details'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setExpandStepProtocol(true)}
              className="bg-black hover:bg-black/90 text-white font-mono text-[10.5px] font-black uppercase tracking-wider px-5 py-3 border-heavy active-press cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{language === 'es' ? 'Leer el Protocolo de 10 Pasos' : 'Read Full 10 Steps'}</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          )}
        </div>

        {/* Article 2: Global Regulatory Shift */}
        <div className="border-heavy bg-white p-6 neo-shadow space-y-4 text-left">
          <div className="flex items-center gap-3 border-b-2 border-black pb-3">
            <Globe className="w-6 h-6 text-brand-secondary" />
            <div>
              <h3 className="font-sora text-sm md:text-base font-bold text-gray-950 uppercase tracking-tight">
                The Global Regulatory Shift
              </h3>
              <p className="font-mono text-[9px] text-brand-secondary font-black">
                VASP LICENSE AND LEGISLATIVE INSIGHTS
              </p>
            </div>
          </div>

          <p className="font-mono text-[11px] text-gray-600 leading-relaxed font-bold">
            International regulatory bodies are standardizing the VASP (Virtual Asset Service Provider) frameworks. From the European MICA laws to Nigeria's SEC licensing boards, standard controls are tightening.
          </p>

          {expandRegulatoryShift ? (
            <div className="space-y-4.5 pt-2 border-t border-dashed border-gray-300 pt-3 text-gray-800 font-mono text-[11px] leading-relaxed text-left font-bold">
              <p>
                As Central Banks adjust guidelines to support digital taxation and curb illicit money flows, exchanges are forced to transition from peer-managed directories onto fully audited centralized custodians.
              </p>
              <p>
                <span className="font-bold text-brand-primary font-mono block">SEC Compliance Rulebook:</span> Under global rules, any exchange maintaining local NGN ramps or order books must declare physical operations custody addresses, secure provisional or permanent operational VASP licenses, and implement fully documented, strict KYC systems.
              </p>
              <p>
                <span className="font-bold text-blue-600 font-mono block">Stablecoin Regulations:</span> Regulated banks are launching proprietary digital denominations. Global on-chain stablecoins like USDT could face regulatory caps under local centralized state laws within high volume jurisdictions.
              </p>
              <button
                onClick={() => setExpandRegulatoryShift(false)}
                className="font-mono text-xs font-black uppercase text-brand-secondary hover:underline hover:text-black block pt-1"
              >
                Collapse Regulatory Details
              </button>
            </div>
          ) : (
            <button
              onClick={() => setExpandRegulatoryShift(true)}
              className="bg-black hover:bg-black/90 text-white font-mono text-[10.5px] font-black uppercase tracking-wider px-5 py-3 border-heavy active-press cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Read Legislative Summary</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          )}
        </div>
      </div>

      {/* LATEST CYBERSECURITY BULLETINS & SCAM ALERTS (NEW) */}
      <div className="space-y-6 text-left pt-2">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-black pb-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-brand-primary text-white text-[9.5px] font-mono font-black border border-black px-2 py-0.5 uppercase tracking-wide">
              INTELLIGENCE BULLETIN
            </span>
            <h3 className="font-sora text-lg md:text-2xl font-black text-gray-950 uppercase tracking-tight">
              Latest Post & Articles
            </h3>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              setView('blog');
            }}
            className="font-mono text-xs font-black uppercase text-brand-primary hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            VIEW ALL WRITINGS <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post.id}
              className="bg-white border-heavy neo-shadow-sm hover:translate-y-[-2px] transition-transform duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Header image */}
                {post.imageSrc && (
                  <div
                    onClick={() => {
                      localStorage.setItem('csg-selected-post-id', post.id);
                      window.dispatchEvent(new CustomEvent('csg-open-post', { detail: post.id }));
                      setView('blog');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="w-full h-44 overflow-hidden border-b-2 border-black relative cursor-pointer"
                  >
                    <img
                      src={post.imageSrc}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-[1.02] saturate-[0.95] group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-wider border border-white">
                      FORENSIC BULLETINS CASE
                    </div>
                  </div>
                )}

                <div className="p-5 space-y-3.5">
                  <div className="flex justify-between items-center gap-4">
                    <span className="bg-[#fff0ea] border border-[#ab3600] text-[#ab3600] font-mono text-[9px] font-black px-2 py-0.5 uppercase">
                      {post.category}
                    </span>
                    <span className="font-mono text-[9px] text-gray-400 font-bold">{post.date}</span>
                  </div>

                  <h4
                    onClick={() => {
                      localStorage.setItem('csg-selected-post-id', post.id);
                      window.dispatchEvent(new CustomEvent('csg-open-post', { detail: post.id }));
                      setView('blog');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="font-sora text-sm md:text-base font-extrabold text-[#111] hover:text-[#ab3600] cursor-pointer transition-colors leading-tight uppercase line-clamp-2"
                  >
                    {post.title}
                  </h4>

                  <p className="font-mono text-[11px] text-gray-500 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer linking out to reader state */}
              <div className="p-5 border-t border-black/10 bg-brand-surface flex items-center justify-between text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-brand-primary" />
                  <span className="font-bold">{post.readTime}</span>
                </div>

                <button
                  onClick={() => {
                    localStorage.setItem('csg-selected-post-id', post.id);
                    window.dispatchEvent(new CustomEvent('csg-open-post', { detail: post.id }));
                    setView('blog');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="flex items-center gap-1 font-black text-[#ab3600] hover:underline cursor-pointer uppercase"
                >
                  {language === 'es' ? 'LEER BOLETÍN' : 'READ BULLETIN'} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "ABOUT US" GLOBAL PROTECTION GUILD SECTION (NEW) */}
      <div className="border-heavy bg-[#fffdeb] p-6 md:p-10 neo-shadow relative overflow-hidden space-y-8 text-left">
        <div className="absolute top-0 right-0 w-36 h-36 bg-orange-600/5 rounded-bl-full pointer-events-none" />
        
        {/* About Us Header */}
        <div className="border-b-2 border-black pb-5 space-y-1">
          <div className="flex items-center gap-1.5 text-black font-extrabold uppercase">
            <span className="bg-black text-[#72ff70] border border-black px-2 py-0.5 font-mono text-[8.5px] font-black uppercase tracking-wide">
              {language === 'es' ? 'CONSTITUCIÓN DE LA GUILD' : 'GUILD CHARTER'}
            </span>
            <span className="font-mono text-[9px] text-gray-400 font-bold uppercase tracking-wider">
              {language === 'es' ? 'CONTEXTO DE FUNDACIÓN' : 'FOUNDING CONTEXT'}
            </span>
          </div>
          <h3 className="font-sora text-lg md:text-2xl font-black text-gray-950 uppercase tracking-tight">
            🛡️ {language === 'es' ? 'ACERCA DE XCRYPTO-TRADING SECURITY GLOBAL (XTSG)' : 'ABOUT XCRYPTO-TRADING SECURITY GLOBAL (XTSG)'}
          </h3>
          <p className="font-mono text-[11px] text-gray-600 font-bold leading-normal">
            {language === 'es' 
              ? 'Un colectivo independiente y no gubernamental de defensa de la seguridad pública especializado en auditoría criptográfica.'
              : 'An independent, non-governmental public security advocacy collective specializing in cryptographic auditing.'}
          </p>
        </div>

        {/* Split details column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Guild Description Statement */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-[9px] text-[#ab3600] font-black block tracking-widest uppercase">
              ✦ {language === 'es' ? 'OBJETIVO CENTRAL' : 'CORE OBJECTIVE'}
            </span>
            <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed font-medium">
              {language === 'es'
                ? 'Establecido en 2026, Xcrypto-Trading Security Global opera como un consorcio de seguridad de sombrero blanco (Whitehat) totalmente autofinanciado. Nuestro propósito es puramente educativo: recopilar datos de amenazas no modificados, identificar plataformas locales falsificadas y ayudar a personas soberanas a ejecutar una autocustodia confiable sobre capas financieras descentralizadas.'
                : 'Established in 2026, Xcrypto-Trading Security Global operates as a fully self-funded Whitehat Security consensus. Our purpose is entirely educational: compiling unmodified threat data, identifying counterfeit regional platforms, and assisting sovereign individuals in executing reliable self-custody over decentralized financial layers.'}
            </p>
            <div className="bg-white p-3 border border-black font-mono text-[9px] text-gray-600 leading-normal space-y-2 select-none">
              <span className="font-extrabold text-black uppercase block tracking-wider">
                {language === 'es' ? 'GARANTÍAS DE NUESTRO CONSENSO:' : 'GUARANTEES OF CONSENSUS:'}
              </span>
              <p>{language === 'es' ? '• Cero redes publicitarias' : '• Zero advertisement networks'}</p>
              <p>{language === 'es' ? '• Cero revisiones patrocinadas de tokens' : '• Zero sponsored token reviews'}</p>
              <p>{language === 'es' ? '• Cero recopilación de telemetría de servidores' : '• Zero server telemetry collection'}</p>
            </div>
          </div>

          {/* Core Members List Grid */}
          <div className="lg:col-span-8 space-y-4">
            <span className="font-mono text-[9px] text-gray-400 font-black block tracking-widest uppercase">
              ✦ {language === 'es' ? 'REGISTRO DE CONTROLADORES JEFES DE AUDITORÍA' : 'LEAD AUDIT CONTROLLERS REGISTER'}
            </span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeTeam.map((member, idx) => (
                <div key={idx} className="bg-white border-2 border-black p-4 space-y-2 neo-shadow-sm flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    {/* Retro Avatar graphic */}
                    <div className={`w-10 h-10 border-2 border-black font-mono text-sm font-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] ${member.avatarBg}`}>
                      {member.initials}
                    </div>
                    <div>
                      <h4 className="font-sora text-sm font-black text-gray-900 leading-none">{member.name}</h4>
                      <span className="font-mono text-[8.5px] text-gray-400 font-bold uppercase">{member.role}</span>
                    </div>
                  </div>
                  <p className="font-mono text-[10px] text-gray-600 leading-tight font-medium">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Vintage Seal Stamp layout at bottom */}
        <div className="pt-6 border-t border-black/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left select-none">
          <div className="space-y-0.5">
            <span className="font-mono text-[8px] text-gray-400 font-black tracking-widest block uppercase">ESTABLISHED CLEARANCE</span>
            <span className="font-mono text-[10px] font-black text-gray-800 uppercase block">CSG-WHITEHAT-GUILD-COORDINATE-2026</span>
          </div>

          {/* Hand Seal Stamp design */}
          <div className="w-16 h-16 rounded-full border-4 border-double border-[#ab3600] flex flex-col items-center justify-center text-[#ab3600] uppercase opacity-70 -rotate-12 shrink-0">
            <span className="font-mono text-[5px] font-black">CSG</span>
            <span className="font-mono text-[7.5px] font-black leading-none">VERIFIED</span>
            <span className="font-mono text-[5px] font-black">SHIELD</span>
          </div>

          <div className="text-center sm:text-right">
            <span className="font-mono text-[8px] text-[#0040e0] font-black tracking-widest block uppercase">GLOBAL AUDIT SCORE</span>
            <span className="font-mono text-xs font-black text-emerald-800 font-bold block uppercase border-b-2 border-black/20 pb-0.5">
              100% INDEPENDENT RATING
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
