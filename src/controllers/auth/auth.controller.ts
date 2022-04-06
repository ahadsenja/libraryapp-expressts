import { NextFunction, Request, Response } from "express";
import passport from "passport";
const GithubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

import Authentication from "../../utils/Authentication";
const db = require('../../db/models');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { google_id, facebook_id, github_id, name, username, email, password, handphone, address } = req.body;

        const hashedPassword: string = await Authentication.passwordHash(password);

        const data = await db.operator.create({
            google_id,
            facebook_id,
            github_id,
            name,
            username,
            email,
            password: hashedPassword,
            handphone,
            address
        });

        return res.send(data);

    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        const user = await db.operator.findOne({
            where: { email }
        });

        let compare = await Authentication.passwordCompare(password, user.password);

        if (compare) {
            let token = Authentication.generateToken(user.id, email, user.password);
            console.log('token mustofa: ', token)
            return res.send({
                token
            });
        }

        return res.send('Authentication failed');
    }

    loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const ticket = await googleClient.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        const audience = payload.aud;
        if (audience !== process.env.GOOGLE_CLIENT_ID) {
            throw new Error(
                'error while authenticating google user: audience mismatch: wanted [' +
                process.env.GOOGLE_CLIENT_ID +
                '] but was [' +
                audience +
                ']'
            )
        }

        const userDetails = {
            google_id: payload['sub'],
            name: payload['name'],
            email: payload['email']
        }

        const existingGoogleUser = await db.operator.findOne({ where: { google_id: userDetails.google_id } });

        if (existingGoogleUser) {
            const existingEmailUser = await db.operator.findOne({ where: { email: userDetails.email } });
            console.log('Email user: ', existingEmailUser);

            if (existingEmailUser) {
                let token = Authentication.generateToken(userDetails.google_id, existingEmailUser, userDetails.name);
                console.log('Token login backend: ', token);
                return res.send({
                    token
                });
            } else {
                const newUser = await db.operator.create(userDetails);
                const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY);

                console.log('Token baru dari backend: ', token);

                return res.status(200).send({
                    data: newUser,
                    token: token,
                    message: 'New User Created With Google Account'
                });
            }
        }

        return res.send({ message: 'User not found' });
    }

    loginWithGithub = async (req: Request, res: Response, next: NextFunction) => {
        passport.use(new GithubStrategy(
            {
                clientID: '52d790b26ee61d7cc119',
                clientSecret: 'db353b8e1b75c97d68064db95b75feddf9c2b8d1',
                callbackURL: 'http://localhost:8000/api/v1/auth/github',
            },

            (req: any, accessToken: any, refreshToken: any, profile: any, cb: any) => {
                return cb(null, profile);
            }
        ))
    }

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }

}

export default new AuthController();