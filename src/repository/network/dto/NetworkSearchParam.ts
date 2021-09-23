export class NetworkSearchParam {
  private readonly _name: string;
  private readonly _subName: string;
  private readonly _chainId: number;
  private readonly _status: boolean;

  constructor(name: string, subName: string, chainId: number, status: boolean) {
    this._name = name;
    this._subName = subName;
    this._chainId = chainId;
    this._status = status;
  }

  get name(): string {
    return this._name;
  }

  get subName(): string {
    return this._subName;
  }

  get chainId(): number {
    return this._chainId;
  }

  get status(): boolean {
    return this._status;
  }
}