const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pick = require('lodash/pick');
const { responseOk, responseErrWithMsg } = require('../helpers/response');

const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post('/', (req, res) => {
  passport.authenticate('local', { session: true }, (error, user) => {
    if (error) return responseErrWithMsg(res, error.message);

    const signInfo = pick(user, ['id', 'account']);
    const token = jwt.sign(signInfo, AUTH_SECRET);

    return responseOk(res, { success: true, data: { token } });
  })(req, res);
});

module.exports = router;
