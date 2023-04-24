import Layout from "@/components/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

const Categories = () => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);


  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  const SaveCategory = async (e) => {
    e.preventDefault();
    const data = { 
          name, 
          mainCategory,
          properties: properties.map(p => ({
            name:p.name,
            value: p.value.split(','),
    }))
        };
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put("/api/categories", data); //sending id to update
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setProperties([]);
    setMainCategory('');
    fetchCategories();
  };

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setMainCategory(category?.main?._id);
    setProperties(
      category.properties.map(({name,value})=>({
        name,
        value:value.join(',')
      })));
  }

  function deleteCategory(category) {
      swal({
        title: 'Are you sure?',
        text: `This will delete the category ${category.name}`,
        icon: 'warning',
        buttons: ['Cancel', 'Delete'],
        dangerMode: true,
      }).then(async willDelete => {
        if (willDelete) {
          const _id = category._id;
          await axios.delete('/api/categories?_id=' + _id);
          fetchCategories();
          swal('Category deleted!', {
            icon: 'success',
          });
          }
      });
    };

  function addProperties() {
    setProperties(prev => {
      return [...prev, {name:'', value:''}];
    })
  }

  function updatePropertyName(property,index,newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties
    })
  }

  function updatePropertyValue(property,index,newValue) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].value = newValue;
      return properties
    })
  }

  function removeProperty(index) {
    setProperties(prev => {
      const newProperty = [...prev];
      return newProperty.filter((p,i) => {
        return i !== index;         //filter targeted index
      })
    })
  }

  return (
    <Layout>
      <h1 className="text-2xl">Categories</h1>
      <label>{editedCategory ? "Edit category" : "Create new category"}</label>
      <form onSubmit={SaveCategory} className="flex flex-col gap-1">
        <div className="flex gap-1">
        <input
          type="text"
          className="mb-0"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          value={mainCategory}
          onChange={(e) => setMainCategory(e.target.value)}
        >
          <option value="">No main category</option>
          {categories?.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
        </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button type="button" 
                  className="btn-primary w-24 mb-2"
                  onClick={addProperties}
                  >
                    Add
          </button>
          {properties.length > 0 && (
            properties.map((property, index) =>(
              <div className="flex">
                <input 
                type="text" 
                placeholder="property name"
                value={property.name}
                onChange={(e)=>updatePropertyName(property,index, e.target.value)}
                className="mb-0"
                />
                <input 
                type="text" 
                placeholder="property value"
                value={property.value}
                onChange={(e)=>updatePropertyValue(property,index, e.target.value)}
                className="mb-0"
                />
                <button 
                className="btn-primary w-24 h-12"
                onClick={() => removeProperty(index)}
                type="button"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        <div className="flex gap-1">
        <button type="submit" className="btn-primary py-1 w-24">
          Save
        </button>
        {editedCategory && (
          <button 
          className="btn-primary w-24"
          onClick={()=> {
            setEditedCategory(null)
            setName('')
            setMainCategory('')
            setProperties([])
          }}
          type="button"
          >
            Cancel
          </button>
          
        )}
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category name</td>
            <td>Main Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.main?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary mr-2"
                  >
                    Edit
                  </button>
                  <button 
                  onClick={()=> deleteCategory(category)}
                  className="btn-primary">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      )}
      
    </Layout>
  );
};

export default Categories;