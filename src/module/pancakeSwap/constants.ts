import { CHAIN_ID } from '../../helper/constantHelper';

export const NAME = 'PancakeSwap';

export const INFO = {
  [CHAIN_ID.BSC]: {
    farm: {
      name: 'MasterChef',
      address: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
      deployed_hash: '0xfa6d33d6ad34f3d8a01ca2c6152511270cdfb9d2ddf1c5c4069e456d9dd983a7',      
    },
    farm2: {
      name: 'SmartChef',
      address: '0x927158Be21Fe3D4da7E96931bb27Fd5059A8CbC2',
      deployed_hash: '',
      sample_address: '0x09b8a5f51c9e245402057851ada274174fa00e2a',
    },
    amm: {
      name: 'Factory',
      address: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      deployed_hash: '0x545b7a8ea077af942e8e42455b4ac76b7df87b6fcb0cbf22a38efca9b6f9a2f9',
    }
  }
}
