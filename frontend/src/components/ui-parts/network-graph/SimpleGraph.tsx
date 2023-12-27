import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

/** Simple な Graph Component */
function SimpleGraph() {
  /**
   * Node・Element
   * => ノードとエッジを定義したelementsをCytoscapeComponentに渡すだけでグラフが描画されます。
   */
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
  ];
  return (
    <div style={{ width: "500px", height: "500px" }}>
      <h1>単純なグラフ</h1>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "600px", height: "600px" }}
      />
    </div>
  );
}

export default SimpleGraph;
