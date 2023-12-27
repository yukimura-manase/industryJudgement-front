import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  src: string;
  altText?: string;
  imgWrapperStyle?: CSSProperties;
  imgStyle?: CSSProperties;
}

/**
 * NOTE: SquarePhotoCard
 * => 四角い SquarePhotoCard Component
 */
const SquarePhotoCard = (props: PropsType) => {
  const { src, altText, imgWrapperStyle, imgStyle } = props;
  /** DefaultStyle: 角丸・四角い SquarePhotoCard */
  const defaultStyle = {
    width: "128px",
    height: "128px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    objectFit: "cover",
  } as CSSProperties;

  return (
    <div style={imgWrapperStyle ? imgWrapperStyle : undefined}>
      <img
        src={src}
        alt={altText ? altText : ""}
        style={imgStyle ? imgStyle : defaultStyle}
      />
    </div>
  );
};
export default SquarePhotoCard;
