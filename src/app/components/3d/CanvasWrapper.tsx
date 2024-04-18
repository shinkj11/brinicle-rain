import { Canvas } from "@react-three/fiber";
import styled from "styled-components";

interface CanvasWrapperProps {
  children?: React.ReactNode;
}

const CanvasWrapper: React.FC<CanvasWrapperProps> = ({ children }) => {
  return (
    <StyledCanvasWrapper>
      <Canvas>{children}</Canvas>
    </StyledCanvasWrapper>
  );
};

const StyledCanvasWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 3rem);
  z-index: 1000;
`;

export default CanvasWrapper;
