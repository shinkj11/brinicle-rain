import { useRecoilValue } from "recoil";
import BackGroundObj from "./3d/BackGroundObj";
import CanvasWrapper from "./3d/CanvasWrapper";
import { pageAtom } from "../store/pageAtom";

const BackgroundTemplate = () => {
  const { isPageChanging } = useRecoilValue(pageAtom);
  return (
    <CanvasWrapper>
      <BackGroundObj isPageChanging={isPageChanging} />
    </CanvasWrapper>
  );
};

export default BackgroundTemplate;
