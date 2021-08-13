import classNames from "classnames/bind";
import { memo } from "react";
import classes from "./Book-image.module.css";

const BookImage = ({ cls, width, height, src, srcSet, alt, cover }) => {
  const cx = classNames.bind(classes);

  // const img = useRef(new Image());
  // img.current.loading = "lazy";
  // if(srcSet) img.current.srcSet = srcSet;
  // if(!srcSet) img.current.src = src;
  // const [isLoaded, setLoaded] = useState(img.current.complete);

  // const hendleLoad = useCallback(() => {
  //   setLoaded(true);
  // }, [setLoaded]);

  // useLayoutEffect(() => {
  //   if (srcSet) {

  //   }
  // })

  return (
    <img
      // onLoad={hendleLoad}
      loading="lazy"
      className={cx({ img: true, "img--cover": cover }, cls)}
      // className={cx({ img: true, loaded: isLoaded, "img--cover": cover }, cls)}
      width={width && width}
      height={height && height}
      srcSet={srcSet && srcSet}
      src={src && src}
      alt={alt && alt}
    />
  );
};

// function areEqual(prevProps, nextProps) {
//   console.log('prevProps', prevProps);
//   console.log('nextProps', nextProps);
//   // if (prevProps.data.id === nextProps.data.id) {
//   //   return true;
//   // }
//   /*
//   возвращает true, если nextProps рендерит
//   тот же результат что и prevProps,
//   иначе возвращает false
//   */
// }

export default memo(BookImage);
