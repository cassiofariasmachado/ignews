import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
    const users = [
        { id: 1, name: 'Cássio' },
        { id: 2, name: 'Diego' },
        { id: 2, name: 'Rafa' }
    ];

    const id = Number(request.query.id);

    const user = users.find(u => u.id === id);

    if (!user)
        return response.status(404).send('');

    return response.json(user);
}