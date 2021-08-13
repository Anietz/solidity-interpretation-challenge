const { param,body, validationResult } = require("express-validator");
const WalletService = require("../services/walletService");
const {PROVIDER_URL} = require("../config");
const maticContract = require("../contracts-abi/matic");




/**
 * View transaction using hash
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const viewTransaction = async (req,res)=>{

     try{
        await param("hash").isString().notEmpty().run(req);
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status:"error",message:errors.array()});
        }
        const wallet = new WalletService(PROVIDER_URL);

        const hash = req.params.hash;
        const result =  await wallet.getTransaction(hash);
        return res.status(200).json({status:"success",message:result}); 

    }catch(e){
       const msg =  {message: e.message};
       return res.status(400).json({status:"error",error: msg  }); 
    }
}




/**
 * Get ABI of a verified contract
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getABI = async (req,res)=>{

     try{
        await param("contract_address").isString().notEmpty().run(req);
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status:"error",message:errors.array()});
        }
        const wallet = new WalletService(PROVIDER_URL);
        
        const contract_address = req.params.contract_address;
        const result =  await wallet.getContractABI(contract_address);
        return res.status(200).json({status:"success",message:result}); 

    }catch(e){
       const msg =  {message: e.message};
       return res.status(400).json({status:"error",error: msg  }); 
    }
}



/**
 * View transaction using hash
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getByteCode = async (req,res)=>{

     try{
        await param("contract_address").isString().notEmpty().run(req);
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status:"error",message:errors.array()});
        }
        const wallet = new WalletService(PROVIDER_URL);

        const contract_address = req.params.contract_address;
        const result =  await wallet.getByteCode(contract_address);
        return res.status(200).json({status:"success",message:result}); 

    }catch(e){
       const msg =  {message: e.message};
       return res.status(400).json({status:"error",error: msg  }); 
    }
}




/**
 * Decode a transaction event for matic using hash
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const decodeMaticTransactionEvent = async (req,res)=>{

     try{
        await param("hash").isString().notEmpty().run(req);
     
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({status:"error",message:errors.array()});
        }
        const wallet = new WalletService(PROVIDER_URL);

        const hash = req.params.hash;
        const result =  await wallet.decodeTransactionHashEvent(hash);

        return res.status(200).json({status:"success",message:result}); 

    }catch(e){
       const msg =  {message: e.message};
       return res.status(400).json({status:"error",error: msg  }); 
    }
}





module.exports = {
    viewTransaction,
    getABI,
    getByteCode,
    decodeMaticTransactionEvent
}