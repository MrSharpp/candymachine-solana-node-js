const NFTMint = require('./mintnft');

process.argv.forEach((val, index) => {
    if(process.argv.length < 3) return false;
    switch(val){
        case "mint":
            if(!process.argv[index+1]){
                console.log("Pass ipfs link")
                break;
            }
            mint(process.argv[index+1])
    }
});

function mint(ipfsLink){
    NFTMint.mintImage(ipfsLink);
}