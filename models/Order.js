const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema ({
    line_items: {
        type : Object
    },
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    city:{
        type: String,
    },
    postalCode:{
        type: String,
    },
    streetAddress:{
        type: String,
    },
    country:{
        type: String,
    },
    paid:{
        type: Boolean,
    },
},{
    timestamps:true,
});

export const Order = models?.Order || model('Order', OrderSchema);