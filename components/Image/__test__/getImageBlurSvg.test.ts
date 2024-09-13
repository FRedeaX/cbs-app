import { getImageBlurSvg } from "../utils/getImageBlurSvg";

const EMPTY_IMAGE_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

describe("getImageBlurSvg", () => {
  test("должен установить атрибут viewBox и preserveAspectRatio при наличии свойств width и height", () => {
    const blurDataURL = getImageBlurSvg({
      width: 20,
      height: 20,
      blurDataURL: EMPTY_IMAGE_SRC,
    });

    expect(blurDataURL).toMatch(/viewBox='0 0 20 20'/);
    expect(blurDataURL).toMatch(/preserveAspectRatio='none'/);
  });

  test("должен установить атрибут preserveAspectRatio при наличии свойства objectFit", () => {
    const containBlurDataURL = getImageBlurSvg({
      objectFit: "contain",
      blurDataURL: EMPTY_IMAGE_SRC,
    });

    expect(containBlurDataURL).toMatch(/preserveAspectRatio='xMidYMid'/);

    const coverBlurDataURL = getImageBlurSvg({
      objectFit: "cover",
      blurDataURL: EMPTY_IMAGE_SRC,
    });

    expect(coverBlurDataURL).toMatch(/preserveAspectRatio='xMidYMid slice'/);
  });

  test("должен установить атрибут preserveAspectRatio при отсутствии свойств width и height", () => {
    const blurDataURL = getImageBlurSvg({
      blurDataURL: EMPTY_IMAGE_SRC,
    });

    expect(blurDataURL).toMatch(/preserveAspectRatio='none'/);
  });
});
