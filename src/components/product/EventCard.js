import React, { useState } from "react";

import productdb from "../../data/product.json";
import ProductItem from "./ProductItem";
import es from "./EventCard.module.scss"
import { Plusbtn } from "../common/_common";

export default function EventitemSet({
  id,
  style,
  ea,
  filterNV,
  to,
  className,
  addToCart,
  couponFilter,
}) {
  const [itemsToShow, setItemsToShow] = useState(4);
  const itemsPerPage = 4;

  const groupedProducts = productdb.reduce((acc, product) => {
    if (!product.coupon || product.coupon !== couponFilter) return acc; // 필터 값과 일치하지 않는 쿠폰 제외
    if (!acc[product.coupon]) {
      acc[product.coupon] = []; // 새로운 쿠폰 그룹 생성
    }
    acc[product.coupon].push(product); // 상품을 쿠폰 그룹에 추가
    return acc;
  }, {});

  const handleLoadMore = () => {
    setItemsToShow((prevCount) => prevCount + itemsPerPage); 
  };
  

  return (
    <div className={`${className || ""}`} id={id}>
      {/* <ul>에 grid 클래스 적용 */}
      <ul className={es.productGrid}>
        {Object.entries(groupedProducts).map(([coupon, products]) => (
          // <div className="event-group"> 제거 (grid 적용 방해 요소)
          <>
            {products.slice(0, itemsToShow).map((product) => (
              <li
                key={product.productId}
                className={`product-item ${es.productItem}`} // product-item과 SCSS 스타일 적용
              >
                <ProductItem
                  key={product.productId}
                  info={product}
                  ct="org"
                  addToCart={addToCart}
                />
              </li>
            ))}
          </>
        ))}
      </ul>
  
      <div className="d-flex justify-content-center mt32">
        {itemsToShow < productdb.length && (
          <Plusbtn icon="plus" to={to} onClick={handleLoadMore}>
            더보기
          </Plusbtn>
        )}
      </div>
    </div>
  );
}
