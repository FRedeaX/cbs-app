// import { useRouter } from "next/router";
import { useCallback, useState } from "react";

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

  const [offerList, setOfferListt] = useState([]);

  // {
  //   nextPost: null,
  //   PostListByCategory: null,
  // }

  const hendleOffers = useCallback(async (ID) => {
    try {
      const response = await fetch(
        `${window.location.origin}/api/post/offers?id=${ID}`,
      );
      const json = await response.json();
      if (response.ok === false)
        throw new Error(`status: ${response.status}, message: ${json.message}`);

      setOfferListt((prev) => [...prev, JSON.parse(json.data)]);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { hendeForward, hendeToTop, hendleOffers, offerList };
};

export default usePost;
