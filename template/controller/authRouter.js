const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pick = require("lodash/pick");
const yup = require("yup");

const { responseOk, responseErrWithMsg } = require("../helpers/response");
const { parseUserResponse, updateUserNotificationToken } = require("../services/userServices");
const { jwtAuthorizationMiddleware } = require("../helpers/passportManager");

const router = express.Router();

const { AUTH_SECRET } = process.env;

router.post("/logout", jwtAuthorizationMiddleware, async (req, res) => {
try{
  await updateUserNotificationToken(req.user.data.id, null);
  return responseOk(res, { success: true });
} catch (error) {
  responseErrWithMsg(res, error.message);
}
});

const loginRequestSchema = yup.object({
  phone: yup.string().required('電話或密碼不可為空'),
  password: yup.string().required('電話或密碼不可為空'),
});

router.post("/login", (req, res) => {
  passport.authenticate("local", { session: true }, async (error, user) => {
    try {
      if (error) throw error;
      await loginRequestSchema.validate(req.body);

      // const expireIn = add(new Date(), { days: 1 }).getTime();

      const signInfo = pick(user, ["id", "phone"]);
      const token = jwt.sign(
        {
          data: signInfo,
          // exp: expireIn,
        },
        AUTH_SECRET
      );

      await updateUserNotificationToken(user.id, req.body.token);
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
