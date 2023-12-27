import { useEffect, useRef } from "react";
import { Network } from "vis-network";
import { DataSet } from "vis-data";

/**
 * NOTE: generateDataFromNodes
 * => Nodes と Edhes を定義して、返却する Func
 * => 引数: nodes, parentNodeId
 * => nodes はノードの情報を含む配列
 * => parentNodeId は親ノードのID
 */
const generateDataFromNodes = (nodes: any, parentNodeId: string | number) => ({
  nodes: nodes,
  /** from 親・Node => to 子・Node に向かって、Edges(枝)を伸ばす */
  edges: nodes.map((node: any) => ({ from: parentNodeId, to: node.id })),
});

// ----------------------------------- Node Data 領域 -----------------------------------

/**
 * 中央の Node & それに紐づいた 5つの初期表示・Node の設定値
 */
const controlNodes = [
  // 1つ目の Node設定
  {
    id: "extractedFilesNode", // ノードの一意の識別子です。この ID はネットワーク内でこのノードを一意に特定するために使用
    label: "Extracted Files \n(3)", // ノードのラベル => この場合、"Extracted Files (3)" というテキストがノードに表示されます。
    shape: "custom", // shape: "custom": ノードの形状がカスタムであることを指定します。カスタム形状は後述の ctxRenderer 関数で描画されます。
    visible: true, // visible: true: ノードが可視であることを示します。このノードは初めから表示されます。
    /** ctxRenderer: このプロパティはカスタムノードの描画方法を定義する関数です。この関数内で、指定された座標 (x, y) に対してカスタムの描画処理が行われます。 */
    ctxRenderer: ({
      ctx,
      id,
      x,
      y,
      state: { selected, hover },
      style,
    }: any) => {
      const drawNode = () => {
        /**  */
        const points = [
          { value: 1, color: "red" },
          { value: 0, color: "orange" },
          { value: 0, color: "blue" },
        ];
        const radius = 30;
        const totalValue = points.reduce((sum, point) => sum + point.value, 0);
        let startAngle = 0;

        //
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

      //
      return {
        drawNode,
        nodeDimensions: { width: 20, height: 20 },
      };
    },
  },
  // 2つ目以降の Node設定
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

const Node_1 = [
  {
    id: "extracted1",
    label: "ガール_1",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/1198744722.jpg",
  },
  {
    id: "extracted2",
    label: "ガール_1",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/1198744722.jpg",
  },
  {
    id: "extracted3",
    label: "ガール_1",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/1198744722.jpg",
  },
];

const Node_2 = [
  {
    id: "dropped1",
    label: "ガール_2",
    shape: "image", // 四角い写真
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/2930869729.jpg",
  },
];

const Nodes_3 = [
  {
    id: "nw_1",
    label: "ガール_3",
    shape: "image",
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/328221047.jpg",
  },
  {
    id: "nw_2",
    label: "ガール_3",
    shape: "image",
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/328221047.jpg",
  },
];

const Nodes_4 = [
  {
    id: "pf_4ff8e714637d06bbcf684c2350b74dcaf546469c",
    label: "ロボ玉",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
  {
    id: "pf_1d606ec3336d582e6b21f6444f089310c27d0db3",
    label: "ロボ玉",
    shape: "image",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
  },
];

// ----------------------------------- Node Data 領域 Fin -----------------------------------

/**
 * NOTE: generateDataFromNodes() で Nodes から Data を生成する
 */
const extractedData = generateDataFromNodes(Node_1, "extractedFilesNode");
const droppedData = generateDataFromNodes(Node_2, "droppedFilesNode");
const networkRefData = generateDataFromNodes(Nodes_3, "networkRefNode");
const parentsData = generateDataFromNodes(Nodes_4, "parentsNode");
const initialData = generateDataFromNodes(controlNodes, "rootNode");

/** Network図 */
let network: any;

/** Network図 の Component */
const Network_0 = () => {
  /** DOMを参照できるように useRef を使用して Element を取得する */
  const ref = useRef<HTMLDivElement>(null);

  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    /** 1. Node の配列を作成します */
    const nodes = new DataSet([
      { id: "rootNode", label: "sample", type: "diamond", shape: "dot" },
      ...initialData.nodes,
    ]);
    /** 2. Edges を作成する */
    const edges = new DataSet(initialData.edges);

    /** 3. Option を追加する */
    const options = {
      /**
       * physicsオプションは、グラフの物理的シミュレーションに関する設定を指定します。
       */
      physics: {
        // barnesHutは、物理エンジンの一部で、ノード間の相互作用を効率的に計算するためのアルゴリズムです。
        barnesHut: {
          /**
           * gravitationalConstantは、ノード間の引力定数を設定します。
           * この値はノード間の引力の強さを調整します。-4000という値は、引力が非常に強いことを示しており、ノードが強く引かれることを意味します。
           * これにより、ノードが密に配置され、よりクラスタリングされる可能性が高くなります。
           */
          gravitationalConstant: -4000,
        },
      },
      // interactionオプションは、ユーザーとのインタラクションに関する設定を指定します。
      interaction: {
        // multiselectがtrueに設定されている場合、ユーザーは複数のノードを選択できるようになります。
        multiselect: true,
      },
    };

    // Network が存在しない場合の処理
    if (!network) {
      // Network Instance を作成して、DataをSetする =>  => Dom領域, Data(Nodes & Edges), Options
      network = new Network(
        ref.current as any,
        {
          nodes: nodes,
          edges: edges as any,
        },
        options
      );

      // Drag End Event
      network.on("dragEnd", (event: any) => {
        console.log("Network Drag End", event);
        /**
         * Drag操作で、クリックされたノードの id を取得する
         * => nodes 配列からノードのIDを取得する
         */
        const [clickedNode] = event.nodes;

        console.log("dragEnd clickedNode", clickedNode);
        if (!clickedNode) return;
        console.log(clickedNode);
        /**
         * クリックされたノードを固定状態に変更します
         * => Focusがあたる。
         */
        nodes.update({ id: clickedNode, fixed: true });
      });

      // Drag Start Event
      network.on("dragStart", (event: any) => {
        console.log("Network Drag Start", event);
        const [clickedNode] = event.nodes;
        console.log("dragStart clickedNode", clickedNode);

        if (!clickedNode) return;
        nodes.update({ id: clickedNode, fixed: false });
      });

      // Click Event
      network.on("click", (event: any) => {
        console.group("Network Click");
        console.log("Network Click", event);
        /**
         * Click 操作で、クリックされたノードの id を取得する
         * => nodes 配列からノードのIDを取得する
         */
        const [clickedNode] = event.nodes;

        console.log("Network Click clickedNode", clickedNode);

        /** クリックされたノードに関連するデータを含む dataMap オブジェクトを作成する */
        const dataMap = {
          extractedFilesNode: extractedData,
          droppedFilesNode: droppedData,
          networkRefNode: networkRefData,
          parentsNode: parentsData,
          /* undefined: () => currentGraphData */
        } as any;
        console.log("dataMap", dataMap);

        // クリックされたノードが dataMap 内に存在しない場合、処理を終了する
        if (!(clickedNode in dataMap)) return;
        console.log(clickedNode);

        // クリックされたノードが他のノードとエッジ（リンク）で接続されている場合、それらの接続されたノードの表示状態を切り替えます。
        if (
          edges.get({
            filter: (item: any) => item.from === clickedNode,
          }).length
        ) {
          const connected = network.getConnectedNodes(clickedNode);

          connected.forEach((element: any) => {
            if (element !== "rootNode") {
              const child = nodes.get(element) as any;
              nodes.update({ ...child, hidden: !child.hidden });
            }
          });
          //console.log(network.getConnectedNodes(clickedNode));
          return;
        }

        // クリックされたノードに関連する新しいノードとエッジをネットワークに追加します。
        nodes.add(dataMap[clickedNode].nodes);
        edges.add(dataMap[clickedNode].edges);

        console.groupEnd();
      });
    }
  }, []);

  return (
    <div>
      {/* Network図 を表示する領域 */}
      <div style={{ height: 700, width: "100%" }} ref={ref} />
    </div>
  );
};

export default Network_0;
