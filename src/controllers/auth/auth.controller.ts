import { Request, Response } from "express";

import Authentication from "../../utils/Authentication";
const db = require('../../db/models');

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        const { name, username, email, password, handphone, address } = req.body;
        const hashedPassword: string = await Authentication.passwordHash(password);

        await db.operator.create({
            name, username, email, password: hashedPassword, handphone, address
        });

        return res.send('New user or operator registered');
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
            return res.send({
                token
            });
        }

        return res.send('Authentication failed');
    }

    profile = (req: Request, res: Response): Response => {
        return res.send(req.app.locals.credential);
    }
}

export default new AuthController();