const express = require('express');
const router = express.Router();

router.use("*", (req, res, next) => {
    res.status(404).send("Page not found");
});

module.exports = router;