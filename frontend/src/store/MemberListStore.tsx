import { proxy } from "valtio";
import { MemberType } from "../types/member";
import { Store } from "../types/store";

/**
 * NOTE: MemberListStore
 * => MemberのListを保持する Store
 */

/** 1. States を定義する => 状態オブジェクトを作成する */
export const states = proxy({
  /** Member の検索結果・一覧 Data */
  memberList: [] as MemberType[],
});

/** 2. Setter を定義する => State を Update する Func */
export const actions = {
  setMemberList(v: MemberType[]) {
    states.memberList = v;
  },
};

/** 3. States(値)と、Actions(Setter) を保持した Store を定義する */
export const MemberListStore: Store = {
  states,
  actions,
};

export default MemberListStore;
