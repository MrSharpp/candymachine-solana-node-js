const { exec } = require("child_process");
const { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} =  require("@nfteyez/sol-rayz");
const { SystemProgram , clusterApiUrl, Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const fs = require('fs');
const {Token, AccountLayout , TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} = require('@solana/spl-token');
const bs58 = require("bs58");

class NFTSender{
    async senNft(mintedAddress){
        try{
            const feePayer = Keypair.fromSecretKey(
                bs58.decode("2YQDdnfxiHPKu9GypLX1yXaQTQojvDSPgFkDxrUrzbtchDsZh4B27aM8dfgrfm5DcTn8MJHenKLYRM----------")
              );
              
              // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
              const alice = Keypair.fromSecretKey(
                bs58.decode("3DdVyZuANr5en2PQymCPmoFBMsfdhjaRHqnk3ejW16zc2YN2CWjyDTAfi6oYcQHuSa5UWFH9s1Nvme----------")
              );
        
              const mintPubkey = new PublicKey("A8SJfwzKJAaMrY6Lb9FxZCfmVMVLcjKvRuzAi-----");
              // connection
              const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
        
              let ataAlice = await Token.getAssociatedTokenAddress(
                ASSOCIATED_TOKEN_PROGRAM_ID,
                TOKEN_PROGRAM_ID,
                mintPubkey,
                alice.publicKey
              );
        
              
              let tx2 = new Transaction().add(
                Token.createAssociatedTokenAccountInstruction(
                  ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
                  TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
                  mintPubkey, // mint
                  ataAlice, // ata
                  alice.publicKey, // owner of token account
                  feePayer.publicKey // fee payer
                )
              );
            // console.log(`txhash: ${await connection.sendTransaction(tx2, [feePayer])}`);
        
            let ataFeePayer = await Token.getAssociatedTokenAddress(
              ASSOCIATED_TOKEN_PROGRAM_ID,
              TOKEN_PROGRAM_ID,
              mintPubkey,
              feePayer.publicKey
            );
        
            let tx3 = new Transaction().add(
                Token.createAssociatedTokenAccountInstruction(
                  ASSOCIATED_TOKEN_PROGRAM_ID, // always ASSOCIATED_TOKEN_PROGRAM_ID
                  TOKEN_PROGRAM_ID, // always TOKEN_PROGRAM_ID
                  mintPubkey, // mint
                  ataFeePayer, // ata
                  feePayer.publicKey, // owner of token account
                  alice.publicKey // fee payer
                )
              );
    
             // console.log(`txhash: ${await connection.sendTransaction(tx3, [alice])}`);
    
            let tx = new Transaction().add(
                Token.createTransferCheckedInstruction(
                  TOKEN_PROGRAM_ID,
                  ataAlice,
                  mintPubkey,
                  ataFeePayer,
                  alice.publicKey,
                  [],
                  1,
                  0
                )
              );
            let response = await connection.sendTransaction(tx, [feePayer, alice]);
                return response;
            }catch(e){
                console.log(e);
            }
    }
}

