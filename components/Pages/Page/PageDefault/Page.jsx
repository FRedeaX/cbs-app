import Content from "../../../Content/Content";
import Blocks from "../../../blocks/Blocks";
import { Heading } from "../../../blocks/Heading/Heading";
import classes from "./Page.module.css";

const Page = ({ title, blocks, content }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <Heading level="1">{title}</Heading>
    </div>
    {/* <h1 className={classes.title}>{title}</h1> */}
    <div className={classes.content}>
      {/* <Share cls={classes.share} /> */}

      {blocks && <Blocks blocks={blocks} />}
    </div>
  </div>
);

export default Page;
