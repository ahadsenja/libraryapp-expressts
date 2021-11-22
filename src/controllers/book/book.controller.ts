import { Request, Response } from "express";

import IController from "../../interface/controller.interface";
const db = require('../../db/models')

class BookController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const books = await db.book.findAll();

        return res.send({
            data: books
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const book = await db.book.findOne({
            where: { id }
        });

        return res.send({
            data: book
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { title, year, stock } = req.body;

        const book = await db.book.create({
            title, year, stock
        });

        return res.send({
            data: book
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { title, year, stock } = req.body;

        const book = await db.book.update({
            title, year, stock
        }, {
            where: { id }
        });

        return res.send({
            data: book
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const book = await db.book.destroy({
            where: { id }
        });

        return res.send({
            data: book
        });
    }

}

export default new BookController();