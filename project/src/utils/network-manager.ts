interface Options {
  path: string;
  params?: Record<string, string>;
}

export class NetworkManager {
  static init() {
    return new NetworkManager()
  }
  get<R = unknown>(options: Options): Promise<R> {
    return Promise.resolve<R>({} as R);
  }
  // post() { }
  // ...
  // delete() { }
}