//Web3 initialization
var Web3 = require('web3');
var web3 = new Web3('http://localhost:7545');

//Access the chain rpc
async function testConnection(){
    var accounts = await web3.eth.getAccounts();
    var txCount = await web3.eth.getTransactionCount(accounts[0])
    console.log('tx count:'+txCount)
    console.log('chain connection successful')
}

//Load contract abi and contract address
var fs = require('fs');
var jsonFile = "../build/contracts/HelloWorld.json";
var parsed= JSON.parse(fs.readFileSync(jsonFile));
var HELLO_ABI = parsed.abi;
var HELLO_ADDRESS = '0xfEB37B5fB97a11Bcd62382B30A2B85c35fa7E10a';


const helloWorld = new web3.eth.Contract(HELLO_ABI, HELLO_ADDRESS);

async function testSet(){
    var accounts = await web3.eth.getAccounts();
    var r = await helloWorld.methods.set(0xcece).send({
        from:accounts[2]
    });
    console.log('transaction successful with hash:'+r.transactionHash);
}

async function testSetByTransaction(){
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];
    var r = await web3.eth.sendTransaction({
        from:account,
        to:HELLO_ADDRESS,
        value: "0",
        gas:3000000,
        gasPrice:await web3.eth.getGasPrice(),
        data: helloWorld.methods.set(0xbebe).encodeABI(),
        nonce:await web3.eth.getTransactionCount(account)
    });
    console.log('transaction successful with hash:'+r.transactionHash);
}

async function testSetBySignedTransaction(){
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];
    var transaction = {
        from:account,
        to:HELLO_ADDRESS,
        value: "0",
        gas:3000000,
        gasPrice:await web3.eth.getGasPrice(),
        data: helloWorld.methods.set(0xbebe).encodeABI(),
        nonce:await web3.eth.getTransactionCount(account)
    }
    var signedTx  = await web3.eth.signTransaction(transaction);
    console.log('transaction signed is '+signedTx);
    var r = await web3.eth.sendSignedTransaction(signedTx);
    console.log('transaction successful with hash:'+r.transactionHash);
}

async function testGet(){
    var r = await helloWorld.methods.get().call();
    console.log('function get returns:'+r);
}

async function testEvent(){
    var r = helloWorld.events.Set({
        fromBlock: 0
    }, function(error, event){ console.log(event); })
    .on("connected", function(subscriptionId){
        console.log(subscriptionId);
    })
    .on('data', function(event){
        console.log(event); // same results as the optional callback above
    })
    .on('changed', function(event){
        // remove event from local database
    })
    .on('error', console.error);
}

async function main(){
    await testConnection();
    //await testSet();
    //await testSetBySignedTransaction();
    //wait testGet();
    await testEvent();
}

main().then();



