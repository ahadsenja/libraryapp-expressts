import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

import Authentication from "../../utils/Authentication";
const db = require('../../db/models');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

require("dotenv").config();

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

            if (existingEmailUser) {
                let token = Authentication.generateToken(userDetails.google_id, existingEmailUser, userDetails.name);
                return res.send({
                    token
                });
            }
        }

        const newUser = await db.operator.create(userDetails);
        const token = jwt.sign(userDetails, process.env.JWT_SECRET_KEY);

        return res.status(200).send({
            data: newUser,
            token: token,
            message: 'New User Created With Google Account'
        });
    }

    profile = async (req: Request, res: Response): Promise<Response> => {
        return res.send(req.app.locals.credential);
    }

}

export default new AuthController();