import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useCustomMedia = () => {
  // const [isSmall, setIsSmall] = useState<boolean>(false);
  // const small = useMediaQuery({ query: "(max-width: 600px)" });

  // const checkResize = () => {
  //   if (small) {
  //     setIsSmall(true);
  //   } else {
  //     setIsSmall(false);
  //   }
  // };

  // useEffect(() => {
  //   checkResize();
  // }, [small]);
  const isSmall = useMediaQuery({ query: "(max-width: 600px)" });

  return { isSmall };
};
