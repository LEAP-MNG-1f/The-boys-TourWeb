import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Tour Mongolia",
  description:
    "Discover Mongolia's breathtaking Gobi Desert with our guided tours. Experience nomadic culture, stunning landscapes, and unforgettable adventures in the heart of Asia. Perfect for travelers seeking unique journeys. Tour Mongolia, Travel Mongolia, Монголд аялах, Mongolia tour, mongoia travel, adventure mongolia, Mongolia Adventure, Gobi tour, gobi, Gobi Mongolia, golden gobi, Cashmere, Eternal, Nomadic, Mongola, Mongol, Hunnu, Chingiss Khan, Mongol Empire, Mongolian Tours",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Tour Mongolia</title>
        <meta
          name="description"
          content="Discover Mongolia's breathtaking Gobi Desert with our guided tours. Experience nomadic culture, stunning landscapes, and unforgettable adventures in the heart of Asia. Perfect for travelers seeking unique journeys. Tour Mongolia, Travel Mongolia, Монголд аялах, Mongolia tour, mongoia travel, adventure mongolia, Mongolia Adventure, Gobi tour, gobi, Gobi Mongolia, golden gobi, Cashmere, Eternal, Nomadic, Mongola, Mongol, Hunnu, Chingiss Khan, Mongol Empire, Mongolian Tours"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
