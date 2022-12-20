import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',
        }
    }
}



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'DELETE'){
        if(!req.headers.authorization) return res.status(401).json("Not authorized");
        try{
            console.log(req.body.id)
            const parsedInt = parseInt(req.body.id);
            const data = await prisma.sliderPhoto.delete({
                where: {
                    id: parsedInt
                }
            })
            res.status(200).json({message: `Usunięto zdjęcie ${parsedInt}`});
            await prisma.$disconnect();
        } catch (err){
            //console.log(err)
            res.status(500).json({error: `Błąd usuwania zdjęcia ${req.body.id}`});
            await prisma.$disconnect();
        }
    }
    if(req.method === 'GET'){
        const data = await prisma.sliderPhoto.findMany();
        res.status(200).json(data);
        await prisma.$disconnect();
    }
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
                            name: req.body.imgName,
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

