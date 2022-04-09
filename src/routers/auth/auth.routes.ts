import { Request, Response } from 'express';
import passport from "passport";

const passportGithub2 = require('passport-github2').Strategy;
const passportFacebook = require('passport-facebook').Strategy;
import { githubAuthStrategy } from "../../config/social-auth-strategy";
import { facebookAuthStrategy } from "../../config/social-auth-strategy";

import AuthController from "../../controllers/auth/auth.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";
import validate from '../../middlewares/auth.validator';

facebookAuthStrategy(passport, passportFacebook);
githubAuthStrategy(passport, passportGithub2);

class AuthRoutes extends BaseRoutes {
    public routes(): void {
        this.router.post('/register', validate, AuthController.register);
        this.router.post('/login', validate, AuthController.login);

        this.router.post('/google', AuthController.loginWithGoogle);

        this.router.get('/profile', auth, AuthController.profile);

        // this.router.get('/facebook', passport.authenticate('facebook'), (req: Request, res: Response) => {
        //     console.log('Requested User: ', req.user);
        // });
        // this.router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req: Request, res: Response) => {
        //     res.redirect('http://localhost:4200/dashboard/dashboard');
        // });

        // this.router.get('/github', passport.authenticate('github'), (req: Request, res: Response) => {
        //     console.log('Requested User: ', req.user);
        // });
        // this.router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req: Request, res: Response) => {
        //     res.redirect('http://localhost:4200/dashboard/dashboard');
        // });
    }
}

export default new AuthRoutes().router;