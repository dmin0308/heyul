import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LabelC } from '../common/util/_icon';
import { Deleteicon } from '../common/_common';

import styles from './cartlist.module.scss';

export default function CartList({ v, i, cartToCart, selected, onSelect }) {
  const [quantity, setQuantity] = useState(v.quantity);

  // 수량 증가
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  // 수량 감소
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // 수량 변경 시 cartToCart 호출
  useEffect(() => {
    if (quantity !== v.quantity) {
      cartToCart([{ productId: v.productId, quantity: quantity - v.quantity }]);
    }
    console.log(v)
  }, [quantity, v.quantity, v.productId, cartToCart]);

  return (
    <div className="d-flex p-3 position-relative ">
      <input 
      type="checkbox" 
      id={`cartnum${i}`} 
      className="d-none"
      checked={selected}
      onChange={() => onSelect(!selected)} />
      <LabelC htmlFor={`cartnum${i}`} size={[15, 20]}></LabelC>

      <div className="ms-3">
        <div>
          {v && v.productId && (
            <Link to={`/detail/${v.productId}`}>
              <span className={`${styles.productText} mb-1 fs18 fw400 d-block`}>
                <span className={`mb-3 `}>{v.name}</span>
              </span>
              <span className="mb-2 kr-body text-tintdark d-block">
                {v.simple_description}
              </span>
            </Link>
          )}
        </div>
        <div className="d-flex gap-3">
          {v && v.productId && (
            <Link to={`/detail/${v.productId}`}>
              <img
                src={v.image_url}
                alt={v.image_alt}
                className="img-fluid rounded-4"
                style={{ width: '80px', height: '80px' }}
              ></img>
            </Link>
          )}
          <div className="d-flex flex-column justify-content-between">
          <p className="pricesection d-flex">
  <span className="purchase kr-h6">
  {v.purchasePr && v.purchasePr.toLocaleString()}
    <span className="won">원</span>
  </span>
  {v.originalPrice && (
    <span className={`org-price text-tint ${styles.orgPrice} ${ Number(v.discountPrice) > 0 ? null : "d-none"  }`}>
      {(Number(v.originalPrice) * v.quantity).toLocaleString()}
      <span className="won">원</span>
    </span>
  )}
</p>

            {/* -, + 버튼 svg*/}
            <div className={`${styles.quantityButtons}`}>
              <button className={styles.btn} onClick={handleDecrement}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0.330078 6.16187H13.6601V7.82812H0.330078V6.16187Z" fill="#CCCCCC" />
                </svg>
              </button>
              <span className={styles.quantity}> {quantity}</span>
              <button className={styles.btn} onClick={handleIncrement}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.8282 0.329956H6.16195V6.16183H0.330078V7.82808H6.16195V13.66H7.8282V7.82808H13.6601V6.16183H7.8282V0.329956Z"
                    fill="#222222"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {v && (
        <Deleteicon
          icon="gray"
          className="position-absolute end-0 top-0 mt-3 me-3"
          onClick={() => {
            cartToCart([v], true); // 삭제
          }}
        ></Deleteicon>
      )}
    </div>
  );
}
