import styled, { css } from "styled-components";
import {
  Bebas_Neue,
  Noto_Serif_Display,
  Noto_Sans,
  Inter,
  Noto_Sans_KR,
} from "next/font/google";

const interLight = Inter({ weight: "300", subsets: ["latin"] });
const bebasRegular = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const interBold = Inter({ weight: "800", subsets: ["latin"] });
const notoSansBold = Noto_Sans_KR({ weight: "700", subsets: ["latin"] });
const notoSansRegular = Noto_Sans_KR({ weight: "400", subsets: ["latin"] });

const typoTypeMap = {
  body0: {
    font: interBold,
    fontSize: "30px",
  },
  body1: {
    font: interLight,
    fontSize: "30px",
  },
  body1Small: {
    font: interLight,
    fontSize: "2vh",
  },
  title: {
    font: bebasRegular,
    fontSize: "20vmin",
  },
  subTitle: {
    font: interLight,
    fontSize: "8vmin",
  },
  header1: {
    font: interBold,
    fontSize: "60px",
  },
  header1Small: {
    font: interBold,
    fontSize: "6vh",
  },
  header2: {
    font: bebasRegular,
    fontSize: "64px",
  },
  smallHeader: {
    font: bebasRegular,
    fontSize: "30px",
  },
  koreanHeader: {
    font: notoSansBold,
    fontSize: "60px",
  },
  koreanBody: {
    font: notoSansRegular,
    fontSize: "30px",
  },
  koreanHeaderSmall: {
    font: notoSansBold,
    fontSize: "40px",
  },
  koreanBodySmall: {
    font: notoSansRegular,
    fontSize: "2vh",
  },
};

type TypoType = keyof typeof typoTypeMap;

interface TypoProps {
  children: React.ReactNode;
  type: TypoType;
  transDirection?: keyof typeof transDirectionMap;
  onClick?: () => void;
  show?: boolean;
  cursorPointer?: boolean;
  isTrans?: boolean;
  zIndex?: number;
  lineHeight?: number;
}

const Typo = ({
  children,
  type,
  onClick,
  transDirection = "top",
  show = true,
  cursorPointer = false,
  isTrans = true,
  zIndex = 200,
}: TypoProps) => {
  return (
    <StyledTypo
      style={typoTypeMap[type].font.style}
      fontSize={typoTypeMap[type].fontSize}
      transDirection={transDirection}
      show={show}
      cursorPointer={cursorPointer}
      isTrans={isTrans}
      onClick={onClick}
      zIndex={zIndex}
    >
      {children}
    </StyledTypo>
  );
};

export default Typo;

interface StyledTypoProps {
  fontSize: string;
  transDirection: keyof typeof transDirectionMap;
  show: boolean;
  cursorPointer: boolean;
  isTrans: boolean;
  zIndex: number;
}

const transDirectionMap = {
  top: css<StyledTypoProps>`
    top: ${({ show }) => (show ? "0" : "-100px")};
  `,
  bottom: css<StyledTypoProps>`
    top: ${({ show }) => (show ? "0" : "100px")};
  `,
  left: css<StyledTypoProps>`
    left: ${({ show }) => (show ? "0" : "-100px")};
  `,
  right: css<StyledTypoProps>`
    left: ${({ show }) => (show ? "0" : "100px")};
  `,
  none: "",
};

const transition = css<StyledTypoProps>`
  transition-duration: 1s;
  transition-timing-function: ease-in-out;
  opacity: ${({ show }) => (show ? "1" : "0")};
  ${({ transDirection }) => transDirectionMap[transDirection]}
`;

const StyledTypo = styled.div<StyledTypoProps>`
  position: relative;
  mix-blend-mode: difference;
  color: #ffffff;
  line-height: 1;
  /* white-space: pre-line; */
  font-size: ${({ fontSize }) => fontSize};
  ${({ cursorPointer }) => cursorPointer && "cursor: pointer;"}
  ${({ isTrans }) => isTrans && transition}
  z-index: ${({ zIndex }) => zIndex};
`;
