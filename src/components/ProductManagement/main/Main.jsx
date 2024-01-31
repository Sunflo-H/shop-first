import React from "react";
import ProductStatus from "./ProductStatus";
import { CiSearch } from "react-icons/ci";
import useProducts from "../../../hooks/useProducts";
import ProductListItem from "./ProductListItem";

export default function Main() {
  const {
    productsQuery_all: { data },
  } = useProducts();

  const accessories = data ? Object.entries(data[0]) : []; // [[key,value],[key,value]] 형태
  const men = data ? Object.entries(data[1]) : [];
  const shoes = data ? Object.entries(data[2]) : [];
  const test = data ? Object.entries(data[3]) : [];
  const women = data ? Object.entries(data[4]) : [];

  const productList_keyAndValue = [
    ...accessories,
    ...men,
    ...shoes,
    ...women,
    ...test,
  ];

  return (
    <div className="grow">
      <div className="flex border-gray-300 border-b ">
        <ProductStatus />
        <div>
          <select>
            <option value="0">Show 10 items</option>
            <option value="1">Show 20 items</option>
            <option value="2">Show 30 items</option>
          </select>
        </div>
      </div>
      <div className="mt-4 border ">
        <div className="flex justify-between bg-white">
          <input
            className="px-6 py-3 grow outline-none"
            type="text"
            placeholder="상품명 검색"
          />
          <CiSearch className="text-2xl self-center mr-4" />
        </div>
      </div>
      <div className="mt-4 bg-white">
        <div className="flex px-8 py-2 border-b border-gray-300 font-bold">
          <div className="w-20">
            <input type="checkbox" /> No
          </div>
          <div className="w-96 text-center">Title</div>
          <div className="w-36 text-center">Price</div>
          <div className="w-48 text-center">Category</div>
          <div className="w-40 text-center">Status</div>
          <div className="w-16  text-center mr-4">Stock</div>
          <div className="w-48 text-center">Registration Date</div>
        </div>
        <div className="">
          <ul>
            {productList_keyAndValue.map((product_KeyAndValue, index) => (
              <ProductListItem
                product_KeyAndValue={product_KeyAndValue}
                key={index}
              />
            ))}
            {/* <li className="flex px-8 py-3">
              <div className="w-20">
                <input type="checkbox" />
                <span className="ml-1">9999</span>
              </div>
              <div className="w-96 text-center">Men's cloth 1</div>
              <div className="w-36 text-center">1000$</div>
              <div className="w-48 text-center">Men</div>
              <div className="w-40 text-center">Sold Out</div>
              <div className="w-16 text-center mr-4">50</div>
              <div className="w-48 text-center">2024-01-30</div>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
