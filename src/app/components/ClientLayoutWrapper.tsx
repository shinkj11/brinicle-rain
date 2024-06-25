"use client";

import { RecoilRoot } from "recoil";
import BackgroundTemplate from "./BackgroundTemplate";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

const ClientLayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();

  useEffect(() => {
    console.log("pathName", pathName);
  }, [pathName]);
  return (
    <RecoilRoot>
      <BackgroundTemplate />
      {pathName !== "/" && <Header />}
      {children}
    </RecoilRoot>
  );
};

export default ClientLayoutWrapper;
