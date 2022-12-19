import { NextApiRequest, NextApiResponse } from 'next';
import prisma from './lib/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method === 'GET'){
        const data = await prisma.content.findMany();
        const data2 = await prisma.sliderPhoto.findMany();
        res.status(200).json({data, data2});
        await prisma.$disconnect();
    } else if (req.method === 'POST'){
        if(!req.headers.authorization) return res.status(401).json("Not authorized");
        if(req.body.type === 'email' && req.body.email.includes('@') === false) return res.status(401).json({error: "Email is not valid"});
        if(req.body.phone !== '' &&  req.body.phone.length !== 9) return res.status(401).json({error: "Phone number is not valid"});
        const dataGet = await prisma.content.findMany();
        if(req.body.phone === ''){
            const newPhone = dataGet[0].phone;
            const data = await prisma.content.update({
                where: {
                    contentID: 1
                },
                data: {
                    title: req.body.title ? req.body.title : dataGet[0].title,
                    email: req.body.email ? req.body.email : dataGet[0].email,
                    phone: dataGet[0].phone,
                    address: req.body.address ? req.body.address : dataGet[0].address,
                    address2: req.body.address2 ? req.body.address2 : dataGet[0].address2,
                }
            })
            res.status(200).json(data);
            await prisma.$disconnect();
        }else{
            const newPhone = req.body.phone.slice(0, 3) + ' ' + req.body.phone.slice(3, 6) + ' ' + req.body.phone.slice(6, 9)
            const data = await prisma.content.update({
                where: {
                    contentID: 1
                },
                data: {
                    title: req.body.title ? req.body.title : dataGet[0].title,
                    email: req.body.email ? req.body.email : dataGet[0].email,
                    phone: req.body.phone ? newPhone : dataGet[0].phone,
                    address: req.body.address ? req.body.address : dataGet[0].address,
                    address2: req.body.address2 ? req.body.address2 : dataGet[0].address2,
                }
            })
            res.status(200).json(data);
            await prisma.$disconnect();
        }
    } else {
        res.status(405).end();
        await prisma.$disconnect();
    }
    }