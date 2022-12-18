import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';
import path from 'path';
import fs from 'fs';
import formidable from "formidable";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        }
    }
}



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'POST'){
        if(!req.headers.authorization) return res.status(401).json("Not authorized");
        try{
            const data = await prisma.content.update({
                where: {
                    contentID: 1
                },
                data: {
                    photosSlider: {
                        create: {
                            photohash: req.body.img
                        }
                    }
                }
                
            })
            res.status(200).json({message: `Dodano zdjęcie ${req.body.imgName}`});
            await prisma.$disconnect();
        } catch (err){
            res.status(500).json({error: `Błąd dodawania zdjęcia ${req.body.imgName}`});
            await prisma.$disconnect();
        }
    }else{
        await prisma.$disconnect();
        res.status(405).end();
    }
}

