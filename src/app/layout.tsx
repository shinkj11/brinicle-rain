import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BRINICLE RAIN",
  description: "Blessed by the glowless starlights",
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
