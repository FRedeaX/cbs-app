import Link from "next/link";
import Button from "~/components/UI/Button/Button";

// возможно из-за этого компонента
// Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
export const PaginationButtons = ({prevPage, nextPage, countPage, page, _page, paginationURI, className}) => {
  const buttons = [];
  for (let index = 1; index < countPage; index++) {
    if (!(prevPage <= index && --index <= nextPage)) return null;
    // const { number } = node;
    const active = page === index || (_page === undefined && index === 1);
    buttons.push(
      <Link
        key={`p${index}`}
        href={`${paginationURI}/page/${index}`}
        prefetch={false}
        passHref
      >
        <Button
          view="link"
          theme="gray"
          // checked={active}
          // disable={active}
          className={className.link}
        >
          {index}
        </Button>
      </Link>
    );
  }
  return buttons;
};