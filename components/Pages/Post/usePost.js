// import { useRouter } from "next/router";
import { useState } from "react";

const usePost = () => {
  // const router = useRouter();
  // const forward;
  // const toTop;
  const [scroll, setScroll] = useState(0);

  const hendeForward = () => {};
  const hendeToTop = () => {
    if (scroll !== 0) {
      setScroll(0);
      window.scrollTo({
        top: scroll,
        behavior: "smooth",
      });
    }

    setScroll(window.scrollY);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return { hendeForward, hendeToTop };
};

export default usePost;
