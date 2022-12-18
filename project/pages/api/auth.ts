import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST') return res.status(405).end();
    if(!req.body) return res.status(400).end();
    if(!req.body.email) return res.status(400).end();
    if(!req.body.password) return res.status(400).end();
    if(req.body.type !== 'login') return res.status(400).end();
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user) return res.status(404).end();
    if(user === null) return res.status(404).end();
    const userPassword = user.password;
    const passwordIsValid = bcrypt.compareSync(password, userPassword);
    if(!passwordIsValid) return res.status(401).end();
    const token = jsonwebtoken.sign({ id: user.id }, '3uCPofHOQ3Q7Mt2f2JK3Rz4vlWrCOLMGgOWfn-BjVeovWWPwV1jYxpBqTZE8wfegsjPr_0yWVPEyHKa7KLPkFcxHR0NOE_Bs-YOgBJabG-j8njkKKrfu-GMKyigh_1pptvabyj0OzKKbzpcevP1aOx-b2Ixu4ZwKLpOH8uaWf0', { expiresIn: '1d' });
    res.setHeader('Set-Cookie', `token=${token}; path=/; expires=${new Date(Date.now() + 86400000).toUTCString()}; httponly`);
    res.status(200).json({ token,user });
}