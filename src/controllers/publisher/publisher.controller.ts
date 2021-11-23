import { Request, Response } from "express";

import IController from "../../interface/controller.interface";
const db = require('../../db/models');

class PublisherController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const publishers = await db.publisher.findAll();

        return res.send({
            data: publishers
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const publisher = await db.publisher.findOne({
            where: { id }
        });

        return res.send({
            data: publisher
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, address, city } = req.body;

        const publisher = await db.publisher.create({
            name, address, city
        });

        return res.send({
            data: publisher
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, address, city } = req.body;

        const publisher = await db.publisher.update({
            name, address, city
        }, {
            where: { id }
        });

        return res.send({
            data: publisher
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const publisher = await db.publisher.destroy({
            where: { id }
        });

        return res.send({
            data: publisher
        });
    }
}

export default new PublisherController();