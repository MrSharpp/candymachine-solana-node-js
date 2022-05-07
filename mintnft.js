const { exec } = require("child_process");
const { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} =  require("@nfteyez/sol-rayz");
const { SystemProgram , clusterApiUrl, Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const fs = require('fs');
const {Token, AccountLayout , TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} = require('@solana/spl-token');
const bs58 = require("bs58");

module.exports  = class MintNFT{
    static mintImage = (_ipfsHash) =>{
        var ipfsHash = "https://gateway.pinata.cloud/ipfs/" + _ipfsHash;
        
        exec('ts-node  "/home/ec2-user/Go-On-Date-nodejs/metaplex/js/packages/cli/src/cli-nft.ts" mint -e mainnet-beta -k ./devnet.json -u '+ipfsHash, (error, stdout, stderr) => {
            return {stdout};
        });
    };
}