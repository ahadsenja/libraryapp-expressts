import { Request, Response } from "express";
const db = require("../../db/models");

import IController from "../../interfaces/controller.interface";

class CustomerController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const customers = await db.customer.findAll();

        return res.send({
            data: customers,
            messages: 'Successfully retrive customers data'
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const customer = await db.customer.findOne({
            where: { id }
        });

        return res.send({
            data: customer,
            messages: 'Successfully retrive data by id'
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, username, email, password, born_date, born_place, address, handphone } = req.body;

        const customer = await db.customer.create({
            name, username, email, password, born_date, born_place, address, handphone
        });

        return res.send({
            data: customer,
            messages: 'Successfully create data'
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, username, email, password, born_date, born_place, address, handphone } = req.body;

        const customer = await db.customer.update({
            name, username, email, password, born_date, born_place, address, handphone,
        }, {
            where: { id }
        });

        return res.send({
            data: customer,
            messages: 'Successfully updated data'
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const customer = await db.customer.destroy({
            where: { id }
        });

        return res.send({
            data: customer,
            messages: 'Successfully deleted data'
        })
    }

}

export default new CustomerController();