import styled from "styled-components";
import { media } from "../lib/media";
import Typo from "./Typo";
import { useRouterEffect } from "../hooks/useRouterEffect";
import { useCustomMedia } from "../hooks/useCustomMedia";
import Image from "next/image";

const AboutContent = () => {
  const { show } = useRouterEffect();
  const { isSmall } = useCustomMedia();
  return (
    <StyledSection>
      <TypoWrapper>
        <TypoRow alignItems="flex-start">
          <Typo
            type={isSmall ? "header1Small" : "body1"}
            show={show}
            transDirection="right"
          >
            GENRE
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="right"
          >
            METAL CORE
          </Typo>
        </TypoRow>
        <TypoRow alignItems="flex-start">
          <Typo
            type={isSmall ? "header1Small" : "body1"}
            show={show}
            transDirection="right"
          >
            ORIGIN
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="right"
          >
            SOUTH KOREA
          </Typo>
        </TypoRow>
      </TypoWrapper>
      {!isSmall && (
        <StyledImage src={"./logo.svg"} alt={"logo"} width={120} height={120} />
      )}
      <TypoWrapper>
        <TypoRow alignItems="flex-end">
          <Typo
            type={isSmall ? "header1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            MEMBER
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            Seunggyun Park(Vocal){" "}
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            Sangim Han(Guitar){" "}
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            Jongsoo Lee(Guitar)
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            Kyeongjune Shin(Bass){" "}
          </Typo>
          <Typo
            type={isSmall ? "body1Small" : "body1"}
            show={show}
            transDirection="left"
          >
            Youngwoo Lee(Drum){" "}
          </Typo>
        </TypoRow>
      </TypoWrapper>
    </StyledSection>
  );
};

export default AboutContent;

const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  top: -5px;
  ${media.small`
    flex-direction: column;
  `}
  text-align: justify;
`;

const TypoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 30px;
  width: 360px;
  ${media.small`
    width: auto;
    gap: 1.5vh;
  `}
`;

const TypoRow = styled.div<{ alignItems: string }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItems }) => alignItems};
`;

const StyledImage = styled(Image)`
  width: 100px !important;
  margin-top: 50px;
`;
