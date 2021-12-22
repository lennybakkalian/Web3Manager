export interface IWallet {
    id?: number,
    name: string,
    address: string,
    privateKey: string,
    balance?: number
}