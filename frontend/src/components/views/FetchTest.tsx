import PQueue from "p-queue";
// import got from "got";

/** 大量の非同期の並列処理・Fetch Test */
const FetchTest = () => {
  console.group("FetchTest");

  /** PQueue Instance を生成する */
  const queue = new PQueue({
    autoStart: true, // 同時実行制限内のキュータスクが追加されるとすぐに自動実行されるかどうか。
    concurrency: 10, // 同時実行制限
  });
  console.log("queue", queue);

  (async () => {
    const response = await queue.add(() =>
      fetch("https://jsonplaceholder.typicode.com/todos/")
    );
    console.log("Done: response 1", response);
  })();

  (async () => {
    const response = await queue.add(() =>
      fetch("https://jsonplaceholder.typicode.com/todos/")
    );
    console.log("Done: response 2", response);
  })();

  const fetchFunc = async () => {};

  console.groupEnd();
  return (
    <div>
      <div>大量の非同期の並列処理・Fetch Test</div>
    </div>
  );
};

export default FetchTest;
