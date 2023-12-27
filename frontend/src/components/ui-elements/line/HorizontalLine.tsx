import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
}

/**
 * NOTE: HorizontalLine
 * => 水平線(横線) Component
 */
const HorizontalLine = (props: PropsType) => {
  /** DefaultStyle: グレーの縦線 */
  const defaultStyle = {
    width: "100%" /* 横線の幅を設定する => Defaultは、横幅いっぱいのStyle */,
    height: "1px" /* 横線の太さを設定する */,
    backgroundColor: "#AFAEB3" /* 横線の色を指定 */,
  } as CSSProperties;

  return <div style={props.style ? props.style : defaultStyle}></div>;
};

export default HorizontalLine;
