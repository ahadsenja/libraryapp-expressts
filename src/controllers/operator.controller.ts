import { Request, Response } from 'express';
const db = require('../db/models');

import IController from '../interface/controller.interface';

class OperatorController implements IController {
    getAll = async (req: Request, res: Response): Promise<Response> => {
        const operator = await db.operator.findAll();
        return res.send({
            data: operator,
            message: 'Successfully getting data from api'
        });
    }

    getById = async (req: Request, res: Response): Promise<Response> => {
        throw new Error('Method not implemented.');
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        throw new Error('Method not implemented.');
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        throw new Error('Method not implemented.');
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        throw new Error('Method not implemented.');
    }
}

export default new OperatorController();