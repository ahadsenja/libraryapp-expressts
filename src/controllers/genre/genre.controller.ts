import { Request, Response } from "express";

import IController from "../../interfaces/controller.interface";
const db = require('../../db/models');

class GenreController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const genre = await db.genre.findAll();

        return res.send({
            data: genre
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const genre = await db.genre.findOne({
            where: { id }
        });

        return res.send({
            data: genre
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { name, description } = req.body;

        const genre = await db.genre.create({
            name, description
        });

        return res.send({
            data: genre
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { name, description } = req.body;

        const genre = await db.genre.update({
            name, description
        },
            {
                where: { id }
            });

        return res.send({
            data: genre
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const genre = await db.genre.destroy({
            where: { id }
        });

        return res.send({
            data: genre
        });
    }
}

export default new GenreController();