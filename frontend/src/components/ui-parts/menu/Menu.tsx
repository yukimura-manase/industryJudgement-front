import { CSSProperties } from "react";
import VerticalLine from "../../ui-elements/line/VerticalLine";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
}

/**
 * NOTE: Menu
 * => 垂直な縦線 Component
 */
const Menu = (props: PropsType) => {
  const { style } = props;
  /** DefaultStyle: 横並び */
  const defaultStyle = { display: "flex", gap: "12px" } as CSSProperties;

  return (
    <div style={style ? style : defaultStyle}>
      {/* VerticalLine: 垂直線(縦線) Component */}
      <VerticalLine />
      <span>Home</span>
      <VerticalLine />
      <span>My Item</span>
      <VerticalLine />
      <span>Photo</span>
      <VerticalLine />
      <span>Favorite</span>
      <VerticalLine />
    </div>
  );
};

export default Menu;
