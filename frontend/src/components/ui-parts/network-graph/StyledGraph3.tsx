import React from "react";
import CytoscapeComponent from "react-cytoscapejs";

function StyledGraph3() {
  console.log("StyledGraph3");
  const elements = [
    { data: { id: "one", label: "Node 1" }, position: { x: 100, y: 100 } },
    { data: { id: "two", label: "Node 2" }, position: { x: 200, y: 200 } },
    { data: { id: "three", label: "Node 3" }, position: { x: 200, y: 100 } },
    { data: { id: "four", label: "Node 4" }, position: { x: 100, y: 200 } },
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
    {
      data: {
        source: "two",
        target: "four",
        label: "Edge from Node2 to Node4",
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
    {
      selector: "#four",
      style: {
        label: "data(label)",
        width: 20,
        height: 20,
        shape: "rectangle",
        backgroundColor: "red",
        borderColor: "blue",
        borderWidth: 3,
      },
    },
    {
      selector: '[label="Edge from Node2 to Node4"]',
      style: {
        width: 10,
        lineColor: "blue",
        lineStyle: "dotted",
      },
    },
  ];
  return (
    <div>
      <h1>selectorでスタイルを変える</h1>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "300px", height: "300px" }}
        cy={(cy) => cy.style(cyStylesheet)}
      />
    </div>
  );
}

export default StyledGraph3;
