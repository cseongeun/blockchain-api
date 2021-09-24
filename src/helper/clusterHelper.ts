import * as cluster from 'cluster';

export default class ClusterService {
  maxWorker: number;
  workers: { [key: string]: cluster.Worker } = {};

  constructor(maxWorker: number, executePath: string) {
    this.maxWorker = maxWorker;
    cluster.setupMaster({
      execArgv: ['-r', 'tsconfig-paths/register', '-r', 'ts-node/register'],
      exec: executePath,
    } as cluster.ClusterSettings);
  }

  init() {
    for (let i = 0; i < this.maxWorker; i++) {
      this.run();
    }
  }

  run() {
    const worker = cluster.fork();
    this.workers[worker.process.pid] = worker;
  }
}
