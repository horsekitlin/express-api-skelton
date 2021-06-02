const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const pick = require('lodash/pick');
const add = require('date-fns/add')
const { responseOk, responseErrWithMsg } = require('../helpers/response');

const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post('/', (req, res) => {
  passport.authenticate('local', { session: true }, (error, user) => {
    if (error) return responseErrWithMsg(res, error.message);

    const expireIn = add(new Date(), { days: 1 }).getTime();

    const signInfo = pick(user, ['id', 'account']);
    const token = jwt.sign({
      data: signInfo,
      exp: expireIn,
    }, AUTH_SECRET);

    return responseOk(res, {
      success: true, data: { 
        token,
        expireIn,
      } });
  })(req, res);
});

module.exports = router;
