import { Request, Response } from 'express';
const db = require('../../db/models');

import IController from '../../interfaces/controller.interface';

class OperatorController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const operator = await db.operator.findAll();
        return res.send({
            data: operator,
            message: 'Successfully getting data from api'
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const operator = await db.operator.findOne({
            where: { id },
            attributes: ['id', 'name', 'username', 'email', 'password', 'handphone', 'address']
        });

        return res.send({
            data: operator,
            message: 'Successfully get data by id'
        })
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, username, email, password, handphone, address } = req.body;

        const operator = await db.operator.create({
            name, username, email, password, handphone, address
        });

        return res.send({
            data: operator,
            message: 'Successfully created data'
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, username, email, password, handphone, address } = req.body;

        const operator = await db.operator.update({
            name, username, email, password, handphone, address
        }, {
            where: { id }
        });

        return res.send({
            data: operator,
            message: 'Data successfully updated'
        })
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const operator = await db.operator.destroy({
            where: { id }
        });

        return res.send({
            message: 'Data successfully deleted'
        })
    }
}

export default new OperatorController();