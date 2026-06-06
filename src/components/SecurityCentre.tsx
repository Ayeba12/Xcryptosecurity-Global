import React, { useState, useMemo } from 'react';
import { scamsDatabase } from '../data';
import { CryptoScam } from '../types';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  SlidersHorizontal,
  X, 
  Terminal, 
  Binary, 
  Video, 
  MessageCircleWarning, 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle,
  HelpCircle,
  Calendar,
  Layers,
  Send,
  Lock,
  Eye,
  RefreshCw,
  Network,
  Cpu,
  Coins,
  Activity,
  Fingerprint,
  UserCheck,
  Globe
} from 'lucide-react';
import { 
  checkAddressSecurity, 
  checkTokenSecurity, 
  GOPLUS_CHAINS, 
  TokenSecurityResult, 
  AddressSecurityResult 
} from '../utils/goplusApi';

interface OwaspRisk {
  id: string;
  code: string;
  name: string;
  web3Equivalent: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  desc: string;
  exploitScenario: string;
  remediation: string;
  codeSnippet: string;
}

const owaspRisks: OwaspRisk[] = [
  {
    id: 'a01',
    code: 'A01:2021',
    name: 'Broken Access Control',
    web3Equivalent: 'Unprotected Smart Contract Methods & Arbitrary Calls',
    severity: 'CRITICAL',
    desc: 'Bypassing authorization parameters to access restricted objects, modify states, or drain user balances.',
    exploitScenario: 'A decentralized application exposes administrative ownership functions without checking "msg.sender == owner", enabling anyone to call "destroy()" or upgrade logical routines.',
    remediation: 'Implement OpenZeppelin "AccessControl" rules, restrict administrative gateways using "onlyOwner" modifiers, and strictly authorize cross-origin API tokens.',
    codeSnippet: `// ❌ VULNERABLE: Anyone can drain funds
function withdrawFunds(uint256 amount) public {
    payable(msg.sender).transfer(amount);
}

// ✅ SECURE: Access control enforced
import "@openzeppelin/contracts/access/Ownable.sol";
function withdrawFunds(uint256 amount) public onlyOwner {
    payable(msg.sender).transfer(amount);
}`
  },
  {
    id: 'a02',
    code: 'A02:2021',
    name: 'Cryptographic Failures',
    web3Equivalent: 'Insecure Private Key Storage & Signature Replay',
    severity: 'CRITICAL',
    desc: 'Exposing sensitive plain-text data or using weak cryptographic keys, leading to compromised signing keys or wallet drainers.',
    exploitScenario: 'A browser wallet extension stores user seed phrases in unencrypted LocalStorage, allowing rogue scripts or dependency malware to easily upload private keys.',
    remediation: 'Never keep raw keys in local states. Utilize high-level hardware wallet configurations, run AES-GCM-256 for browser-side storage, and deploy EIP-712 structured records.',
    codeSnippet: `// ❌ VULNERABLE: Storing plain-text keys
localStorage.setItem("user_sk", rawPrivateKey);

// ✅ SECURE: Encrypted key buffer
const encrypted = await aesEncrypt(rawPrivateKey, pbkdf2Password);
localStorage.setItem("user_sk_enc", JSON.stringify(encrypted));`
  },
  {
    id: 'a03',
    code: 'A03:2021',
    name: 'Injection',
    web3Equivalent: 'Price Oracle Manipulation & Input Spoofing',
    severity: 'HIGH',
    desc: 'Feeding unvalidated inputs straight to execution engines, enabling SQL, shell command execution, or pricing query subversion.',
    exploitScenario: 'A token tracking database builds SQL query strings by directly concatenating external user strings, enabling bypass parameters.',
    remediation: 'Enforce parameterized queries or ORM sanitizers. Apply regex filters to ensure inputs are strictly valid 40-character hex strings: /^0x[a-fA-F0-9]{40}$/.',
    codeSnippet: `// ❌ VULNERABLE: Direct string interpolation
const query = \`SELECT * FROM wallets WHERE address = '\${input}'\`;

// ✅ SECURE: Strict hex address validation & parameterized query
if (/^0x[a-fA-F0-9]{40}$/.test(input)) {
  db.query("SELECT * FROM wallets WHERE address = ?", [input]);
}`
  },
  {
    id: 'a04',
    code: 'A04:2021',
    name: 'Insecure Design',
    web3Equivalent: 'Flawed Contract Logics & Centralized Bridges',
    severity: 'HIGH',
    desc: 'Systemic architectural designs implemented with inherently weak or missing trust verification barriers.',
    exploitScenario: 'A cross-chain asset bridge validates transaction approvals via a single server signature instead of using a distributed, decentralized multi-sig array.',
    remediation: 'Utilize threat modeling during architectural specification, use trusted multi-signatures (e.g. Gnosis Safe), and mandate peer audits.',
    codeSnippet: `// ❌ VULNERABLE: Absolute single authority approval
require(msg.sender == centralizedOracleAdmin, "Unauthorized");

// ✅ SECURE: Multi-signature validator group
address[] public validators;
uint256 public requiredConfirmations;
require(signatures.length >= requiredConfirmations, "Threshold not met");`
  },
  {
    id: 'a05',
    code: 'A05:2021',
    name: 'Security Misconfiguration',
    web3Equivalent: 'Infinite ERC-20 Allowances & Permissive CORS Options',
    severity: 'MEDIUM',
    desc: 'Unnecessary open services, excessive default rights, or unhardened hosting environments.',
    exploitScenario: 'A DeFi user interface requests maximum allowance (0xffffff...) over the user\'s absolute storage when the user only wants to trade 50 USDC.',
    remediation: 'Transition user interfaces to request standard limited token allowances, disable development stack trace outputs in production, and set CORS rules.',
    codeSnippet: `// ❌ VULNERABLE: Demanding infinite token sweep rights
token.approve(spender, uint256(0xffffffffffffffffffffffff...));

// ✅ SECURE: Request exact purchase volume
token.approve(spender, exactSwapAmount);`
  },
  {
    id: 'a06',
    code: 'A06:2021',
    name: 'Vulnerable & Outdated Components',
    web3Equivalent: 'Compromised npm Packages & Legacy Libraries',
    severity: 'HIGH',
    desc: 'Building applications with sub-modules that contain documented security vulnerability listings or CVE targets.',
    exploitScenario: 'A dapp installs helper utilities from a compromised NPM repository that intercepts browser window.ethereum providers to extract seed seeds.',
    remediation: 'Enforce "npm audit" scans inside CI workflows regularly, pin package versions, and strictly refrain from running unverified dependencies.',
    codeSnippet: `# ❌ VULNERABLE: Permissive vulnerable dependencies
"dependencies": { "ethers": "^4.0.0" } // Exposed to multiple older reentrancy risks

# ✅ SECURE: Verified, audited version bounds
"dependencies": { "ethers": "^6.12.0" }`
  },
  {
    id: 'a07',
    code: 'A07:2021',
    name: 'Identification & Authentication Failures',
    web3Equivalent: 'Phishing via blind "eth_sign" & Off-chain Spoofing',
    severity: 'HIGH',
    desc: 'Insufficient confirmation of identity credentials, session hijacking, or signing ambiguous hash strings.',
    exploitScenario: 'A victim connects their wallet to a phishing portal that asks them to sign raw, unreadable hexadecimal strings via the high-risk "eth_sign" function.',
    remediation: 'Enforce standard structured parsing formats (EIP-712 / personal_sign). Authenticate API endpoints with secure, expiring JWT elements.',
    codeSnippet: `// ❌ VULNERABLE: Blind signing of ambiguous bytes
provider.request({ method: 'eth_sign', params: [address, rawBytesOrTx] });

// ✅ SECURE: Readable, structured cryptographic EIP-712 signatures
provider.request({ method: 'eth_signTypedData_v4', params: [address, typedData] });`
  },
  {
    id: 'a08',
    code: 'A08:2021',
    name: 'Software & Data Integrity Failures',
    web3Equivalent: 'CDN Hijacking & Frontrunning Client Modules',
    severity: 'HIGH',
    desc: 'Compromising systems by loading resources from external avenues that lack cryptographic integrity validations.',
    exploitScenario: 'A client script retrieves Web3 libraries from an insecure remote public CDN, which gets hijacked to serve custom wrapper tracking codes.',
    remediation: 'Host static scripts locally within secure build boundaries, and implement Subresource Integrity (SRI) hashes on all external scripts.',
    codeSnippet: `<!-- ❌ VULNERABLE: Importing scripts without validation -->
<script src="https://cdn.example.com/web3.min.js"></script>

<!-- ✅ SECURE: Subresource Integrity (SRI) validation hashes -->
<script src="https://cdn.example.com/web3.min.js" 
        integrity="sha384-H8764gV7bHY2893..." 
        crossorigin="anonymous"></script>`
  },
  {
    id: 'a09',
    code: 'A09:2021',
    name: 'Security Logging & Monitoring Failures',
    web3Equivalent: 'Missing Smart Alerting & Real-Time Event Scanners',
    severity: 'MEDIUM',
    desc: 'Ignoring unusual traffic behaviors or high-value withdrawal levels without generating off-chain telemetry reports for operators.',
    exploitScenario: 'A malicious user gradually drains USDC liquidity pools over 4 days, but the developers inspect logs manually and miss the anomalous activity.',
    remediation: 'Deploy automated monitoring protocols (e.g. Forta, Tenderly, or Prometheus alerts), and configure active alarms for anomalous events.',
    codeSnippet: `// ❌ VULNERABLE: Swallowing critical events silently
try {
  executeDeFiTransaction();
} catch (e) {
  // Silent console log is lost in production
  console.log(e);
}

// ✅ SECURE: Alert on unusual anomalies or transaction exceptions
try {
  executeDeFiTransaction();
} catch (e) {
  telemetryStream.alert({
    level: "CRITICAL",
    module: "DeFiExecutor",
    message: e.message,
    timestamp: Date.now()
  });
}`
  },
  {
    id: 'a10',
    code: 'A10:2021',
    name: 'Server-Side Request Forgery (SSRF)',
    web3Equivalent: 'Node RPC Hijacking & Metadata Scanner Exploit',
    severity: 'MEDIUM',
    desc: 'Allowing web servers to fetch user-supplied URLs without verifying if they point to internal assets or administrative addresses.',
    exploitScenario: 'A smart contract metadata parser fetches arbitrary NFT assets, scanning localhost network resources to leak internal database credentials.',
    remediation: 'Never fetch user-supplied address names directly. Validate url domains using robust whitelist rules and block localhost ports (127.0.0.1).',
    codeSnippet: `// ❌ VULNERABLE: Querying raw arbitrary user-provided link
app.get("/fetch-metadata", (req, res) => {
  request(req.query.targetUrl).pipe(res);
});

// ✅ SECURE: Whitelist validated target domain URL rules
app.get("/fetch-metadata", (req, res) => {
  const url = new URL(req.query.targetUrl);
  if (['ipfs.io', 'assets.cryptosafety.org'].includes(url.hostname)) {
    request(url.toString()).pipe(res);
  } else {
    res.status(403).send("Forbidden host target exception.");
  }
});`
  },
];

export const SecurityCentre: React.FC = () => {
  // Wallet Safety Checker State
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [addressVerified, setAddressVerified] = useState<boolean | null>(null);

  // GoPlus Onchain API Integration State
  const [activeTab, setActiveTab] = useState<'checklist' | 'live-api' | 'headers-audit' | 'owasp-audit'>('checklist');
  const [apiType, setApiType] = useState<'address' | 'token'>('token');
  const [apiChainId, setApiChainId] = useState<string>('1');
  const [apiTargetAddress, setApiTargetAddress] = useState<string>('0xdAC17F958D2ee523a2206206994597C13D831ec7'); // Default USDT on ETH
  const [apiTokenResult, setApiTokenResult] = useState<TokenSecurityResult | null>(null);
  const [apiAddressResult, setApiAddressResult] = useState<AddressSecurityResult | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // HTTP Security Headers Specialist State
  const [headerConfig, setHeaderConfig] = useState({
    csp: true,
    hsts: true,
    xfo: true,
    xcto: true,
    referrer: true,
    permissions: true,
  });
  const [selectedCodeSample, setSelectedCodeSample] = useState<'express' | 'nginx' | 'vite' | 'html'>('express');

  // OWASP Audit Interactive State
  const [owaspState, setOwaspState] = useState<Record<string, boolean>>({
    a01: true,   // Broken Access Control (secure)
    a02: false,  // Cryptographic Failures (unprotected/vulnerable)
    a03: true,   // Injection (secure)
    a04: false,  // Insecure Design (unprotected/vulnerable)
    a05: true,   // Security Misconfiguration (secure)
    a06: false,  // Vulnerable and Outdated Components (unprotected/vulnerable)
    a07: true,   // Identification and Authentication Failures (secure)
    a08: false,  // Software and Data Integrity Failures (unprotected/vulnerable)
    a09: true,   // Security Logging and Monitoring (secure)
    a10: true,   // Server-Side Request Forgery (secure)
  });
  const [selectedOwaspId, setSelectedOwaspId] = useState<string>('a01');

  const handleLiveApiCheck = async () => {
    if (!apiTargetAddress || !apiTargetAddress.trim().startsWith("0x") || apiTargetAddress.trim().length < 10) {
      setApiError("Please enter a valid hex blockchain address starting with 0x.");
      return;
    }
    
    setApiLoading(true);
    setApiError(null);
    setApiTokenResult(null);
    setApiAddressResult(null);

    const address = apiTargetAddress.trim();
    if (apiType === 'token') {
      const res = await checkTokenSecurity(address, apiChainId);
      if (res.success && res.data) {
        setApiTokenResult(res.data);
      } else {
        setApiError(res.error || "Failed to fetch token contract telemetry.");
      }
    } else {
      const res = await checkAddressSecurity(address, apiChainId);
      if (res.success && res.data) {
        setApiAddressResult(res.data);
      } else {
        setApiError(res.error || "Failed to fetch onchain address logs.");
      }
    }
    setApiLoading(false);
  };

  const headerScore = useMemo(() => {
    let score = 0;
    if (headerConfig.csp) score += 25;
    if (headerConfig.hsts) score += 20;
    if (headerConfig.xfo) score += 15;
    if (headerConfig.xcto) score += 15;
    if (headerConfig.referrer) score += 12;
    if (headerConfig.permissions) score += 13;
    return score;
  }, [headerConfig]);

  // OWASP Risk Score Calculation
  const owaspRiskScore = useMemo(() => {
    const verifiedCount = Object.values(owaspState).filter(v => v === true).length;
    return Math.round((verifiedCount / 10) * 100);
  }, [owaspState]);

  const ratingStatus = useMemo(() => {
    if (headerScore >= 90) return 'EXCELLENT SHIELD PROFILE';
    if (headerScore >= 60) return 'MODERATE SAFETY COMPLIANCE';
    return 'CRITICAL THREAT DEFICIENCY';
  }, [headerScore]);

  const ratingColor = useMemo(() => {
    if (headerScore >= 90) return 'bg-indigo-950 text-indigo-200 border-indigo-700';
    if (headerScore >= 60) return 'bg-yellow-950 text-amber-400 border-yellow-800';
    return 'bg-red-950 text-red-400 border-red-800';
  }, [headerScore]);
  
  const [checklist, setChecklist] = useState({
    hardwareWallet: false,
    offGridSeed: false,
    extensionIsolation: false,
    smartContractAudit: false,
    hardwareToken2FA: false
  });

  const [auditResult, setAuditResult] = useState<{
    score: number;
    status: 'SECURE' | 'WARNING' | 'CRITICAL';
    message: string;
    actionItems: { title: string; desc: string }[];
  } | null>(null);

  // Scams Database state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScam, setSelectedScam] = useState<CryptoScam | null>(null);

  // Booking Consultation state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    appName: '',
    scope: 'wallet-audit',
    extraNotes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Verify wallet address format
  const handleVerifyAddress = (address: string) => {
    setWalletAddress(address);
    if (!address) {
      setAddressVerified(null);
      return;
    }
    // Check if starts with common prefix 0x (ETH etc), bc1 or 1 or 3 (BTC), or t (Tron/BNB)
    const isValid = /^0x[a-fA-F0-9]{40}$|^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z0-9]{11,71}$/.test(address);
    setAddressVerified(isValid);
  };

  // Run risk assessment calculator
  const runRiskAudit = () => {
    let checkedCount = 0;
    const actionItems: { title: string; desc: string }[] = [];

    if (checklist.hardwareWallet) checkedCount += 1;
    else {
      actionItems.push({
        title: "Deploy Physical Cold Storage",
        desc: "Over 90% of your long-term capital should reside offline. Software wallets (Metamask, TrustWallet) are constantly vulnerable to browser spyware."
      });
    }

    if (checklist.offGridSeed) checkedCount += 1;
    else {
      actionItems.push({
        title: "Purge Digital Backups Immediately",
        desc: "Your 12/24 word seed phrase MUST NEVER exist as a phone screenshot, email draft, cloud file, or chat history. Move it strictly to paper or solid steel plates."
      });
    }

    if (checklist.extensionIsolation) checkedCount += 1;
    else {
      actionItems.push({
        title: "Sandbox Your Crypto Web Browser",
        desc: "Do not use the same browser profile for gaming, entertainment, and Web3. Malicious cookies or unverified extensions can read webpage DOM elements and hijack inputs."
      });
    }

    if (checklist.smartContractAudit) checkedCount += 1;
    else {
      actionItems.push({
        title: "Revoke Limitless Allowances",
        desc: "Smart contracts with unlimited ERC-20 token approval can move your balance without warning. Check and revoke approvals weekly on Revoke.cash."
      });
    }

    if (checklist.hardwareToken2FA) checkedCount += 1;
    else {
      actionItems.push({
        title: "Upgrade from SMS Authentication to Security Keys",
        desc: "SIM swap attacks bypass standard mobile phone carrier authentication. Swap standard exchange accounts to physical YubiKeys or strong App-based TOTP keys."
      });
    }

    const calculatedScore = checkedCount * 20; // 0, 20, 40, 60, 80, 100
    
    let safetyStatus: 'SECURE' | 'WARNING' | 'CRITICAL' = 'CRITICAL';
    let summaryMessage = '';

    if (calculatedScore >= 80) {
      safetyStatus = 'SECURE';
      summaryMessage = "IMMUTABLE GUARD ENABLED: Your configurations exceed industry-grade physical protection standards.";
    } else if (calculatedScore >= 40) {
      safetyStatus = 'WARNING';
      summaryMessage = "PARTIAL EXPOSURE: Standard browser vectors remain open. Cybercriminals can intercept key signatures.";
    } else {
      safetyStatus = 'CRITICAL';
      summaryMessage = "極度危険 (CRITICAL DANGER): Your ledger is exposed to complete depletion via typical clipboard, phishing, or contract approvals.";
    }

    setAuditResult({
      score: calculatedScore,
      status: safetyStatus,
      message: summaryMessage,
      actionItems
    });
  };

  const toggleChecklist = (field: keyof typeof checklist) => {
    setChecklist(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Category filter items
  const categories = ['all', 'phishing', 'giveaway', 'poisoning', 'malware', 'impersonation'];

  // Filtered scams
  const filteredScams = useMemo(() => {
    return scamsDatabase.filter(scam => {
      const matchesSearch = scam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            scam.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || scam.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) return;
    setBookingSuccess(true);
  };

  const getScamIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-brand-error" />;
      case 'Binary': return <Binary className="w-6 h-6 text-brand-secondary" />;
      case 'Video': return <Video className="w-6 h-6 text-brand-primary" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-brand-tertiary" />;
      case 'MessageCircleWarning': return <MessageCircleWarning className="w-6 h-6 text-orange-600" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="py-6 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Title block */}
      <div className="border-heavy bg-[#ab3600] text-white p-6 md:p-8 neo-shadow relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#ff5f1f] opacity-20 rotate-45 pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="font-mono text-xs font-bold bg-[#ffdad6] text-[#93000a] px-3 py-1 border border-black uppercase tracking-wider">
            SHIELD-PRO SECURITY PROTOCOLS
          </span>
          <h2 className="font-sora text-3xl md:text-5xl font-extrabold tracking-tighter uppercase leading-none">
            ACTIVE THREAT CONTROL
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#efefff] max-w-2xl font-bold">
            Audit your environment with real logic tests, research historical exploit catalogs, and harden smart contract safety profiles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Audit Suite (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Wallet Checker with Live blockchain API backing */}
          <div id="wallet-checker" className="border-heavy bg-white p-6 neo-shadow rounded-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-black pb-4 mb-5">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-[#006e16] shrink-0" />
                <div>
                  <h3 className="font-sora text-lg font-bold text-[#1b1b1b]">
                    DYNAMIC ONCHAIN DEFENDER
                  </h3>
                  <p className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    LOCAL AUDIT & LIVE BLOCKCHAIN WEB3 API INTEGRATION
                  </p>
                </div>
              </div>
              
              {/* High Polished Brutalist Tab Switcher */}
              <div className="flex flex-wrap gap-1 bg-gray-100 p-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                <button
                  type="button"
                  onClick={() => setActiveTab('checklist')}
                  className={`px-3 py-1.5 font-mono text-[9px] font-black uppercase transition-all duration-100 cursor-pointer ${
                    activeTab === 'checklist' 
                      ? 'bg-[#ab3600] text-white border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Local Checklist
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('live-api')}
                  className={`px-2.5 py-1.5 font-mono text-[9px] font-black uppercase transition-all duration-100 cursor-pointer flex items-center gap-1 ${
                    activeTab === 'live-api' 
                      ? 'bg-neutral-950 text-[#72ff70] border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <span className="w-1.5 h-1.5 bg-[#72ff70] rounded-full animate-ping shrink-0" />
                  Live Onchain API
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('headers-audit')}
                  className={`px-2.5 py-1.5 font-mono text-[9px] font-black uppercase transition-all duration-100 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'headers-audit' 
                      ? 'bg-indigo-950 text-[#a5b4fc] border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
                      : 'text-gray-600 hover:text-[#5c6bc0]'
                  }`}
                >
                  <Lock className="w-3 h-3 text-[#5c6bc0] shrink-0" />
                  Security Headers Audit
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('owasp-audit')}
                  className={`px-2.5 py-1.5 font-mono text-[9px] font-black uppercase transition-all duration-100 cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'owasp-audit' 
                      ? 'bg-amber-950 text-amber-300 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]' 
                      : 'text-gray-600 hover:text-amber-800'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  OWASP Audit
                </button>
              </div>
            </div>

            {/* TAB CONTENT: LOCAL PHYSICAL CHECKLIST */}
            {activeTab === 'checklist' && (
              <div className="space-y-6">
                {/* Address verification tool */}
                <div className="space-y-2">
                  <label className="block font-mono text-xs font-bold text-gray-700">
                    WALLET ADDRESS FOR SECURITY PARSING (EVM / BTC / TRON)
                  </label>
                  <div className="relative flex">
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => handleVerifyAddress(e.target.value)}
                      placeholder="Enter 0x... or bc1... to authenticate address"
                      className="w-full border-heavy px-4 py-3 font-mono text-xs text-gray-900 bg-brand-surface focus:outline-none focus:bg-white animate-fade-in"
                    />
                    {walletAddress && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5">
                        {addressVerified ? (
                          <span className="bg-[#d2ffdb] border border-brand-tertiary text-brand-tertiary px-2 py-0.5 text-[9px] font-bold font-mono">
                            FORMAT VALID
                          </span>
                        ) : (
                          <span className="bg-[#ffdad6] border border-brand-error text-brand-error px-2 py-0.5 text-[9px] font-bold font-mono">
                            INVALID ADDR
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-[9px] text-[#0040e0] font-bold">
                    🛡️ This tool runs local cryptographic integrity scripts. No payload metrics are dispatched online.
                  </p>
                </div>

                {/* Factors checklist */}
                <div className="space-y-4">
                  <span className="block font-mono text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-1">
                    TACTICAL BEHAVIOR CHECKS
                  </span>
                  
                  <div className="space-y-2.5">
                    {/* Item 1 */}
                    <label className="flex items-start gap-3 p-3 border-2 border-black cursor-pointer bg-brand-surface hover:bg-white transition-colors duration-100">
                      <input
                        type="checkbox"
                        checked={checklist.hardwareWallet}
                        onChange={() => toggleChecklist('hardwareWallet')}
                        className="w-5 h-5 border-2 border-black accent-black rounded-none cursor-pointer mt-0.5 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="font-sora text-xs font-bold block text-gray-900">1. OFFLINE SECURITY ENVIRONMENT</span>
                        <span className="font-mono text-[10px] text-gray-500 block leading-tight">
                          I hold my high-volume funds on a raw physical device (Ledger, Trezor, Keystone). No keys touch software.
                        </span>
                      </div>
                    </label>

                    {/* Item 2 */}
                    <label className="flex items-start gap-3 p-3 border-2 border-black cursor-pointer bg-brand-surface hover:bg-white transition-colors duration-100">
                      <input
                        type="checkbox"
                        checked={checklist.offGridSeed}
                        onChange={() => toggleChecklist('offGridSeed')}
                        className="w-5 h-5 border-2 border-black accent-black rounded-none cursor-pointer mt-0.5 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="font-sora text-xs font-bold block text-gray-900">2. SEED PHRASE SOLID INTEGRITY</span>
                        <span className="font-mono text-[10px] text-gray-500 block leading-tight">
                          My 12/24 word recovery sequence only exists offline on physical steel, titanium, or thick ledger paper.
                        </span>
                      </div>
                    </label>

                    {/* Item 3 */}
                    <label className="flex items-start gap-3 p-3 border-2 border-black cursor-pointer bg-brand-surface hover:bg-white transition-colors duration-100">
                      <input
                        type="checkbox"
                        checked={checklist.extensionIsolation}
                        onChange={() => toggleChecklist('extensionIsolation')}
                        className="w-5 h-5 border-2 border-black accent-black rounded-none cursor-pointer mt-0.5 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="font-sora text-xs font-bold block text-gray-900">3. WEB profile SECLOG</span>
                        <span className="font-mono text-[10px] text-gray-500 block leading-tight">
                          I transact inside a clean, dedicated browser container profile with active script verification. Zero unneeded extensions.
                        </span>
                      </div>
                    </label>

                    {/* Item 4 */}
                    <label className="flex items-start gap-3 p-3 border-2 border-black cursor-pointer bg-brand-surface hover:bg-white transition-colors duration-100">
                      <input
                        type="checkbox"
                        checked={checklist.smartContractAudit}
                        onChange={() => toggleChecklist('smartContractAudit')}
                        className="w-5 h-5 border-2 border-black accent-black rounded-none cursor-pointer mt-0.5 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="font-sora text-xs font-bold block text-gray-900">4. SPENDING APPROVAL DISCIPLINE</span>
                        <span className="font-mono text-[10px] text-gray-500 block leading-tight">
                          I routinely inspect block explorers or smart utilities to revoke permission parameters from unneeded Web3 contracts.
                        </span>
                      </div>
                    </label>

                    {/* Item 5 */}
                    <label className="flex items-start gap-3 p-3 border-2 border-black cursor-pointer bg-brand-surface hover:bg-white transition-colors duration-100">
                      <input
                        type="checkbox"
                        checked={checklist.hardwareToken2FA}
                        onChange={() => toggleChecklist('hardwareToken2FA')}
                        className="w-5 h-5 border-2 border-black accent-black rounded-none cursor-pointer mt-0.5 shrink-0"
                      />
                      <div className="space-y-0.5">
                        <span className="font-sora text-xs font-bold block text-gray-900">5. TWO-FACTOR ENVELOPE SHIELD</span>
                        <span className="font-mono text-[10px] text-gray-500 block leading-tight">
                          I protect major account credentials using authentic physical keys (YubiKey) or Google Authenticator. No SMS text logs.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Action Trigger */}
                <div>
                  <button
                    type="button"
                    id="run-risk-audit-btn"
                    onClick={runRiskAudit}
                    className="w-full bg-[#0040e0] hover:bg-black text-white font-mono text-sm font-bold uppercase tracking-wider py-4 border-heavy neo-shadow-sm active-press cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>RUN PHYSICAL RISK ASSESSMENT</span>
                  </button>
                </div>

                {/* Audit Result Banner Output */}
                {auditResult && (
                  <div className={`border-heavy p-5 rounded-none space-y-4 transition-all duration-300 ${
                    auditResult.status === 'SECURE' ? 'bg-[#d2ffdb] border-brand-tertiary text-brand-on-tertiary-container' :
                    auditResult.status === 'WARNING' ? 'bg-amber-50 border-amber-500 text-amber-950' :
                    'bg-[#ffdad6] border-brand-error text-brand-on-error-container'
                  }`}>
                    <div className="flex items-center gap-3 border-b border-black/10 pb-3 justify-between">
                      <div className="flex items-center gap-2">
                        {auditResult.status === 'SECURE' ? <CheckCircle className="w-6 h-6 text-brand-tertiary" /> :
                         auditResult.status === 'WARNING' ? <AlertTriangle className="w-6 h-6 text-amber-600" /> :
                         <AlertCircle className="w-6 h-6 text-brand-error animate-bounce" />}
                        <span className="font-sora text-sm font-bold uppercase">
                          AUDIT RESULTS: {auditResult.score}% SECURED
                        </span>
                      </div>
                      <span className="font-mono text-xs font-extrabold border border-black/20 px-2 py-0.5 bg-white/40">
                        RATING: {auditResult.status}
                      </span>
                    </div>

                    <p className="font-mono text-xs font-bold italic leading-relaxed">
                      {auditResult.message}
                    </p>

                    {/* Recommendation action list */}
                    {auditResult.actionItems.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <span className="block font-mono text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                          CRITICAL REMEDIATION ACTION ITEMS REQUIRED:
                        </span>
                        <div className="space-y-2.5">
                          {auditResult.actionItems.map((item, index) => (
                            <div key={index} className="bg-white/80 p-3 border border-black text-black">
                              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary font-sora">
                                <span className="bg-black text-white px-1.5 py-0.5 text-[9px] font-mono">-{index + 1}-</span>
                                <span>{item.title}</span>
                              </div>
                              <p className="font-mono text-[10px] text-gray-700 mt-1 leading-tight">
                                {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {auditResult.status === 'SECURE' && (
                      <div className="bg-[#a8f9b4] p-3 border border-brand-tertiary text-brand-tertiary-container flex items-center gap-3 text-xs leading-tight font-mono font-bold">
                        <Lock className="w-5 h-5 shrink-0" />
                        <span>Congratulations! Your physical setup complies with the CSG Core-Security Standard. Keep updating approvals weekly.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: LIVE BLOCKCHAIN SECURITY API SCANNER (GoPlus API) */}
            {activeTab === 'live-api' && (
              <div className="space-y-5 animate-fade-in text-left">
                
                {/* Intro badge */}
                <div className="p-3 bg-neutral-950 text-[#72ff70] border-2 border-black font-mono space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-[#ab3600] text-white text-[8px] font-bold">LIVE METRICS</div>
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase">
                    <Activity className="w-4 h-4 text-orange-500 animate-pulse shrink-0" />
                    <span>GoPlus Security v1 API Connected</span>
                  </div>
                  <p className="text-[9px] text-gray-400 leading-normal">
                    This module uses live Web3 onchain API endpoints to check contract assembly bytecode integrity and wallet addresses across major networks dynamically.
                  </p>
                </div>

                {/* API Input parameters form */}
                <div className="bg-neutral-50 p-4 border-2 border-black space-y-4">
                  
                  {/* Select Scan targets type */}
                  <div className="space-y-1.5">
                    <span className="block font-mono text-[9.5px] text-gray-500 font-extrabold uppercase">
                      1. RECON PROTOCOL CATEGORY
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setApiType('token');
                          setApiTargetAddress('0xdAC17F958D2ee523a2206206994597C13D831ec7'); // Default USDT on ETH
                          setApiTokenResult(null);
                          setApiAddressResult(null);
                        }}
                        className={`py-2 border-2 border-black font-mono text-[10px] font-black uppercase text-center transition-all ${
                          apiType === 'token'
                            ? "bg-black text-white shadow-[2px_2px_0px_rgba(171,54,0,1)]"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        Token / Smart Contract
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setApiType('address');
                          setApiTargetAddress('0xB3D0Ec86DDAc8Db1D53676239bcBf06D4400E52d'); // Famous address
                          setApiTokenResult(null);
                          setApiAddressResult(null);
                        }}
                        className={`py-2 border-2 border-black font-mono text-[10px] font-black uppercase text-center transition-all ${
                          apiType === 'address'
                            ? "bg-black text-white shadow-[2px_2px_0px_rgba(171,54,0,1)]"
                            : "bg-white hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        Wallet / Actor Address
                      </button>
                    </div>
                  </div>

                  {/* Select Chain network */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[9.5px] text-gray-500 font-extrabold uppercase">
                      2. ACTIVE SCANNING BLOCKCHAIN
                    </label>
                    <select
                      value={apiChainId}
                      onChange={(e) => setApiChainId(e.target.value)}
                      className="w-full font-mono text-xs p-2.5 bg-white border-2 border-black focus:outline-none"
                    >
                      {GOPLUS_CHAINS.map(chain => (
                        <option key={chain.id} value={chain.id}>
                          {chain.name} ({chain.short}) — Chain ID: {chain.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target address input */}
                  <div className="space-y-1">
                    <label className="block font-mono text-[9.5px] text-gray-500 font-extrabold uppercase">
                      3. TARGET CRYPTOGRAPHIC HASH (0x...)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={apiTargetAddress}
                        onChange={(e) => setApiTargetAddress(e.target.value)}
                        placeholder="Paste target 0x address here..."
                        className="w-full bg-white font-mono text-xs p-2.5 border-2 border-black text-black tracking-tight uppercase"
                      />
                    </div>

                    {/* Pre-fill Quick load templates to make live API check super friendly */}
                    <div className="pt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[8.5px] text-gray-400 font-bold uppercase">LOAD LIVE EXAMPLES:</span>
                      
                      {apiType === 'token' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setApiTargetAddress('0xdAC17F958D2ee523a2206206994597C13D831ec7'); // USDT (ETH)
                              setApiChainId('1');
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-black border border-black font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase"
                          >
                            USDT (ETH)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setApiTargetAddress('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'); // WBNB (BSC)
                              setApiChainId('56');
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-black border border-black font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase"
                          >
                            WBNB (BSC)
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setApiTargetAddress('0xb3d0ec86ddac8db1d53676239bcbf06d4400e52d'); // Ledger Deployer (Clean)
                              setApiChainId('1');
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-black border border-black font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase"
                          >
                            Ledger Deployer (Clean)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setApiTargetAddress('0x9eab29adfd1a3cbdcc3102d847d3'); // Incomplete
                              setApiChainId('1');
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-black border border-black font-mono text-[8px] font-bold px-1.5 py-0.5 uppercase"
                          >
                            Sample 0x9eab
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Trigger audit */}
                  <button
                    type="button"
                    disabled={apiLoading}
                    onClick={handleLiveApiCheck}
                    className={`w-full py-3.5 border-heavy uppercase font-mono text-xs font-black tracking-wider transition-all flex items-center justify-center gap-2 ${
                      apiLoading 
                        ? 'bg-neutral-800 text-neutral-400 cursor-not-allowed'
                        : 'bg-[#ab3600] text-white hover:bg-neutral-950 cursor-pointer active-press shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    {apiLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                        <span>INTERROGATING BLOCKCHAIN API NODE...</span>
                      </>
                    ) : (
                      <>
                        <Network className="w-4 h-4 shrink-0" />
                        <span>RUN INTERACTIVE LIVE SECURITY API DISPATCH</span>
                      </>
                    )}
                  </button>

                </div>

                {/* API Request Error Panel */}
                {apiError && (
                  <div className="bg-[#ffdad6] border-2 border-[#ffb4ab] p-4 text-brand-error font-mono text-xs font-black space-y-1">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                      <span>API TRANSMISSION FAULT</span>
                    </div>
                    <p className="font-normal text-[10px] leading-relaxed text-red-950">
                      {apiError}
                    </p>
                  </div>
                )}

                {/* API RESULT: TOKEN CONTRACT REPORT */}
                {apiTokenResult && (
                  <div className="border-2 border-black p-4 space-y-4 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-fade-in">
                    
                    {/* Header bar */}
                    <div className="flex justify-between items-start border-b-2 border-black pb-3">
                      <div>
                        <span className="font-mono text-[9px] font-extrabold text-gray-400 block uppercase">TOKEN SECURITY COMPLIANCE</span>
                        <h4 className="font-sora text-sm font-black text-black tracking-tight">
                          {apiTokenResult.tokenName} ({apiTokenResult.tokenSymbol})
                        </h4>
                      </div>
                      <div className="bg-black text-[9px] font-mono font-bold text-white px-2 py-0.5">
                        {apiTokenResult.riskCount === 0 ? "✓ CLEAN SECURITY" : `⚠️ ${apiTokenResult.riskCount} HAZARDS`}
                      </div>
                    </div>

                    {/* Metric Grids */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      
                      <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                        <span className="text-[8px] text-gray-500 uppercase block">OPEN SOURCE CODE</span>
                        <span className={`font-black uppercase text-[10px] block ${apiTokenResult.isOpenSource ? "text-emerald-700" : "text-rose-700 animate-pulse"}`}>
                          {apiTokenResult.isOpenSource ? "✓ Yes (Verified)" : "❌ Closed Source (DANGER)"}
                        </span>
                      </div>

                      <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                        <span className="text-[8px] text-gray-500 uppercase block">HONEYPOT STATUS</span>
                        <span className={`font-black uppercase text-[10px] block ${!apiTokenResult.isHoneypot ? "text-emerald-700" : "text-rose-700 animate-bounce"}`}>
                          {!apiTokenResult.isHoneypot ? "✓ No Honeypot" : "❌ TRAPPED (HONEYPOT)"}
                        </span>
                      </div>

                      <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                        <span className="text-[8px] text-gray-500 uppercase block">BUY TRANSFER TAX</span>
                        <span className={`font-black text-[10px] block ${apiTokenResult.buyTax > 0.1 ? "text-rose-700" : "text-black"}`}>
                          {(apiTokenResult.buyTax * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="p-2.5 bg-neutral-50 border border-neutral-200">
                        <span className="text-[8px] text-gray-500 uppercase block">SELL TRANSFER TAX</span>
                        <span className={`font-black text-[10px] block ${apiTokenResult.sellTax > 0.1 ? "text-rose-700" : "text-black"}`}>
                          {(apiTokenResult.sellTax * 100).toFixed(1)}%
                        </span>
                      </div>

                      <div className="p-2.5 bg-neutral-50 border border-neutral-200 col-span-2">
                        <span className="text-[8px] text-gray-500 uppercase block">CONTRACT EXCLUSION CONTROLLER</span>
                        <div className="flex gap-1 flex-wrap pt-1 text-[8px] font-black uppercase">
                          <span className={`px-1.5 py-0.5 border ${!apiTokenResult.cannotBuy ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-rose-50 text-rose-700 border-rose-300 animate-pulse"}`}>
                            Buy Allowed
                          </span>
                          <span className={`px-1.5 py-0.5 border ${!apiTokenResult.cannotSell ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-rose-50 text-rose-700 border-rose-300 animate-pulse"}`}>
                            Sell Allowed
                          </span>
                          <span className={`px-1.5 py-0.5 border ${!apiTokenResult.isBlacklisted ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-yellow-50 text-yellow-700 border-yellow-300"}`}>
                            No Blacklist Flag
                          </span>
                          <span className={`px-1.5 py-0.5 border ${!apiTokenResult.canSlippageBeModified ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-yellow-50 text-yellow-700 border-yellow-300"}`}>
                            Fixed Slippage
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Alerts feed */}
                    <div className="space-y-2 pt-1 border-t border-dashed border-gray-200">
                      <span className="block font-mono text-[8.5px] font-black text-gray-400 uppercase tracking-widest">ONCHAIN THREAT DECISIONS:</span>
                      
                      {apiTokenResult.alerts.length === 0 ? (
                        <div className="p-2.5 bg-[#d2ffdb] border border-brand-tertiary text-brand-tertiary text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>Pristine Smart Code Profile detected. Normal usage allowed.</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {apiTokenResult.alerts.map((alert, i) => (
                            <div key={i} className="p-2 bg-red-50 text-red-950 border border-red-200 text-[9.5px] font-mono leading-tight flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                              <span>{alert}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Developer coordinates */}
                    <div className="bg-neutral-900 text-gray-400 p-2.5 font-mono text-[8px] space-y-1 border border-black">
                      <div className="flex justify-between">
                        <span>CONTRACT OWNER ADDRESS:</span>
                        <span className="text-white font-bold leading-none break-all">{apiTokenResult.ownerAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>COMPLIANCE REGISTRY TAGS:</span>
                        <span className={apiTokenResult.trustList ? "text-[#72ff70] font-black" : "text-gray-500 font-bold"}>
                          {apiTokenResult.trustList ? "✦ VERIFIED TRUST LISTED" : "UNLISTED GENERAL POOL"}
                        </span>
                      </div>
                    </div>

                  </div>
                )}

                {/* API RESULT: ADDRESS THREAT REPORT */}
                {apiAddressResult && (
                  <div className="border-2 border-black p-4 space-y-4 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)] animate-fade-in">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start border-b-2 border-black pb-3">
                      <div>
                        <span className="font-mono text-[9px] font-extrabold text-gray-400 block uppercase">ADDRESS THREAT DIRECTORY</span>
                        <h4 className="font-sora text-xs font-black text-black leading-tight break-all font-mono tracking-tight uppercase">
                          {apiTargetAddress}
                        </h4>
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      
                      <div className={`p-2.5 border uppercase text-center ${apiAddressResult.cybercrime ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-black" : "bg-neutral-50 border-neutral-200 text-neutral-500"}`}>
                        <span className="text-[7.5px] block text-gray-400">Cybercrime Record</span>
                        <span className="text-[10px] block mt-0.5">{apiAddressResult.cybercrime ? "⚠️ Flagged" : "✓ None"}</span>
                      </div>

                      <div className={`p-2.5 border uppercase text-center ${apiAddressResult.moneyLaundering ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-black" : "bg-neutral-50 border-neutral-200 text-neutral-500"}`}>
                        <span className="text-[7.5px] block text-gray-400">Money Laundering</span>
                        <span className="text-[10px] block mt-0.5">{apiAddressResult.moneyLaundering ? "⚠️ Mixing Flag" : "✓ Clean"}</span>
                      </div>

                      <div className={`p-2.5 border uppercase text-center ${apiAddressResult.phishingActivities ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-black" : "bg-neutral-50 border-neutral-200 text-neutral-500"}`}>
                        <span className="text-[7.5px] block text-gray-400">Phishing Campaign</span>
                        <span className="text-[10px] block mt-0.5">{apiAddressResult.phishingActivities ? "⚠️ SCAM LAUNCHER" : "✓ No Phish"}</span>
                      </div>

                      <div className={`p-2.5 border uppercase text-center ${apiAddressResult.stealingAttack ? "bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-black" : "bg-neutral-50 border-neutral-200 text-neutral-500"}`}>
                        <span className="text-[7.5px] block text-gray-400">Drainer Wallet Link</span>
                        <span className="text-[10px] block mt-0.5">{apiAddressResult.stealingAttack ? "⚠️ ACTIVE DRAINER" : "✓ Clean"}</span>
                      </div>
                    </div>

                    {/* Threat evaluation */}
                    <div className="space-y-2 pt-1 border-t border-dashed border-gray-200">
                      <span className="block font-mono text-[8.5px] font-black text-gray-400 uppercase tracking-widest">ONCHAIN THREAT COMPANION:</span>
                      
                      {!apiAddressResult.isMalicious ? (
                        <div className="p-2.5 bg-[#d2ffdb] border border-brand-tertiary text-brand-tertiary text-[10px] font-mono font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 shrink-0" />
                          <span>No reported malicious signatures found. Verified as clean peer.</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5 animate-bounce-slow">
                          {apiAddressResult.alerts.map((alert, i) => (
                            <div key={i} className="p-2 bg-rose-50 text-rose-950 border border-brand-error text-[9.5px] font-mono leading-tight flex items-start gap-1.5">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                              <span>{alert}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Malicious contracts count */}
                    <div className="p-2 border border-black font-semibold text-[8px] text-gray-500 font-mono flex justify-between uppercase">
                      <span>MALICIOUS SMART CONTRACTS ISSUED:</span>
                      <span className={apiAddressResult.numberMaliciousContractsCreated > 0 ? "text-red-600 font-extrabold animate-pulse" : "text-black"}>
                        {apiAddressResult.numberMaliciousContractsCreated} CREATED
                      </span>
                    </div>

                  </div>
                )}

                {/* Secure context alert bar */}
                <div id="secure-simulation-banner" className="bg-[#fffbeb] border border-amber-300 p-3 font-mono text-[9.5px] leading-relaxed text-[#ab3600]">
                  <strong>💡 Dynamic Simulation Realism:</strong> Connecting actual GoPlus and block explorer APIs allows you to copy and paste contract hashes of newly launched tokens to instantly audit buy/sell tax or backdoors before you click confirm in your browser wallet extension interface.
                </div>

              </div>
            )}

            {/* TAB CONTENT: HTTP SECURITY HEADERS AUDIT & SANDBOX */}
            {activeTab === 'headers-audit' && (
              <div className="space-y-6 animate-fade-in text-left" id="headers-audit-container">
                
                {/* Security Headers Console Welcome */}
                <div id="headers-specialist-info" className="p-4 bg-indigo-950 text-indigo-200 border-2 border-black font-mono space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 bg-indigo-800 text-white text-[8px] font-bold">SECURITY SPECIALIST ACTIVE</div>
                  <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase">
                    <Lock className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
                    <span>Production HTTP Security Headers Shield Review</span>
                  </div>
                  <p className="text-[9.5px] text-indigo-300 leading-normal">
                    Vulnerabilities like Cross-Site Scripting (XSS), script hijacking, clickjacking, and MIME sniffing are mitigated primarily at the HTTP server level by delivering explicit metadata control headers to users' browsers.
                  </p>
                </div>

                {/* Active Live Sandbox Controls */}
                <div id="headers-sandbox-controls" className="bg-neutral-50 p-4 border-2 border-black space-y-4">
                  <span className="block font-mono text-[9.5px] text-gray-500 font-extrabold uppercase border-b border-black/10 pb-1.5">
                    📶 LIVE HEADERS RISK SIMULATOR (TOGGLE PARAMETERS TO ASSESS EXPOSURE)
                  </span>

                  <div className="space-y-2.5">
                    {/* CSP Toggle */}
                    <div id="cfg-card-csp" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>Content-Security-Policy</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">CSP</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Defends against script injection exploits and client-side credential logging by restricting unauthorized source scripts.
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          default-src 'self' https: data: 'unsafe-inline';
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-csp">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.csp} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, csp: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-csp"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>

                    {/* HSTS Toggle */}
                    <div id="cfg-card-hsts" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>Strict-Transport-Security</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">HSTS</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Mandates secure HTTPS enforcement permanently, neutralizing SSL downgrading and MITM Wi-Fi router packet sniffing.
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          max-age=31536000; includeSubDomains; preload
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-hsts">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.hsts} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, hsts: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-hsts"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>

                    {/* X-Frame-Options Toggle */}
                    <div id="cfg-card-xfo" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>X-Frame-Options</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">XFO</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Shields from clickjacking overlays that spoof interface panels inside foreign Web iframe bounds.
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          SAMEORIGIN
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-xfo">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.xfo} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, xfo: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-xfo"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>

                    {/* X-Content-Type-Options Toggle */}
                    <div id="cfg-card-xcto" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>X-Content-Type-Options</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">XCTO</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Bans browsers from sniffing files as executable script nodes, minimizing style sheet hijack risk vectors.
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          nosniff
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-xcto">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.xcto} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, xcto: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-xcto"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>

                    {/* Referrer-Policy Toggle */}
                    <div id="cfg-card-referrer" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>Referrer-Policy</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">RP</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Confines the volume of outbound telemetry shared when users navigate to third-party target URLs.
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          strict-origin-when-cross-origin
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-referrer">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.referrer} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, referrer: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-referrer"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>

                    {/* Permissions-Policy Toggle */}
                    <div id="cfg-card-permissions" className="flex items-start justify-between gap-4 p-2.5 bg-white border border-black/15">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-[10.5px] text-black">
                          <span>Permissions-Policy</span>
                          <span className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-[7.5px] font-mono px-1 py-0.1 select-none font-bold">PP</span>
                        </div>
                        <p className="font-mono text-[9px] text-gray-500 leading-tight">
                          Blocks third-party packages or scripts from hijacking sensitive device elements (camera, mic, geographic logs).
                        </p>
                        <code className="block font-mono text-[8px] text-indigo-800 bg-[#f5f5ff] p-1 mt-1 border border-indigo-100 select-all truncate">
                          camera=(), microphone=(), geolocation=()
                        </code>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none shrink-0 pt-0.5" id="lbl-cfg-permissions">
                        <input 
                          type="checkbox" 
                          checked={headerConfig.permissions} 
                          onChange={(e) => setHeaderConfig({ ...headerConfig, permissions: e.target.checked })}
                          className="sr-only peer"
                          id="chk-cfg-permissions"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-950"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Shield Compliance Dashboard Score */}
                <div id="headers-shield-dashboard" className="border-2 border-black p-4 space-y-4 bg-white shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-3 gap-2">
                    <div>
                      <span className="font-mono text-[8.5px] font-extrabold text-indigo-600 block uppercase">SIMULATOR HEALTH RATING</span>
                      <h4 className="font-sora text-sm font-black text-black uppercase tracking-tight">
                        Shield Strength Index
                      </h4>
                    </div>
                    <div className={`text-[10px] sm:text-xs font-mono font-black border-2 px-2.5 py-1 uppercase ${ratingColor}`}>
                      {headerScore}% SECURITY SCORE — {ratingStatus}
                    </div>
                  </div>

                  {/* Progress score bar */}
                  <div className="w-full h-3 bg-gray-100 border border-black overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        headerScore >= 90 ? "bg-indigo-600" : headerScore >= 60 ? "bg-amber-400" : "bg-rose-500"
                      }`}
                      style={{ width: `${headerScore}%` }}
                    />
                  </div>

                  {/* Real-time Threat Decision Stream */}
                  <div className="space-y-2">
                    <span className="block font-mono text-[8.5px] font-black text-gray-500 uppercase tracking-widest">ACTIVE VULNERABILITY EXPOSURE THREAT LOGS:</span>
                    
                    {headerScore === 100 ? (
                      <div className="p-3 bg-emerald-50 border-2 border-emerald-500 text-emerald-950 text-[10px] font-mono font-bold uppercase flex items-start gap-1.5 leading-tight">
                        <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5 animate-bounce" />
                        <div>
                          <span className="block font-extrabold">✓ IMMUTABLE CONTAINER COVERAGE ACTIVE:</span>
                          <p className="font-normal normal-case text-gray-600 mt-0.5">All major web attack patterns and host spoof vectors are strictly mitigated by HTTP policies. This application behaves like a hardened banking environment.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {!headerConfig.csp && (
                          <div id="threat-csp" className="p-2.5 bg-rose-50 border border-rose-300 text-rose-950 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0 animate-pulse" />
                            <div>
                              <span className="font-black">[HIGH SEVERITY] MISSING CONTENT SECURITY POLICY:</span>
                              <p className="text-[8.5px] text-gray-700 font-normal">Cross-site malicious scripts (XSS) can run loaded telemetry from compromised npm dependencies, steal custom session hooks, and hijack clipboard buffers.</p>
                            </div>
                          </div>
                        )}
                        {!headerConfig.hsts && (
                          <div id="threat-hsts" className="p-2.5 bg-rose-50 border border-rose-300 text-rose-950 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-black">[HIGH SEVERITY] HTTP ENFORCEMENT ABSENT (HSTS):</span>
                              <p className="text-[8.5px] text-gray-700 font-normal">Allows intermediate routers to split SSL traffic or downgrade to unencrypted HTTP, leaving private data exposed on public Wi-Fi access points.</p>
                            </div>
                          </div>
                        )}
                        {!headerConfig.xfo && (
                          <div id="threat-xfo" className="p-2.5 bg-amber-50 border border-amber-300 text-amber-950 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-black">[MEDIUM SEVERITY] FRAMING DEFENSE (CLICKJACKING) INACTIVE:</span>
                              <p className="text-[8.5px] text-gray-700 font-normal">Malicious operators can overlay your login views or submit frames invisibly inside a rogue site iframe, tapping transactions by spoofing user clicking zones.</p>
                            </div>
                          </div>
                        )}
                        {!headerConfig.xcto && (
                          <div id="threat-xcto" className="p-2.5 bg-amber-50 border border-amber-300 text-amber-950 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-black">[MEDIUM SEVERITY] MIME POLICY BYPASS POSSIBLE:</span>
                              <p className="text-[8.5px] text-gray-700 font-normal">Allows browsers to speculate and execute raw file logs or stylesheets as active active scripts, facilitating script injection vectors from dynamic asset folders.</p>
                            </div>
                          </div>
                        )}
                        {!headerConfig.referrer && (
                          <div id="threat-referrer" className="p-2.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-black">[LOW SEVERITY] REFERRER COMPROMISE EXPOSURE:</span>
                              <p className="text-[8.5px] text-gray-600 font-normal">Outbound URL logs retain path query keys (e.g., session identifiers, user metadata parameters) that are leaked straight to target host tracking analytics.</p>
                            </div>
                          </div>
                        )}
                        {!headerConfig.permissions && (
                          <div id="threat-permissions" className="p-2.5 bg-neutral-100 border border-neutral-300 text-neutral-800 font-mono text-[9px] leading-tight flex items-start gap-1.5">
                            <AlertCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-black">[LOW SEVERITY] DEVICE RESOURCE PERMISSION DEFICIENCY:</span>
                              <p className="text-[8.5px] text-gray-600 font-normal">Third-party tracker assets hold the capacity to initialize hardware blocks (geolocation, webcam, mic arrays) in the user's browser, bypassing core security isolation.</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Production Code deployment recipes */}
                <div id="headers-recipes-section" className="border-heavy bg-white p-5 space-y-4 neo-shadow rounded-none">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/10 pb-3 gap-2">
                    <div className="space-y-0.5">
                      <span className="font-mono text-[8.5px] text-primary block uppercase font-bold text-indigo-700">PRODUCTION DEPLOYMENT RECIPES</span>
                      <h4 className="font-sora text-sm font-black text-black uppercase tracking-tight">Expert Implementation Code</h4>
                    </div>
                    
                    {/* Code switcher buttons */}
                    <div className="flex gap-1 bg-gray-100 p-0.5 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                      {(['express', 'nginx', 'vite', 'html'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setSelectedCodeSample(mode)}
                          className={`px-2 py-1 font-mono text-[8px] font-black uppercase cursor-pointer ${
                            selectedCodeSample === mode 
                              ? 'bg-indigo-900 text-white border border-black shadow-[0.5px_0.5px_0px_rgba(0,0,0,1)]' 
                              : 'text-gray-500 hover:text-black'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Description based on code select */}
                  <p className="font-mono text-[9.5px] text-indigo-700 font-bold" id="mode-desc-text">
                    {selectedCodeSample === 'express' && "🛡️ Node.js Helmet Middleware: Standard library encapsulation for secure Express nodes."}
                    {selectedCodeSample === 'nginx' && "⚙️ Nginx Configuration: Header declaration applied inside native server block routing filters."}
                    {selectedCodeSample === 'vite' && "⚡ Vite Dev Server configuration: Enforces security headers locally. (CSG uses this!)"}
                    {selectedCodeSample === 'html' && "🌐 HTML Meta tags fallback: Provides local CSP guidelines directly in static browser DOM files."}
                  </p>

                  {/* Copyable code block */}
                  <div className="relative">
                    <pre className="bg-neutral-950 text-[#72ff70] p-4 text-[9px] font-mono leading-relaxed select-all overflow-x-auto border border-black max-h-64 rounded-none">
                      {selectedCodeSample === 'express' && (
`// Install helmet via npm: npm install helmet
const express = require('express');
const helmet = require('helmet');
const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https:"],
      frameAncestors: ["'self'", "https://ai.studio.google.com"]
    }
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xContentTypeOptions: true,
  xFrameOptions: { action: 'sameorigin' },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }
}));`
                      )}
                      {selectedCodeSample === 'nginx' && (
`# Secure server block configuration
server {
    listen 443 ssl;
    server_name cryptosafety.example.com;

    # Downgrade protection
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    # Prevent framing (clickjacking)
    add_header X-Frame-Options "SAMEORIGIN" always;
    # Set MIME Sniffing block flag
    add_header X-Content-Type-Options "nosniff" always;
    # Limit telemetries outbound
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    # Disable unneeded API hooks
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
    # Inject secure script limits
    add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline'; frame-ancestors 'self' https://ai.studio.google.com;" always;
}`
                      )}
                      {selectedCodeSample === 'vite' && (
`// vite.config.ts config options
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self' https://ai.studio.google.com https://*.google.com https://*.run.app;",
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    }
  }
});`
                      )}
                      {selectedCodeSample === 'html' && (
`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <!-- Fallback meta tags (CSP ONLY) -->
  <meta http-equiv="Content-Security-Policy" 
        content="default-src 'self' https: data: 'unsafe-inline';">
  <title>Secured Document Context</title>
</head>
<body>
  ...
</body>
</html>`
                      )}
                    </pre>
                  </div>

                  {/* Local verification badge */}
                  <div id="local-audit-validation" className="bg-[#f0f3ff] border border-[#a5b4fc] p-3 text-indigo-950 font-mono text-[9px] leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping shrink-0" />
                      <strong>🛡️ Local Active Security Profile Verified:</strong>
                    </div>
                    <span className="font-mono font-black bg-indigo-950 text-indigo-200 border border-indigo-700 px-1.5 py-0.5 text-[8.5px] inline-block">
                      LOCAL_CSP_VITE_ACTIVE
                    </span>
                  </div>

                </div>

              </div>
            )}

            {/* TAB CONTENT: OWASP TOP 10 INTERACTIVE SECURITY REVIEW */}
            {activeTab === 'owasp-audit' && (
              <div className="space-y-6 animate-fade-in text-left text-neutral-950" id="owasp-audit-container">
                
                {/* Audit summary banner */}
                <div id="owasp-alert-banner" className="p-4 bg-amber-950 text-amber-200 border-2 border-black font-mono space-y-1 my-2">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="font-extrabold uppercase text-[11px] tracking-wide">OWASP Top 10 Web & Web3 Risk Vulnerability Assessment</span>
                  </div>
                  <p className="text-[9.5px] text-amber-300 leading-normal">
                    This interactive matrix reviews traditional OWASP client/server vulnerabilities side-by-side with decentralized Web3 counterparts. Toggle compliance indicators to calculate your target's risk profile dynamically.
                  </p>
                </div>

                {/* Score bar */}
                <div className="border border-black p-4 bg-neutral-50 shadow-[2px_2px_0px_rgba(0,0,0,1)] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-4">
                    <span className="font-mono text-[8px] text-gray-500 font-extrabold uppercase block select-none">COMPLIANCE INDEX</span>
                    <h4 className="font-sora text-sm font-black text-black">Audit Shield Metric</h4>
                    <span className="font-mono text-[10px] text-indigo-700 font-bold block mt-1">{Object.values(owaspState).filter(Boolean).length} / 10 Threat Gates Secured</span>
                  </div>
                  <div className="md:col-span-5 h-3 bg-gray-200 border border-black overflow-hidden relative">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        owaspRiskScore >= 90 ? "bg-emerald-600" : owaspRiskScore >= 60 ? "bg-amber-500" : "bg-red-600"
                      }`}
                      style={{ width: `${owaspRiskScore}%` }}
                    />
                  </div>
                  <div className="md:col-span-3 text-right">
                    <span className="font-mono text-[8px] text-gray-500 font-extrabold uppercase block select-none">RATING STATUS</span>
                    <span className={`inline-block font-mono font-black text-[9px] px-2 py-1 border-2 uppercase ${
                      owaspRiskScore >= 90 
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                        : owaspRiskScore >= 60 
                        ? 'bg-amber-950 text-amber-400 border-amber-800' 
                        : 'bg-red-950 text-red-400 border-red-800'
                    }`}>
                      {owaspRiskScore}% - {
                        owaspRiskScore === 100 
                          ? "IMMUNE ARCHITECTURE" 
                          : owaspRiskScore >= 70 
                          ? "HARDENED BASELINE" 
                          : owaspRiskScore >= 40 
                          ? "EXPOSED SYSTEM" 
                          : "CRITICAL SECURITY BREACH"
                      }
                    </span>
                  </div>
                </div>

                {/* Main Interactive Interactive Split Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                  
                  {/* Left part: Checklist Matrix */}
                  <div className="xl:col-span-5 space-y-2">
                    <span className="block font-mono text-[8.5px] font-black text-gray-400 uppercase tracking-wider">
                      INTERACTIVE COMPLIANCE CONTROLS:
                    </span>
                    
                    <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1 border border-black/10 p-2 bg-neutral-100">
                      {owaspRisks.map((risk) => {
                        const isCompliant = owaspState[risk.id];
                        const isSelected = selectedOwaspId === risk.id;
                        return (
                          <div 
                            key={risk.id}
                            className={`p-2.5 border-2 transition-all duration-100 flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected 
                                ? 'bg-amber-50 border-amber-500 shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                                : 'bg-white border-black/15 hover:border-black'
                            }`}
                            onClick={() => setSelectedOwaspId(risk.id)}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[9px] font-black text-amber-700 bg-amber-100 px-1">{risk.code}</span>
                                <span className="font-sora text-[10.5px] font-bold text-black truncate block">{risk.name}</span>
                              </div>
                              <span className="font-mono text-[8.5px] text-gray-500 block truncate mt-0.5">
                                {risk.web3Equivalent}
                              </span>
                            </div>
                            
                            {/* Verification controller checkbox + badge */}
                            <div className="flex items-center gap-2 shrink-0 select-none" onClick={(e) => e.stopPropagation()}>
                              <button 
                                type="button"
                                onClick={() => setOwaspState({ ...owaspState, [risk.id]: !isCompliant })}
                                className={`px-2 py-0.5 font-mono text-[8px] font-black border transition-all cursor-pointer select-none ${
                                  isCompliant 
                                    ? "bg-emerald-950 text-[#72ff70] border-emerald-700" 
                                    : "bg-red-950 text-red-300 border-red-800"
                                }`}
                              >
                                {isCompliant ? "SECURE ✓" : "VULNERABLE ⚠️"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right part: Comprehensive Vulnerability Deep Review */}
                  <div className="xl:col-span-7 border-2 border-black p-4 bg-white space-y-4">
                    {(() => {
                      const selectedRisk = owaspRisks.find(r => r.id === selectedOwaspId) || owaspRisks[0];
                      const compliant = owaspState[selectedRisk.id];
                      return (
                        <div className="space-y-4 font-mono text-[11px] leading-relaxed">
                          
                          {/* Title block */}
                          <div className="border-b border-black/15 pb-2.5 flex justify-between items-start">
                            <div>
                              <span className="text-[8px] font-black text-[#ab3600] tracking-widest">{selectedRisk.code} RISK IDENTIFIER</span>
                              <h3 className="font-sora text-sm font-black text-black uppercase tracking-tight">{selectedRisk.name}</h3>
                            </div>
                            
                            <span className={`text-[8.5px] font-black px-1.5 py-0.5 border uppercase ${
                              selectedRisk.severity === 'CRITICAL' 
                                ? 'bg-red-950 text-red-400 border-red-800'
                                : selectedRisk.severity === 'HIGH'
                                ? 'bg-orange-950 text-orange-400 border-orange-850'
                                : 'bg-yellow-950 text-yellow-400 border-yellow-850'
                            }`}>
                              {selectedRisk.severity} SEVERITY
                            </span>
                          </div>

                          {/* traditional vs web3 mapping */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 bg-neutral-50 p-2.5 border border-black/10">
                            <div>
                              <span className="text-[8px] font-extrabold text-[#ab3600] uppercase block">WEB ATTACK CLASSIFICATION</span>
                              <p className="text-[9.5px] text-gray-700 mt-0.5 leading-tight">{selectedRisk.desc}</p>
                            </div>
                            <div>
                              <span className="text-[8px] font-extrabold text-indigo-700 uppercase block">WEB3 / CRYPTO EQUIVALENT</span>
                              <p className="text-[9.5px] text-gray-750 font-bold mt-0.5 leading-tight">{selectedRisk.web3Equivalent}</p>
                            </div>
                          </div>

                          {/* Exploit script scenario */}
                          <div className="p-3 bg-red-50 border border-red-300 text-red-950">
                            <span className="text-[8px] font-black uppercase text-red-700 block">🛑 KNOWN EXPLOIT VECTOR HIGHLIGHT:</span>
                            <p className="text-[9.5px] mt-1 normal-case text-red-900 leading-normal font-sans">
                              {selectedRisk.exploitScenario}
                            </p>
                          </div>

                          {/* Vulnerability code block vs safe code block */}
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-black uppercase text-gray-500 block">⌨️ ARCHITECTURAL DEVIATION & HARDENING REMEDIATION CODES:</span>
                            <div className="relative">
                              <pre className="bg-neutral-950 text-[#72ff70] p-3 text-[8.5px] leading-relaxed select-all overflow-x-auto border border-black max-h-56">
                                {selectedRisk.codeSnippet}
                              </pre>
                            </div>
                          </div>

                          {/* Specific mitigation strategies list */}
                          <div className="p-3 bg-indigo-50 border border-indigo-200">
                            <strong className="text-[8.5px] font-black text-indigo-900 block uppercase">⚙️ CORE HARDENING METHODOLOGY REMEDIATIONS:</strong>
                            <p className="text-[9.5px] text-indigo-950 mt-1 leading-normal font-sans">
                              {selectedRisk.remediation}
                            </p>
                          </div>

                          {/* Live interactive simulation toggler */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2.5 border-2 border-black bg-neutral-50 gap-3">
                            <div className="space-y-0.5">
                              <span className="text-[8px] text-gray-500 font-extrabold block uppercase">MITIGATION IMPLEMENTATION CONTROLLER</span>
                              <span className="text-[10px] font-extrabold block">Has your application mitigated this risk gate?</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setOwaspState({ ...owaspState, [selectedRisk.id]: !compliant })}
                              className={`px-3 py-1.5 font-mono text-[9px] font-black uppercase transition-all duration-100 cursor-pointer border ${
                                compliant 
                                  ? 'bg-[#d2ffdb] text-[#006e16] border-[#006e16]' 
                                  : 'bg-[#ffdad6] text-[#93000a] border-[#93000a]'
                              }`}
                            >
                              {compliant ? "✓ Yes, Mitigated" : "⚠️ No, Vulnerable"}
                            </button>
                          </div>

                        </div>
                      );
                    })()}
                  </div>

                </div>

              </div>
            )}
          </div>

          {/* Section 2: Commandment List */}
          <div className="border-heavy bg-brand-surface p-6 neo-shadow rounded-none">
            <h3 className="font-sora text-sm font-bold text-[#1b1b1b] border-b-2 border-black pb-3 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-primary" />
              <span>THE 4 IMMUTABLE RULES OF SEED PHRASES</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 border border-black space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-[#ab3600]">RULE 01. ZERO SCREEN Capture</span>
                <p className="font-mono text-[10px] text-gray-600 leading-tight">
                  Never capture seeds with phone cameras or screenshot clips. Malicious apps scan background gallery logs constantly.
                </p>
              </div>
              <div className="bg-white p-4 border border-black space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-[#0040e0]">RULE 02. NO DIGITAL TRANSIT</span>
                <p className="font-mono text-[10px] text-gray-600 leading-tight">
                  Never export seed words on password tools, cloud sheets, or drafts. Cloud server exposures equal immediate token loss.
                </p>
              </div>
              <div className="bg-white p-4 border border-black space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-[#006e16]">RULE 03. IGNORE ADMIN DMS</span>
                <p className="font-mono text-[10px] text-gray-600 leading-tight">
                  Support staff never require seeds to fix ledger index. If a DM triggers a phrase input block, it is a phishing redirect.
                </p>
              </div>
              <div className="bg-white p-4 border border-black space-y-1.5">
                <span className="font-mono text-xs font-extrabold text-[#1b1b1b]">RULE 04. PHYSICAL REDUNDANCY</span>
                <p className="font-mono text-[10px] text-gray-600 leading-tight">
                  Utilize high-durability steel or double deposit sheets divided physically context-away. Ensure fire and chemical survival.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scams Database & Consultation Booking (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          {/* Section 3: Scams Database Browser */}
          <div id="scams-explorer" className="border-heavy bg-white p-6 neo-shadow rounded-none">
            <div className="border-b-2 border-black pb-4 mb-4">
              <h3 className="font-sora text-lg font-bold text-[#1b1b1b]">
                EXPLOIT DATABASE
              </h3>
              <p className="font-mono text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                THREAT SIGNATURE ENGINE
              </p>
            </div>

            <div className="space-y-4">
              {/* Search and Category Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-400">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search threat indexes..."
                    className="w-full border-heavy pl-9 pr-4 py-3 font-mono text-xs text-gray-900 bg-brand-surface focus:outline-none"
                  />
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto whitespace-nowrap scrollbar-clean pb-2 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`font-mono text-[9px] font-bold uppercase px-2 py-1 border transition-all shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-black text-white border-black'
                          : 'bg-brand-surface text-gray-600 border-gray-300 hover:bg-brand-surface-container'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scams list */}
              <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
                {filteredScams.length === 0 ? (
                  <div className="border border-dashed border-gray-300 p-8 text-center text-gray-400 font-mono text-xs">
                    NO RECORD MATCHES FILTER SPECIFICATIONS
                  </div>
                ) : (
                  filteredScams.map((scam) => (
                    <div
                      key={scam.id}
                      onClick={() => setSelectedScam(scam)}
                      className="border-2 border-black p-3.5 hover:bg-brand-surface/85 cursor-pointer transition-colors active-press neo-shadow-sm flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[8px] font-extrabold px-1.5 py-0.5 border font-mono ${
                            scam.severity === 'CRITICAL' ? 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]' :
                            scam.severity === 'ACTIVE' ? 'bg-[#fff0ea] text-[#ab3600] border-[#ff5f1f]' :
                            'bg-[#eef3ff] text-[#0040e0] border-[#2e5bff]'
                          }`}>
                            {scam.severity}
                          </span>
                          <span className="font-mono text-[8px] text-gray-400 font-bold tracking-widest uppercase">
                            {scam.category}
                          </span>
                        </div>
                        <h4 className="font-sora text-sm font-bold text-gray-950 truncate leading-tight">
                          {scam.title}
                        </h4>
                        <p className="font-mono text-[10px] text-gray-500 truncate leading-none">
                          {scam.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 p-1 border border-black bg-brand-surface">
                        {getScamIcon(scam.iconName)}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Project Security & Wallet On-Chain Review Request */}
          <div className="border-heavy bg-[#fefee2] p-5 neo-shadow rounded-none space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-brand-primary" />
              <div>
                <h4 className="font-sora text-xs font-bold text-gray-950 uppercase tracking-tight">
                  REQUEST A PROFESSIONAL Threat AUDIT
                </h4>
                <p className="font-mono text-[9px] text-[#ab3600] font-bold">
                  DEDICATED CRYPTO SAFETY EXPERT EVALUATION
                </p>
              </div>
            </div>
            
            <p className="font-mono text-[10px] text-gray-700 leading-tight">
              Submit your team's storage architecture layout or app contract specifications. Our security researchers offer fully non-custodial feedback blueprints.
            </p>

            {bookingSuccess ? (
              <div className="bg-brand-tertiary/10 border-2 border-brand-tertiary p-3 space-y-2 text-brand-tertiary">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-mono text-[10px] font-bold uppercase">AUDIT REQUEST LOGGED</span>
                </div>
                <p className="font-mono text-[9px] leading-tight text-gray-700">
                  Receipt token generated. An expert security engineer will reach out to schedule your sandbox session at <span className="font-bold text-black">{bookingForm.email}</span>.
                </p>
                <button 
                  type="button" 
                  onClick={() => { setBookingSuccess(false); setBookingForm({ name: '', email: '', appName: '', scope: 'wallet-audit', extraNotes: '' }) }} 
                  className="font-mono text-[9px] font-bold uppercase underline text-black block hover:text-brand-primary mt-1"
                >
                  Book another consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[9px] font-bold text-gray-600 uppercase">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={bookingForm.name} 
                      onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Alex" 
                      className="w-full border-2 border-black bg-white px-2 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-bold text-gray-600 uppercase">Secure Email</label>
                    <input 
                      type="email" 
                      required
                      value={bookingForm.email} 
                      onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@nexus.io" 
                      className="w-full border-2 border-black bg-white px-2 py-1.5 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-[9px] font-bold text-gray-600 uppercase">Platform/Token Name</label>
                    <input 
                      type="text" 
                      value={bookingForm.appName} 
                      onChange={(e) => setBookingForm(prev => ({ ...prev, appName: e.target.value }))}
                      placeholder="VaultDapp" 
                      className="w-full border-2 border-black bg-white px-2 py-1.5 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[9px] font-bold text-gray-600 uppercase">Audit Scope</label>
                    <select 
                      value={bookingForm.scope} 
                      onChange={(e) => setBookingForm(prev => ({ ...prev, scope: e.target.value }))}
                      className="w-full border-2 border-black bg-white px-2 py-1 text-xs font-mono h-[29px]"
                    >
                      <option value="wallet-audit">Personal Vault Audit</option>
                      <option value="contract-review">Smart Contract Scan</option>
                      <option value="p2p-arbitrage">P2P Security Audit</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 hover:bg-black/85 transition-colors cursor-pointer active-press border-2 border-black flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT THREAT REVIEW REQUEST</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Exploit Information Detailed Overlay Modal */}
      {selectedScam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-fade-in">
          <div className="bg-white border-[4px] border-black rounded-none max-w-2xl w-full neo-shadow relative overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#ab3600] text-white p-5 border-b-[3px] border-black flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] font-bold bg-[#ffdad6] text-[#93000a] px-2 py-0.5 border border-black uppercase tracking-wider">
                  THREAT WARNING: {selectedScam.severity}
                </span>
                <h4 className="font-sora text-xl font-black uppercase tracking-tight leading-none mt-1">
                  {selectedScam.title}
                </h4>
                <p className="font-mono text-xs font-bold text-gray-100 uppercase tracking-widest">
                  Category: {selectedScam.category}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScam(null)}
                className="bg-black text-white border-2 border-black p-1 mr-0.5 hover:bg-brand-surface hover:text-[#ab3600] active-press cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Box 1: Exploit Mechanics */}
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#ab3600] uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>1. EXPLOIT MECHANICS (HOW IT IS EXECUTED)</span>
                </span>
                <p className="font-sans text-xs md:text-sm text-gray-700 leading-relaxed font-medium bg-brand-surface p-4 border border-gray-300">
                  {selectedScam.description}
                </p>
              </div>

              {/* Box 2: Vulnerability Analysis */}
              <div className="space-y-2">
                <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#0040e0] uppercase tracking-wider">
                  <Binary className="w-4 h-4 shrink-0" />
                  <span>2. THE CRITICAL VULNERABILITY EXPOSED</span>
                </span>
                <p className="font-mono text-[11.px] text-gray-800 leading-relaxed bg-[#f3f6ff] p-4 border border-[#0040e0]">
                  {selectedScam.details}
                </p>
              </div>

              {/* Box 3: Immediate Kill-Switch Action */}
              <div className="border-heavy bg-[#d2ffdb] p-4 text-[#003606] space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-brand-tertiary" />
                  <span className="font-sora text-xs font-bold text-[#006e16] uppercase">
                    3. THE KILL SWITCH (HOW TO HALT EXECUTION)
                  </span>
                </div>
                <ul className="list-disc list-inside font-mono text-[10px] space-y-1.5 leading-tight">
                  <li>Disconnect wallet immediately from any passive browser nodes or active web dapps.</li>
                  <li>Scan the public address on <span className="font-bold underline">Revoke.cash</span> and set limits on all unneeded contract tokens to 0.</li>
                  <li>Run a high-grade client antivirus audit looking for background clipboard script-interceptors.</li>
                  <li>Transfer critical capital indexes onto a brand new offline hardware vault context-isolation.</li>
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-brand-surface p-4 border-t-[3px] border-black flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedScam(null)}
                className="bg-black text-white font-mono text-xs font-bold uppercase px-6 py-2.5 border-heavy active-press cursor-pointer"
              >
                DISMISS SYSTEM ALERT
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
