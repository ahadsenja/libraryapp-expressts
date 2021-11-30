import { Request, Response } from "express";

import IController from "../../interface/controller.interface";
const db = require('../../db/models');

class BorrowController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const borrow = await db.borrow.findAll({
            attributes: ['id', 'borrow_date', 'return_date'],
            include: ['book', 'customer', 'operator']
        });

        return res.send({
            data: borrow
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const borrow = await db.borrow.findOne({
            where: { id }
        });

        return res.send({
            data: borrow
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { book_id, customer_id, operator_id, borrow_date, return_date } = req.body;

        const borrow = await db.borrow.create({
            book_id, customer_id, operator_id, borrow_date, return_date
        });

        return res.send({
            data: borrow
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { book_id, customer_id, operator_id, borrow_date, return_date } = req.body;

        const borrow = await db.borrow.update({
            book_id, customer_id, operator_id, borrow_date, return_date
        }, {
            where: { id }
        });

        return res.send({
            data: borrow
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const borrow = await db.borrow.destroy({
            where: { id }
        });

        return res.send({
            data: borrow
        });
    }
}

export default new BorrowController();