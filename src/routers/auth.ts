import passport from 'passport';
import { Request, Response, Router } from 'express';

const CLIENT_URL = 'http://localhost:3000/home/';

const authRouter = Router();

authRouter.get('/login/success', (req: Request, res: Response) => {
  console.log(req);
  if (req.user) {
    return res
      .status(200)
      .json({
        success: true,
        message: 'successfull',
        user: req.user,
      })
      .redirect(CLIENT_URL);
  }
  res.send(200);
});

authRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile'] })
);

authRouter.get(
  '/google/callback',

  passport.authenticate('google', {
    successRedirect: '/auth/login/success',
    failureRedirect: '/auth/login/failed',
  })
);

export default authRouter;
