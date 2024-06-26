import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRINICLE RAIN",
  description: "Blessed by the glowless starlights",
  openGraph: {
    title: "BRINICLE RAIN",
    description: "Blessed by the glowless starlights",
    siteName: "BRINICLE RAIN",
    locale: "ko_KR",
    type: "website",
    url: "https://www.briniclerain.com",
    // images: {
    //   // url: OG_IMAGE,
    // },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
