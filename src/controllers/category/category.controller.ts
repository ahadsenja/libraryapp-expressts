import { Request, Response } from "express";
const { Op } = require("sequelize");

import IController from "../../interfaces/controller.interface";
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

    search = async (req: Request, res: Response): Promise<Response> => {
        let { name } = req.params;

        if (!name) name = '';

        try {
            let category = await db.category.findAll({
                order: [['id', 'ASC']],
                where: {
                    [Op.and]: [
                        {
                            name: {
                                [Op.iLike]: '%' + name + '%'
                            }
                        }
                    ]
                }
            });

            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new CategoryController();