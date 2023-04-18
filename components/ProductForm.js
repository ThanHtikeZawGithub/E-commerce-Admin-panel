import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UploadIcon } from "./Icons";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
    _id,
     name: existingName,
     description: existingDesc, 
     price: existingPrice,
     photos: existingPhotos,
     category: assignedCategory,
     properties: assignedProperties,
    }) => {
    const router = useRouter();
  const [name, setName] = useState(existingName || '');
  const [description, setDescription] = useState(existingDesc || '');
  const [price, setPrice] = useState(existingPrice || '');
  const [photos, setPhotos] = useState(existingPhotos || []);
  const [backToProducts, setBackToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState(assignedCategory || '');             //this is for db
  const [categories, setCategories] = useState([]);                             //this is for fetching all the category from categories page
  const [productProperties, setProductProperties] = useState(assignedProperties || {});

  useEffect(()=>{
    axios.get('/api/categories')
    .then(result => {
      setCategories(result.data)
    })
  },[]);

  const saveProduct = async (e) => {
    e.preventDefault();
    const data = { 
      name, 
      description, 
      price, 
      photos, 
      category, 
      properties:productProperties     //renamed to properties when sending to backend
    };
    if(_id){
        await axios.put('/api/products', {...data, _id});   //give back id
    }else{
        await axios.post("/api/products", data);
    }
    setBackToProducts(true);
  };

  if (backToProducts) {
    router.push("/products");
  };

  const uploadPhotos = async(e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }
    const response = await axios.post("/api/upload", data);
    setPhotos(oldPhotos => {
      return [...oldPhotos, ...response.data.links];
    });
    setIsUploading(false);
  }};


  function updatePhotosOrder(photos) {
    setPhotos(photos);
  };

  function handleChangeProperties(pName, value) {
    setProductProperties(prev => {
      const newProductProp = {...prev};
      newProductProp[pName] = value;
      return newProductProp;
    })
  }

  const propertiesToGrab = [];
  if (categories.length > 0 && category) {
    let selectedCategory = categories.find(({_id}) => _id === category);
    propertiesToGrab.push(...selectedCategory.properties);
    while(selectedCategory?.main?._id) {
      const mainCategory = categories.find(({_id}) => _id === selectedCategory.main?._id);
      propertiesToGrab.push(...mainCategory.properties);
      selectedCategory = mainCategory;
    }
  }

  return (
      <form onSubmit={saveProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Category</label>
        <select value={category} onChange={(e)=> setCategory(e.target.value)}>
          <option value=''>Uncategorized</option>
          {categories.length > 0 && (
            categories.map(category => (
              <option value={category._id}>{category.name}</option>
            ))
          )}
        </select>
        {propertiesToGrab.length > 0 && (
          propertiesToGrab.map(p =>(
            <>
            <div>{p.name}</div>
            <select onChange={(e)=> handleChangeProperties(p.name, e.target.value)}
                    value={productProperties[p.name]}
                    >
              {p.value.map(v => (
                <option value={v}>{v}</option>
              ))}
            </select>
            </>
          ))
        )}
        <label>Product Photos</label>
        <div className="mb-2 flex gap-1 flex-wrap">
        <ReactSortable 
              list={photos} 
              setList={updatePhotosOrder}
              className="flex flex-wrap gap-1">
        {photos?.length > 0 && (
              photos.map(link => (
                <div key={link} className="overflow-hidden">
                  <img src={link} alt='product link' className="w-24 h-24 rounded-md cursor-pointer"/>
                </div>
              ))
            )
            }
          </ReactSortable>
          {isUploading && (
            <div className="h-24 w-24 flex items-center rounded-md justify-center">
              <Spinner/>
            </div>
          )}
          <label 
          className="bg-green-200 cursor-pointer rounded-lg w-24 h-24 border flex justify-center items-center gap-1 text-sm text-gray-500"
          >
            <UploadIcon/>
            <div>
              Upload
            </div>
            <input type="file" 
                  className="hidden"
                  onChange={uploadPhotos}
                  />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price (Kyats)</label>
        <input
          type="text"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
  )
}

export default ProductForm;