import Image from "next/image";
import styled from "styled-components";
import Typo from "./Typo";
import { useCustomMedia } from "../hooks/useCustomMedia";
import { useEffect, useState } from "react";
import { media } from "../lib/media";
import { useRouterEffect } from "../hooks/useRouterEffect";

const Header = () => {
  const [show, setShow] = useState(false);
  const { isSmall } = useCustomMedia();
  const { push, isPageChanging } = useRouterEffect();

  useEffect(() => {
    setShow(!isPageChanging);
  }, [isPageChanging]);

  return (
    <HeaderWrapper>
      <TypoWrapper>
        <Image
          src={"./logo.svg"}
          alt={"logo"}
          width={isSmall ? 40 : 70}
          height={isSmall ? 40 : 70}
        />
        <Typo
          onClick={() => push("/", 1000)}
          show={show}
          type={isSmall ? "smallHeader" : "header2"}
          cursorPointer
        >
          BRINICLE RAIN
        </Typo>
      </TypoWrapper>
      <TypoWrapper gap="20px">
        {isSmall ? (
          <>
            <StyledImage
              src={"./menu.svg"}
              alt={"menu"}
              width={30}
              height={30}
            />
          </>
        ) : (
          <>
            <Typo
              onClick={() => push("/about", 1000)}
              show={show}
              type="header2"
              cursorPointer
            >
              ABOUT
            </Typo>
            <Typo show={show} type="header2" cursorPointer>
              DISCOGRAPHY
            </Typo>
          </>
        )}
      </TypoWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  ${media.small`
    width: 90%;
  `}
`;

const TypoWrapper = styled.div<{ gap?: string }>`
  height: 100px;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.gap ? props.gap : 0)};
  ${media.small`
    height: 70px;
  `}
`;

const StyledImage = styled(Image)`
  position: relative;
  cursor: pointer;
  top: -5px;
`;

export default Header;
