import mongooseConfig from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";


export default async function (req,res) {
    const {method} = req;
    await mongooseConfig();
    await isAdminRequest(req,res)
   
    
    if (method === 'POST') {
        const {name, mainCategory, properties} = req.body;
        const categoryInfo = await Category.create({
            name,
            main:mainCategory || undefined,
            properties,
        });
        res.json(categoryInfo);
    }

    if (method === 'GET') {
        res.json(await Category.find().populate('main'));
    }

    if (method === 'PUT') {
        const {name, mainCategory,_id, properties} = req.body;
        const categoryInfo = await Category.updateOne({_id},{
            name,
            main: mainCategory || undefined,
            properties,
        });
        res.json(categoryInfo);
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('Deleted Successfully')
    }
}