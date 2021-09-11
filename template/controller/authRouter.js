const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pick = require("lodash/pick");
const yup = require("yup");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { parseUserResponse } = require("../services/userServices");
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");

const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post("/logout", jwtAuthorizationMiddleware, async (req, res) => {
try{
  return responseOk(res, { success: true });
} catch (error) {
  responseErrWithMsg(res, error.message);
}
});

const loginRequestSchema = yup.object({
  phone: yup.string().required('電話或密碼不可為空'),
  password: yup.string().required('電話或密碼不可為空'),
});

router.post("/", (req, res) => {
  console.log("🚀 ~ file: authRouter.js ~ line 30 ~ router.post ~ req.body", req.body)
  passport.authenticate("local", { session: false }, async (error, user) => {
    console.log("🚀 ~ file: authRouter.js ~ line 31 ~ passport.authenticate ~ error", error)
    try {
      if (error) throw error;
      // const expireIn = add(new Date(), { days: 1 }).getTime();

      console.log("🚀 ~ file: authRouter.js ~ line 40 ~ passport.authenticate ~ user", user)
      const signInfo = pick(user, ["id", "phone"]);
      const token = jwt.sign(
        {
          data: signInfo,
          // exp: expireIn,
        },
        AUTH_SECRET
      );

      return responseOk(res,  {
          token,
          expireIn: null,
          user: parseUserResponse(user),
        });
    } catch (error) {
      responseErrWithMsg(res, error.message);
    }
  })(req, res);
});

module.exports = router;
