/** Objectのリストから、CSVを作成する */
export const convertObjectListToCSV = (
  data: Record<string, any>[],
  headerOrder: string[]
): string => {
  /** headerOrderを入れているのは、JavaScriptの場合Object.keys()だと順番が必ずしも守られないからです。 */
  const headerString = headerOrder.join(",");
  const replacer = (_: string, value: any) => value ?? "";
  const rowItems = data.map((row) =>
    headerOrder
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(",")
  );

  /** headerとコンテンツ部分を結合して、CSVフォーマットの文字列を作成する */
  const csv = [headerString, ...rowItems].join("\r\n");
  return csv;
};

/** 配列のリスト・CSV形式から、ObjectListのCSV形式に変換する */
export const convertArrayToObjectList = (listCSV: any[]) => {
  // console.log("CSV変換のためのフォーマット処理");
  const headers = listCSV[0];
  const newList = listCSV.slice(1).map((row) => {
    let obj = {} as any;
    row.forEach((value: any, index: number) => {
      obj[headers[index]] = value;
    });
    return obj;
  });
  return newList;
};

/** Download・処理 */
export const downloadCSV = (data: string, name: string) => {
  /** Blob Object を作成する Type. CSV */
  const blob = new Blob([data], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", `${name}.csv`);
  a.click();
  a.remove();
};
