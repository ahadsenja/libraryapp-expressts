import { Request, Response } from "express";
import author from "../../db/models/author";

import IController from "../../interfaces/controller.interface";
const db = require('../../db/models')

class BookController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const books = await db.book.findAll({
            attributes: ['id', 'title', 'year', 'stock'],
            include: ['author', 'publisher', 'category', 'genre']
        });

        return res.send({
            data: books
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const book = await db.book.findOne({
            where: { id },
            attributes: ['id', 'author_id', 'publisher_id', 'category_id', 'genre_id', 'title', 'year', 'stock']
        });

        return res.send({
            data: book
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { author_id, publisher_id, category_id, genre_id, title, year, stock } = req.body;

        const book = await db.book.create({
            author_id, publisher_id, category_id, genre_id, title, year, stock
        });

        return res.send({
            data: book
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { author_id, publisher_id, category_id, genre_id, title, year, stock } = req.body;

        const book = await db.book.update({
            author_id, publisher_id, category_id, genre_id, title, year, stock
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