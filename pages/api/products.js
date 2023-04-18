import mongooseConfig from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function (req, res) {
  const { method } = req;
  await mongooseConfig();


    if (method === 'GET') {
      if(req.query?.id){
        res.json(await Product.findOne({_id:req.query.id}));
      }else {
      res.json(await Product.find());
    };
  };

    if (method === "POST") {
      const { name, description, price, photos, category, properties } = req.body;
      const productInfo = await Product.create({
        name,
        description,
        price,
        photos,
        category,
        properties
      });
      res.json(productInfo);
    }
    
    if (method === 'PUT') {
      const {name, description, price, photos, _id, category,properties} = req.body;
      const updatedProduct = await Product.updateOne({_id}, {name,description,price,photos,category,properties});
      res.json(updatedProduct);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        await Product.deleteOne({_id:req.query?.id});
        res.json("Sucessfully Deleted")
      }
    }
}
