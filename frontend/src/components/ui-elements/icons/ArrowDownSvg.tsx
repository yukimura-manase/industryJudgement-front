import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
  color?: string;
}

/**
 * NOTE: ArrowDown
 *  => 下向きの黒矢印
 */
const ArrowDownSvg = (props: PropsType) => {
  return (
    <svg
      width="10"
      height="5"
      viewBox="0 0 10 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style ? props.style : undefined}
    >
      <path d="M5 5L0 0H10L5 5Z" fill={props.color ? props.color : "#0B192D"} />
    </svg>
  );
};

export default ArrowDownSvg;
