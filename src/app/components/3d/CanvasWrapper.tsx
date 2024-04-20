import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

interface CanvasWrapperProps {
  children?: React.ReactNode;
  zIndex?: number;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({
  children,
  zIndex = 0,
}) => {
  return (
    <StyledCanvasWrapper zIndex={zIndex}>
      <Canvas>{children}</Canvas>
    </StyledCanvasWrapper>
  );
};

const StyledCanvasWrapper = styled.div<{ zIndex: number }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${({ zIndex }) => zIndex};
`;

export default CanvasWrapper;
