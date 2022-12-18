import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        const data = await prisma.content.findMany();
        res.status(200).json(data);
    } else if (req.method === 'POST'){
        if(!req.headers.authorization) return res.status(401).end();
        const dataGet = await prisma.content.findMany();
        const newPhone = req.body.phone.slice(0, 3) + ' ' + req.body.phone.slice(3, 6) + ' ' + req.body.phone.slice(6, 9)
        const data = await prisma.content.update({
            where: {
                id: 1
            },
            data: {
                title: req.body.title ? req.body.title : dataGet[0].title,
                email: req.body.email ? req.body.email : dataGet[0].email,
                phone: newPhone ? newPhone : dataGet[0].phone,
                address: req.body.address ? req.body.address : dataGet[0].address,
                address2: req.body.address2 ? req.body.address2 : dataGet[0].address2,
            }
        })
        await prisma.$disconnect();
        res.status(200).json(data);
    } else {
        res.status(405).end();
    }
    }