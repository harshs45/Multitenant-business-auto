const { Router } = require('express');
const ctrl = require('./auth.controller');
const { OAuth2Client } = require("google-auth-library");
const { registerRules, loginRules, refreshRules } = require('./auth.validator');
const validate = require('../../common/middleware/validate');
const { authLimiter } = require('../../common/middleware/rateLimiter');
const { authenticate } = require('../../common/middleware/auth');

const router = Router();
const client = new OAuth2Client("683542883914-k0n72r85e493gc1972dd1kvfc8m6a3kg.apps.googleusercontent.com");
router.post('/register', authLimiter, registerRules, validate, ctrl.register);
router.post('/login',    authLimiter, loginRules,    validate, ctrl.login);
router.post("/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "683542883914-k0n72r85e493gc1972dd1kvfc8m6a3kg.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();

    const user = {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    };

    res.json({ success: true, user });
  } catch (err) {
     res.status(401).json({ error: "Invalid token" });
  }
});
router.post('/refresh',  authLimiter, refreshRules,  validate, ctrl.refresh);
router.post('/logout',   ctrl.logout);
router.get('/me',        authenticate, ctrl.me);

module.exports = router;
