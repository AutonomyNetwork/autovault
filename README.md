# AutoVault




#### Sample code to test/integrate

```bash
import  {AutoVault} from './methods';
import {DirectSecp256k1HdWallet, Registry} from '@cosmjs/proto-signing';
import {GasPrice, defaultRegistryTypes, coins, StdFee} from '@cosmjs/stargate';

(async ()=>{

  const password:string ="1234567890"

  // // Create Wallet
  // const wallet = await DirectSecp256k1HdWallet.generate(24, {prefix: "autonomy"})
  // console.log(wallet.mnemonic);
  //
  // // encrypeted account
  // let serializedWallet = await wallet.serialize(password)
  // console.log(serializedWallet);


  // //decrept account when we have account sign for transactions
  // let deserializeWallet = await   DirectSecp256k1HdWallet.deserialize(serializedWallet, password)
  // console.log(deserializeWallet.mnemonic);

  // // log account address
  // let [{address}] = await wallet.getAccounts();
  // console.log(address);

  const gasPrice = GasPrice.fromString("0.02aut")
  const options = {
    gasPrice: gasPrice, registry: new Registry([...defaultRegistryTypes])
  }


  // //Connect to Tendermint34Client
  // const [autoVaultClient, queryClient] = await AutoVault.autoVaultSigner('localhost:26657', deserializeWallet, options)
  // console.log(queryClient);



  // deserialize Account
  let data = `{"type":"directsecp256k1hdwallet-v1","kdf":{"algorithm":"argon2id","params":{"outputLength":32,"opsLimit":24,"memLimitKib":12288}},"encryption":{"algorithm":"xchacha20poly1305-ietf"},"data":"r9KCpmHTHUKodJiEB/iVFxY/av5mYb3HfLyGTiwJjPRR4VSys587TlRtkogCjngCT0Lax6RMoUE5ggmNzragWAd5/zKRxo9voDrnel5C8kEZR+w2T+Dl54lEM6oftiHljVy5sqTUyxtlf2qUU8q90bXyd7/n+PmPsMYPLgpaXMQPU/1qYJUKyGEuQ9FXzwKSCdG96b1wh43zC1cBC+Je9stpXvYv6YsplXe017HAs1WOyps51rDwwapnvYPTX9qv/3Vk5gkCq95L4/4lWM1gupiXdRSZWny9ljfsdqLY823z25DDJVGKutI6JHS25/6Q448G5Z91zb2IjrwZ2TdhN3wQcbJKRWqJ"}
`

  // Access wallet

  let w1 = await DirectSecp256k1HdWallet.deserialize(data, password)
  let [{address}]  = await w1.getAccounts()
  console.log(address);

  const [autoVaultClient, queryClient] = await AutoVault.autoVaultSigner('localhost:26657', w1, options)
  console.log(queryClient);

  // Query account details
  let account = await queryClient.auth.account(address)
  console.log(account);

  // Query bank details
  let balance = await queryClient.bank.allBalances(address)
  console.log(balance);


  const fee:StdFee = {
    gas : "200000",
    amount: coins(1, "uaut"),
  }

  // send tokens
  let result = await autoVaultClient.sendTokens(address, address, coins(1,"uaut"), fee,"test tx" )
  console.log(result.transactionHash);.

})();

```
