import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

function StyledGraph2() {
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    { data: { id: "three", label: "Node 3" }, position: { x: 200, y: 100 } },
    {
      data: { source: "one", target: "two", label: "Edge from Node1 to Node2" },
    },
    {
      data: {
        source: "two",
        target: "three",
        label: "Edge from Node2 to Node3",
      },
    },
  ];
  const cyStylesheet = [
    {
      selector: "node",
      style: {
        label: "data(label)",
        width: 20,
        height: 20,
        shape: "rectangle",
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 3,
      },
    },
    {
      selector: "edge",
      style: {
        width: 10,
        lineColor: "green",
        lineStyle: "dashed",
      },
    },
  ];
  return (
    <div>
      <h1>全体にスタイルをつけたグラフ</h1>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "300px", height: "300px" }}
        cy={(cy) => cy.style(cyStylesheet)}
      />
    </div>
  );
}

export default StyledGraph2;
