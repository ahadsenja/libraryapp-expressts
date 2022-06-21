import { Request, Response } from "express";

import IController from "../../interfaces/controller.interface";
const db = require('../../db/models')
const Op = db.Sequelize.Op;

const getPagination = (page: any, size: any) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
}

const getPagingData = (data: any, page: any, limit: any) => {
    const { count: totalItems, rows: books } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, books, totalPages, currentPage };
}

class BookController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const { page, size, title } = req.query;
        let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size);

        return await db.book.findAndCountAll({
            attributes: ['id', 'title', 'year', 'stock'],
            include: ['author', 'publisher', 'category', 'genre'],
            where: condition, limit, offset
        }).then((data: any) => {
            const response = getPagingData(data, page, limit);
            res.send([response]);
        }).catch((error: { message: any; }) => {
            res.status(500).send({
                message: error.message || 'Some error occurred when retrieving books'
            })
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

    search = async (searchWord: string) => {
        return await db.books.findAll({
            attributes: ['id', 'title'],
            where: {
                content: '%' + searchWord + '%'
            }
        })
    }

}

export default new BookController();