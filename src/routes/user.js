const express = require('express')
const router = express.Router();

const userControler = require("../controlers/userController");

router.route("/user").post((req, res) => userControler.create(req, res));

router.route("/user").get((req, res) => userControler.getAll(req, res));

router.route("/user/:_id").delete((req, res) => userControler.delete(req, res));

router.route("/user/:_id").put((req, res) => userControler.update(req, res));

module.exports = router;