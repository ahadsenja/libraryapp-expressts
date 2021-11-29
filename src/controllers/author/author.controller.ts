import { Request, Response } from "express";
import book from "../../db/models/book";

import IController from "../../interface/controller.interface";
const db = require('../../db/models');

class AuthorController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const authors = await db.author.findAll({
            minclude: [{
                model: book
            }]
        });
        return res.send({
            data: authors
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const author = await db.author.findOne({
            where: { id }
        });

        return res.send({
            data: author
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, email, address, born_date, born_place, city } = req.body;

        const author = await db.author.create({
            name, email, address, born_date, born_place, city
        });

        return res.send({
            data: author
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, email, address, born_date, born_place, city } = req.body;

        const author = await db.author.update({
            name, email, address, born_date, born_place, city
        },
            {
                where: { id }
            });

        return res.send({
            data: author
        })
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const author = await db.author.destroy({
            where: { id }
        });

        return res.send({
            data: author
        });
    }

}

export default new AuthorController();