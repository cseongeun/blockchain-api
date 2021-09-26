export class TokenSearchDTO  {
  readonly type?: string;
  readonly types?: string[];

  readonly chainId?: number;
  readonly chainIds?: number[];

  readonly address?: string;
  readonly addresses?: string[];

  readonly status?: boolean;

  constructor(
    params?: {
      type?: string,
      types?: string[],
      chainId?: number,
      chainIds?: number[],
      address?: string, 
      addresses?: string[],
      status?: boolean,
    }) {
      this.type = params.type;
      this.types = params.types;
      this.chainId = params.chainId;
      this.chainIds = params.chainIds;
      this.address = params.address;
      this.addresses = params.addresses;
      this.status = params.status;
  }
}