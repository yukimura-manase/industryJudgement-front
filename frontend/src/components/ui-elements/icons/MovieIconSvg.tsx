import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
  color?: string;
}

/**
 * NOTE: ReelIconSvg
 *  => 動画のIcon
 */
const MovieIconSvg = (props: PropsType) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={props.style ? props.style : undefined}
    >
      <path
        d="M2 0L4 4H7L5 0H7L9 4H12L10 0H12L14 4H17L15 0H18C18.55 0 19.0208 0.195833 19.4125 0.5875C19.8042 0.979167 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0ZM2 6V14H18V6H2Z"
        fill={props.color ? props.color : "white"}
      />
    </svg>
  );
};

export default MovieIconSvg;
