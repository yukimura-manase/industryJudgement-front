import { useState, useRef, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import styled from "styled-components";
/** Material_UI_Icons */
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

/** SVG_Icons */
import CSVFileIcon from "../assets/icons/csv_file.svg";
import ExclamationTriangleIcon from "../assets/icons/exclamation_triangle.svg";

/** Component_Test */
import TableList from "./ui-parts/table/TableList";

/** CSV to JavaScript */
import { parse } from "papaparse";

import { industryStates } from "../store/Industry";
import { useProxy } from "valtio/utils";
import { Loading } from "./ui-parts/loading/Loading";
import { downloadCSV, convertObjectListToCSV } from "../utils/csv/csv";

/** 行(Row)のDataType */
interface JsonDataType {
  [key: string]: any;
}
/** TableDataのType */
interface TableDataType {
  columnKeyList: string[];
  rowDataList: JsonDataType[];
}

const App = () => {
  /** CSV_File_State & Upload */
  const [csvFile, setCSV] = useState<Blob | MediaSource | undefined>(undefined);

  /** 削除_BtnのDisabled制御 => Default: true */
  const [isDisabledDeleteBtn, setIsDisabledDeleteBtn] = useState<boolean>(true);

  /**
   * SetされたCSV_Fileの参照情報を確認するための ref_Data: Reference_Data
   * => 初期値を undefined にすると、型エラー => null を設定する
   */
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const csvSetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log("event.target.files", event.target.files);
      console.log("fileInputRef", fileInputRef);
      setCSV(event.target.files[0]);
      setIsDisabledDeleteBtn(false);
    }
  };

  /** CSVファイルをJSデータに変換するパーサー */
  const fileParser = (file: File) => {
    return new Promise((resolve, reject) => {
      parse(file, {
        complete: (results: any) => {
          resolve(results?.data);
        },
        error: () => {
          reject(new Error("csv parse err"));
        },
      });
    });
  };

  // 制御・Flag
  const [isIndustyProcess, setIndustryProcess] = useState<boolean>(false);

  // 業種判定の JSONデータ
  const [industryJsonCsvData, setIndustryJsonCsvData] = useState<
    JsonDataType[] | undefined
  >(undefined);

  // Table_Componentに渡すDataSet: Table_Props_Data
  const [industryTableData, setIndustryTableData] = useState<
    TableDataType | undefined
  >(undefined);

  // jsonCsvData の変更を監視する
  useEffect(() => {
    if (industryJsonCsvData) {
      // Table_Props_Data を作成する
      const columnKeyList = createTableColumnKeyList(industryJsonCsvData[0]);
      setIndustryTableData({
        columnKeyList: columnKeyList,
        rowDataList: industryJsonCsvData,
      });
      // Table_Component_Display_Flag
      setIndustryProcess(true);
    }
  }, [industryJsonCsvData]);

  const industryStatesProxy = useProxy(industryStates);

  // Loading表示
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /** 1つ1つ ChatGPTに業種判定をさせる処理 */
  const createIndustyCSV_2 = async () => {
    console.log("1つ1つ ChatGPTに業種判定をさせる処理");
    try {
      if (csvFile) {
        // 1. FormData_Instanceを作成する
        // const formData = new FormData();
        // let csv = csvFile as Blob;
        // formData.append("file", csv);

        // 表示されている場合は、表示を OFF にする
        setIsCSVInfoDisplay(false);

        // Loading処理
        setIsLoading(true);

        // 2. CSV データを JSONデータに変換する

        const file = csvFile as File;

        // CSV を JSON に変換した List
        const result = (await fileParser(file)) as any[];

        console.log("result", result);
        // const jsonData = JSON.stringify(result)
        // console.log('jsonData', jsonData);

        /** Column Row */
        const csvColumnRow = result[0] as any[];
        console.log("csvColumnRow", csvColumnRow);

        // setIndustryJsonCsvData(csvColumnRow)

        // 表示制御・ON
        setIndustryProcess(true);

        // 初期値として、Column Key を Set
        industryStatesProxy.industryList.push(csvColumnRow);
        console.log("初期値", industryStatesProxy.industryList);

        // Column Key List を Set
        industryStatesProxy.industryColumnKeyList = csvColumnRow;

        const columnLen = csvColumnRow.length;

        for (const [index, row] of result.entries()) {
          // console.log("index: ", index);
          // console.log("row: ", row);
          // 1. Column 行は、処理しない
          if (index === 0) {
            console.log("Column・行は、処理しない");
            continue;
          }

          // 2. Column の長さと、row の長さが一致しない場合は、改行などの Row
          if (row.length !== columnLen) {
            console.log("改行の行などは、処理しない");
            continue;
          }

          // 送信するParameter
          const requestBody = {
            colmunRow: csvColumnRow,
            targetRow: row,
          };

          console.log("requestBody", requestBody);
          console.log("JSON requestBody", JSON.stringify(requestBody));

          // for 文で、非同期・判定処理を実施する

          // Flask-APIに、Post通信
          const response = await fetch(
            "http://localhost:5001/api/output_industry_csv",
            {
              method: "POST", // HTTP-Methodを指定する！
              headers: {
                "Content-Type": "application/json", //
              },
              body: JSON.stringify(requestBody),
            }
          );
          console.log("業種判定: ", response);

          // レスポンス・レコード
          const jsonData = await response.json();
          console.log("response.json():", jsonData);

          const copyIndustryList = JSON.parse(
            JSON.stringify(industryStatesProxy.industryList)
          );
          console.log("copyIndustryList", copyIndustryList);

          copyIndustryList.push(jsonData);

          // csvColumnRow を key にした Object を作成する

          const recode_obj = {} as any;

          csvColumnRow.forEach((key, columnIdx) => {
            jsonData.forEach((cell: any, cellIdx: number) => {
              if (columnIdx === cellIdx) recode_obj[key] = cell;
            });
          });

          console.log("recode_obj", recode_obj);

          // ColumnKey: 実データ Obj を 追加する
          industryStatesProxy.industryRecodeList.push(recode_obj);
          console.log(
            "レコード・リスト: ",
            industryStatesProxy.industryRecodeList
          );
          console.log(JSON.stringify(industryStatesProxy.industryRecodeList));

          // 業種 List Update
          industryStatesProxy.industryList = copyIndustryList;
          console.log(
            "industryStatesProxy.industryList",
            industryStatesProxy.industryList
          );
        }
      } else {
        alert("CSVファイルを選択してください。");
      }
    } catch (error) {
      console.log("error", error);
      alert(
        `Errorが発生しました。
        \n 処理が完了しているところまでのCSVデータをDownloadします。
        \n Error内容: ${error}`
      );
    } finally {
      // [ すべての処理が完了した後に、CSV を Download する ]
      // 0. どこかで処理が失敗しても、処理が完了しているところまでの CSVデータを Downloadする
      // 1. industryStatesProxy.industryList を CSV に変換する
      // 2. CSVファイルを Downloadする

      console.log("CSVファイル作成処理・Block");

      /** CSVデータを作成 */
      const csvData = convertObjectListToCSV(
        industryStatesProxy.industryRecodeList,
        industryStatesProxy.industryColumnKeyList
      );
      console.log("csvData", csvData);

      // CSV・Download
      downloadCSV(csvData, "result");
      // Loading終了
      setIsLoading(false);
    }
  };

  // SetしているCSV_FileをDeleteする
  const deleteSetFile = () => {
    // console.log("event.target.files[0]", event.target.files[0]);
    if (fileInputRef.current) {
      // SetしているDOM上の CSV_File をDeleteする
      fileInputRef.current.value = "";
    }
    // Stateを削除する
    setCSV(undefined);
    setIsDisabledDeleteBtn(true);
    closeDeleteDialog();
  };

  // Table_Componentに渡すDataSet: Table_Props_Data
  const [displayTableData, setDisplayTableData] = useState<
    TableDataType | undefined
  >(undefined);

  const createTableColumnKeyList = (object: JsonDataType) => {
    return Object.keys(object);
  };

  // Flask-APIで、解析した CSVファイルをJSON化したData
  const [jsonCsvData, setJsonCsvData] = useState<JsonDataType[] | undefined>(
    undefined
  );

  // jsonCsvData の変更を監視する
  useEffect(() => {
    if (jsonCsvData) {
      console.log("jsonCsvData", jsonCsvData);

      // Table_Props_Data を作成する
      const columnKeyList = createTableColumnKeyList(jsonCsvData[0]);
      setDisplayTableData({
        columnKeyList: columnKeyList,
        rowDataList: jsonCsvData,
      });
      // Table_Component_Display_Flag
      setIsCSVInfoDisplay(true);
    }
  }, [jsonCsvData]);

  useEffect(() => {
    if (displayTableData) {
      console.log("Debug ロボ玉");

      console.log("displayTableData", displayTableData);
    }
  }, [displayTableData]);

  /** CSV の中身を表示する 制御・Flag */
  const [isCSVInfoDisplay, setIsCSVInfoDisplay] = useState<boolean>(false);

  // CSVの中身の情報、ColumnやRow_Dataを表示するためのFunction
  const displayCSVInfo = async () => {
    console.log("displayCSVInfo");
    console.log("csvFile", csvFile);
    console.log("typeof", typeof csvFile);

    if (csvFile) {
      // FormData_Instanceを作成する
      const formData = new FormData();
      let csv = csvFile as Blob;

      // key: file
      formData.append("file", csv);
      console.log("formData", formData);

      try {
        // Flask-APIに、Post通信
        const formResponse = await fetch(
          "http://localhost:5001/api/create_csv_info",
          {
            method: "POST", // HTTP-Methodを指定する！
            body: formData, // リクエストボディーにフォームデータを設定
          }
        );

        // Response.json() => 自動で、Parseされる
        const parseDataList = await formResponse.json();
        console.log("parseDataList", parseDataList);
        console.log("parseDataList_typeof", typeof parseDataList);

        // JsonDataをSetする
        setJsonCsvData(parseDataList);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("CSVファイルを選択してください。");
    }
  };

  /** 削除_Dialog */
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false);

  /** 削除ボタン-Click */
  const handleDeleteClick = () => {
    openDeleteDialog();
  };

  /** DeleteDialogを開く処理 */
  const openDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };

  /** DeleteDialogで、キャンセルを押したときの処理 */
  const closeDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  return (
    <AppWrapper>
      <div className="app_wrapper">
        {/* Header */}
        <header className="app_header">
          <h1>Industry Judgement App</h1>
          <p>「業種」情報を判定した新しいCSVを作成するAppです🔥</p>
        </header>

        <main className="main_wrapper">
          {isCSVInfoDisplay ? (
            <div></div>
          ) : (
            // CSV_Image_Icon
            <div className="csv_icon_wrapper">
              <img
                src={CSVFileIcon}
                alt="CSV_image"
                style={{
                  width: "15%",
                }}
              />
            </div>
          )}

          {/* CSV_Upload_Interface */}
          <div className="csv_input_wrapper">
            <label htmlFor="csv_file_input">
              <input
                id="csv_file_input"
                type="file"
                accept=".csv"
                className="custom_file_input"
                onChange={(event) => {
                  csvSetter(event);
                }}
                // SetされたFileを参照するための追跡情報
                ref={fileInputRef}
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              />
            </label>
            {/* Delete-Btn */}
            <span>
              <IconButton
                onClick={() => handleDeleteClick()}
                disabled={isDisabledDeleteBtn}
                className="icon_btn"
                sx={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "#33dbae",
                  },
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </span>
          </div>

          {/* Btn_Wrapper */}
          <div className="btn_wrapper">
            {/* WordCloud作成-Btn */}
            {isLoading ? (
              <Button
                variant="contained"
                onClick={() => createIndustyCSV_2()}
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
                <Loading />
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => createIndustyCSV_2()}
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
                「業種」CSV作成
              </Button>
            )}

            {/* CSV_Info_Display_Btn */}
            <Button
              variant="contained"
              onClick={() => displayCSVInfo()}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                backgroundColor: "darkgray",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              CSVの中身を表示
            </Button>

            {/* CSV_Info_Display_Btn */}
            {/* <Button
              variant="contained"
              onClick={() => excelToCSV()}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                backgroundColor: "darkgray",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              ExcelをCSVに変換
            </Button> */}
          </div>

          {/* CSVを表示する */}
          <div className="display_csv_table_wrapper">
            {
              //  Table_Component
              isCSVInfoDisplay && displayTableData ? (
                <TableList
                  columnKeyList={displayTableData?.columnKeyList}
                  rowDataList={displayTableData?.rowDataList}
                />
              ) : (
                <span></span>
              )
            }
          </div>

          {/* 業種判定後の CSV を表示する */}
          <div className="display_csv_table_wrapper">
            {
              //  Table_Component
              isIndustyProcess && industryStatesProxy.industryList.length ? (
                <TableList
                  columnKeyList={industryStatesProxy.industryColumnKeyList}
                  rowDataList={industryStatesProxy.industryRecodeList}
                />
              ) : (
                <span></span>
              )
            }
          </div>
        </main>
      </div>

      {/* Test_Block */}
      {/* <CustomSettingTable /> */}

      {/* Delete_Dialog */}
      <div>
        <Dialog open={isOpenDeleteDialog} onClose={closeDeleteDialog}>
          {/* Main-Part: Icon & Text */}
          <DialogContent
            sx={{
              padding: "50px 60px 0px 60px",
            }}
          >
            <div className="delete_dialog_icon_wrapper">
              {/* 三角形の注意アイコン */}
              <img
                src={ExclamationTriangleIcon}
                alt=""
                style={{
                  height: "100px",
                  width: "100px",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <p
                style={{
                  color: "red",
                  marginTop: "12px",
                  textAlign: "center",
                  fontSize: "14px",
                }}
              >
                削除の前にご確認ください
              </p>
            </div>
            <div>
              <p
                style={{
                  marginTop: "12px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                削除すると該当のCSVが
                <br />
                選択から外されます。
              </p>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              flexDirection: "row",
              justifyContent: "center",
              gap: "12px",
              padding: "30px",
              // paddingBottom: "40px",
            }}
          >
            <Button
              onClick={closeDeleteDialog}
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                color: "#707070;",
                width: "150px",
                border: "1px solid #e4e4e4",
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
            <Button
              onClick={() => deleteSetFile()}
              autoFocus
              sx={{
                mt: 3,
                mb: -1.5,
                padding: 0.5,
                width: "150px",
                color: "#fff",
                backgroundColor: "red",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#fff",
                },
              }}
            >
              削除
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </AppWrapper>
  );
};

/**  App_ComponentでのStyle */
const AppWrapper = styled.div`
  /* Headerエリアに対するスタイル */
  .app_header {
    height: 15%;
    background-color: #5050e1;
    color: #fff;
    text-align: center;
  }
  /* Mainエリアに対するスタイル */
  .main_wrapper {
    text-align: center;
    padding: 5%;
  }
  /* CSV_Iconエリアに対するスタイル */
  .csv_icon_wrapper {
    width: 100%;
    text-align: center;
  }
  /* CSV_File_Inputエリアに対するスタイル */
  .csv_input_wrapper {
    margin-top: 35px;
  }
  /* Btnエリアに対するスタイル */
  .btn_wrapper {
    display: flex;
    justify-content: center;
    gap: 5%;
    margin-top: 12%;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 50px;
  }
  /* CSV の表示 Wrapper スタイル */
  .display_csv_table_wrapper {
    margin-top: 35px;
  }
`;

export default App;
