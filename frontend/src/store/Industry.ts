import { proxy } from "valtio";
import { Store } from "../types/store";
import { RowDataType } from "../components/ui-parts/table/TableList";

export const industryStates = proxy({
  // 元データ: Downloadにも使用する
  industryList: [] as any[],

  // Column の key List
  industryColumnKeyList: [] as string[],

  // Recode(行) List
  industryRecodeList: [] as RowDataType[],
});

/** 2. Setter を定義する => State を Update する Func */
export const actions = {
  // setMemberList(v: MemberType[]) {
  //   states.memberList = v;
  // },
};

/** 3. States(値)と、Actions(Setter) を保持した Store を定義する */
export const MemberListStore: Store = {
  states: industryStates,
  actions,
};

export default MemberListStore;
