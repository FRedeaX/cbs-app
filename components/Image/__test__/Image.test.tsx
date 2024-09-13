import { act } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Image } from "../Image";

const EMPTY_IMAGE_SRC =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

describe("<Image />", () => {
  test("должен вернуть полный шаблон компонента (snapshot)", () => {
    const { asFragment } = render(
      <Image alt="" src={EMPTY_IMAGE_SRC} width={40} height={40} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("должен установить атрибут alt", () => {
    render(
      <Image
        alt="Логотип"
        data-testid="image"
        src={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    expect(screen.getByTestId("image")).toHaveAttribute("alt", "Логотип");
  });

  test("должен установить атрибут aria-hidden при пустом свойстве alt", () => {
    render(
      <Image
        alt=""
        data-testid="image"
        src={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    expect(screen.getByTestId("image")).toHaveAttribute("alt", "");
    expect(screen.getByTestId("image")).toHaveAttribute("aria-hidden", "true");
  });

  test("должен сгенирировать placeholder при наличии свойства blurDataURL", () => {
    jest.useFakeTimers();

    render(
      <Image
        style={{ objectFit: "contain" }}
        alt="blurDataURL"
        data-testid="image"
        src={EMPTY_IMAGE_SRC}
        blurDataURL={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("image")).toHaveStyle({ objectFit: "contain" });

    jest.useRealTimers();
  });

  test("должен появиться placeholder при наличии свойства blurDataURL", () => {
    jest.useFakeTimers();

    render(
      <Image
        alt=""
        src={EMPTY_IMAGE_SRC}
        blurDataURL={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByTestId("image-placeholder")).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("должен исчезнуть placeholder после окончания анимации", () => {
    jest.useFakeTimers();

    render(
      <Image
        alt=""
        src={EMPTY_IMAGE_SRC}
        blurDataURL={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    const p = screen.getByTestId("image-placeholder");

    fireEvent.animationEnd(p);

    expect(p).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  test("placeholder не должен появиться если изображение загружено", async () => {
    jest.useFakeTimers();

    render(
      <Image
        alt=""
        data-testid="image"
        src={EMPTY_IMAGE_SRC}
        blurDataURL={EMPTY_IMAGE_SRC}
        width={40}
        height={40}
      />,
    );

    await act(async () => {
      fireEvent.load(screen.getByTestId("image"));
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(screen.queryByTestId("image-placeholder")).toBeNull();

    jest.useRealTimers();
  });
});
