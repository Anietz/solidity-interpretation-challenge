const express = require("express");
const router = express.Router();
const walletController = 
require("../controller/wallet");

router.get("/transaction/:hash", walletController.viewTransaction);
router.get("/get_abi/:contract_address", walletController.getABI);
router.get("/get_byte_code/:contract_address", walletController.getByteCode);
router.get("/get_tx_events/:hash", walletController.decodeMaticTransactionEvent);

module.exports = router;
