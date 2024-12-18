import React, { useState, useEffect } from "react";
import { Plusbtn } from "../common/_common";
import styles from './RecipeThumbSet.module.scss'; // SCSS 모듈 import
import { Link } from 'react-router-dom'; // Link 임포트

import mainrecipe from '../../data/mainrecipe.json'

export default function RecipeThumbSet({ id, className, addToCart }) {
  const [selectedItems, setSelectedItems] = useState([...mainrecipe]); 
  const [selectAll, setSelectAll] = useState(true); 
  
  const handleCheckboxChange = (item) => {
    if (selectedItems.some(selectedItem => selectedItem.productId === item.productId)) {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.productId !== item.productId));
      setSelectAll(false);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...mainrecipe]);
    }
    setSelectAll(!selectAll);
  };

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + (Number(item.discountPrice) || 0),
    0
  );

  const handleAddToCart = (e) => {
    if (selectedItems.length === 0) {
      alert("상품을 선택해주세요!");
      return;
    }
    addToCart(selectedItems, e);
    alert(`${selectedItems.length}개 상품이 장바구니에 담겼습니다.`);
  };

  useEffect(() => {
    if (mainrecipe.length === selectedItems.length) setSelectAll(true);
    else setSelectAll(false);
  }, [selectedItems]);

  return (
    <div id={id} className={`${className} ${styles['recipe-thumb-container']}`}>
      <div className="d-flex align-items-top justify-content-between position-relative">
        <h2 className="kr-h2 lh0-8">맛있는 레시피<span className="emoji kr_h3">🍴</span></h2>
        <Plusbtn icon="arrow" className="d-none d-sm-flex" to={"/recipe"}>더보기</Plusbtn>
      </div>

      <div className="d-flex flex-wrap">
        <div className="col-12 col-lg-7 overflow-hidden rounded-3"  title="미역국 레시피 영상">
          <div className={`${styles['big-recipe-image']} d-flex align-items-center me-0 me-lg-3 position-relative`} style={{paddingTop : "65%", "height" : 0, transform : "scale(1.2)"}}>
            <iframe
              width="100%"
              className="top-0 start-0 position-absolute"
              height="100%"
              src="https://www.youtube.com/embed/-NwohPd36rg?si=oHBzH4sA1FNZmjlP&controls=0&autoplay=1&mute=1&modestbranding=1&rel=0&vq=hd1080&loop=1&playlist=-NwohPd36rg&controls=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
             
            ></iframe>
          </div>
        </div>

        <div className="col-12 col-lg-5 mb-5">
          <div className={`${styles['cart-section']} ms-0 ms-lg-5 mt-4 mt-lg-0`}>
            <div className={styles['cart-items-list']}>
              {mainrecipe.map((item) => (
                <div key={item.productId} className={styles['cart-item']}>
                  <input
                    checked={selectedItems.some(selectedItem => selectedItem.productId === item.productId)}
                    type="checkbox"
                    onChange={() => handleCheckboxChange(item)}
                    className={`${styles.checkbox} me-3`}
                  />
                  {/* 상품 이미지 클릭 시 상세 페이지로 이동 */}
                  <Link to={`/detail/${item.productId}`}>
                    <img src={item.image_url} alt={item.image_alt} className={styles['cart-item-image']} />
                  </Link>
                  {/* 상품 상세 클릭 시 상세 페이지로 이동 */}
                  <Link to={`/detail/${item.productId}`} className={styles['cart-item-details']}>
                    <p className="sub-prdnm kr-body">{item.name}</p>
                    <div className={styles['price-details']}>
                      {Number(item.discountPrice) > 0 && (
                        <span className={`${styles['original-price']} sub-price me-1`}>
                          {Number(item.originalPrice).toLocaleString()}원
                        </span>
                      )}
                      <span className={`${item.originalPrice ? '' : styles['no-price']} sub-current-price`}>
                        {Number(item.discountPrice) > 0
                          ? `${Number(item.discountPrice).toLocaleString()}원`
                          : `${Number(item.originalPrice).toLocaleString()}원`}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className={`${styles['select-all']} d-flex my-sm-3 py-3`}>
              <input
                type="checkbox"
                id="select-all-checkbox"
                checked={selectAll}
                onChange={() => handleSelectAll()}
                className={styles['checkbox']}
              />
              <label htmlFor="select-all-checkbox" className="kr-body cursor-pointer">
                전체 선택 <span className="cursor-pointer">{mainrecipe.length}개</span>
              </label>
            </div>

            <button className={styles['checkout-button']} onClick={handleAddToCart}>
              <h5 className="kr-h5">
                {totalPrice > 0 ? `총 ${totalPrice.toLocaleString()}원 장바구니 담기` : "상품을 골라보세요!"}
              </h5>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
