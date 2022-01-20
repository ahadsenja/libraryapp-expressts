import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

import Authentication from "../../utils/Authentication";
const db = require('../../db/models');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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

        // return res.send('New user or operator registered');
    }

    login = async (req: Request, res: Response): Promise<Response> => {
        const { email, password } = req.body;

        // find user by email
        const user = await db.operator.findOne({
            where: { email }
        });

        // check password from parameter and password on database
        let compare = await Authentication.passwordCompare(password, user.password);

        //generate token
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
        // Verify the token using google client id
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // if verification is ok, google return a jwt
        const payload = ticket.getPayload();
        const userId = payload['sub'];

        // Check if the jwt is issued for our client
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

        // Check if user exist
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

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }
}

export default new AuthController();