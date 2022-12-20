import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'DELETE'){
        if(!req.headers.authorization) return res.status(401).json({message: 'Not authorized'});
        try{
            const data = await prisma.food.delete({
                where: {
                    id: parseInt(req.body.id)
                }
            });
            res.status(200).json(data);
            await prisma.$disconnect();
        } catch(err){
            console.log(err)
            res.status(500).json({error: 'Internal server error'});
        }
    }
    if(req.method === 'GET'){
        const data = await prisma.food.findMany();
        res.status(200).json(data);
        await prisma.$disconnect();
    }else if(req.method === 'POST'){
        if(!req.headers.authorization) return res.status(401).json({message: 'Not authorized'});
        try{
            const data = await prisma.food.create({
                data: req.body
            });
            res.status(200).json(data);
            await prisma.$disconnect();
        } catch(err){
            console.log(err)
            res.status(500).json({error: 'Internal server error'});
        }
    }
}