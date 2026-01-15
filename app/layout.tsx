import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyCompensate - #1 Flight Compensation Experts | Get Up To $650",
  description: "Delayed or canceled flight? Get up to $650 in compensation! FlyCompensate handles your claim so you get paid. Free check, no win no fee guarantee. 12+ years experience, 28M+ customers helped.",
  keywords: "flight compensation, delayed flight, canceled flight, airline compensation, missed connection, EU261, flight delay claim, airline claim",
  openGraph: {
    title: "FlyCompensate - #1 Flight Compensation Experts",
    description: "Delayed or canceled flight? Get up to $650 in compensation! Free check, no win no fee guarantee.",
    type: "website",
    locale: "en_US",
    siteName: "FlyCompensate",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyCompensate - #1 Flight Compensation Experts",
    description: "Delayed or canceled flight? Get up to $650 in compensation!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
