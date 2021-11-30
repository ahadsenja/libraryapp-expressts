import { Request, Response } from "express";

import IController from "../../interface/controller.interface";
const db = require('../../db/models');

class BookReturnController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const bookReturns = await db.book_return.findAll({
            attributes: ['id', 'date'],
            include: ['book', 'customer', 'operator']
        });

        return res.send({
            data: bookReturns
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const bookReturn = await db.book_return.findOne({
            where: { id }
        });

        return res.send({
            data: bookReturn
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { date, book_id, customer_id, operator_id } = req.body;

        const bookReturn = await db.book_return.create({
            date, book_id, customer_id, operator_id
        });

        return res.send({
            data: bookReturn
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { date, book_id, customer_id, operator_id } = req.body;

        const bookReturn = await db.book_return.update({
            date, book_id, customer_id, operator_id
        }, {
            where: { id }
        });

        return res.send({
            data: bookReturn
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const bookReturn = await db.book_return.destroy({
            where: { id }
        });

        return res.send({
            data: bookReturn
        });
    }
}

export default new BookReturnController();