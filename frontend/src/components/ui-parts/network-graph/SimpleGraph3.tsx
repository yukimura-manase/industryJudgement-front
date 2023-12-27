import React from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { ElementDefinition } from "cytoscape";

function SimpleGraph3() {
  const nodesLength = 10;
  let elements: ElementDefinition[] = [];
  for (let i = 0; i < nodesLength; i++) {
    elements.push({ data: { id: String(i), label: "Node " + i } });
  }

  for (let l = 0; l < nodesLength; l++) {
    for (let r = 0; r < nodesLength; r++) {
      elements.push({
        data: { source: l, target: r, label: "Edge from " + l + " to " + r },
      });
    }
  }

  const layout1 = { name: "random" };
  const layout2 = { name: "grid" };
  const layout3 = { name: "circle" };
  const layout4 = { name: "concentric" };
  const layout5 = { name: "breadthfirst" };
  const layout6 = { name: "cose" };

  return (
    <div>
      <h1>自動レイアウトしたグラフ</h1>
      random
      <CytoscapeComponent
        elements={elements}
        layout={layout1}
        style={{ width: "300px", height: "300px" }}
      />
      grid
      <CytoscapeComponent
        elements={elements}
        layout={layout2}
        style={{ width: "300px", height: "300px" }}
      />
      circle
      <CytoscapeComponent
        elements={elements}
        layout={layout3}
        style={{ width: "300px", height: "300px" }}
      />
      concentric
      <CytoscapeComponent
        elements={elements}
        layout={layout4}
        style={{ width: "300px", height: "300px" }}
      />
      breadthfirst
      <CytoscapeComponent
        elements={elements}
        layout={layout5}
        style={{ width: "300px", height: "300px" }}
      />
      cose
      <CytoscapeComponent
        elements={elements}
        layout={layout6}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
}

export default SimpleGraph3;
