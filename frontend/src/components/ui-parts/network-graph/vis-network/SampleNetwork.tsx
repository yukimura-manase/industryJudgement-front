import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

const generateDataFromNodes = (nodes: any, parentNodeId: any) => ({
  nodes: nodes,
  edges: nodes.map((node: any) => ({ from: parentNodeId, to: node.id })),
});

const controlNodes = [
  {
    id: "extractedFilesNode",
    label: "Extracted Files \n(3)",
    shape: "custom",
    visible: true,
    ctxRenderer: ({
      ctx,
      id,
      x,
      y,
      state: { selected, hover },
      style,
    }: any) => {
      const drawNode = () => {
        const points = [
          { value: 1, color: "red" },
          { value: 0, color: "orange" },

          { value: 0, color: "blue" },
        ];
        const radius = 30;
        const totalValue = points.reduce((sum, point) => sum + point.value, 0);
        let startAngle = 0;

        for (let i = 0; i < points.length; i++) {
          const point = points[i];
          const slicePercentage = point.value / totalValue;
          const endAngle = startAngle + 2 * Math.PI * slicePercentage;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.arc(x, y, radius, startAngle, endAngle - 0.1, false);
          ctx.closePath();

          ctx.fillStyle = point.color; // Set the color of the chart chunk
          ctx.fill();

          ctx.font = "12px bold serif";
          ctx.fillStyle = "black";
          ctx.fillText("label test", x - 20, y + 40);
          //ctx.fillText("custom shape", x - 5 , y + 40, 10);

          startAngle = endAngle;
        }
      };
      return {
        drawNode,
        nodeDimensions: { width: 20, height: 20 },
      };
    },
  },
  {
    id: "droppedFilesNode",
    label: "Dropped Files",
    shape: "dot",
  },
  {
    id: "networkRefNode",
    label: "Network References",
    shape: "dot",
  },
  {
    id: "parentsNode",
    label: "Parents",
    shape: "dot",
  },
  {
    id: "similarityNode",
    label: "Similarity",
    shape: "dot",
  },
];

const extractedNodes = [
  {
    id: "extracted1",
    label: "Adobe Document Cloud License.txt",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
  {
    id: "extracted2",
    label: "Adobe Document Cloud Shared.pdf",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
  {
    id: "extracted3",
    label: "Adobe Document Cloud Certificate.wsf",
    shape: "image",

    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
];

const droppedNodes = [
  {
    id: "dropped1",
    label: "wJPBCKy.HoGKdJI",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
];
const networkRefNodes = [
  {
    id: "nw_1",
    label: "https://www.adobe.com/privacy/opt-out.htm",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
  {
    id: "nw_2",
    label: "https://www.adobe.com/privacy/policy.html",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
];

const parentNodes = [
  {
    id: "pf_4ff8e714637d06bbcf684c2350b74dcaf546469c",
    label: "4ff8e714637d06bbcf684c2350b74dcaf546469c",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
  {
    id: "pf_1d606ec3336d582e6b21f6444f089310c27d0db3",
    label: "1d606ec3336d582e6b21f6444f089310c27d0db3",
    shape: "image",
    image: "https://cdn-icons-png.flaticon.com/512/1691/1691859.png",
  },
];

const extractedData = generateDataFromNodes(
  extractedNodes,
  "extractedFilesNode"
);
const droppedData = generateDataFromNodes(droppedNodes, "droppedFilesNode");
const networkRefData = generateDataFromNodes(networkRefNodes, "networkRefNode");
const parentsData = generateDataFromNodes(parentNodes, "parentsNode");
const initialData = generateDataFromNodes(controlNodes, "rootNode");

let network: any;
let theNodePositions = [];
let theEdgePositions = [];

const SampleNetwork = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!network) return;
    network.focus("rootNode");
  };

  function savePosition() {
    let gpPositions = network.getPositions();
    let edgePositions = network.body.edges;

    // Either way
    for (const [key, value] of Object.entries(gpPositions)) {
      let tempObj: any = {
        id: parseInt(key),
        x: value.x,
        y: value.y,
      };
      theNodePositions.push(tempObj);
    }
    for (let edgeId in edgePositions) {
      theEdgePositions.push({
        from: edgePositions[edgeId].from["id"],
        to: edgePositions[edgeId].to["id"],
      });
    }
  }

  useEffect(() => {
    const nodes = new DataSet([
      { id: "rootNode", label: "sample", type: "diamond", shape: "dot" },
      ...initialData.nodes,
    ]);
    const edges = new DataSet(initialData.edges);
    var options = {
      physics: { barnesHut: { gravitationalConstant: -4000 } },
      interaction: {
        multiselect: true,
      },
    };
    if (!network) {
      network = new Network(
        ref.current,
        {
          nodes: nodes,
          edges: edges,
        },
        options
      );

      network.on("dragEnd", (event: any) => {
        const [clickedNode] = event.nodes;
        if (!clickedNode) return;
        console.log(clickedNode);
        nodes.update({ id: clickedNode, fixed: true });
      });
      network.on("dragStart", (event: any) => {
        const [clickedNode] = event.nodes;
        if (!clickedNode) return;
        nodes.update({ id: clickedNode, fixed: false });
      });
      network.on("click", (event: any) => {
        const [clickedNode] = event.nodes;
        const dataMap = {
          extractedFilesNode: extractedData,
          droppedFilesNode: droppedData,
          networkRefNode: networkRefData,
          parentsNode: parentsData,
          /* undefined: () => currentGraphData */
        };
        if (!(clickedNode in dataMap)) return;
        console.log(clickedNode);

        if (
          edges.get({
            filter: (item) => item.from === clickedNode,
          }).length
        ) {
          const connected = network.getConnectedNodes(clickedNode);

          connected.forEach((element: any) => {
            if (element !== "rootNode") {
              const child = nodes.get(element);
              nodes.update({ ...child, hidden: !child.hidden });
            }
          });
          //console.log(network.getConnectedNodes(clickedNode));
          return;
        }

        nodes.add(dataMap[clickedNode].nodes);
        edges.add(dataMap[clickedNode].edges);
      });
    }
  }, []);

  return (
    <>
      <button onClick={handleClick}>Focus</button>

      <div style={{ height: 700, width: "100%" }} ref={ref} />
    </>
  );
};

export default SampleNetwork;
