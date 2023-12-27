// import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

/** 行(Row)のDataType */
export interface RowDataType {
  [key: string]: any;
}

/** Propsの型定義 */
interface PropsType {
  columnKeyList: string[];
  rowDataList: RowDataType[];
}

/**  TableのComponent => 縦型(Column_Key)のTableList */
const TableList = (props: PropsType) => {
  // props.columnKey
  console.log("TableList_Props", props);
  const columnKeyList = props.columnKeyList;
  const rowDataList = props.rowDataList;
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columnKeyList.map((key, index) => {
            return <TableCell key={index}>{key}</TableCell>;
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowDataList.map((recode, index) => (
          <TableRow key={index}>
            {
              // Recode(Object) の Key と ColumnKey が一致する場合は、それを表示する
              columnKeyList.map((key, index_2) => {
                if (recode.hasOwnProperty(key)) {
                  return <TableCell key={index_2}>{recode[key]}</TableCell>;
                }
              })
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableList;
