import React, { useState } from 'react';
import { resourceItems } from '../extendedData';
import { ResourceItem } from '../types';
import { Download, FileText, CheckCircle2, Search, ArrowRight, Table, AlertCircle } from 'lucide-react';
import { GlossaryHub, GlossaryText } from './GlossarySystem';
import { jsPDF } from 'jspdf';
import { ReportInaccuracyButton } from './InaccuracyFeedbackModal';

export const Resources: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [downloadedItems, setDownloadedItems] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resourceItems.filter((res) =>
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // High-fidelity custom PDF generation for physical resources
  const generateResourcePDF = (id: string, title: string) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Utility to draw aesthetic border & watermarks on pages
      const drawBorderAndHeaders = (pageNum: number) => {
        // Thick outer border
        doc.setLineWidth(0.5);
        doc.setDrawColor(0, 0, 0);
        doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin * 2) + 8);

        // Grid accents
        doc.setLineWidth(0.15);
        doc.setDrawColor(210, 210, 210);
        doc.line(margin - 4, margin + 12, pageWidth - margin + 4, margin + 12);
        doc.line(margin - 4, pageHeight - margin - 8, pageWidth - margin + 4, pageHeight - margin - 8);

        // Header text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(171, 54, 0); // brand primary
        doc.text("CRYPTO SAFETY GLOBAL // PHYSICAL AUDIT CODES", margin, margin + 4);

        doc.setTextColor(120, 120, 120);
        doc.setFont("courier", "bold");
        doc.text(`CATALOG-ID: CSG-${id.toUpperCase()}`, pageWidth - margin - 65, margin + 4);

        // Footer
        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(150, 150, 150);
        doc.text("DECONSTRUCT ALL RISK CODES BEFORE APPROVING TRANSACTIONS // OFFLINE LEDGERS ONLY", margin, pageHeight - margin - 3);
        doc.text(`SHEET ${pageNum}`, pageWidth - margin - 15, pageHeight - margin - 3);
      };

      // Draw initial page decoration
      drawBorderAndHeaders(1);

      // 1. Header Box
      doc.setFillColor(248, 246, 242);
      doc.rect(margin, margin + 18, contentWidth, 22, "F");
      doc.setLineWidth(0.85);
      doc.setDrawColor(0, 0, 0);
      doc.rect(margin, margin + 18, contentWidth, 22, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(171, 54, 0);
      doc.text("OFFICIAL SECURE HANDBOOK RESOURCE DISPATCH", margin + 5, margin + 25);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.text(title.toUpperCase(), margin + 5, margin + 33);

      let y = margin + 50;

      // Generates customized content according to resource selected
      if (id === 'res-daily-checklist') {
        // Daily safety roadmap
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("I. MORNING ROUTINE (BOOKMARK INTEGRITY & DNS VERIFICATION)", margin, y);
        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(70, 70, 70);
        const morningLines = [
          "[  ] Validate system DNS cache layers to ensure decentralized swaps are not hijacked.",
          "[  ] Strictly open your hardware client wallets via pre-saved browser bookmark keys.",
          "[  ] Verify browser session permissions. Purge unspent cached cookies from previous days.",
          "[  ] Match browser wallets with physical addresses. Ensure mock tails don't poison clipboard."
        ];
        morningLines.forEach(line => {
          doc.text(line, margin + 3, y);
          y += 5.5;
        });
        y += 4;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("II. TRANSACTION SIGNATURE VERIFICATION", margin, y);
        y += 7;
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const txLines = [
          "[  ] Read the plain text function payload of all raw transactions inside MetaMask or Rabby.",
          "[  ] Verify that 'Approve' values match exact swap ceilings, not arbitrary multi-million parameters.",
          "[  ] When using bridge tunnels, visually confirm the smart-contract address coordinates on blockchain scanners.",
          "[  ] Compare expected net output balances with pre-calculated gas limit models in your wallet."
        ];
        txLines.forEach(line => {
          doc.text(line, margin + 3, y);
          y += 5.5;
        });
        y += 4;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("III. CODES PURGING PROCEDURE (WEEKLY CLEANS)", margin, y);
        y += 7;

        doc.setFont("helvetica", "normal");
        const cleanLines = [
          "[  ] Trigger a complete session history clearance across all browser extension environments.",
          "[  ] Revoke smart allowances inside centralized registers like Revoke.cash for old NFT projects.",
          "[  ] Run offline seed inspections inside isolated local hardware memory channels."
        ];
        cleanLines.forEach(line => {
          doc.text(line, margin + 3, y);
          y += 5.5;
        });

      } else if (id === 'res-steel-markup') {
        // Seed phrase steel engraving stencil diagram
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("PHYSICAL EXPANSION STENCIL: ENGRAVING BLUEPRINTS", margin, y);
        y += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const descText = "To avoid EMP, water damage, or fire hazards, never print seed phrase recovery words on paper. Manually hammer, punch, or engrave alphanumeric coordinates into a stainless steel backing plate using this standard format checklist.";
        const splitDesc = doc.splitTextToSize(descText, contentWidth);
        doc.text(splitDesc, margin, y);
        y += (splitDesc.length * 4.5) + 6;

        // Visual layout grid
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.4);
        doc.rect(margin, y, contentWidth, 68);

        // Grid lines
        doc.setLineWidth(0.15);
        for (let i = 1; i <= 6; i++) {
          doc.line(margin + (i * (contentWidth / 6)), y, margin + (i * (contentWidth / 6)), y + 68);
        }
        for (let i = 1; i <= 5; i++) {
          doc.line(margin, y + (i * (68 / 6)), margin + contentWidth, y + (i * (68 / 6)));
        }

        // Add indices grid label
        doc.setFont("courier", "bold");
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        const positions = [
          "1. [ _ _ _ _ ]", "2. [ _ _ _ _ ]", "3. [ _ _ _ _ ]", "4. [ _ _ _ _ ]", "5. [ _ _ _ _ ]", "6. [ _ _ _ _ ]",
          "7. [ _ _ _ _ ]", "8. [ _ _ _ _ ]", "9. [ _ _ _ _ ]", "10.[ _ _ _ _ ]", "11.[ _ _ _ _ ]", "12.[ _ _ _ _ ]",
          "13.[ _ _ _ _ ]", "14.[ _ _ _ _ ]", "15.[ _ _ _ _ ]", "16.[ _ _ _ _ ]", "17.[ _ _ _ _ ]", "18.[ _ _ _ _ ]",
          "19.[ _ _ _ _ ]", "20.[ _ _ _ _ ]", "21.[ _ _ _ _ ]", "22.[ _ _ _ _ ]", "23.[ _ _ _ _ ]", "24.[ _ _ _ _ ]"
        ];
        
        let row = 0;
        let col = 0;
        positions.forEach((pos, idx) => {
          row = Math.floor(idx / 4);
          col = idx % 4;
          doc.text(pos, margin + 4 + (col * (contentWidth / 4)), y + 7 + (row * 10));
        });

        y += 76;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(171, 54, 0);
        doc.text("CRITICAL ASSEMBLY SAFETY INSTRUCTIONS:", margin, y);
        y += 5.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const steps = [
          "Step 1: Punch only the FIRST 4 letters of each word. Alphanumeric BIP39 dictionaries resolve duplicates with 4 digits.",
          "Step 2: Maintain constant punch hammer force. Shallow incisions wear out when exposed to intense heat waves.",
          "Step 3: Stash hardware backplate in a safe lockbox. Cover layout surfaces with opaque grease markers to baffle cameras."
        ];
        steps.forEach(st => {
          doc.text(st, margin, y);
          y += 5;
        });

      } else if (id === 'res-p2p-arbitration') {
        // Dispute template
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("P2P CHAT WINDOW DISPUTE RESPONSE TEMPLATE", margin, y);
        y += 5.5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const descText = "To protect yourself against deceptive peer merchants who claim payment but delay on-chain escrows, paste standard arbitration responses directly to force prompt moderator mediation. Use our tested scripts:";
        const splitDesc = doc.splitTextToSize(descText, contentWidth);
        doc.text(splitDesc, margin, y);
        y += (splitDesc.length * 4.5) + 6;

        const templateBox = [
          "--- MANDATORY ARBITRATION DISPATCH (COPY PASTE) ---",
          "Dear Moderator, I have successfully executed payment to the beneficiary.",
          "The counterparty is violating platform Term 4.2 by requesting third-party",
          "verification credentials outside our official escrow guidelines.",
          "I have stowed live video and bank transaction receipt outputs in this window.",
          "Please verify client name match and initiate trade contract dissolution.",
          "---------------------------------------------------"
        ];

        doc.setFillColor(30, 30, 30);
        doc.rect(margin, y, contentWidth, 38, "F");
        doc.setFont("courier", "normal");
        doc.setFontSize(8);
        doc.setTextColor(114, 255, 112); // terminal green

        let tY = y + 7;
        templateBox.forEach(line => {
          doc.text(line, margin + 4, tY);
          tY += 4.5;
        });
        y += 46;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("EVIDENCE PORTFOLIO STANDARDS REQUIRED:", margin, y);
        y += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(70, 70, 70);
        const rules = [
          "✓ Real-time screenshot of the successful bank transfer stating time, Reference, and beneficiary name.",
          "✓ Un-edited video screen-grab of you accessing your banking app from desktop or phone layout.",
          "✓ Official legal statement from your local financial bank confirming the transaction status.",
          "✓ Reject any external chat channels (WhatsApp, Telegram) suggested by traders during mediation."
        ];
        rules.forEach(rl => {
          doc.text(rl, margin, y);
          y += 5.5;
        });

      } else {
        // res-risk-calc or generic fallback: Wallet Exposure Assessment Matrix
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.text("EXPOSURE MATRIX: TOKENS APPROVED RATIO EXCEL GUIDE", margin, y);
        y += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        const descText = "A mathematical evaluation matrix to trace how much of your assets are stored under smart-contracts permissions. Map your ledger values below, target high-danger allowances immediately.";
        const splitDesc = doc.splitTextToSize(descText, contentWidth);
        doc.text(splitDesc, margin, y);
        y += (splitDesc.length * 4.5) + 6;

        // Custom drawn matrix table
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.4);
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y, contentWidth, 8, "FD");

        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(0, 0, 0);
        doc.text("EXPOSURE LEVEL", margin + 2, y + 5.5);
        doc.text("THRESHOLD", margin + 42, y + 5.5);
        doc.text("ACTION TO ENGAGE", margin + 85, y + 5.5);

        y += 8;
        doc.setLineWidth(0.2);

        const rows = [
          { level: "CRITICAL DANGER", tr: "Unallocated Unlimited Approval to unknown dApps", action: "Revoke allowances instantly via dashboard tracker." },
          { level: "MEDIUM EXPOSURE", tr: "Standard Decentralized pool approvals (Uniswap)", action: "Restrict approval parameters to precise transaction limits." },
          { level: "SECERE MITIGATION", tr: "Unchecked tokens on secondary chain environments", action: "Sweep assets into native physical cold vaults." },
          { level: "SAFE ZONE", tr: "Zero external execution allowances on wallets", action: "Maintain isolated addresses for daily sandbox tests." }
        ];

        rows.forEach((row, idx) => {
          doc.rect(margin, y, contentWidth, 12);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(7.5);
          doc.setTextColor(idx === 0 ? 171 : 0, idx === 0 ? 54 : 0, 0);
          doc.text(row.level, margin + 2, y + 7.5);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(60, 60, 60);
          const trSplit = doc.splitTextToSize(row.tr, 40);
          doc.text(trSplit, margin + 42, y + 5);

          const actSplit = doc.splitTextToSize(row.action, contentWidth - 88);
          doc.text(actSplit, margin + 85, y + 5);

          y += 12;
        });
      }

      // 3. Document verified footer box
      y = Math.max(y + 8, pageHeight - margin - 35);
      doc.setFillColor(252, 252, 252);
      doc.rect(margin, y, contentWidth, 18, "F");
      doc.setLineWidth(0.4);
      doc.setDrawColor(0, 135, 81);
      doc.rect(margin, y, contentWidth, 18, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 135, 81);
      doc.text("VERIFIED COMPLIANT WITH CRYPTO SAFETY GLOBAL POLICIES", margin + 5, y + 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 100, 100);
      doc.text("This file was formulated live. All diagnostic criteria represent standard best-practice protocols.", margin + 5, y + 11);
      doc.text("Store this page off-grid. Never upload sensitive steel matrices or recovery scripts online.", margin + 5, y + 15);

      // Save the generated document directly matching title
      const sanitizedName = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      doc.save(`csg-resource-${sanitizedName}.pdf`);
    } catch (e) {
      console.error("PDF download failure:", e);
      alert("Error generating direct PDF resource download. Please retry.");
    }
  };

  const triggerDownload = (id: string) => {
    if (downloadingId) return;
    setDownloadingId(id);
    setDownloadProgress(0);

    const target = resourceItems.find(item => item.id === id);

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadingId(null);
          setDownloadedItems((prevDownloaded) => ({ ...prevDownloaded, [id]: true }));
          
          // Trigger PDF creation dynamically
          if (target) {
            generateResourcePDF(target.id, target.title);
          }

          return 100;
        }
        return prev + 25;
      });
    }, 150);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('Template') || type.includes('Vector')) return <Table className="w-8 h-8 text-[#0040e0]" />;
    if (type.includes('Excel') || type.includes('Sheet')) return <Table className="w-8 h-8 text-[#006e16]" />;
    return <FileText className="w-8 h-8 text-[#ab3600]" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
      {/* Decors */}
      <div className="bg-amber-50 border-heavy border-l-[8px] border-l-amber-700 p-6 space-y-3">
        <h2 className="font-sora text-3xl font-extrabold uppercase tracking-tight text-amber-950 flex items-center gap-2">
          <Download className="w-8 h-8 text-amber-700" />
          SECURE CYBER SECURITY RESOURCE DOWNLOADS
        </h2>
        <p className="font-mono text-xs text-gray-750 max-w-4xl leading-relaxed">
          Tangible physical safety templates. Download our verified stencils, spreadsheets, dispute layouts, and checklists to move your security protocols off browser histories and straight to physical mediums.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Resource downloads listing - Left (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search panel */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resource file nodes..."
              aria-label="Search resources"
              className="w-full pl-9 pr-4 py-2 border-heavy bg-white font-mono text-xs focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div className="space-y-4">
            {filteredResources.map((res) => {
              const isDownloading = downloadingId === res.id;
              const isDownloaded = !!downloadedItems[res.id];

              return (
                <div
                  key={res.id}
                  className="bg-white border-heavy p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 neo-shadow-sm transition-all duration-150"
                >
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-gray-100 border shrink-0">
                      {getFileIcon(res.fileType)}
                    </div>

                    <div className="space-y-1.5">
                      <span className="bg-gray-100 border text-[8.5px] font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wide text-gray-500 font-bold">
                        {res.fileType} • {res.fileSize}
                      </span>
                      <h4 className="font-sora text-base font-extrabold text-gray-900 uppercase">
                        <GlossaryText text={res.title} />
                      </h4>
                      <p className="font-mono text-[11px] text-gray-600 leading-normal max-w-xl">
                        <GlossaryText text={res.description} />
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Download Trigger Action */}
                  <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0">
                    <button
                      onClick={() => triggerDownload(res.id)}
                      disabled={isDownloading}
                      className={`w-full md:w-auto px-5 py-3 border-heavy font-mono text-xs font-black uppercase text-center cursor-pointer transition-all active-press ${
                        isDownloaded 
                          ? 'bg-[#d2ffdb] border-[#136327] text-[#136327] flex items-center justify-center gap-1.5' 
                          : isDownloading 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-black text-white hover:bg-black/85'
                      }`}
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>DOCUMENT RETRIEVED</span>
                        </>
                      ) : isDownloading ? (
                        <span>STAGING: {downloadProgress}%</span>
                      ) : (
                        <span className="flex items-center justify-center gap-1.5">
                          <Download className="w-4 h-4" />
                          <span>RETRIEVE ASSET</span>
                        </span>
                      )}
                    </button>
                    {isDownloading && (
                      <div className="w-full bg-gray-200 h-1 border-x border-b border-black mt-0.5">
                        <div className="bg-[#ab3600] h-full" style={{ width: `${downloadProgress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredResources.length === 0 && (
              <div className="bg-white border-heavy p-8 text-center font-mono text-xs text-gray-400">
                ⚠️ Search key returned no resources in our offsite stashing indexes.
              </div>
            )}
          </div>
        </div>

        {/* Advisory Sidebar warnings - Right (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border-heavy p-6 space-y-4 neo-shadow-sm text-gray-800">
            <span className="bg-purple-50 text-purple-800 border border-purple-200 font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide">
              PHYSICAL METRIC SECURITY
            </span>
            <h4 className="font-sora text-sm font-extrabold uppercase">
              Physical Backup Warnings
            </h4>
            <p className="font-mono text-xs text-gray-600 leading-normal">
              Any security system with digital points can be infected by network vectors. This is why CSG encourages transferring seed phrases, bookmarks checklists, and trade guidelines:
            </p>
            <div className="border-t border-black/10 pt-3 space-y-3 font-mono text-xs">
              <p className="flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 text-[#ab3600] shrink-0" />
                <span>**Zero Printer Logs:** When printing template vectors, clear your printer buffer logs instantly (enterprise printers stash copies on internal hard disks).</span>
              </p>
              <p className="flex gap-1.5 items-start">
                <AlertCircle className="w-4 h-4 text-[#ab3600] shrink-0" />
                <span>**Harden steel backing plates:** Secure steel back-up coordinates separately from device cabinets in high-grade fire cabinets.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t-4 border-black">
        <GlossaryHub />
      </div>

      <ReportInaccuracyButton pageName="Resources & Downloads" />
    </div>
  );
};
