import { proxy } from "valtio";
import { Store } from "../types/store";
import { RowDataType } from "../components/ui-parts/table/TableList";

/** 電話番号から、会社名を判定する処理・関連の State Store */
export const phoneNumberStates = proxy({
  // 元データ: Downloadにも使用する
  phoneNumberList: [] as any[],

  // Column の key List
  phoneNumberColumnKeyList: [] as string[],

  // Recode(行) List
  phoneNumberRecodeList: [] as RowDataType[],
});

/** 2. Setter を定義する => State を Update する Func */
export const actions = {
  // setMemberList(v: MemberType[]) {
  //   states.memberList = v;
  // },
};

/** 3. States(値)と、Actions(Setter) を保持した Store を定義する */
export const PhoneNumberStore: Store = {
  states: phoneNumberStates,
  actions,
};

export default PhoneNumberStore;
