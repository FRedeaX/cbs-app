import classNames from "classnames";

import Social from "../../Social/Social";
import classes from "./Header-social.module.css";

const HeaderSocial = ({ className }) => (
  <div className={classNames(classes.wrapper, className)}>
    <Social
      type="vk"
      url="https://vk.com/cbsbaikonur"
      clsSVG={classNames([classes.svg, classes["svg--vk"]])}
      ariaLabel="Мы Вконтакте"
    />
    <Social
      type="ok"
      url="https://ok.ru/vbibliotek"
      clsSVG={classNames([classes.svg, classes["svg--ok"]])}
      ariaLabel="Мы в Однокласниках"
    />
    <Social
      type="youtube"
      url="https://www.youtube.com/channel/UC0o0y_ci_obgPga8Wnlq0aA/"
      clsSVG={classNames([classes.svg, classes["svg--youtube"]])}
      ariaLabel="Мы на YouTube"
    />
  </div>
);

export default HeaderSocial;
