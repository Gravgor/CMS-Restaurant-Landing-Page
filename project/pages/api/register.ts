import * as bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') return res.status(405).end();
    if(!req.body) return res.status(400).end();
    if(!req.body.email) return res.status(400).end();
    if(!req.body.password) return res.status(400).end();
    if(req.body.type !== 'register') return res.status(400).end();
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(user) return res.status(400).end();
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hashedPassword
        }
    })
    res.status(200).json({ message: 'User created', user: newUser });
}