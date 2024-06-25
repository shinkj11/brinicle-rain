import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pageAtom } from "../store/pageAtom";
import { useEffect, useRef, useState, useTransition } from "react";
import { Router } from "next/router";

export const useRouterEffect = () => {
  const router = useRouter();
  const [{ isPageChanging }, setPageState] = useRecoilState(pageAtom);
  const [show, setShow] = useState(false);
  const [isPending, startTransition] = useTransition();

  const push = (path: string, delay: number = 0) => {
    const delayFunction = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    startTransition(async () => {
      setPageState((org) => ({ ...org, isPageChanging: true }));
      router.prefetch(path);
      await delayFunction(delay);
      await delayFunction(500);
      router.push(path);
      setPageState((org) => ({ ...org, isPageChanging: false }));
    });
  };

  useEffect(() => {
    setShow(!isPageChanging && !isPending);
    return () => {
      setShow(false);
    };
  }, [isPageChanging, isPending]);

  return { push, isPageChanging, show };
};
