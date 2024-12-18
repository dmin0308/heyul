import React from 'react';
import { Plusbtn } from '../common/_common';
import productdb from '../../data/product.json';

import ProductItem from './ProductItem';
import prd from './ProductThumbSet.module.scss'

export const  ProductThumbSet = ({ id, style, ea, filterNV, to, className, addToCart , rateview = true}) => {
  
  const listea = ea || 4; // 노출 전체 개수 (기본값 4)
  const filternm = filterNV ? filterNV.split("|")[0] : null; // 필터 이름
  const filtervalue = filterNV ? filterNV.split("|")[1] : null; // 필터 값

  // 상품 데이터 필터링
  const productset = productdb.filter((item) => {
    if (!filternm || !filtervalue) return true; // 필터가 없으면 전체 출력
    return item[filternm]?.toString().includes(filtervalue); // 필터 조건 확인
  });

  // 리스트 제한
  const limitedProducts = productset.slice(0, listea);

  return (
    <div id={id} className={`container-fluid ${className}`}>
      <h2 className="kr-h2 mb32 lh0-8">새로운 상품이 왔어요!</h2>
      <div className=''>
      <ul className={`row g-3 ${prd.productThumb}`}>
  {limitedProducts.map((product, index) => (
    <li
      key={product.productId}
      className={`${style} col-lg-3 col-md-4 col-sm-6`}
    >
      <ProductItem info={product} addToCart={addToCart} />
    </li>
  ))}
</ul>

      </div>
      <div className="d-flex justify-content-center mt32">
        <Plusbtn icon="arrow" to={to}>더보기</Plusbtn>
      </div>
    </div>
  );
}

export default ProductThumbSet;


