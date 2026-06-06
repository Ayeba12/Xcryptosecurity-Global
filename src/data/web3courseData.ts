export interface CourseSection {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  content: string;
  readTime: string;
  steps: string[];
  safetyNotes: string[];
  faqQuestion?: string;
  faqAnswer?: string;
  quizQuestion?: string;
  quizOptions?: string[];
  quizAnswerIndex?: number;
}

export interface CourseSector {
  id: string;
  title: string;
  description: string;
  levelBadge: string;
  sections: CourseSection[];
}

export const WEB3_COURSE_INFO = {
  title: "Why Web3? Why DeFi?",
  subtitle: "A Beginner's Guide to Digital Ownership, Blockchain, and Decentralized Finance",
  author: "Kizito Uzor",
  socialX: "@web3professor1",
  authorBio: "Kizito Uzor is the Founder & Lead Developer of TakeProfit (@TakeprofitFi). High-fidelity cryptographic researcher and decentralized finance educator.",
  introduction: "The internet has transformed how we interact, communicate, and exchange value. This textbook deconstructs the evolution of Web3 and Decentralized Finance so absolute beginners can master self-custody principles safely."
};

export const WEB3_COURSE_INFO_ES = {
  title: "¿Por qué Web3? ¿Por qué DeFi?",
  subtitle: "Una Guía para Principiantes sobre Propiedad Digital, Blockchain y Finanzas Descentralizadas",
  author: "Kizito Uzor",
  socialX: "@web3professor1",
  authorBio: "Kizito Uzor es el Fundador y Desarrollador Principal de TakeProfit (@TakeprofitFi). Investigador criptográfico de alta fidelidad y educador en finanzas descentralizadas.",
  introduction: "El Internet ha transformado la forma en que interactuamos, nos comunicamos e intercambiamos valor. Este libro desmonta la evolución de Web3 y DeFi para que los principiantes absolutos dominen la autocustodia con seguridad."
};

export const COURSE_SECTORS: CourseSector[] = [
  {
    id: "sector-1-intro-web3",
    title: "Sector 1: Understanding Web3 & The Evolution of the Internet",
    description: "Deconstruct the history of Web1 and Web2. Analyze corporate trapped data frameworks and transition to ownership-centered Web3 networks.",
    levelBadge: "UNDERSTANDING WEB3",
    sections: [
      {
        id: "sec-1-1-web1",
        title: "Section 1.1: Web1 - The Read-Only Internet",
        subtitle: "The earliest static computer networks built for consumption.",
        excerpt: "Web1 was a passive, information-only medium. Content was restricted to corporate server hosts; users was purely consumer.",
        content: `In the earliest stage of the digital network, famously known as Web1, content creation was restricted to a select pool of website owners. Web pages were strictly static, meaning they functioned like a digital bulletin board or newspaper.

### Interactive Limitations
- **Read-Only Medium:** Users could only read information from pages with virtually zero interactive abilities.
- **Zero Contributions:** There were very few opportunities for page visitors to write comments, post media content, or build online digital communities.
- **Self-Hosted Hubs:** If you visited a website, you simply consumed what the hosting node published. You could not easily comment, sign up, or engage.`,
        readTime: "3 min read",
        steps: [
          "Web1 lasted from the early 1990s through approximately 2004.",
          "Websites used simple HTML elements, static imagery, and flat text directories.",
          "Users acted as pure consumers, with no dynamic inputs or databases on the client side."
        ],
        safetyNotes: [
          "Traditional static websites in Web1 did not host user wallets or active smart contracts. They were simple directories."
        ],
        quizQuestion: "What is the defining characteristic of Web1?",
        quizOptions: [
          "Users could instantly mint digital assets.",
          "It was a read-only systems with static websites.",
          "It introduced peer-to-peer bank networks."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-1-2-web2",
        title: "Section 1.2: Web2 - The Read-Write Internet",
        subtitle: "The rise of collaborative networks, social media, and dynamic databases.",
        excerpt: "Web2 enabled user interactive uploads but centralized all corporate control, locking databases into private silos.",
        content: `Web2 introduced a revolutionary breakthrough by enabling bidirectional interactions. Users became creators, contributing massive flows of data to centralized servers.

### Core Breakthroughs
*   **Media Interaction:** Users write, comment, share, blog, and stream video in real-time.
*   **Social Communities:** Platforms like Facebook, YouTube, Instagram, and Twitter became central hubs.
*   **Dynamic Data Processing:** Databases processed user actions to personalize experiences dynamically.

However, Web2 introduced a major systemic problem: While users created all the value, centralized corporate intermediaries owned the platforms, infrastructure, and user data.`,
        readTime: "4 min read",
        steps: [
          "Web2 enabled users to create and edit content (Read-Write).",
          "Intermediary networks like Facebook, Google, and Amazon achieved absolute monopoly.",
          "Platforms act as administrative gatekeepers, holding power to delete or restrict accounts arbitrarily."
        ],
        safetyNotes: [
          "In Web2, if you get banned by a company admin, your entire digital business, follower group, and history can vanish instantly."
        ],
        quizQuestion: "What is the main systemic vulnerability of Web2?",
        quizOptions: [
          "Users do not have any browsers to read content.",
          "It lacks high-speed database performance.",
          "Centralized companies own all platform infrastructure and user data, making the user the product."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-1-3-web3-ownership",
        title: "Section 1.3: Web3 - The Read-Write-Own Internet",
        subtitle: "Shifting the absolute paradigm back to individual sovereignty.",
        excerpt: "Web3 replaces corporate administrative database silos with open, user-owned, decentralized public ledgers.",
        content: `Web3 introduces a completely new vision for the global internet. Built entirely around the principle of **absolute digital ownership**, Web3 shifts administrative authority away from tech monopoly boardrooms directly to you.

### What Ownership Means
If you hold a Web2 account (like Facebook), you simply possess an access license that can be revoked or restricted by administrators at any time. You do not own it.
In Web3, your computer identity, transactions, and holdings are mapped directly onto decentralized blockchain nodes.

- **Absence of Arbitrary Intermediaries:** There is no centralized entity with the keys to censor or block your interactions.
- **Censorship Resistance:** Your actions cannot be wiped out by administrative decree.
- **Sovereign Assets:** Your balances reside on public-key coordinates that only your private key signature can authorize.`,
        readTime: "4 min read",
        steps: [
          "Web3 is a Read-Write-Own ecosystem.",
          "Ownership is enforced by mathematics and cryptographic keys, not corporate policies.",
          "This enables sovereign trading, identity custody, and direct participation in global open economies."
        ],
        safetyNotes: [
          "With absolute control comes absolute responsibility. If you lose your sovereign access keys, there is no corporate board to recover them."
        ],
        quizQuestion: "What does ownership mean in the context of Web3?",
        quizOptions: [
          "The company grants you a premium lifetime membership license.",
          "You have absolute control over your keys and assets with no central intermediary.",
          "All web pages are converted into printable PDF files."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-2-principles",
    title: "Sector 2: The Core Principles of Web3",
    description: "Master the four cryptographic pillars—Decentralization, Trustlessness, Immutability, and Permissionlessness—that guarantee sovereign user safety.",
    levelBadge: "CORE PILLARS",
    sections: [
      {
        id: "sec-2-1-decentralization",
        title: "Section 2.1: Decentralization Explained",
        subtitle: "Distributing administrative power to prevent systemic collapse.",
        excerpt: "Learn how peer-to-peer nodes guarantee continuous uptime, eliminating central authorities and server vulnerability points.",
        content: `Decentralization represents the division of administrative decision-making power. Instead of hosting records on a single corporate server, Web3 networks broadcast every record across a massive global coordinate of peer-to-peer computers.

### Why It Matters
1. **Reduces Centralized Power:** No single person, guild, or organization possesses the authority to unilaterally alter or control the system according to their desires.
2. **Eliminates Single Points of Failure:** Since thousands of independent computer nodes maintain accurate state copies, the network remains fully operational even if individual server grids crash.
3. **User Empowerment:** It shifts control mechanisms directly to active network participants, incentivizing collective operation.`,
        readTime: "4 min read",
        steps: [
          "Traditional systems (e.g., central banks) are centralized, exposing users to administrative errors.",
          "Decentralized systems distribute database validation across globally dispersed computers.",
          "Uptime is sustained collectively by independent miners, validators, or nodes."
        ],
        safetyNotes: [
          "Verify the decentralization posture of any Web3 platform. If a single administrative key can change all rules, the system is centralized."
        ],
        quizQuestion: "How does decentralization protect networks from crashing?",
        quizOptions: [
          "It stores all databases in a single high-security underground concrete bank vault.",
          "It utilizes a single supercomputer built by tech monopolies.",
          "It eliminates single points of failure by copying the database ledger across thousands of globally distributed nodes."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-2-2-trust-immute-perm",
        title: "Section 2.2: Trustlessness, Immutability & Permissionlessness",
        subtitle: "Unpacking the triple core mathematical promises of Web3 infrastructure.",
        excerpt: "How cryptographic checks allow strangers to transfer assets safely without middleman validation.",
        content: `Web3 utilizes three key structural principles that allow secure coordination between completely anonymous global players:

### 1. Trustlessness
This does not mean participants are untrustworthy. Rather, it means **you do not need to rely on the honesty of a human intermediary or bank clerk**. Transactions are written, verified, and strictly enforced by open-source computer code (Smart Contracts).

### 2. Immutability
Once a block of transacting history is agreed upon by consensus and officially written to the public blockchain, it becomes **technically impossible to alter, edit, or delete**. This builds a bulletproof, historically permanent sequence of records.

### 3. Permissionlessness
Anyone with a standard internet connection can participate in Web3 economies. You do not need to request permission from centralized gatekeepers, complete corporate application signups, or fulfill geographic identity filters.`,
        readTime: "4 min read",
        steps: [
          "Trustlessness swaps human promises for transparent mathematical signatures.",
          "Immutability protects against backdated accounting fraud or transaction retractions.",
          "Permissionlessness fosters equal economic access for individuals globally."
        ],
        safetyNotes: [
          "Because the ledger is immutable, accidental transfers to incorrect coordinates are permanently irreversible. Triple-check every wallet character."
        ],
        quizQuestion: "What does Permissionlessness guarantee in Web3?",
        quizOptions: [
          "You must get verified by an international banking authority before setup.",
          "Anyone with internet access can participate without needing approval from centralized gatekeepers.",
          "Your transaction is free of gas charges."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-3-blockchain-infra",
    title: "Sector 3: Blockchain - The Infrastructure Behind Web3",
    description: "Inspect the distributed ledger mechanics, block links, cryptography keys, and consensus protocols that construct Web3.",
    levelBadge: "BLOCKCHAIN INFRASTRUCTURE",
    sections: [
      {
        id: "sec-3-1-dlt-blocks",
        title: "Section 3.1: Distributed Ledgers and Block Chains",
        subtitle: "How chained database structures compile immutable tracking records.",
        excerpt: "An explicit dissection of ledger copies, cryptographic blocks, hash linking, and block order history.",
        content: `A blockchain is essentially a shared database ledger that records transactions. It uses Distributed Ledger Technology (DLT) to guarantee that everyone has access to the exact same version of truth.

### The Chained Structure
1.  **Distributed Ledger:** No single organization administers the records. Instead, identical database records are copied across many computers worldwide simultaneously.
2.  **Blocks and Chains:** Outbound transaction sequences are compiled together into standard groupings called "Blocks." Each block contains a specific mathematical identifier of the preceding block, creating an unbreakable chronological chain.

This provides absolute chronological order and complete history to anyone searching or auditing onchain activities.`,
        readTime: "3 min read",
        steps: [
          "DLT ensures all network nodes converge to support a single consensus state.",
          "Blocks are securely linked sequentially using hash signatures.",
          "Attempting to modify an old transaction breaks the hash links of all subsequent blocks."
        ],
        safetyNotes: [
          "Public blockchains allow anyone to audit all historical coordinate transactions transparently. Keep your personal identity separate from public keys."
        ],
        quizQuestion: "Why is it virtually impossible to falsify transactions on a blockchain block?",
        quizOptions: [
          "The database is protected by traditional bank firewalls.",
          "Each block is mathematically linked to the previous block via cryptographic hashes, making modifications break the entire chain.",
          "Each user keeps a printed copy on paper."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-3-2-consensus-crypto",
        title: "Section 3.2: Consensus Mechanisms & Cryptographic Signatures",
        subtitle: "How networks agree on historical truth and validate ownership.",
        excerpt: "Examine consensus protocols and standard public key cryptography signature layers.",
        content: `Because there is no central president or central administrative office in a decentralized blockchain, nodes must agree on what transactions are valid via structured protocols.

### Consensus Mechanisms
- **Proof of Work (PoW):** Nodes expend hardware computer energy to solve mathematical riddles, securing ledger stability (e.g., Bitcoin).
- **Proof of Stake (PoS):** Nodes stake native capital tokens to secure the right to validate transactions, maximizing speed and efficiency (e.g., Ethereum).

### The Cryptography Signature Layer
Blockchain utilizes asymmetric public-key cryptography to verify true digital ownership. When you use your private key, you create a digital signature that proves to the network nodes that you are the unique owner of the funds, allowing secure transaction processing.`,
        readTime: "4 min read",
        steps: [
          "Consensus mechanisms are computer rules that maintain identical database records without a central admin.",
          "Public keys act as public coordinates, while private keys act as signatures.",
          "Consensus prevents double-spending, maintaining ledger integrity."
        ],
        safetyNotes: [
          "If you expose your private key, anybody can generate a valid signature and empty your account balance on the spot."
        ],
        quizQuestion: "What are the two major consensus mechanisms used to keep nodes aligned?",
        quizOptions: [
          "TCP/IP and SMTP Protocols",
          "Proof of Work (PoW) and Proof of Stake (PoS)",
          "Central Bank Clearing and Federal Wire Transfer"
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-4-wallets",
    title: "Sector 4: Wallets & Digital Self-Custody",
    description: "Examine the technical definition of Web3 wallets and discover why physical seed phrase custody is your ultimate defense.",
    levelBadge: "WALLETS & SELF-CUSTODY",
    sections: [
      {
        id: "sec-4-1-wallet-types",
        title: "Section 4.1: What Is a Wallet? (Your Web3 Access Key)",
        subtitle: "Demystifying hot software interfaces versus cold hardware storage assets.",
        excerpt: "Coins do not live in your wallet. Discover what wallets actually do and how they protect private key data.",
        content: `A critical misconception among crypto beginners is believing that their tokens live inside their smartphone wallet app. They do not.
**All coins live solely as balances recorded on the public blockchain.**

Your wallet is actually a safe container that stores your **Private Key** and manages your public addresses.

### Categorizing Your Access Tools
*   **Custodial Account (Exchanges):** A third-party company holds your keys. You log in with standard credentials. This exposes you to exchange failure and counterparty risk.
*   **Non-Custodial Hot Wallet:** Mobile apps or browser extensions (Trust Wallet, Metamask). These store keys on an internet-adjacent device, making them vulnerable to local spyware or malware.
*   **Cold Hardware Wallet:** A physical device (Ledger, Trezor) that isolates keys entirely offline, away from active internet threats, preventing key capture.`,
        readTime: "4 min read",
        steps: [
          "Your wallet holds your private key coordinates, not your physical tokens.",
          "Hot wallets are convenient for microtrades but expose keys to active network trojans.",
          "Cold storage keeps signatures offline on specialized secure-element microchips."
        ],
        safetyNotes: [
          "Never capture a digital photograph of your hardware key recovery seed. Malware can scan photographic directories on your phone easily."
        ],
        quizQuestion: "Where do your cryptocurrency tokens actually exist?",
        quizOptions: [
          "Inside your physical mobile phone memory chip.",
          "Stored on the centralized computer server at Apple or Google offices.",
          "Solely as digital balances recorded on the public decentralized blockchain ledger."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-4-2-self-custody",
        title: "Section 4.2: Self-Custody and User Control Boundaries",
        subtitle: "How to safely operate as your own private financial institution.",
        excerpt: "The power to acts as your own bank without approvals, matched with the strict requirements of self-defense.",
        content: `Self-custody means you hold absolute, unrevokable power over your assets. By possessing your private keys, you effectively operate as your own personal bank.

### Sovereign Benefits
- **No Approvals Needed:** No administrative officer can stop, question, reject, or delay your transfers.
- **Immediate Global Clearance:** Money moves borderlessly, instantly, 24/7.
- **No Arbitrary Account Freezes:** No bank can place a freeze on your assets.

### The Self-Custody Responsibility Matrix
With sovereign control comes complete personal responsibility. 
Inside decentralized networks, there is **no recovery officer, no helpline, and no 'Forgot Password' button**. If you drop your private key, send funds to a trap contract, or enter your seed into a phishing link, your holdings are permanently lost.`,
        readTime: "4 min read",
        steps: [
          "Self-custody removes the risks of centralized bank freezes.",
          "You must diligently protect your offline backup steel plate from physical access or fires.",
          "Never share your 24-word seed recovery phrase with anyone, under any circumstances."
        ],
        safetyNotes: [
          "If a support person asks for your seed phrase to 'troubleshoot your account,' they are 100% a scammer trying to steal your funds."
        ],
        quizQuestion: "What is the primary trade-off of self-custody Web3 setups?",
        quizOptions: [
          "You must pay monthly subscription fees directly to the blockchain nodes.",
          "You have absolute ownership and control, but you bear 100% of the responsibility for security; if you lose your keys, there is no admin to help.",
          "You can only access your funds during official banking hours."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-5-defi-intro",
    title: "Sector 5: Introduction to Decentralized Finance (DeFi)",
    description: "Understand how smart contract programmability replaces slow traditional banking institutions with instant code-based escrow.",
    levelBadge: "DEFI BASICS",
    sections: [
      {
        id: "sec-5-1-what-is-defi",
        title: "Section 5.1: Defining DeFi and the TradFi Limitations",
        subtitle: "When sovereign digital ownership meets global financial programmable contracts.",
        excerpt: "Why traditional banks are slow, expensive, and restrictive, and how DeFi offers an open alternative.",
        content: `Decentralized Finance (DeFi) is a system of financial services built entirely on public blockchain networks. It allows people to transact, save, lend, borrow, and trade without relying on centralized intermediaries like commercial banking corporations.

### Why Traditional Finance (TradFi) Fails Millions
*   **Restrictive Requirements:** Traditional financial systems exclude millions of unbanked citizens because they lack credit history, geographic identity papers, or high initial deposit minimums.
*   **Intermediary Arbitrary Control:** Banks act as administrative middlemen, giving them full power to monitor, delay, block, or freeze account access at their convenience.
*   **High Fees and Friction:** International transfers are slow, expensive, and require intermediate clearing networks, taking days to settle while charging substantial commissions.

DeFi offers an alternative, providing open, transparent, and permissionless financial access.`,
        readTime: "4 min read",
        steps: [
          "DeFi combines blockchain ownership with programmable financial services.",
          "It eliminates banking middlemen, allowing direct peer-to-peer economic interaction.",
          "Anyone with internet access can trade, borrow, or earn yield instantly."
        ],
        safetyNotes: [
          "Always verify that you are interacting with officially audited open-source smart contract frontends. Keep your bookmark list verified."
        ],
        quizQuestion: "Why is traditional finance (TradFi) highly restrictive for millions globally?",
        quizOptions: [
          "International transfers are too fast and easy to track.",
          "Banks act as administrative gatekeepers, requiring strict paperwork, freezing accounts, and charging high transaction fees.",
          "There is no cash available in bank safes anymore."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-5-2-smart-contracts",
        title: "Section 5.2: How DeFi Works (Smart Contracts & Escrow logic)",
        subtitle: "How automated onchain computer programs replace banking desk staff.",
        excerpt: "An explicit analysis of smart contracts executing agreements instantly when ledger conditions are satisfied.",
        content: `DeFi functions securely because of three unified systems: Blockchain, Private Wallets, and **Smart Contracts**.

### Smart Contracts: The Digital Bankers
A smart contract is an open-source, automated program hosted directly on the blockchain ledger. It automatically executes agreements once specific, predefined conditions are satisfied.

### Comparative Example: The Loan
- **Traditional Bank:** You submit documents to bank managers, complete credit checks, wait weeks for manual analysis, and rely on arbitrary human approvals.
- **Smart Contract System:** The code automatically approves and releases the loan instantly if you supply the required collateral on-chain.

No human administrative approvals, no credit bias, and no bank office processing is required.`,
        readTime: "4 min read",
        steps: [
          "Smart contracts are tamper-proof scripts deployed directly to public block networks.",
          "They replace human administrators with immutable, predictable binary code execution.",
          "Once deployed, the code runs exactly as programmed without the possibility of external interference."
        ],
        safetyNotes: [
          "Smart contracts are code. If there is a bug or security flaw in the smart contract code, attackers can drain the pooled funds. Only use highly-reputed, audited protocols."
        ],
        quizQuestion: "What is a Smart Contract?",
        quizOptions: [
          "A written document signed by corporate lawyers in an office.",
          "A physical hardware token key that you insert into your computer.",
          "An open-source, automated program on the blockchain that automatically executes agreements when predefined conditions are met."
        ],
        quizAnswerIndex: 2
      }
    ]
  },
  {
    id: "sector-6-defi-ecosystem",
    title: "Sector 6: DeFi Ecosystems, Risks and Careers",
    description: "Explore the core components of DeFi activities—DEX, lending, staking—and prepare for cybersecurity threats and careers.",
    levelBadge: "DEFI ECOSYSTEMS & CAREERS",
    sections: [
      {
        id: "sec-6-1-defi-activities-ex",
        title: "Section 6.1: Core DeFi Activities & Real-World Platforms",
        subtitle: "An active tour of AMM pools, peer lending indices, and yield staking rewards.",
        excerpt: "Learn how platforms like Ethereum, Uniswap, and AAVE provide decentralized banking services globally.",
        content: `The DeFi ecosystem features multiple specialized categories of financial activity:

### 1. Peer-to-Peer Sending & Receiving
Send and receive stable currencies directly between private wallets globally in seconds, bypassing banking hours and intermediate clearing networks.

### 2. Decentralized Trading (DEX)
Platforms like **Uniswap** and PancakeSwap allow you to swap digital assets directly from your private wallet utilizing peer-funded liquidity pools (Automated Market Makers), completely eliminating central intermediaries.

### 3. Decentralized Lending & Borrowing
Platforms like **AAVE** enable users to deposit funds to earn yield, or secure instant liquidity loans by locking digital collateral in open, smart-contract vaults.

### 4. Staking / Yield Generation
Support public blockchain security networks by locking native assets to earn diagnostic algorithm-generated payout rewards.`,
        readTime: "4 min read",
        steps: [
          "Ethereum acts as the foundational programmable blockchain network.",
          "Uniswap functions as an open trading marketplace with no centralized controller.",
          "Aave operates as a decentralized liquidity pool for direct borrowing and lending."
        ],
        safetyNotes: [
          "When swapping or lending, pay attention to 'gas fees' and transaction slippage parameters inside the terminal window."
        ],
        quizQuestion: "Which platform acts as an open protocol for borrowing and lending crypto assets directly?",
        quizOptions: [
          "Coinbase CEX",
          "AAVE protocol",
          "Bitcoin core nodes"
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-6-2-risks-due-diligence",
        title: "Section 6.2: DeFi Risks & The Imperative of Due Diligence",
        subtitle: "How to safely avoid scams, exploits, and contract vulnerabilities.",
        excerpt: "Sovereign control demands robust security hygiene. Study security checks to avoid loss.",
        content: `DeFi is not just about earning yield or trading. It is an open financial landscape, which means it carries serious risks that demand strict, disciplined security hygiene from users.

### The Major Threats
1.  **Phishing Scams:** Fraudulent websites matching verified branding to trick you into connecting your wallet and signing full permission approvals.
2.  **Smart Contract Bugs:** Flaws inside smart contract code that exploiters can manipulate to drain assets from liquidity pools.
3.  **Market Volatility:** Prices of speculative assets can crash rapidly, triggering liquidation events for leveraged loans.

### Kizito Uzor's Core Message
"In DeFi, you have ultimate control over your assets—but with that control comes 100% of the responsibility. You must thoroughly do your due diligence, verify contract addresses, and understand risks before interacting with any system."`,
        readTime: "4 min read",
        steps: [
          "Security audits from firms like CertiK reduce the likelihood of contract bug exploits.",
          "Never trade with money you cannot afford to lose completely.",
          "Reject high-yield investment proposals from social media 'advisors' or bots."
        ],
        safetyNotes: [
          "Treat every new DeFi pool with extreme skepticism. Analyze the locking parameters and key administrator permissions carefully."
        ],
        quizQuestion: "Why is due diligence highly critical in Decentralized Finance?",
        quizOptions: [
          "Because blockchain transactions are instantly reversible by administrators.",
          "Because DeFi belongs to central governments.",
          "Because with absolute control comes 100% personal responsibility; transactions are irreversible, and smart contract bugs or scams can result in permanent asset loss."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-6-3-future-careers",
        title: "Section 6.3: The Web3 Future and Global Career Opportunities",
        subtitle: "Emerging domains in digital asset design, smart contract auditing, and compliance.",
        excerpt: "How decentralized systems redefine career opportunities in technology and finance worldwide.",
        content: `Web3 is not merely about cryptocurrency speculation. It is about building a more open, user-owned internet where individuals maintain absolute ownership of their data, assets, and identities.

### Dynamic Career Frontiers
As global adoption scales, multiple high-value career paths are opening in the digital asset economy:

*   **Smart Contract Engineering:** Writing secure, robust Solidity or Rust code to deploy decentralized protocol systems.
*   **Cryptosecurity Auditing:** Conducting technical line-by-line analyses of smart contracts to detect vulnerability vectors before deployment.
*   **Decentralized Marketing & Community Operations:** Organizing digital ecosystems and empowering user-owned communities on Web3 rails.
*   **Regulatory & AML Compliance:** Bridging decentralized services with traditional legislative frameworks.

Mastering Web3 fundamentals is the most valuable step you can take today to build a career in online innovation.`,
        readTime: "4 min read",
        steps: [
          "Web3 is rebuilding global internet databases around user ownership.",
          "Sovereign builders can find scalable global career opportunities completely independent of local economies.",
          "The skills learned in this curriculum form the baseline foundations for advanced blockchain certification programs."
        ],
        safetyNotes: [
          "Always verify employers' identities carefully. Job seekers are frequently targeted by fake Web3 recruitment firms deploying clipboard-hijacking trojans."
        ],
        quizQuestion: "Which career path specializes in auditing smart contract code to prevent exploiters from draining funds?",
        quizOptions: [
          "Social media manager",
          "Cryptosecurity Auditor",
          "Venture Capital analyst"
        ],
        quizAnswerIndex: 1
      }
    ]
  }
];

export const COURSE_SECTORS_ES: CourseSector[] = [
  {
    id: "sector-1-intro-web3-es",
    title: "Sector 1: Comprendiendo Web3 y lA Evolución de Internet",
    description: "Desmonte la historia de Web1 y Web2. Analice los silos corporativos de datos atrapados y transicione a redes Web3 centradas en la propiedad.",
    levelBadge: "COMPRENDIENDO WEB3",
    sections: [
      {
        id: "sec-1-1-web1-es",
        title: "Sección 1.1: Web1 - El Internet de Solo Lectura",
        subtitle: "Las redes informáticas estáticas más primitivas construidas para el consumo.",
        excerpt: "Web1 era un medio pasivo de solo información. El contenido estaba restringido a servidores corporativos; los usuarios eran puros consumidores.",
        content: `En la primera etapa de la red digital, conocida como Web1, la creación de contenido estaba restringida a un selecto grupo de propietarios de sitios web. Las páginas web eran estrictamente estáticas, funcionando como un periódico o cartelera digital.

### Limitaciones Interactivas
- **Medio de Solo Lectura:** Los usuarios solo consumían información con nulas capacidades de interacción.
- **Sin Aportaciones del Usuario:** Las oportunidades para escribir comentarios, subir archivos o construir comunidades eran prácticamente inexistentes.
- **Servidores Cerrados:** Visitar un sitio significaba leer lo que el administrador decidía publicar, sin registro de cuentas ni interacción.`,
        readTime: "3 min de lectura",
        steps: [
          "Web1 duró desde la década de 1990 hasta aproximadamente el año 2004.",
          "Utilizaba elementos HTML simples, imágenes estáticas y directorios sin bases de datos dinámicas.",
          "Los visitantes de la página funcionaban estrictamente como consumidores pasivos."
        ],
        safetyNotes: [
          "Los sitios de Web1 no incluían monederos digitales ni contratos inteligentes interactivos. Eran puramente informativos."
        ],
        quizQuestion: "¿Cuál es la característica principal de Web1?",
        quizOptions: [
          "Los usuarios podían emitir y transferir activos.",
          "Era un internet de solo lectura con páginas estáticas.",
          "Introdujo las transferencias bancarias de capa 2."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-1-2-web2-es",
        title: "Sección 1.2: Web2 - El Internet de Lectura y Escritura",
        subtitle: "El auge de las redes sociales, comunidades de creadores y bases de datos centralizadas.",
        excerpt: "Web2 permitió la creación interactiva pero concentró el poder en monopolios que convirtieron al usuario en el producto.",
        content: `Web2 transformó el internet al habilitar la comunicación bidireccional. Los usuarios pasaron de consumidores a creadores de contenido, subiendo flujos masivos de datos a servidores empresariales.

### Características Clave
*   **Interacción Digital:** Publicar, escribir posts, dar me gusta, comentar y hacer transmisiones en tiempo real.
*   **Comunidades Gigantes:** Redes sociales como Facebook, YouTube, Instagram y Twitter concentraron la atención global.
*   **Bases de Datos Dinámicas:** El software del servidor utiliza sus datos para personalizar anuncios y comportamientos.

Sin embargo, Web2 trajo un problema central: los usuarios crean el valor, pero las corporaciones controlan y explotan de manera absoluta la infraestructura y sus datos personales.`,
        readTime: "4 min de lectura",
        steps: [
          "Web2 permite leer y escribir información libremente (Read-Write).",
          "Intermediarios de datos monopolísticos crearon dependencias centralizadas de plataformas.",
          "Las empresas actúan como porteros administrativos con potestad para restringir cuentas de forma arbitraria."
        ],
        safetyNotes: [
          "En Web2, si los administradores suspenden su perfil, toda su presencia digital, negocio e historial de red desaparecen en un segundo."
        ],
        quizQuestion: "¿Cuál es el principal problema de soberanía de Web2?",
        quizOptions: [
          "No existen servidores rápidos para procesar bases de datos.",
          "No permite ver vídeos con fluidez.",
          "Las corporaciones centralizadas son propietarias de las plataformas, datos e infraestructura, convirtiendo al usuario en el producto."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-1-3-web3-ownership-es",
        title: "Sección 1.3: Web3 - El Internet de Leer, Escribir y Poseer (Ownership)",
        subtitle: "Cambiando el paradigma de poder corporativo de vuelta a la soberanía individual.",
        excerpt: "Web3 reemplaza las bases de datos controladas por empresas con registros contables transparentes del libro público.",
        content: `Web3 introduce una visión radicalmente nueva para el internet global. Fundamentado en la **auténtica propiedad digital**, Web3 retira las decisiones de las juntas directivas de los monopolios tecnológicos y se las devuelve al usuario.

### El Verdadero Significado de la Propiedad
En Web2, usted tiene una cuenta que la empresa le presta bajo contrato. En Web3, su identidad computacional, tokens e historial de saldos residen en un registro distribuido llamado blockchain.

- **Ausencia de Intermediarios:** No hay una corporación central que controle los interruptores de red para bloquear su acceso.
- **Resistencia a la Censura:** Las transferencias y contratos en cadena no pueden revertirse mediante decretos administrativos.
- **Activos Soberanos:** Sus saldos están vinculados a coordenadas criptográficas que solo se desbloquean con su firma privada.`,
        readTime: "4 min de lectura",
        steps: [
          "Web3 es el ecosistema de Leer, Escribir y Poseer (Read-Write-Own).",
          "La propiedad no depende de normas corporativas, sino de matemáticas sólidas y claves privadas.",
          "Esto permite comerciar de manera segura y libre en un mercado computacional verdaderamente global."
        ],
        safetyNotes: [
          "La autocustodia implica una responsabilidad absoluta. Si pierde sus claves, no existe ningún servicio de atención al cliente para recuperarlas."
        ],
        quizQuestion: "¿Qué implica la propiedad digital en el entorno de Web3?",
        quizOptions: [
          "Una licencia de miembro premium de por vida otorgada por una empresa.",
          "El control directo y absoluto sobre sus claves y activos digitales sin intermediarios centralizados.",
          "Tener el derecho a imprimir páginas de internet."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-2-principles-es",
    title: "Sector 2: Los Cuatro Pilares Fundacionales de Web3",
    description: "Domine los cuatro pilares criptográficos—Descentralización, Trustlessness, Immutability y Permissionlessness—que configuran su seguridad.",
    levelBadge: "PILARE CORE",
    sections: [
      {
        id: "sec-2-1-decentralization-es",
        title: "Sección 2.1: Descentralización y Fallos de un Solo Punto",
        subtitle: "Dividiendo la toma de decisiones para impedir el colapso del sistema.",
        excerpt: "Cómo las redes descentralizadas eliminan autoridades centrales y protegen las bases de datos contra apagones.",
        content: `La descentralización es la distribución del control político y técnico de un sistema. En lugar de procesar los datos de red en los servidores unificados de una empresa, Web3 transmite cada registro a un mapa global de miles de ordenadores pares.

### Razones de su Importancia
1. **Reduce el Poder de Monopolio:** Ninguna corporación, político o junta de accionistas puede decidir cambiar las reglas de manera unilateral para su conveniencia.
2. **Elimina Puntos Únicos de Falla:** Debido a que el historial existe de manera simultánea en miles de servidores a nivel mundial, la caída de nodos individuales no paraliza la red.
3. **Empoderamiento del Individuo:** Incentiva a los propios participantes del ecosistema a mantener y validar la red de forma colectiva.`,
        readTime: "4 min de lectura",
        steps: [
          "Los sistemas tradicionales centralizados exponen a los usuarios a errores administrativos graves.",
          "La descentralización distribuye la validación de transacciones en ordenadores distribuidos geográficamente.",
          "La estabilidad y operatividad de la red se sostiene colectivamente."
        ],
        safetyNotes: [
          "Compruebe siempre el grado de descentralización de un protocolo. Si una sola clave privada central puede cambiar todo, el sistema sigue siendo centralizado."
        ],
        quizQuestion: "¿Cómo protege la descentralización a las redes de caídas de servidores?",
        quizOptions: [
          "Mantiene la base de datos archivada en papel de seguridad.",
          "Elimina los puntos de fallo únicos distribuyendo copias idénticas del registro a miles de computadoras por todo el mundo.",
          "Utiliza una única central telefónica segura."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-2-2-trust-immute-perm-es",
        title: "Sección 2.2: Trustlessness, Inmutabilidad y Permissionlessness",
        subtitle: "Comprendiendo las tres promesas matemáticas de la infraestructura de Web3.",
        excerpt: "Cómo el código público permite a extraños comerciar valor sin un banco que los vigile.",
        content: `Web3 emplea tres principios de diseño fundamentales para asegurar que actores de cualquier parte del planeta puedan interactuar de manera segura sin conocerse:

### 1. Trustlessness (Falta de Necesidad de Confianza)
No significa que el ecosistema carezca de confianza o sea hostil. Significa que **usted no necesita confiar en la sinceridad de un banquero o intermediario**. Los balances se ejecutan de manera neutra mediante código de programación verificable (Contratos Inteligentes).

### 2. Inmutabilidad
Una vez que una transacción ha sido validada y guardada en un bloque de la blockchain, **no existe poder tecnológico capaz de modificar o borrar ese dato**. Esto proporciona un historial permanente y de máxima fidelidad.

### 3. Permissionlessness (Sin Necesidad de Permisos)
Cualquier persona con acceso a una señal de internet puede unirse a estas redes económicas. No hay registros selectivos de empresas, ni rechazos geográficos, ni porteros administrativos que le impidan realizar transferencias.`,
        readTime: "4 min de lectura",
        steps: [
          "Trustlessness reemplaza las promesas humanas por firmas matemáticas públicas.",
          "La inmutabilidad elimina la manipulación de balances contables por fraudes corporativos.",
          "Permissionlessness garantiza el acceso financiero equitativo para todas las personas."
        ],
        safetyNotes: [
          "Dado que el registro es inmutable, los envíos a coordenadas erróneas nunca podrán deshacerse. Verifique minuciosamente los 42 caracteres de destino."
        ],
        quizQuestion: "¿Qué implica la Inmutabilidad de los registros en la blockchain?",
        quizOptions: [
          "Que los datos pueden ser editados solo por el creador del token.",
          "Que una vez que un bloque de transacciones es memorizado por la red, es matemáticamente indestructible y no se puede borrar o modificar.",
          "Que las direcciones de su monedero se actualizan cada semana."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-3-blockchain-infra-es",
    title: "Sector 3: Blockchain - La Infraestructura de Web3",
    description: "Analice cómo la contabilidad distribuida, la secuencia de bloques, la criptografía asimétrica y el consenso sostienen la Web3.",
    levelBadge: "INFRAESTRUCTURA BLOCKCHAIN",
    sections: [
      {
        id: "sec-3-1-dlt-blocks-es",
        title: "Sección 3.1: Libros de Contabilidad Distribuidos e Hilos de Bloques",
        subtitle: "Cómo las estructuras de datos secuenciales acumulan balances inalterables.",
        excerpt: "Análisis técnico de copias múltiples de registros, codificación en bloques secure, firma hash y cronología.",
        content: `Un blockchain es un registro contable compartido que memoriza transacciones. Se basa en la Tecnología de Contabilidad Distribuida (DLT), que asegura que todos los participantes observen exactamente la misma versión de la verdad.

### Estructura de Funcionamiento
1.  **Tecnología DLT:** Ninguna empresa gestiona la contabilidad de forma solitaria. En su lugar, miles de servidores redundantes graban y sincronizan los mismos datos al instante.
2.  **Bloques de Datos:** El tráfico contable se agrupa en lotes cerrados llamados "Bloques". Cada bloque nuevo encadena una función hash que vincula al bloque inmediatamente anterior, forjando un hilo histórico inviolable.

Esto dota al sistema de un orden cronológico absoluto y transparente de auditorías para cualquier visor.`,
        readTime: "3 min de lectura",
        steps: [
          "DLT garantiza la coincidencia exacta de bases de datos globales sin jerarquías corporativas.",
          "Los bloques se conectan cronológicamente mediante hashes de seguridad.",
          "Alterar una transacción antigua destruiría el hash de enlace, alertando a la red sobre el fraude."
        ],
        safetyNotes: [
          "Al ser una red pública, cualquier persona puede visualizar el trayecto de balances en su dirección. Guarde su privacidad personal fuera de línea."
        ],
        quizQuestion: "¿Qué función cumple el encadenamiento de bloques secuenciales en una blockchain?",
        quizOptions: [
          "Permite enviar correos electrónicos rápidos a soporte.",
          "Asegura el orden cronológico inviolable de las transacciones, haciendo que modificar datos históricos rompa la secuencia cifrada de hashes.",
          "Facilita la impresión de estados financieros cada mes."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-3-2-consensus-crypto-es",
        title: "Sección 3.2: Protocolos de Consenso y Firmas Criptográficas",
        subtitle: "Cómo los ordenadores acuerdan el historial de datos y legitiman la propiedad.",
        excerpt: "Evalue Proof of Work, Proof of Stake y las claves de criptografía asimétrica.",
        content: `Ya que no existe un director general central en una blockchain descentralizada, los ordenadores de la red se sincronizan mediante mecanismos automatizados de consenso.

### Protocolos de Consenso Principales
- **Proof of Work (PoW - Prueba de Trabajo):** Los ordenadores compiten en potencia eléctrica para resolver desafíos contables difíciles, dotando a la red de indestructibilidad (ej. Bitcoin).
- **Proof of Stake (PoS - Prueba de Participación):** Los validadores inmovilizan tokens propios de valor como garantía para auditar transacciones con gran velocidad y escaso coste energético (ej. Ethereum).

### Firma y Verificación de Claves
La autenticidad de la propiedad recae sobre la criptografía asimétrica. Al firmar con su clave privada, usted demuestra a los nodos matemáticamente que es el dueño exclusivo sin revelar la clave, autorizando el movimiento.`,
        readTime: "4 min de lectura",
        steps: [
          "El consenso automatizado defiende el libro de doble gasto sin una junta bancaria.",
          "La dirección pública funciona como su identificador, la clave privada como su bolígrafo de firma inviolable.",
          "El consenso valida operaciones según protocolos matemáticos abiertos."
        ],
        safetyNotes: [
          "Si expone o extravía su clave privada, cualquier persona del mundo podrá firmar salidas y vaciar todo su dinero en segundos."
        ],
        quizQuestion: "¿Qué resuelven los mecanismos de consenso en sistemas distribuidos?",
        quizOptions: [
          "Deciden de manera automática qué banco es dueño del servidor.",
          "Logran que miles de computadoras almacenen exactamente los mismos balances fiables sin depender de un administrador único central.",
          "Definen los márgenes de impuestos de aduana de la red."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-4-wallets-es",
    title: "Sector 4: Monederos y Autocustodia Digital",
    description: "Comprenda la definición técnica de los wallets de Web3 y descubra por qué resguardar su frase de recuperación física es su mejor protección.",
    levelBadge: "MONEDEROS Y AUTOCUSTODIA",
    sections: [
      {
        id: "sec-4-1-wallet-types-es",
        title: "Sección 4.1: ¿Qué es realmente un Monedero? (Su Puerta a Web3)",
        subtitle: "Diferenciando interfaces en línea y hardware frío de grado militar.",
        excerpt: "Los tokens no están guardados físicamente adentro de su app. Conozca el verdadero rol de las claves criptográficas.",
        content: `Un error clásico es pensar que las criptomonedas se archivan dentro de su app móvil o extensión web. No es así.
**Cualquier token reside únicamente como balance oficial escrito en la blockchain.**

El monedero no es más que una caja fuerte digital que administra sus secretas **Claves Privadas** y genera sus direcciones públicas.

### Modos de Almacenamiento
*   **Cuenta de Exchange (Custodial):** Una empresa administra sus claves por usted. Expuesto a quiebras técnicas (como FTX) y bloqueos de perfil.
*   **Monedero Caliente (Hot Wallet):** Software de móvil o navegador (Metamask, Trust). Son muy útiles para transaccionar diario pero vulnerables a virus locales y spyware de pantalla.
*   **Monedero Frío de Hardware (Cold Wallet):** Un dispositivo electrónico (Ledger, Trezor) que aísla sus claves enteramente fuera de internet, impidiendo cualquier hackeo digital remoto.`,
        readTime: "4 min de lectura",
        steps: [
          "Su monedero custodia las llaves de acceso contable, nunca almacena tokens físicos.",
          "Las hot wallets facilitan interactuar pero exponen memoria local del teléfono a malware.",
          "Los dispositivos de hardware frío realizan operaciones internas sin compartir claves con el ordenador."
        ],
        safetyNotes: [
          "Jamás saque fotos de su frase semilla de 24 palabras. Muchos troyanos móviles escanean galerías de imágenes de manera automatizada."
        ],
        quizQuestion: "¿Dónde se conservan realmente sus activos criptográficos?",
        quizOptions: [
          "Graba en la memoria principal de su smartphone o disco duro.",
          "Solo en los bases de datos corporativos de Google o Apple.",
          "Única y exclusivamente registrados de forma digital en el libro distribuido público de la blockchain."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-4-2-self-custody-es",
        title: "Sección 4.2: Autocustodia y Responsabilidades de Autocontrol",
        subtitle: "Aprenda a obrar de manera segura como su propio banco autónomo.",
        excerpt: "El colosal poder de administrar recursos sin intermediarios, emparejado con rígidas normas de custodia.",
        content: `La autocustodia le entrega soberanía económica indiscutible. Al retener el control directo sobre sus claves privadas, usted asume la gestión financiera personal de manera directa.

### Ventajas Soberanas
- **Sin Esperas ni Censura:** Ningún director de banco puede rechazar, cancelar, o congelar sus envíos.
- **Transmisión Inmediata Global:** Movimientos instantáneos sin fronteras las 24 horas.
- **Soberanía Financiera Extrema:** Libre de controles arbitrarios de cuentas fiduciarias.

### El Reto de la Responsabilidad Total
No olvide el reverso de la soberanía: en la blockchain **no hay un bot de soporte post-venta, ni servicio técnico para recuperar claves, ni opción de revertir transferencias**. Si es estafado o filtra su semilla, perderá de manera permanente el control sobre sus fondos.`,
        readTime: "4 min de lectura",
        steps: [
          "La autocustodia le libera plenamente de corralitos bancarios y censuras.",
          "Debe archivar sus copias físicas de respaldo en placas metálicas resistentes a incendios.",
          "Absolutamente nadie de soporte oficial le pedirá jamás sus 24 palabras de semilla."
        ],
        safetyNotes: [
          "Cualquier mensaje, correo o formulario web que le solicite su frase semilla para verificar su monedero es una estafa al 100%."
        ],
        quizQuestion: "¿Cuál es la consecuencia clave de asumir la autocustodia en Web3?",
        quizOptions: [
          "Debe abonar costes fijos trimestrales de administración a las blockchains.",
          "Otorga control y propiedad absoluta sobre sus fondos, pero asume el 100% de la responsabilidad de seguridad sin posibilidad de soporte si pierde sus claves.",
          "El saldo solo se mueve durante el horario oficial internacional de comercio."
        ],
        quizAnswerIndex: 1
      }
    ]
  },
  {
    id: "sector-5-defi-intro-es",
    title: "Sector 5: Introducción a las Finanzas Descentralizadas (DeFi)",
    description: "Conozca cómo los contratos inteligentes eliminan los lentos escritorios bancarios tradicionales con ejecuciones automatizadas de fideicomiso.",
    levelBadge: "FUNDAMENTOS DEFI",
    sections: [
      {
        id: "sec-5-1-what-is-defi-es",
        title: "Sección 5.1: Definición de DeFi y Fallos del Sistema Financiero Tradicional",
        subtitle: "Cuando la soberanía sobre sus fondos se asocia con contratos programáticos globales.",
        excerpt: "Por qué los bancos tradicionales resultan costosos, burocráticos y selectivos, y cómo DeFi abre accesos amplios.",
        content: `Las Finanzas Descentralizadas (DeFi) representan el conjunto de servicios financieros estructurados directamente sobre registros blockchain públicos. Facilita comerciar, ahorrar, pedir créditos e invertir sin requerir un banco corporativo central.

### Limitaciones del Sistema Financiero Tradicional (TradFi)
*   **Exclusión de Millones:** Millones de personas en todo el planeta quedan fuera del circuito financiero formal por carecer de identificaciones complejas, oficinas físicas próximas o historiales bancarios fijos.
*   **Supervisión y Control Arbitrario:** Los directores y administradores centralizados pueden suspender, rechazar o interrogar transacciones si lo consideran de interés financiero corporativo.
*   **Coste y Demoras Inmensas:** Mover capitales fuera de fronteras involucra liquidaciones que demoran días útiles y cargan comisiones bancarias altísimas.

DeFi abre la puerta a un sistema verdaderamente inclusivo, neutral y de bajo coste.`,
        readTime: "4 min de lectura",
        steps: [
          "DeFi fusiona propiedad criptográfica autónoma con contabilidad programable.",
          "Elimina a los intermediarios institucionales bancarios, habilitando la finanza directa entre pares.",
          "Otorga opciones inmediatas de préstamo y comercio global sin distinciones nacionales."
        ],
        safetyNotes: [
          "Verifique constantemente las aplicaciones descentralizadas que utiliza. Mantenga siempre bajo favoritos sus accesos Web3 principales."
        ],
        quizQuestion: "¿Qué obstáculo financiero principal resuelve DeFi frente a TradFi?",
        quizOptions: [
          "Evita que el dinero se use en transacciones digitales rápidas.",
          "Resuelve las demoras, congelaciones de cuentas, altas comisiones y exclusiones geográficas impuestas por los bancos centralizados.",
          "Asegura que el papel moneda billete no se altere."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-5-2-smart-contracts-es",
        title: "Sección 5.2: Cómo funciona DeFi (Contratos Inteligentes y Fideicomiso Lógico)",
        subtitle: "Cómo el software automático e inmutable sustituye a los gestores humanos en las sucursales.",
        excerpt: "Examen de los contratos inteligentes automatizados que liquidan acuerdos instantáneamente al cumplirse condiciones.",
        content: `Las DeFi funcionan con blindaje de seguridad debido a tres pilares fusionados: Blockchain, Criptomonederos y **Contratos Inteligentes (Smart Contracts)**.

### Los Smart Contracts como Gestores Automáticos
Un smart contract es un programa autónomo de código abierto grabado directamente en la blockchain, diseñado para ejecutar compromisos y acuerdos de manera inalterable y automática una vez que se cumplen las pautas predefinidas del algoritmo.

### Caso de Estudio: Préstamos
- **Camino Tradicional:** Usted asiste, entrega carpetas de documentos, completa estudios crediticios, espera semanas en revisión y depende del visto bueno de gerentes locales.
- **Camino DeFi:** El contrato inteligente libera e ingresa las monedas del crédito al instante de manera transparente una vez aportada la fianza (colateral) requerida, sin intermediarios.`,
        readTime: "4 min de lectura",
        steps: [
          "Los contratos inteligentes no son modificables tras su implementación en la blockchain.",
          "Intercambian promesas humanas subjetivas por ejecuciones de código lógicas y predecibles.",
          "Su código opera exactamente según fue programado sin alteraciones administrativas."
        ],
        safetyNotes: [
          "Los smart contracts están hechos por programadores. Si el código arrastra virus o fallos lógicos, los atacantes podrían drenar las reservas de los pools de inversión. Solo use plataformas sólidas y auditadas."
        ],
        quizQuestion: "¿Qué es en esencia un Contrato Inteligente (Smart Contract)?",
        quizOptions: [
          "Un acuerdo contractual en papel que requiere firmas de notarios.",
          "Un identificador físico de metal que se conecta al ordenador.",
          "Un programa automático de código abierto alojado en blockchain que ejecuta de forma matemática y directa transacciones y acuerdos en cuanto se cumplen las coordenadas fijadas."
        ],
        quizAnswerIndex: 2
      }
    ]
  },
  {
    id: "sector-6-defi-ecosystem-es",
    title: "Sector 6: Ecosistemas DeFi, Gestión de Peligros y Empleos",
    description: "Explore los componentes comerciales de DeFi (DEX, préstamos, staking) y prepárese para retos de ciberseguridad y roles de carrera.",
    levelBadge: "ECOSISTEMAS Y FUTURO DEFI",
    sections: [
      {
        id: "sec-6-1-defi-activities-ex-es",
        title: "Sección 6.1: Actividades Principales de DeFi y Plataformas Lideres",
        subtitle: "Mapeo práctico de los exchanges descentralizados, créditos en cadena y staking.",
        excerpt: "Estudie cómo proyectos como Ethereum, Uniswap y AAVE construyen herrajes financieros alternativos.",
        content: `El abanico operativo de DeFi abarca múltiples mercados especializados en la red:

### 1. Pagos Directos entre Pares (P2P)
Transfiere fondos estables entre monederos de distintas geografías en segundos, sin parones de días festivos ni filtros cambiantes de bancos.

### 2. Casas de Cambio Descentralizadas (DEX)
Protocolos como **Uniswap** y PancakeSwap le facilitan comprar y vender tokens de manera cruzada directo desde su wallet, operando contra reservas de liquidez colectivas (Automated Market Makers) sin depender de directores centrales.

### 3. Créditos DeFi de Liquidez
Plataformas como **AAVE** permiten colocar dinero para cosechar intereses seguros, u obtener créditos inmediatos aportando colateral onchain a través de depósitos en el código.

### 4. Resguardo de Red (Staking)
Inmoviliza monedas estables o tokens nativos para robustecer la resistencia del algoritmo de consenso de la blockchain, recibiendo recompensas en cadena a cambio.`,
        readTime: "4 min de lectura",
        steps: [
          "Ethereum funciona como la supercomputadora global programable del ecosistema.",
          "Uniswap destaca como un bazar de comercio descentralizado directo libre de intermediarios.",
          "Aave opera pools de reservas de liquidez para préstamos autónomos peer-to-peer."
        ],
        safetyNotes: [
          "Al ejecutar intercambios o préstamos, vigile con extrema atención las 'comisiones de gas' de red y los márgenes de deslizamiento de precios."
        ],
        quizQuestion: "¿Cuál es la principal diferencia funcional de una DEX frente a una casa de cambio tradicional?",
        quizOptions: [
          "Las DEX cierran durante los fines de semana de fin de mes.",
          "Las DEX le permiten intercambiar tokens de manera automática directamente desde su monedero a través de pools de liquidez y sin custodios centralizados.",
          "Las DEX exigen depósitos físicos de billetes en ventanillas bancarias."
        ],
        quizAnswerIndex: 1
      },
      {
        id: "sec-6-2-risks-due-diligence-es",
        title: "Sección 6.2: Peligros en DeFi y el Deber de la Diligencia Debida",
        subtitle: "Cómo defenderse activamente de estafas de phishing y errores de código.",
        excerpt: "La autonomía soberana exige altos estándares de autocontrol. Conozca las amenazas antes de operar.",
        content: `Manejar DeFi no se reduce a operar swaps e ingresos de capital. Representa un ecosistema abierto libre de arbitraje gubernamental, lo que expone a los inversores a amenazas que exigen la máxima madurez y autoprotección técnica.

### Las Amenazas Más Severas
1.  **Phishing Selectivo:** Páginas web de imitación que calcan el diseño visual del protocolo oficial para engañarle y hacer que otorgue autorizaciones de vaciado de fondos en su wallet.
2.  **Exploits e Inseguridad de Código:** Bugs de diseño lógico dentro de contratos inteligentes que posibilitan a ciberdelincuentes drenar el saldo de los pools.
3.  **Burbujas y Volatilidad:** Variaciones veloces de precios de activos que pueden desencadenar la confiscación inmediata (liquidación) de las garantías de préstamos.

### La Directriz Primordial de Kizito Uzor
"En DeFi, usted es el director y custodio absoluto de sus recursos, pero ese inmenso poder viene emparejado con el 100% de la responsabilidad personal. Debe investigar rigurosamente los listados, validar los contratos en pantalla y comprender plenamente los peligros técnicos antes de mover un solo activo."`,
        readTime: "4 min de lectura",
        steps: [
          "Las auditorías e informes de seguridad técnica disminuyen el riesgo de exploits en contratos inteligentes.",
          "Absolutamente nunca use balances que puedan poner en aprietos su supervivencia o economía.",
          "Ignore cualquier recomendación de inversión acelerada enviada por desconocidos en foros, Telegram o Discord."
        ],
        safetyNotes: [
          "Trate cada nuevo pool de liquidez con un profundo recelo. Analice los tiempos de bloqueo obligatorios y el control de claves multifirma de los desarrolladores."
        ],
        quizQuestion: "¿A qué se debe el imperativo de la Diligencia Debida en DeFi?",
        quizOptions: [
          "Las transacciones pueden ser revertidas si reporta el incidente a los bancos centrales.",
          "DeFi es propiedad de empresas tecnológicas con licencias gubernamentales exclusivas.",
          "Dado que no existen intermediarios para salvar fallos, las transferencias son irreversibles y las vulnerabilidades de contratos o estafas pueden causar pérdidas absolutas de las que usted es el único responsable."
        ],
        quizAnswerIndex: 2
      },
      {
        id: "sec-6-3-future-careers-es",
        title: "Sección 6.3: El Porvenir de Web3 y las Oportunidades Laborales Globales",
        subtitle: "Campos profesionales en desarrollo de claves, auditoría de software y cumplimiento legal.",
        excerpt: "Cómo el cambio paradigmático del internet descentralizado genera nuevos horizontes de carrera.",
        content: `La Web3 no es una simple ola de especulación con activos digitales. Representa la restauración de la propiedad sobre la base de datos del internet, transfiriendo de vuelta la gestión de datos, cuentas e identidades al individuo de forma técnica.

### Fronteras Profesionales de Alta Demanda
Conforme arrecia la adopción institucional, se están expandiendo múltiples especialidades profesionales en blockchain:

*   **Ingeniería de Contratos Inteligentes:** Redacción de código seguro en lenguajes robustos como Solidity o Rust para desplegar servicios de red.
*   **Auditoría de Ciberseguridad Criptográfica:** Auditoras encargadas de certificar la invulnerabilidad de códigos en contratos inteligentes antes de su despliegue público.
*   **Gestión de Comunidades en Red (DAOs):** Organizar redes horizontales cooperativas y empoderar gremios soberanos.
*   **Derecho y Cumplimiento AML:** Construir pasarelas de conexión fiables entre protocolos descentralizados y los marcos legislativos de cada país.

Familiarizarse hoy con los principios de Web3 representa una de las dotaciones formativas más valiosas para asegurar roles punteros en la economía del conocimiento internacional.`,
        readTime: "4 min de lectura",
        steps: [
          "La Web3 transforma las bases de datos globales del internet, anclándolas al control del usuario.",
          "Los especialistas e ingenieros pueden participar en proyectos globales sin barreras fronterizas.",
          "Los saberes asimilados en este libro proveen el cimiento ideal previo a certificaciones técnicas oficiales complejas."
        ],
        safetyNotes: [
          "Sea cauteloso si busca emprego en Web3. Existen ofertas de empleo fantasma redactadas para que los postulantes instalen software de prueba que resulta ser virus robadores de claves."
        ],
        quizQuestion: "¿Qué función cumple el Auditor de Ciberseguridad Criptográfica?",
        quizOptions: [
          "Registra las contraseñas de las cuentas de redes sociales tradicionales de las empresas.",
          "Inspecciona de cabo a rabo el código de contratos inteligentes para cerrar fallas lógicas de seguridad antes de que puedan ser explotadas.",
          "Escribe códigos de marketing para expandir anuncios patrocinados."
        ],
        quizAnswerIndex: 1
      }
    ]
  }
];
