import {AbiItem} from 'web3-utils'

export interface IContract {
  id?: number
  address: string
  abi: AbiItem[]
  name: string
}
