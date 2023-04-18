import ProductForm from "@/components/ProductForm";
import Layout from "@/components/layout";

const NewProduct = () => {
  return (
    <Layout>
      <h1 className="text-blue-800 mb-2 text-lg">New Products</h1>
      <ProductForm />
    </Layout>
  );
};

export default NewProduct;
