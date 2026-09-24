import type { Metadata } from "next";
import "./globals.css";
import { VentureProvider } from "@/context/VentureContext";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "VentureVault OS | Private Equity & VC Cap Table Engine",
  description: "Enterprise private equity and venture capital capitalization table modeling, SAFE note conversions, and dilution waterfall analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#060a14] text-slate-100 antialiased flex flex-col font-sans">
        <VentureProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-slate-800/80 bg-[#040710] py-6 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                © 2026 <span className="text-slate-300 font-bold">VentureVault OS</span> • Titan #13 Sovereign PE Fleet
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span>Organization: olyxmintabansos-byte</span>
                <span>•</span>
                <span>Client-Side Local-First</span>
                <span>•</span>
                <span>Static Export Zero-Defect</span>
              </div>
            </div>
          </footer>
        </VentureProvider>
      </body>
    </html>
  );
}
