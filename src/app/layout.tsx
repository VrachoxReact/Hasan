import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import FloatingCompareBar from "@/components/FloatingCompareBar";
import { Toaster } from "@/components/ui/sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Produkt Auto - Kvalitetna rabljena vozila",
    template: "%s | Produkt Auto",
  },
  description:
    "Vaš pouzdani partner za kupnju kvalitetnih rabljenih vozila u Hrvatskoj. Pregledajte našu ponudu premium automobila s jamstvom kvalitete.",
  keywords: [
    "rabljena vozila",
    "prodaja automobila",
    "auto salon",
    "Zagreb",
    "Hrvatska",
    "BMW",
    "Mercedes",
    "Audi",
    "Volkswagen",
  ],
  authors: [{ name: "Produkt Auto" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Produkt Auto",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on initial load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Preskoči na glavni sadržaj
        </a>

        <Header />
        <ErrorBoundary>
          <main id="main-content" className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
        </ErrorBoundary>
        <Footer />
        <FloatingCompareBar />
        <FloatingWhatsApp />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
