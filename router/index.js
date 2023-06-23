const express = require('express');
const router = express.Router();

require('./fiat')(router);
require('./litecoin')(router);
require('./user')(router);
require('./transaction')(router);
require('./stripe')(router);
// require('./currencycloud')(router);

module.exports = router;
