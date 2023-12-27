// 1. Valtio の proxy を import
import { proxy } from "valtio";

// 2. 状態オブジェクト(State)を作成
const state = proxy({ count: 0 });

export default function ValtioTest() {
  return (
    <div>
      <p>Count: {state.count}</p>
      {/* 3. State を Update する */}
      <button onClick={() => (state.count += 1)}>プラス</button>
      <button onClick={() => (state.count -= 1)}>マイナス</button>
    </div>
  );
}
