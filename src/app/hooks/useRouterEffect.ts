import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageAtom } from "../store/pageAtom";
import { useEffect, useState, useTransition } from "react";

export const useRouterEffect = () => {
  const router = useRouter();
  const [{ isPageChanging }, setPageState] = useRecoilState(pageAtom);
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  const push = (path: string, delay: number = 0) => {
    // startTransition(() => {
    setPageState((org) => ({ ...org, isPageChanging: true }));
    setTimeout(() => {
      router.push(path);
      setPageState((org) => ({ ...org, isPageChanging: false }));
    }, delay);
    // });
  };

  useEffect(() => {
    setShow(!isPageChanging && !isPending);
    return () => {
      setShow(false);
    };
  }, [isPageChanging, isPending]);

  return { push, isPageChanging, show };
};
