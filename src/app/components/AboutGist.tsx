import styled from "styled-components";
import { media } from "../lib/media";
import Typo from "./Typo";
import { useRouterEffect } from "../hooks/useRouterEffect";
import { useCustomMedia } from "../hooks/useCustomMedia";

const AboutGist = () => {
  const { show } = useRouterEffect();
  const { isSmall } = useCustomMedia();
  return (
    <StyledSection>
      <Typo
        type={isSmall ? "koreanHeaderSmall" : "koreanHeader"}
        show={show}
        transDirection="left"
      >
        브리니클 레인은
      </Typo>
      <Typo
        type={isSmall ? "koreanBodySmall" : "koreanBody"}
        show={show}
        transDirection="right"
      >
        2018년에 결성된 메탈코어 밴드입니다. 타이트한 리프와 서정적인 코러스로
        다양한 색채의 음악을 전달하고 있습니다. 장르의 문법에 기반을 두지만
        거기에 천착하지 않고 조금 더 대중 친화적인 메탈코어를 지향합니다.
      </Typo>

      <Typo
        type={isSmall ? "koreanBodySmall" : "koreanBody"}
        show={show}
        transDirection="left"
      >
        하나의 스코어 안에서 여러 분위기를 오가는 악곡적 구성은 청자에게 다양한
        감상을 느끼게 하고 그에 따른 카타르시스를 선사합니다.
      </Typo>

      <Typo
        type={isSmall ? "koreanBodySmall" : "koreanBody"}
        show={show}
        transDirection="bottom"
      >
        1장의 EP와 1장의 SINGLE을 발매하고 활발한 활동을 이어오다, 2024년 6월 첫
        정규앨범 GAMMA를 발매하였습니다.
      </Typo>
    </StyledSection>
  );
};

export default AboutGist;

const StyledSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  top: -5px;
  ${media.small`
    top: 20px;
    gap: 2vh;
  `}
  text-align: justify;
`;
