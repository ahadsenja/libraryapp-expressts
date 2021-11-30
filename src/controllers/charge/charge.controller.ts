import { Request, Response } from "express";

import IController from "../../interfaces/controller.interface";
const db = require("../../db/models");

class ChargeController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const charges = await db.charge.findAll({
            attributes: ['id', 'date', 'cost'],
            include: ['book_return']
        });

        return res.send({
            data: charges
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const charge = await db.charge.findOne({
            where: { id }
        });

        return res.send({
            data: charge
        })
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { book_return_id, date, cost } = req.body;

        const charge = await db.charge.create({
            book_return_id, date, cost
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
        const { id } = req.body;

        const charge = await db.charge.destroy({
            where: { id }
        });

        return res.send({
            data: charge
        });
    }
}

export default new ChargeController();