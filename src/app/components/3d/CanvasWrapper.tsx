import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CanvasWrapperProps {
  children?: React.ReactNode;
  zIndex?: number;
  timeoutSec?: number;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  children,
  zIndex = 0,
  timeoutSec = 0,
}) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, timeoutSec);
  }, []);
  return (
    <StyledCanvasWrapper zIndex={zIndex} show={show}>
      <Canvas>{children}</Canvas>
    </StyledCanvasWrapper>
  );
};

const StyledCanvasWrapper = styled.div<{ zIndex: number; show: boolean }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${({ zIndex }) => zIndex};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transition-duration: 1.5s;
  transition-timing-function: ease-in-out;
`;

export default CanvasWrapper;
