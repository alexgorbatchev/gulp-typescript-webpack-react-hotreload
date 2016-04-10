type NodeRequireCallback = {
  (require: (path: string) => any);
}

interface NodeRequire {
  ensure: (paths: string[], callback: NodeRequireCallback, chunkName?: string) => void;
}

declare var require: NodeRequire;
