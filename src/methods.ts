import { DirectSecp256k1HdWallet, OfflineSigner} from '@cosmjs/proto-signing';
import { SigningStargateClient, SigningStargateClientOptions,QueryClient, setupAuthExtension, setupBankExtension } from '@cosmjs/stargate';
import {Tendermint34Client} from '@cosmjs/tendermint-rpc';

export class AutoVault extends SigningStargateClient {
  protected constructor(
    tmClient: Tendermint34Client | undefined,
    signer: OfflineSigner,
    options: SigningStargateClientOptions
  ){
    super(tmClient, signer, options);
  }

  public static async autoVaultSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ) :Promise<[AutoVault, any]>{
    const tmClient = await Tendermint34Client.connect(endpoint);
    return [new AutoVault(tmClient, signer, options), QueryClient.withExtensions(tmClient, setupAuthExtension, setupBankExtension)];
  }
}
