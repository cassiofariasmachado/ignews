import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Cássio' },
        { id: 2, name: 'Diego' },
        { id: 2, name: 'Rafa' }
    ];

    return response.json(users);
}