import MemberListStore from "../../store/MemberListStore";
import { useSnapshot } from "valtio";
import { MemberType } from "../../types/member";

const RobotamaFanClub = () => {
  /** 1. React Component の内部で、Dataを参照する場合は、 useSnapshot() を使用する */
  const memberListStore = useSnapshot(MemberListStore.states);
  const memberList = memberListStore.memberList as MemberType[];

  const onClickHandler = () => {
    /** 2. React Component から、State を Updateする場合  */
    MemberListStore.actions.setMemberList(memberList);
  };

  return (
    <div>
      <button
        onClick={() => {
          onClickHandler();
        }}
      >
        State Update
      </button>
    </div>
  );
};

export default RobotamaFanClub;
