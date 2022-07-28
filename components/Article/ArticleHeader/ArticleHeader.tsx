import { Heading } from "../../blocks/Heading/Heading";
import classes from

// eslint-disable-next-line arrow-body-style
const ArticleHeader = ({title, categories}) => {
  return (
    <div className={classes.block}>
      <Heading level="1">{title}</Heading>
      {categories && (
        <div className={classes.category}>
          <Category data={categories} cls={classes["category-link"]} />
        </div>
      )}
    </div>
  );
};

export default ArticleHeader;
