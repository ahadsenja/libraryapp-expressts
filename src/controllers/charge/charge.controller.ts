import { Request, Response } from "express";

import IController from "../../interfaces/controller.interface";
const db = require("../../db/models");

class ChargeController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const charges = await db.borrow.findAll({
            attributes: ['id', 'date', 'cost'],
            include: [{
                model: db.book_return,
                as: 'book_return',
                include: [{
                    model: db.book,
                    as: 'book'
                }, {
                    model: db.customer,
                    as: 'customer'
                }, {
                    model: db.operator,
                    as: 'operator'
                }]
            }]
        });

        return res.send({
            data: charges
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const charge = await db.charge.findOne({
            where: { id },
            include: ['book_return', 'customer', 'operator']
        });

        return res.send({
            data: charge
        })
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { date, cost, customer_id, operator_id, book_return_id } = req.body;

        const charge = await db.charge.create({
            date, cost, customer_id, operator_id, book_return_id,
            include: ['book_return', 'customer', 'operator']
        });

        return res.send({
            data: charge
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { book_return_id, date, cost } = req.body;

        const charge = await db.charge.update({
            book_return_id, date, cost
        }, {
            where: { id }
        });

        return res.send({
            data: charge
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const charge = await db.charge.destroy({
            where: { id }
        });

        return res.send({
            data: charge
        });
    }

    showChargeByCustomerId = async (req: Request, res: Response): Promise<Response> => {
        const customer_id = req.params.id;

        const charges = await db.charge.findAll({
            where: { customer_id },
            include: ['book_return', 'customer', 'operator']
        });

        return res.send({
            data: charges
        });
    }
}

export default new ChargeController();