import React, {useEffect, useRef } from 'react'
import { Wishheart , BookmarkBt, CommentBt , RateBt , Syoutube, Sgit, Sinstar , Skakao,  LabelR, LabelC,  LabelPw , Viewicon, Carticon, Wishicon, Bookicon,Badges  } from '../common/util/_icon'

import prditem from './ProductItem.module.scss' 

export default function ProductItem({info ,  addToCart , rateview, ct = "org"}) {

const buttonRef = useRef(null);


const discountPrice = Number(info.discountPrice) || 0;
const originalPrice = Number(info.originalPrice);

const shouldShowRateView = rateview ?  true : false;


const handleAddToCart = (e) => {
  
  alert(info.name+"상품이 추가되었습니다.")
  addToCart([info], e);  // 장바구니에 상품 추가
  
};


  useEffect(()=>{
    // console.log("ProductItem 상품썸네일정보",info)
    const button = buttonRef?.current; 
    const toggleClass = () => {
      button.classList.toggle("active");
    };
      button.addEventListener("click", toggleClass);
    return () => {
      button.removeEventListener("click", toggleClass);
    };  

  }, [])
  return (
    <div className={`${ct} position-relative d-inline-block pb-3
    `} data-id={info.productId}>
                <div className='position-absolute d-flex oriinner gap-1'>
                  {
                    info.badges && info.badges.includes("N") && (
                      <Badges className="N">NEW</Badges>
                    )
                  }                  
                  {
                    info.coupon && info.coupon.trim() !== "" && info.coupon !== '""' &&  <Badges className='C'>{
                      info.coupon.split("|")[0]+"% "+ '쿠폰'
                    }</Badges>
                  }
                  {
                    info.badges && info.badges.includes("S") && (
                      <Badges className='S'>SALE</Badges>
                    )
                  }
                </div>
                <div className={`${ct}-img overflow-hidden position-relative`}>
                    <img src={info.image_url}  alt={info.image_alt} className='img-fluid ' />
                    <div className='position-absolute top-0 w-100 h-100 start-0 justify-content-center align-items-center thumbwrap'>
                         <div className='d-flex justify-content-center align-items-center gap-3'>
                          <Carticon onClick={handleAddToCart} ></Carticon>
                          <Viewicon to={`/detail/${info.productId}`} ></Viewicon>                         
                         </div>
                    </div>
                    
                </div>
           
              <div className="product-info oriinner pt-0 pb-0 w-100">
                <h3 className={`${ct}-prdnm text-overflow`}>{info.name}</h3>
                { discountPrice > 0 && <span className={`${ct}-price d-lg-none d-sm-flex pb-0`}>
                    {originalPrice.toLocaleString()}원
                  </span> }
                <p className='d-none'>{info.description}</p>
                <div className="price d-flex flex-wrap justify-content-between gap-1 align-items-end">
                    {/* 할인율 표시 */}
                    { discountPrice  && discountPrice >0 ? <span className={`${ct}-current-price text-discount`}>
                      {  `${Math.round(100 - (discountPrice / originalPrice) * 100)}%`}       
                    </span> : null }
                    
      
                  {/* 원래 가격 쉼표 추가 */}
                  <span className={`${ct}-current-price`}>
                    { discountPrice  && discountPrice >0 ? discountPrice.toLocaleString() : originalPrice.toLocaleString()}원
                  </span>
                  {/* 할인 상품이 아닐 때 원래 가격을 숨김 처리 */}
                  { discountPrice > 0 && <span className={`${ct}-price me-auto invisible d-md-flex`}>
                    {originalPrice.toLocaleString()}원
                  </span> }

                  <Wishheart ref={buttonRef} className={`ms-auto w_icon order-5`} ></Wishheart>
                </div>
                {
                  shouldShowRateView  &&
                  <div className='rateline d-flex align-items-end gap-1 mt18'>
                      <RateBt className='active'></RateBt>
                      <span className='kr-body text-tint'>{
                            ` ${info.rating} ( ${info.reviews} )`
                        }</span>
                  </div>
                } 

                
                {/* <BookmarkBt></BookmarkBt>
                <CommentBt></CommentBt>
                
                <Syoutube></Syoutube>
                <Sinstar></Sinstar>
                <Skakao></Skakao>
                <Sgit></Sgit>
                <LabelR></LabelR>
                <LabelC></LabelC>
                <LabelPw></LabelPw> 
                
                <Wishicon></Wishicon>
                <Bookicon></Bookicon> */}
              </div>
    </div>
  )
}