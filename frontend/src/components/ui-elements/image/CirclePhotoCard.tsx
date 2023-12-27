import { CSSProperties } from "react";

/** Propsの型定義 */
interface PropsType {
  src: string;
  altText?: string;
  imgStyle?: CSSProperties;
  imgWrapperStyle?: CSSProperties;
}

/**
 * NOTE: CirclePhotoCard
 * => 丸い CirclePhotoCard Component
 */
const CirclePhotoCard = (props: PropsType) => {
  const { src, altText, imgWrapperStyle, imgStyle } = props;
  /** DefaultStyle: 丸い・CirclePhotoCard */
  const defaultStyle = {
    objectFit: "cover",
    width: "62px",
    height: "62px",
    borderRadius: "31px",
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
export default CirclePhotoCard;
