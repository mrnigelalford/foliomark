// Generated by https://quicktype.io
export interface Network {
  type: string;
}

export interface Origin {
  type: string;
  id: string;
}

export interface AccountInfo {
  accountIdentifier: string;
  senderId: string;
  origin: Origin;
  address: string;
  publicKey: string;
  network: Network;
  scopes: string[];
  connectedAt: number;
}
