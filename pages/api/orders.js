import mongooseConfig from "@/lib/mongoose";
import {Order} from "@/models/Order";


export default async function handler(req,res) {
  await mongooseConfig();
  res.json(await Order.find().sort({createdAt:-1}));
}