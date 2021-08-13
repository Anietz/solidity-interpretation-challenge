'use strict';

const Web3 = require("web3");
const axios = require("axios");
const maticContract = require("../contracts-abi/matic");
const abiDecoder = require('abi-decoder');

class WalletService {
    provider;

    constructor(url){
        this.provider =  this.init(url);
    }

    init(url){
        try{
            const prov = new Web3(url);
            return prov;
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    /**
   * Get a transaction by it's hash
   * @param trxHash the transaction's hash
   */
    async getTransaction(trxHash){
        try{
            return (await this.provider.eth.getTransaction(trxHash));
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    /**
     * Get a contract ABI data
     * @param {*} contractAddress 
     * @returns 
     */
    async getContractABI(contractAddress){
        try{
            const response = await axios.default.get(`https://api.polygonscan.com/api?module=contract&action=getabi&address=${contractAddress}&apiKey=1E91FGBFFN8JV3GI4ZW1QECMU9YBCMCZIU`);
            console.log(response);
            if(response){
                    const result = JSON.parse(response.data.result);
                    if(result){
                        console.log(result);
                    return result;
                    }else{
                    throw new Error("ABI not found");
                    }
            }
            
            throw new Error("Error occured fetching ABI data");

        }catch(error){
            console.log(error);
            throw new Error(error);
        }
    }

    /**
     * Get bytcode of a contract
     * @param {*} contractAddress 
     * @returns 
     */
     async getByteCode(contractAddress){
        try{
            return (await this.provider.eth.getCode(contractAddress));
        }catch(error){
            console.log(error);
            throw new Error(error);
        }
     }

    /**
   * Checks a transaction hash for ERC20 tx and decodes the contract data
   * @param hash transaction hash
   * @returns
   */
  async decodeTransactionHashEvent(hash){
    try {
    
      abiDecoder.addABI(maticContract.ABI);
      let receipt = await this.provider.eth.getTransactionReceipt(hash);
      const decodedLogs = abiDecoder.decodeLogs(receipt.logs);
      console.log("decodedLogs",decodedLogs);


      if (decodedLogs) {
        const decodedTransaction = decodedLogs;
        return decodedTransaction;
      }

      throw new Error("No event records found");
    

    } catch (err) {
      console.log(err);
       throw new Error(err);
    }
  }

  decodeLogData(logData){

  }

}



module.exports = WalletService
