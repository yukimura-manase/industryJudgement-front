import MemberListStore from "./MemberListStore";
import { proxy } from "valtio";
import { MemberType } from "../types/member";
import { Store } from "../types/store";

/**
 * NOTE: SelectDetailMemberStore
 * => Userが、画面上で、Select して、詳細画面を表示している Member の 情報を保持する Store
 */
export const states = proxy({
  selectDetailMember: {}, // Detail 画面を表示中の Select 中の Member
  prevMember: {}, // 1つ前の Member
  nextMember: {}, // 次の Member
});

/** Setter */
export const actions = {
  setSelectDetailMember(currentMember: MemberType) {
    states.selectDetailMember = currentMember;
    // currentMember の変更後に、他、2つを算出する
    computeds.getPrevAndNextMember(currentMember);
  },
  setPrevMember(prevMember: MemberType) {
    states.prevMember = prevMember;
  },
  setNextMember(nextMember: MemberType) {
    states.nextMember = nextMember;
  },
};

/**
 * Stateの変更の後に 算出する_Functions
 * => Vue でいうような Computed のような役割を自作で定義してみる
 */
const computeds = {
  /** 現在のDetail表示 Memberの情報から、前後の Member情報を取得する Func */
  getPrevAndNextMember(currentMember: MemberType) {
    /** 表示中 Member の id */
    const currentMemberId = currentMember.id;
    /** Memeber の一覧 List */
    const MemberList = MemberListStore.states.MemberList;
    /** 表示中の Member の index */
    const currentMemberIdx = MemberList.findIndex(
      (Member: MemberType) => Member.id === currentMemberId
    );
    /**
     * NOTE: 前の Member が取得できる場合は、それをSetする
     * => currentMember が、配列の最初であるために、取得できない場合は、配列の最後のユーザーをSetする
     * => 循環するようにする
     */
    let prevMember = MemberList[currentMemberIdx - 1];
    // console.log('prevMember', prevMember);
    if (prevMember === undefined) {
      // currentMember が、配列の最初であるために、取得できない場合は、配列の最後のユーザーをSetする
      prevMember = MemberList[MemberList.length - 1];
    }
    actions.setPrevMember(prevMember);

    /**
     * NOTE: 後の Memberが取得できる場合は、それをSetする
     * => currentMember が、配列の最後であるために、取得できない場合は、配列の最初のユーザーをSetする
     * => 循環するようにする
     */
    let nextMember = MemberList[currentMemberIdx + 1];
    // console.log('nextMember', nextMember);
    if (nextMember === undefined) {
      // currentMember が、配列の最後であるために、取得できない場合は、配列の最初のユーザーをSetする
      nextMember = MemberList[0];
    }
    actions.setNextMember(nextMember);
  },
};

/** States(値)と、Actions(Setter) を保持した Store */
export const SelectDetailMemberStore: Store = {
  states,
  actions,
};

export default SelectDetailMemberStore;
