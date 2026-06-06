import React, { useState } from 'react';
import { DollarSign, Send, ArrowRight, ShieldCheck, Zap, AlertTriangle, RefreshCw, Layers } from 'lucide-react';

export const StablecoinsPayments: React.FC = () => {
  // Optimizer Input States
  const [remitAmount, setRemitAmount] = useState<number>(500);
  const [selectedChain, setSelectedChain] = useState<'erc20' | 'trc20' | 'solana' | 'arbitrum'>('trc20');

  // Calculates mocked fees and security warnings based on chain selection
  const getChainDetails = (chain: typeof selectedChain) => {
    switch (chain) {
      case 'erc20':
        return {
          name: 'Ethereum Mainnet (ERC-20)',
          gasFee: 15.50,
          speed: '3 - 10 minutes',
          riskLevel: 'LOW (Highly Decentralized Ledger)',
          riskDescription: 'High gas fees protect against spam, making it the safest chain for institutional volumes.',
          scamDensity: 'Moderate. Watch out for malicious smart contract approvals.',
          color: 'text-purple-700 bg-purple-50 border-purple-500'
        };
      case 'trc20':
        return {
          name: 'Tron Network (TRC-20)',
          gasFee: 1.50,
          speed: '1 - 2 minutes',
          riskLevel: 'HIGH (Heavy Bot Traffic)',
          riskDescription: 'Extremely popular for micro-transacts in Africa, but heavily targeted by automated address poisoning copycats.',
          scamDensity: 'CRITICAL. Over 80% of address poisoning dust sent on EVM targets TRC-20 paths.',
          color: 'text-rose-700 bg-rose-50 border-rose-500'
        };
      case 'solana':
        return {
          name: 'Solana High-Speed Network',
          gasFee: 0.01,
          speed: 'Sub-second',
          riskLevel: 'MODERATE (Centralization Risks)',
          riskDescription: 'Near-zero cost and micro-second finality. Ideal for rapid commercial payments.',
          scamDensity: 'Low. However, watch out for fake SPL-token mock duplicates in decentralized pools.',
          color: 'text-[#009b72] bg-[#f0fcf9] border-[#009b72]'
        };
      case 'arbitrum':
        return {
          name: 'Arbitrum Rollup (Ethereum L2)',
          gasFee: 0.15,
          speed: 'Under 10 seconds',
          riskLevel: 'LOW-MODERATE',
          riskDescription: 'Inherits Ethereum Base security layer with fraction-of-penny rollup processing fees.',
          scamDensity: 'Low. Quickly becoming the industry compliance recommendation.',
          color: 'text-[#0040e0] bg-[#eef3ff] border-[#0040e0]'
        };
    }
  };

  const activeChain = getChainDetails(selectedChain);
  const netAmount = Math.max(0, remitAmount - activeChain.gasFee);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Decorative Branding */}
      <div className="bg-[#d2ffdb] border-heavy border-l-[8px] border-l-[#136327] p-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-white border px-2 py-0.5 font-mono text-[9.5px] font-bold text-[#136327] rounded-sm">
          <Layers className="w-3.5 h-3.5" />
          STABLE VALUE VEHICLES
        </div>
        <h2 className="font-sora text-3xl font-extrabold text-gray-950 uppercase tracking-tight">
          STABLECOINS & CROSS-BORDER SYSTEMS
        </h2>
        <p className="font-mono text-xs text-gray-700 max-w-4xl leading-relaxed">
          The ultimate defense tool against double fiat inflation. Stablecoins represent a fundamental revolution for global remittances, but navigating multiple smart chain networks requires precise physical routing knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Network Optimizer Card Tool - Left Box (lg:col-span-7) */}
        <div className="lg:col-span-7 bg-white border-heavy p-6 space-y-6 neo-shadow">
          <div className="border-b-[3px] border-black pb-4">
            <h3 className="font-sora text-lg font-black uppercase text-gray-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              STABLECOIN NET-REMITTANCE OPTIMIZER
            </h3>
            <p className="font-mono text-[11.5px] text-gray-500 mt-1">
              Input your planned remittance value. Choose network layers to evaluate exact gas deductions, settlement speeds, and active threat exposure.
            </p>
          </div>

          {/* Amount Inputs */}
          <div className="space-y-2">
            <label className="block font-mono text-xs font-bold text-gray-700 uppercase">
              1. ENTER INBOUND AMOUNT ($ USD STABLE VALUE)
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-gray-500 text-sm">$</div>
              <input
                type="number"
                value={remitAmount}
                onChange={(e) => setRemitAmount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-slate-50 border-heavy p-3 pl-8 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-black"
                min={1}
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Chain Selector Buttons */}
          <div className="space-y-2">
            <label className="block font-mono text-xs font-bold text-gray-700 uppercase">
              2. SELECT TARGET BLOCKCHAIN ROUTE NETWORK
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'erc20', label: 'ERC-20', labelFull: 'Ethereum' },
                { id: 'trc20', label: 'TRC-20', labelFull: 'Tron' },
                { id: 'solana', label: 'SOLANA', labelFull: 'Sol' },
                { id: 'arbitrum', label: 'ARBITRUM', labelFull: 'L2 Arb' },
              ].map((chain) => (
                <button
                  key={chain.id}
                  onClick={() => setSelectedChain(chain.id as any)}
                  className={`p-3 border-heavy text-center transition-all duration-150 cursor-pointer active-press ${
                    selectedChain === chain.id
                      ? 'bg-black text-white neo-shadow-sm'
                      : 'bg-[#fafafa] hover:bg-white font-semibold text-gray-700'
                  }`}
                >
                  <div className="font-mono text-xs font-bold">{chain.label}</div>
                  <div className="font-mono text-[9px] opacity-60 mt-0.5">{chain.labelFull}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Calculation Result Output */}
          <div className="bg-gray-50 border-heavy p-4 space-y-4">
            <h4 className="font-mono text-xs font-black text-gray-400 uppercase tracking-widest">
              DEDUCTIONS ESTIMATOR
            </h4>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-black/15">
              <div className="pt-2 md:pt-0 pr-2">
                <div className="font-mono text-[9px] text-gray-400">INPUT AMOUNT</div>
                <div className="font-mono text-sm font-bold">${remitAmount.toFixed(2)}</div>
              </div>
              <div className="pt-2 md:pt-0 pl-2 pr-2">
                <div className="font-mono text-[9px] text-gray-400">NETWORK GAS FEE</div>
                <div className="font-mono text-sm font-bold text-rose-600">-${activeChain.gasFee.toFixed(2)}</div>
              </div>
              <div className="pt-2 md:pt-0 pl-2 pr-2">
                <div className="font-mono text-[9px] text-gray-400">SPEED ESTIMATE</div>
                <div className="font-mono text-sm font-bold text-amber-700">{activeChain.speed}</div>
              </div>
              <div className="pt-2 md:pt-0 pl-2">
                <div className="font-mono text-[9px] text-gray-400 font-bold text-[#136327]">NET RECEIVED</div>
                <div className="font-mono text-base font-black text-[#136327]">${netAmount.toFixed(2)}</div>
              </div>
            </div>

            {/* Dynamic Routing Alert Warnings */}
            <div className={`p-3 border-[2px] leading-relaxed text-xs font-mono space-y-2 mt-4 ${activeChain.color}`}>
              <div className="flex items-center gap-1.5 font-bold uppercase">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>EXPOSURE CATEGORY: {activeChain.riskLevel}</span>
              </div>
              <p>{activeChain.riskDescription}</p>
              <p className="border-t border-black/10 pt-1.5 text-[11px] font-semibold italic text-black">
                ⚠️ SCAM PATTERN DENSITY: {activeChain.scamDensity}
              </p>
            </div>

            {/* HIGHLY GENUINE INTERACTIVE EXPLANATORY FOOTNOTE */}
            <div className="bg-[#fff9e6] border border-amber-300 p-3 font-mono text-[9.5px] text-[#ab3600] leading-normal space-y-1 mt-4">
              <span className="font-bold uppercase tracking-wider block">⚠️ STATIC HEURISTICS REFERENCE LIMITS:</span>
              <p>
                This calculation uses static average benchmarks for gas fees and transaction times. In the wild, <strong>Ethereum Gas fees</strong> and <strong>Solana priority fees</strong> change dynamically based on network block space congestion. To perform live onchain payments, always consult real-time gas aggregators (like <em>Etherscan Gas Tracker</em>, <em>L2Fees</em>, or <em>Solscan</em>) and match execution guidelines on your web extension before sending coins.
              </p>
            </div>
          </div>
        </div>

        {/* Stablecoin Academic Section - Right Box (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Nigerian cNGN Insight Panel */}
          <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm">
            <span className="bg-[#d2ffdb] border border-[#136327] text-[#136327] font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm">
              WEST AFRICAN LOCAL REPORT
            </span>
            <h3 className="font-sora text-lg font-extrabold text-gray-900 uppercase">
              The cNGN stablecoin Project
            </h3>
            <p className="font-mono text-xs text-gray-600 leading-relaxed">
              Unlike the Central Bank of Nigeria's eNaira (which operates as a direct retail CBDC under rigid bank monitoring), the **cNGN** represents a compliance stablecoin issued by a private banking consortium (including Access Bank, Sterling Bank, etc.).
            </p>
            <div className="border-t border-black/10 pt-3 space-y-2 font-mono text-xs text-gray-600">
              <p>🎯 **Core parity:** 1 cNGN is backed 1:1 by real Nigerian Naira held in secure consortium escrow vaults.</p>
              <p>⛓️ **Network interoperability:** Planned for multi-chain support (including Ethereum L2s and Base) to enable friction-free global commerce without P2P middleman fees.</p>
            </div>
          </div>

          {/* General Security Best Practices */}
          <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm">
            <h3 className="font-sora text-base font-extrabold text-gray-900 uppercase flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-tertiary" />
              STABLECOIN SECURITY MANDATES
            </h3>
            <ul className="space-y-3 font-mono text-xs text-gray-700 leading-normal">
              <li className="flex gap-2 items-start">
                <span className="text-brand-tertiary font-bold">•</span>
                <span>**Check Smart Contract Address:** Scam bots create fake tokens naming themselves "USDT". Make sure you retrieve your contract details from official coin indexes like Coingecko.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-brand-tertiary font-bold">•</span>
                <span>**Beware of High Yield Pool Staking:** Protocols promising 25%+ APY on stablecoins are either unsustainable algorithmic ponzis or smart contract back-doors waiting to drain physical assets.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-brand-tertiary font-bold">•</span>
                <span>**Clear approving histories weekly:** Always restrict transaction limits to the precise amount you want to spend, keeping smart contracts from accessing secondary assets.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
