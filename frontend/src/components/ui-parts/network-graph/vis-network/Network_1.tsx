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
    id: "robo_tamachan12", // ノードの一意の識別子です。この ID はネットワーク内でこのノードを一意に特定するために使用
    label: "ロボ玉 Ver.2", // ノードのラベル => この場合、"Extracted Files (3)" というテキストがノードに表示されます。
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://dzdih2euft5nz.cloudfront.net/users/avatars/909381?1664074598",
  },
  // 2つ目以降の Node設定
  {
    id: "droppedFilesNode",
    label: "ガール_1",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/328221047.jpg",
  },
  {
    id: "networkRefNode",
    label: "ガール_2",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/2930869729.jpg",
  },
  {
    id: "parentsNode",
    label: "ガール_3",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://aisight-front.s3-ap-northeast-1.amazonaws.com/accounts/1198744722.jpg",
  },
  {
    id: "similarityNode",
    label: "スペース・ブロッコリー",
    shape: "circularImage", // これだけで、丸い写真になる！！
    image:
      "https://d1q9av5b648rmv.cloudfront.net/v3/500x500/cushion/free/white/front/12256617/1664106143-512x512.png.7.3047+0.0+0.0.jpg?h=1af54b2d021d1ca0ed9c8f1210d7d7122231c91f&printed=true",
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

/** 後から動的に追加される Nodes & Edges */
const extractedData = generateDataFromNodes(Node_1, "robo_tamachan12");
const droppedData = generateDataFromNodes(Node_2, "droppedFilesNode");
const networkRefData = generateDataFromNodes(Nodes_3, "networkRefNode");
const parentsData = generateDataFromNodes(Nodes_4, "parentsNode");

/** 最初から表示されている Nodes & Edges */
const initialData = generateDataFromNodes(controlNodes, "rootNode");

/** Network図 */
let network: any;

/** Network図 の Component */
const Network_1 = () => {
  /** DOMを参照できるように useRef を使用して Element を取得する */
  const ref = useRef<HTMLDivElement>(null);

  /** Network図を Create する処理 (初期表示) */
  useEffect(() => {
    /**
     * 1. Node の配列を作成します
     * => DataSet オブジェクトはグラフデータを保持し、管理するために使用されます。
     */
    const nodes = new DataSet([
      // CenterNode
      {
        id: "rootNode",
        label: "ロボ玉",
        type: "diamond",
        shape: "circularImage", // これだけで、丸い写真になる！！
        image:
          "https://lh3.googleusercontent.com/a-/AOh14GhYX8r5eB8cdfa1yTA6hD1axnAibrQQzBwMDmxHuQQ=s96-c",
      },
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
        ref.current,
        {
          nodes: nodes,
          edges: edges,
        },
        options
      );
    }
  }, []);

  return (
    <div>
      {/* Network図 を表示する領域 */}
      <div style={{ height: 700, width: "100%" }} ref={ref} />
    </div>
  );
};

export default Network_1;
