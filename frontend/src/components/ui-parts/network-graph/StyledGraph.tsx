import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

function StyledGraph() {
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    {
      data: { id: "three", label: "Node 3" },
      position: { x: 200, y: 100 },
      style: {
        width: 20,
        height: 20,
        shape: "rectangle",
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 3,
      },
    },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
    {
      data: {
        source: "two",
        target: "three",
        label: "Edge from Node2 to Node3",
      },
      style: {
        width: 10,
        lineColor: "green",
        lineStyle: "dashed",
      },
    },
  ];
  return (
    <div>
      <h1>スタイルをつけたグラフ</h1>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}

export default StyledGraph;
