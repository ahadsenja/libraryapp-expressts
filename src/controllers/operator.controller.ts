import { Request, Response } from 'express';

let data: any[] = [
    { id: 1, name: 'zaki', username: 'zaki', email: 'zaki@email.com', password: 'zaki', address: 'jl ubuntu', handphone: 6287889967897 },
    { id: 2, name: 'jeki', username: 'jeki', email: 'jeki@email.com', password: 'jeki', address: 'jl linux mint', handphone: 6287098789111 }
];

class OperatorController {
    getAll(req: Request, res: Response): Response {
        return res.send(data);
    }
}

export default new OperatorController;