import { Box, Grid, MenuItem, Select, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

// IconButton関係
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

/** 行(Row)のDataType */
interface RowDataType {
  target: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

/** Column_Types(Literal_Union_Types) */
const rowConfigList = ["Target", "Create", "Read", "Update", "Delete"] as const;
type ColumnTypes = (typeof rowConfigList)[number];

/** Table_Data_Type */
interface TableDataType {
  id: number;
  rows: RowDataType[];
}

// TODO: Propsを後から、導入する
/** Propsの型定義 */
interface PropsType {
  columnKeyList: ColumnTypes[];
  rowDataList: RowDataType[];
}

// TODO: Props を導入する => props: PropsType
/** 設定を変えることのできる 設定_Customize_Table */
const CustomSettingTable = () => {
  // console.log("CustomSettingTable_Props", props);
  // const columnKeyList = props.columnKeyList;
  // const rowDataList = props.rowDataList;

  /** Columns_Title_Data: Thead */
  const columns: ColumnTypes[] = [
    "Target",
    "Create",
    "Read",
    "Update",
    "Delete",
  ];

  /** Table_Setting_Data: 設定データ_Object */
  const tableSettingData: TableDataType = {
    id: 1,
    rows: [
      {
        target: "Sランクユーザー",
        create: true,
        read: true,
        update: true,
        delete: true,
      },
      {
        target: "Aランクユーザー",
        create: true,
        read: true,
        update: true,
        delete: false,
      },
      {
        target: "Bランクユーザー",
        create: true,
        read: true,
        update: false,
        delete: false,
      },
      {
        target: "Cランクユーザー",
        create: true,
        read: false,
        update: false,
        delete: false,
      },
      {
        target: "Dランクユーザー",
        create: false,
        read: false,
        update: false,
        delete: false,
      },
    ],
  };

  /** Displayする TableData */
  const [dispTableSettingData, setDispTableSettingData] = useState<
    TableDataType | undefined
  >(undefined);

  /** キャンセルする際に、Setする 編集直前の Edit_Prev_Table_Data */
  const [prevTableSettingData, setPrevTableSettingData] = useState<
    TableDataType | undefined
  >(undefined);

  // 初回だけ起動する_useEffect => PrevDataをSetする
  useEffect(() => {
    /** 取得した TableData を DeepCopyして Display用のData と、Edit_CancelのためのPrev_Data として Setする */
    const deepCopyTableData: TableDataType = JSON.parse(
      JSON.stringify(tableSettingData)
    );
    console.log("初回_Set");
    console.log("deepCopyTableData", deepCopyTableData);

    setDispTableSettingData(deepCopyTableData);
    setPrevTableSettingData(deepCopyTableData);
  }, []);

  /** 新規作成モード, 編集モード, 削除モードになっているときは、モード以外の Btnは、disable状態にする */
  const [disableMode, setDisableMode] = useState<{
    isAdd: boolean;
    isEdit: boolean;
    isDelete: boolean;
  }>({ isAdd: false, isEdit: false, isDelete: false });

  /** 編集モードの制御_Flag */
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const handleEditClick = () => {
    /** DeepCopyした TableData を Prev_Data として Setする */
    const deepCopyTableData: TableDataType = JSON.parse(
      JSON.stringify(prevTableSettingData)
    );
    setPrevTableSettingData(deepCopyTableData);
    // 他のBtn_DisableMode
    setDisableMode({ isAdd: true, isEdit: false, isDelete: true });
    setIsEditMode(true);
  };

  /** Table-セルの Click-イベント => ○/- を Switchする */
  const selectChangeTableCell = (
    index: number,
    type: "create" | "read" | "update" | "delete"
  ) => {
    console.log("Table-Select-Change");
    console.log("index", index);
    console.log("type", type);

    // 編集をStateに反映させる。
    if (dispTableSettingData) {
      const deepCopyTableData: TableDataType = JSON.parse(
        JSON.stringify(dispTableSettingData)
      );
      const rows = deepCopyTableData.rows;
      console.log("rows", rows);

      rows[index][type] = !rows[index][type];
      console.log("rows_2", rows);

      deepCopyTableData.rows = rows;

      // DisplayData
      setDispTableSettingData(deepCopyTableData);
    }
  };

  /** 反映ボタンの実行処理 */
  const onEditReflect = () => {
    // 選択中の userCategoryTable をUpdateする
    if (dispTableSettingData) {
      // Prev に最新の TableData を Setする
      setPrevTableSettingData(dispTableSettingData);

      // MEMO: 本来であれば、ここで、BackEndに、UpdateしたDataを送信する
    }
    // 編集モードを終了する
    setDisableMode({ isAdd: false, isEdit: false, isDelete: false });
    setIsEditMode(false);
  };

  /** 編集モードのキャンセルボタンの処理 */
  const onEditCancel = () => {
    // Display_Data に Prev_Data を Setする => Edit_Cancel
    setDispTableSettingData(prevTableSettingData);
    setDisableMode({ isAdd: false, isEdit: false, isDelete: false });
    setIsEditMode(false);
  };

  return (
    <CustomSettingTableWrapper>
      <Grid
        container
        sx={{
          padding: "17px 0 30px 30px",
        }}
      >
        {/* Table構造 */}
        <div className="table_wrapper">
          <table className="category_config_table">
            <thead>
              {/* Column名 */}
              <tr>
                {columns.map((column: ColumnTypes, index: number) => {
                  return <th key={index}>{column}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {/* tbody は、 dispTableSettingData から作成・表示する */}
              {dispTableSettingData ? (
                dispTableSettingData.rows.map(
                  (row: RowDataType, index: number) => {
                    return (
                      <tr key={index}>
                        {/* Target名_td */}
                        <td>{row.target}</td>

                        {/* Create_td */}
                        {isEditMode ? (
                          <td
                            className={
                              row.create
                                ? "table_td_select"
                                : "table_td_select disabled_dash_td"
                            }
                          >
                            <Select
                              labelId="category-config-select-label"
                              id="category-config-select"
                              value={row.create ? "○" : "-"}
                              onChange={() =>
                                selectChangeTableCell(index, "create")
                              }
                              className="table_td_select_selectbox"
                              sx={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                opacity: "0",
                                "&:focus": {
                                  borderColor: "green",
                                  outline: "none",
                                  opacity: "1",
                                },
                              }}
                            >
                              <MenuItem
                                value="○"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "28px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "green",
                                    outline: "none",
                                    opacity: "1",
                                  },
                                }}
                              >
                                ○
                              </MenuItem>
                              <MenuItem
                                value="-"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "16px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "#00D4B2", // フォーカス時のボーダーの色
                                  },
                                }}
                              >
                                ー
                              </MenuItem>
                            </Select>
                            <span
                              style={{
                                paddingLeft: "45%",
                              }}
                            >
                              {row.create ? "○" : "ー"}
                            </span>
                            <span className="arrow">▼</span>
                          </td>
                        ) : (
                          <td className={row.create ? "circle" : "dash_solid"}>
                            {row.create ? "○" : "ー"}
                          </td>
                        )}

                        {/* Read_td */}
                        {isEditMode ? (
                          <td
                            className={
                              row.read
                                ? "table_td_select"
                                : "table_td_select disabled_dash_td"
                            }
                          >
                            <Select
                              labelId="category-config-select-label"
                              id="category-config-select"
                              value={row.read ? "○" : "-"}
                              onChange={() =>
                                selectChangeTableCell(index, "read")
                              }
                              className="table_td_select_selectbox"
                              sx={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                opacity: "0",
                                "&:focus": {
                                  borderColor: "green",
                                  outline: "none",
                                  opacity: "1",
                                },
                              }}
                            >
                              <MenuItem
                                value="○"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "28px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "green",
                                    outline: "none",
                                    opacity: "1",
                                  },
                                }}
                              >
                                ○
                              </MenuItem>
                              <MenuItem
                                value="-"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "16px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "#00D4B2", // フォーカス時のボーダーの色
                                  },
                                }}
                              >
                                ー
                              </MenuItem>
                            </Select>
                            <span
                              style={{
                                paddingLeft: "45%",
                              }}
                            >
                              {row.read ? "○" : "ー"}
                            </span>
                            <span className="arrow">▼</span>
                          </td>
                        ) : (
                          <td className={row.read ? "circle" : "dash_solid"}>
                            {row.read ? "○" : "ー"}
                          </td>
                        )}

                        {/* Update */}
                        {isEditMode ? (
                          <td
                            className={
                              row.update
                                ? "table_td_select"
                                : "table_td_select disabled_dash_td"
                            }
                          >
                            <Select
                              labelId="category-config-select-label"
                              id="category-config-select"
                              value={row.update ? "○" : "-"}
                              onChange={() =>
                                selectChangeTableCell(index, "update")
                              }
                              className="table_td_select_selectbox"
                              sx={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                opacity: "0",
                                "&:focus": {
                                  borderColor: "green",
                                  outline: "none",
                                  opacity: "1",
                                },
                              }}
                            >
                              <MenuItem
                                value="○"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "28px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "green",
                                    outline: "none",
                                    opacity: "1",
                                  },
                                }}
                              >
                                ○
                              </MenuItem>
                              <MenuItem
                                value="-"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "16px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "#00D4B2", // フォーカス時のボーダーの色
                                  },
                                }}
                              >
                                ー
                              </MenuItem>
                            </Select>
                            <span
                              style={{
                                paddingLeft: "45%",
                              }}
                            >
                              {row.update ? "○" : "ー"}
                            </span>
                            <span className="arrow">▼</span>
                          </td>
                        ) : (
                          <td className={row.update ? "circle" : "dash_solid"}>
                            {row.update ? "○" : "ー"}
                          </td>
                        )}

                        {/* Delete */}
                        {isEditMode ? (
                          <td
                            className={
                              row.delete
                                ? "table_td_select"
                                : "table_td_select disabled_dash_td"
                            }
                          >
                            <Select
                              labelId="category-config-select-label"
                              id="category-config-select"
                              value={row.delete ? "○" : "-"}
                              onChange={() =>
                                selectChangeTableCell(index, "delete")
                              }
                              className="table_td_select_selectbox"
                              sx={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                opacity: "0",
                                "&:focus": {
                                  borderColor: "green",
                                  outline: "none",
                                  opacity: "1",
                                },
                              }}
                            >
                              <MenuItem
                                value="○"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "28px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "green",
                                    outline: "none",
                                    opacity: "1",
                                  },
                                }}
                              >
                                ○
                              </MenuItem>
                              <MenuItem
                                value="-"
                                className="table_td_select_option_data"
                                sx={{
                                  width: "100%",
                                  fontSize: "16px",
                                  paddingLeft: "45%",
                                  "&:focus": {
                                    borderColor: "#00D4B2", // フォーカス時のボーダーの色
                                  },
                                }}
                              >
                                ー
                              </MenuItem>
                            </Select>
                            <span
                              style={{
                                paddingLeft: "45%",
                              }}
                            >
                              {row.delete ? "○" : "ー"}
                            </span>
                            <span className="arrow">▼</span>
                          </td>
                        ) : (
                          <td className={row.delete ? "circle" : "dash_solid"}>
                            {row.delete ? "○" : "ー"}
                          </td>
                        )}
                      </tr>
                    );
                  }
                )
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
          {/* 反映_Btn & キャンセル_Btn Block */}
          {isEditMode ? (
            <div className="edit_btn">
              {/* キャンセル-Btn */}
              <Button
                variant="contained"
                // color="primary"
                onClick={onEditCancel}
                sx={{
                  mt: 3,
                  mb: -1.5,
                  padding: 0.5,
                  color: "#707070;",
                  width: "150px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#3c52b2",
                    color: "#fff",
                  },
                }}
              >
                キャンセル
              </Button>

              {/* 反映-Btn */}
              <Button
                variant="contained"
                // color="inherit"
                onClick={onEditReflect}
                sx={{
                  mt: 3,
                  mb: -1.5,
                  padding: 0.5,
                  width: "150px",
                  backgroundColor: "#33dbae",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#3c52b2",
                    color: "#fff",
                  },
                }}
              >
                反映
              </Button>
            </div>
          ) : (
            <span></span>
          )}
        </div>

        {/* Icon_Btn */}
        <Box className="icon_wrapper">
          {/* Edit-Btn */}
          <IconButton
            onClick={handleEditClick}
            disabled={disableMode.isEdit}
            className="icon_btn"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              "&:hover": {
                color: "#fff",
                backgroundColor: "#33dbae",
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Grid>
    </CustomSettingTableWrapper>
  );
};

/** CustomSettingTable_Wrapper: Style定義 */
const CustomSettingTableWrapper = styled.div`
  /* ユーザーカテゴリ名-Font */
  .font14 {
    height: 14px;
    font-size: 14px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }

  /* ユーザーカテゴリーのSelectBox-Wrapper */
  .category_select_wrapper {
    width: 400px;
    margin-top: 20px;
  }

  /* ユーザーカテゴリーのSelectBox */
  .category_select_box {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: solid 1px #e4e4e4;
    background-color: #fff;
    font-weight: 900;
    color: #707070;
  }

  /* ユーザーカテゴリーの新規作成・編集の際の追加-Style */
  .create_edit_mode {
    padding: 16.5px 14px;
  }

  .disabled_field {
    background-color: rgba(0, 0, 0, 0.02);
  }

  /* Icon_BtnのWrapper */
  .icon_wrapper {
    margin-top: 30px;
    margin-left: 20px;
  }

  /* Icon_BtnのBaseStyle */
  .icon_btn {
    margin-right: 20px;
    border-radius: 20px;
  }

  /* ユーザーカテゴリー設定のTable_Wrapper */
  .table_wrapper {
    width: 80%;
    margin-top: 30px;
    padding: 40px 30px;
    background-color: #fff;
    border: solid 1px #e4e4e4;
    border-radius: 10px;
    font-weight: 900;
    color: #707070;
  }

  /* ユーザーカテゴリー設定のTable */
  .category_config_table {
    border-collapse: collapse;
    border: solid 1px #e4e4e4;
    table-layout: fixed;
    width: 100%;
    margin: 0 auto;
  }

  /* ユーザーカテゴリー設定のTableのセルに対して */
  .category_config_table th,
  td {
    border: 1px solid #e4e4e4;
    padding: 5px;
    width: 25%;
  }

  /* thにだけ */
  .category_config_table th {
    background-color: rgba(0, 0, 0, 0.04);
  }

  /* 制限がかかっているハイフンな td にだけ */
  .disabled_dash_td {
    background-color: rgba(0, 0, 0, 0.04);
  }

  /* 丸のスタイル */
  .circle {
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 50%;
    text-align: center;
    font-weight: 500;
  }

  /* ハイフンのスタイル */
  .dash_solid {
    background-color: rgba(0, 0, 0, 0.04);
    text-align: center;
    font-weight: 100;
  }

  /* 編集モードの際の td に対する Table-Cell-Style */
  .table_td_select {
    padding: 0px;
    position: relative;
  }

  .table_td_select:focus {
    outline: orange 2px solid;
  }

  /* 編集モードの際の SelectBox に対する Table-Cell-Style */
  .table_td_select_selectbox {
    width: 100%;
    padding: 0px;
    border: skyblue 2px inset;
  }

  .table_td_select_option_data {
    padding: 0px;
  }

  /* 逆三角形のスタイル */
  .arrow {
    float: right;
    font-size: 12px;
    margin-left: -12px;
    margin-right: 5px;
  }

  /* キャンセルと反映の Btn-Style */
  .edit_btn {
    display: flex;
    flex-direction: row;
    align-content: space-between;
    justify-content: flex-end;
    align-items: center;
    gap: 25px;
  }

  .delete_dialog_icon_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export default CustomSettingTable;
