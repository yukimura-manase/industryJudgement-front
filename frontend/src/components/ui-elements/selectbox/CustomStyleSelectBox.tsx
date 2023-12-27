import { CSSProperties, Dispatch, SetStateAction } from "react";

interface PropsType {
  /** NOTE: SelectBox の id => selectタグの外側で、labelタグを使用する際は、これを紐付ける */
  selectId: string;
  /**
   * NOTE: どんな OptionListがこちらに来るかは、
   * => id と name 以外は、あえて、any にして定義しない
   * => 汎用性のため
   */
  optionList: { id: number | string; name: string; [key: string]: any }[];
  /** NOTE: SelectBox で Default表示する Value */
  defaultSelectVal: number | string;
  /** NOTE: any Setter => 汎用性のために、あえて定義しない */
  setter: Dispatch<SetStateAction<any>>;
  disabled?: boolean;
  wrapperStyle?: CSSProperties;
  selectStyle?: CSSProperties;
}

/**
 * NOTE: CustomStyleSelectBox
 * => Styleを Customize できる SelectBox Component を作成
 */
const CustomStyleSelectBox = (props: PropsType) => {
  const {
    selectId,
    optionList,
    defaultSelectVal,
    setter,
    disabled,
    wrapperStyle,
    selectStyle,
  } = props;

  /** Default の SelectBox Wrapper Style */
  const defaultSelectWrapper = {
    position: "relative",
    height: "20px",
  } as CSSProperties;

  /** Default の SelectBox Style */
  const defaultSelectStyle = {
    width: "200px",
    backgroundColor: "#EFEFEF",
    borderRadius: "8px",
    textAlign: "center",
    outline: "none",
    cursor: "pointer",
  } as CSSProperties;
  console.log("optionList", optionList);

  /** セレクトボックスの値が変更されたときに実行する関数 */
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    /** id を option_value に Set している */
    const id = event.target.value;
    /** 型を合わせた上で、select した target を find する */
    const targetOption = optionList.find((option) => option.id === Number(id));
    console.log("targetOption", targetOption);
    if (targetOption) {
      setter(targetOption);
    }
  };

  return (
    <div style={wrapperStyle ? wrapperStyle : defaultSelectWrapper}>
      <select
        id={selectId}
        onChange={(e) => handleSelectChange(e)}
        defaultValue={defaultSelectVal}
        style={selectStyle ? selectStyle : defaultSelectStyle}
        disabled={disabled}
      >
        {/* option タグでは、value が、option の 値になり、label が option の表示内容になる */}
        {optionList.map((option, idx) => (
          <option value={option.id} key={idx} label={option.name} />
        ))}
      </select>
    </div>
  );
};

export default CustomStyleSelectBox;
