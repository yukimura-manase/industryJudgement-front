import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  /** display Type を変更可能にしておく */
  display?: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  /** その他のStyle は、Objectとして、受け入れ Interfaceだけは、用意する */
  styleObj?: CSSProperties;
}

/**
 * NOTE: Spacer
 * => Space を作成するための Layout調整用 Component
 */
const Spacer = (props: PropsType) => {
  /** PropsDataSet */
  console.log("Spacer props", props);
  const { display, width, height, margin, padding, styleObj } = props;
  const displayType = display ? display : "block";
  const widthStr = width ? width : "0";
  const heightStr = height ? height : "0";
  const marginStr = margin ? margin : "0";
  const paddingStr = padding ? padding : "0";
  /** StyleObj */
  const styleDataSet = styleObj ? styleObj : {};

  /** SpacerのStyle */
  const spacerStyle = {
    display: displayType,
    width: widthStr,
    height: heightStr,
    margin: marginStr,
    padding: paddingStr,
    ...styleDataSet,
  } as CSSProperties;

  return <div style={spacerStyle}></div>;
};

export default Spacer;
