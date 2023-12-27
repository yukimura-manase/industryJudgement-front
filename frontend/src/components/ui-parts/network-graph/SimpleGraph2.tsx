import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

function SimpleGraph2() {
  return (
    <div>
      <h1>単純なグラフ2</h1>
      <CytoscapeComponent
        style={{ width: "300px", height: "300px" }}
        // CytoscapeComponent.normalizeElements() を使用して描画することもできます。
        elements={CytoscapeComponent.normalizeElements({
          nodes: [
            {
              data: { id: "one", label: "Node 1" },
              position: { x: 100, y: 100 },
            },
            {
              data: { id: "two", label: "Node 2" },
              position: { x: 200, y: 200 },
            },
          ],
          edges: [
            {
              data: {
                source: "one",
                target: "two",
                label: "Edge from Node1 to Node2",
              },
            },
          ],
        })}
      />
    </div>
  );
}

export default SimpleGraph2;
