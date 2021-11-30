import { Request, Response } from "express";

import IController from "../../interfaces/controller.interface";
const db = require('../../db/models');

class SettingController implements IController {
    findAll = async (req: Request, res: Response): Promise<Response> => {
        const setting = await db.setting.findAll();

        return res.send({
            data: setting
        });
    }

    findOne = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const setting = await db.setting.findOne({
            where: { id }
        });

        return res.send({
            data: setting
        });
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        const { property, value } = req.body;

        const setting = await db.setting.create({
            property, value
        });

        return res.send({
            data: setting
        });
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;
        const { property, value } = req.body;

        const setting = await db.setting.update({
            property, value
        }, {
            where: { id }
        });

        return res.send({
            data: setting
        });
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.params;

        const setting = await db.setting.destroy({
            where: { id }
        });

        return res.send({
            data: setting
        });
    }
}

export default new SettingController();