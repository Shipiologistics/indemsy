import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale, getTranslations } from 'next-intl/server';
import { getSocialLinks } from './actions/socials';
import "./globals.css";
import "./hero.css";
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';
import ChatBot from './components/ChatBot/ChatBot';
import PageTransitions from './components/PageTransitions/PageTransitions';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    icons: {
      icon: '/favicon-logo.png',
      shortcut: '/favicon-logo.png',
      apple: '/favicon-logo.png',
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: "website",
      locale: locale,
      siteName: "FlyCompense",
    },
    twitter: {
      card: "summary_large_image",
      title: t('twitterTitle'),
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const socialLinksRes = await getSocialLinks();
  const socialLinks = socialLinksRes.success ? socialLinksRes.links : [];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <PageTransitions />
          <LayoutWrapper socialLinks={socialLinks}>
            {children}
          </LayoutWrapper>
          <ChatBot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}



