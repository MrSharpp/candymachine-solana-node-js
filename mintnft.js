const { exec } = require("child_process");
const { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} =  require("@nfteyez/sol-rayz");
const { SystemProgram , clusterApiUrl, Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const fs = require('fs');
const {Token, AccountLayout , TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID} = require('@solana/spl-token');
const bs58 = require("bs58");

class MintNFT{
    mintImage = (_ipfsHash, Date) =>{
        var ipfsHash = "https://gateway.pinata.cloud/ipfs/" + _ipfsHash;
        
        exec('ts-node  "/home/ec2-user/Go-On-Date-nodejs/metaplex/js/packages/cli/src/cli-nft.ts" mint -e mainnet-beta -k ./devnet.json -u '+ipfsHash, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return {"error":error.message};
               
            }else{
              let newMint = {
                "Date": Date
              } 
              alreadyMintedImages.push(newMint);
              fs.writeFileSync("mintedList.json", JSON.stringify(alreadyMintedImages));
            }
            return {stdout};
        });
    };

     pinFileToIPFS = async (filetoUpload) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        let data = new FormData();
        data.append('file', fs.createReadStream(filetoUpload));
        var response = await axios.post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApi,
                pinata_secret_api_key: pinataSecret
            }
        })
        // response has the ipfs hash
        return response;
    }
}