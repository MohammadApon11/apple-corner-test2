import React from "react";
import ProductModal from "../components/modals/product/ProductModal";
import Table from "../components/shared/Table";
import useGetProducts from "../hooks/products/useGetProduct";

const ProductManagePage = () => {
  const { products, productsLoading } = useGetProducts();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="py-8 text-4xl text-white">All Products</h3>

        <button
          onClick={() => document.getElementById("my_modal_5").showModal()}
          className="btn btn-outline btn-info"
        >
          Create New Hero
        </button>
      </div>
      <ProductModal />
      <Table showIcon={true} data={products} loading={productsLoading} />
    </div>
  );
};

export default ProductManagePage;
