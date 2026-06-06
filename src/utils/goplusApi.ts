/**
 * Real-time GoPlus Blockchain Security API Integration
 * This module queries GoPlus Security's public endpoints to assess onchain risk
 * for smart contracts, token pools, and peer addresses without requiring API keys.
 */

export interface TokenSecurityResult {
  tokenName: string;
  tokenSymbol: string;
  isOpenSource: boolean;
  isHoneypot: boolean;
  buyTax: number;
  sellTax: number;
  isAntiWhale: boolean;
  cannotBuy: boolean;
  cannotSell: boolean;
  isBlacklisted: boolean;
  ownerAddress: string;
  creatorAddress: string;
  trustList: boolean;
  canSlippageBeModified: boolean;
  riskCount: number;
  alerts: string[];
}

export interface AddressSecurityResult {
  isMalicious: boolean;
  cybercrime: boolean;
  moneyLaundering: boolean;
  phishingActivities: boolean;
  blackmailedAddress: boolean;
  stealingAttack: boolean;
  mixAddress: boolean;
  honeypotRelated: boolean;
  numberMaliciousContractsCreated: number;
  riskCount: number;
  alerts: string[];
}

/**
 * GoPlus Security Supported Chains map
 */
export const GOPLUS_CHAINS = [
  { id: "1", name: "Ethereum Mainnet", short: "ETH" },
  { id: "56", name: "BNB Smart Chain", short: "BSC" },
  { id: "137", name: "Polygon PoS", short: "MATIC" },
  { id: "42161", name: "Arbitrum One", short: "ARB" },
  { id: "10", name: "Optimism", short: "OP" },
  { id: "8453", name: "Base Mainnet", short: "BASE" },
  { id: "43114", name: "Avalanche C-Chain", short: "AVAX" }
];

/**
 * Checks a smart contract token's security status on a given chain
 */
export async function checkTokenSecurity(
  contractAddress: string,
  chainId: string = "1"
): Promise<{ success: boolean; data?: TokenSecurityResult; error?: string }> {
  try {
    const cleanAddress = contractAddress.trim().toLowerCase();
    
    // Core URL structure for GoPlus Security v1 API
    const url = `https://api.gopluslabs.io/api/v1/token_security/${chainId}?contract_addresses=${cleanAddress}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`GoPlus HTTP request failed with status: ${response.status}`);
    }

    const json = await response.json();
    
    if (json.code !== 1 || !json.result || !json.result[cleanAddress]) {
      // Sometimes it returns code 1 but results are empty (e.g. invalid target or no details yet)
      return { 
        success: false, 
        error: "No registry matches found. Address might not be a standard ERC-20 smart contract on this network." 
      };
    }

    const raw = json.result[cleanAddress];
    const alerts: string[] = [];
    let riskCount = 0;

    // Decode rules & raise flags
    const isOpenSource = raw.is_open_source === "1";
    const isHoneypot = raw.is_honeypot === "1";
    const cannotBuy = raw.cannot_buy === "1";
    const cannotSell = raw.cannot_sell === "1";
    const isBlacklisted = raw.is_blacklisted === "1";
    const canSlippageBeModified = raw.slippage_modifiable === "1";
    const buyTax = parseFloat(raw.buy_tax || "0");
    const sellTax = parseFloat(raw.sell_tax || "0");
    const trustList = raw.trust_list === "1";
    const isAntiWhale = raw.anti_whale === "1";

    if (!isOpenSource) {
      alerts.push("Contract is not open-source. Bytecode payload remains unverified.");
      riskCount++;
    }
    if (isHoneypot) {
      alerts.push("Honeypot trap detected! Contracts prevents standard sell actions.");
      riskCount += 3;
    }
    if (cannotBuy) {
      alerts.push("Token cannot be bought by normal addresses.");
      riskCount += 2;
    }
    if (cannotSell) {
      alerts.push("Token cannot be sold by normal addresses.");
      riskCount += 2;
    }
    if (isBlacklisted) {
      alerts.push("Address blacklist capability is present. Creator can hold coins hostage.");
      riskCount++;
    }
    if (canSlippageBeModified) {
      alerts.push("Creator or Admin can modify slippage settings dynamically.");
      riskCount++;
    }
    if (buyTax > 0.1) {
      alerts.push(`High transfer Buy Tax detected (${(buyTax * 100).toFixed(1)}%).`);
      riskCount++;
    }
    if (sellTax > 0.1) {
      alerts.push(`High transfer Sell Tax detected (${(sellTax * 100).toFixed(1)}%).`);
      riskCount++;
    }

    const formatted: TokenSecurityResult = {
      tokenName: raw.token_name || "Unknown Token",
      tokenSymbol: raw.token_symbol || "???",
      isOpenSource,
      isHoneypot,
      buyTax,
      sellTax,
      isAntiWhale,
      cannotBuy,
      cannotSell,
      isBlacklisted,
      ownerAddress: raw.owner_address || "None / Burnt",
      creatorAddress: raw.creator_address || "Unknown",
      trustList,
      canSlippageBeModified,
      riskCount,
      alerts
    };

    return { success: true, data: formatted };
  } catch (err: any) {
    console.error("Token security query failure:", err);
    return {
      success: false,
      error: `Network Error: ${err?.message || "GoPlus Security system unreachable or rate-limited"}`
    };
  }
}

/**
 * Checks an address (wallet or malicious actor account) for security triggers
 */
export async function checkAddressSecurity(
  targetAddress: string,
  chainId: string = "1"
): Promise<{ success: boolean; data?: AddressSecurityResult; error?: string }> {
  try {
    const cleanAddress = targetAddress.trim().toLowerCase();
    
    const url = `https://api.gopluslabs.io/api/v1/address_security/${cleanAddress}?chain_id=${chainId}`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`GoPlus HTTP request failed with status: ${response.status}`);
    }

    const json = await response.json();
    
    if (json.code !== 1 || !json.result) {
      return { 
        success: false, 
        error: "Unrecognized blockchain address format or network response error." 
      };
    }

    const raw = json.result;
    const alerts: string[] = [];
    let riskCount = 0;

    const cybercrime = raw.cybercrime === "1";
    const moneyLaundering = raw.money_laundering === "1";
    const phishingActivities = raw.phishing_activities === "1";
    const blackmailedAddress = raw.blackmailed_address === "1";
    const stealingAttack = raw.stealing_attack === "1";
    const mixAddress = raw.mix_address === "1";
    const honeypotRelated = raw.honeypot_related_address === "1";
    const numberMaliciousContractsCreated = parseInt(raw.number_of_malicious_contracts_created || "0");

    if (cybercrime) {
      alerts.push("Linked to reported blockchain cybercrimes and network threats.");
      riskCount += 2;
    }
    if (moneyLaundering) {
      alerts.push("Involved in known tumbling, mixing, or laundry operations.");
      riskCount += 2;
    }
    if (phishingActivities) {
      alerts.push("Directly associated with ice phishing, spoofing layouts, or phishing links.");
      riskCount += 3;
    }
    if (blackmailedAddress) {
      alerts.push("Flagged as a coerced or blackmailed wallet index.");
      riskCount++;
    }
    if (stealingAttack) {
      alerts.push("Identified as a drainer wallet or stealer coordinate.");
      riskCount += 3;
    }
    if (mixAddress) {
      alerts.push("Uses coin mixers or privacy tumblers (like Tornado Cash) frequently.");
      riskCount++;
    }
    if (honeypotRelated) {
      alerts.push("Associated with deployment or trading of scam honeypot tokens.");
      riskCount += 2;
    }
    if (numberMaliciousContractsCreated > 0) {
      alerts.push(`Created ${numberMaliciousContractsCreated} known malicious/phishing agreements.`);
      riskCount += Math.min(3, numberMaliciousContractsCreated);
    }

    const formatted: AddressSecurityResult = {
      isMalicious: riskCount > 0,
      cybercrime,
      moneyLaundering,
      phishingActivities,
      blackmailedAddress,
      stealingAttack,
      mixAddress,
      honeypotRelated,
      numberMaliciousContractsCreated,
      riskCount,
      alerts
    };

    return { success: true, data: formatted };
  } catch (err: any) {
    console.error("Address security query failure:", err);
    return {
      success: false,
      error: `Network Error: ${err?.message || "GoPlus Security system unreachable or rate-limited"}`
    };
  }
}
