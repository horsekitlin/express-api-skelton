const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pick = require("lodash/pick");
const yup = require("yup");
const add = require("date-fns/add");
const { responseOk, responseErrWithMsg } = require("../helpers/response");

const router = express.Router();

const { AUTH_SECRET } = process.env;

const loginRequestSchema = yup.object({
  account: yup.string().required('帳號或密碼不可為空'),
  password: yup.string().required('帳號或密碼不可為空'),
});

router.post("/", (req, res) => {
  passport.authenticate("local", { session: true }, async (error, user) => {
    try {
      if (error) throw error;
      await loginRequestSchema.validate(req.body);

      const expireIn = add(new Date(), { days: 1 }).getTime();

      const signInfo = pick(user, ["id", "account"]);
      const token = jwt.sign(
        {
          data: signInfo,
          exp: expireIn,
        },
        AUTH_SECRET
      );

      return responseOk(res, {
        success: true,
        data: {
          token,
          expireIn,
        },
      });
    } catch (error) {
      responseErrWithMsg(res, error.message);
    }
  })(req, res);
});

module.exports = router;
