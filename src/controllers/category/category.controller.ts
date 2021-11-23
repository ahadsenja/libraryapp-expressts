import { Request, Response } from "express";

import IController from "../../interface/controller.interface";
const db = require('../../db/models');

class CategoryController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const categories = await db.category.findAll();

        return res.send({
            data: categories
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const category = await db.category.findOne({
            where: { id }
        });

        return res.send({
            data: category
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, description } = req.body;

        const category = await db.category.create({
            name, description
        });

        return res.send({
            data: category
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await db.category.update({
            name, description
        }, {
            where: { id }
        });

        return res.send({
            data: category
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const category = await db.category.destroy({
            where: { id }
        });

        return res.send({
            data: category
        });
    }
}

export default new CategoryController();