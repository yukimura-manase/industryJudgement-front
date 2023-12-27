import { CSSProperties } from "react";

// import { VisData } from "vis-network/declarations/network/gephiParser";
import React, { useEffect, useRef } from "react";
import { Options, Edge, Node, Network } from "vis-network";
import { DataSet } from "vis-data";

/** Propsの型定義 */
interface PropsType {
  style?: CSSProperties;
  color?: string;
}

const generateDataFromNodes = (nodes: any, parentNodeId: any) => ({
  nodes: nodes,
  edges: nodes.map((node: any) => ({ from: parentNodeId, to: node.id })),
});

/**
 * NOTE: NetworkGraph
 * => リスト表示 の SVG_Icon
 */
const NetworkGraph = (props: PropsType) => {
  // // create an array with nodes
  // var nodes = new vis.DataSet([
  //   { id: 1, label: "Node 1" },
  //   { id: 2, label: "Node 2" },
  //   { id: 3, label: "Node 3" },
  //   { id: 4, label: "Node 4" },
  //   { id: 5, label: "Node 5" },
  // ]);

  // // create an array with edges
  // var edges = new vis.DataSet([
  //   { from: 1, to: 3 },
  //   { from: 1, to: 2 },
  //   { from: 2, to: 4 },
  //   { from: 2, to: 5 },
  //   { from: 3, to: 3 },
  // ]);

  // // create a network
  // var container = document.getElementById("mynetwork");
  // var data = {
  //   nodes: nodes,
  //   edges: edges,
  // };
  // var options = {};
  // var network = new vis.Network(container, data, options);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default NetworkGraph;
