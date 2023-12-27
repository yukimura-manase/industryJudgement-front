import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
}

/**
 * NOTE: VerticalLine
 * => 垂直な縦線 Component
 */
const VerticalLine = (props: PropsType) => {
  /** DefaultStyle: グレーの縦線 */
  const defaultStyle = {
    width: "1px" /* 縦線の幅を設定する */,
    height: "100%" /* コンポーネントの高さに合わせる */,
    backgroundColor: "#AFAEB3" /* 縦線の色を指定 */,
  } as CSSProperties;

  return <div style={props.style ? props.style : defaultStyle}></div>;
};

export default VerticalLine;
