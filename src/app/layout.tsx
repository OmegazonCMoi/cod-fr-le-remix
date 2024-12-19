import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/hooks/auth-context";

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

export const metadata: Metadata = {
  title: "Hack on COD",
  description: "Hack on COD official website",
  // Open Graph properties
  openGraph: {
    title: "Hack on COD",
    description: "Hack on COD website where you can find cheats, cracks and help for Call of Duty and more !",
    url: "https://hackoncod.com", // Remplacez par votre URL officielle
    type: "website",
    images: [
      {
        url: "https://i.imgur.com/Uf4wFTq.png",
        width: 1200,
        height: 630,
        alt: "Hack on COD",
      },
    ],
    siteName: "Hack on COD",
  },
  // Twitter Card properties
  twitter: {
    card: "summary_large_image",
    title: "Hack on COD",
    description: "Hack on COD official website",
    images: ["https://i.imgur.com/Uf4wFTq.png"],
  },
  // Additional meta tags for SEO
  icons: {
    icon: "/favicon.ico", // Replace with the path to your favicon
  },
  themeColor: "#000000", // Replace with your site's primary color
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
