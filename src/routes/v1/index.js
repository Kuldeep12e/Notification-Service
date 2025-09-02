const express = require('express');

const { InfoController } = require('../../controllers');
const { EmailController } = require('../../controllers');

const router = express.Router();

router.get('/info', InfoController.info);
router.post('/ticket', EmailController.create);

module.exports = router;