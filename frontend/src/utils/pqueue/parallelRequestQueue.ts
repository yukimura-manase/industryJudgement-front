import PQueue from "p-queue";

export const parallelRequestQueue = new PQueue({
  autoStart: true,
  concurrency: 10,
});
