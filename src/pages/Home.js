import React from 'react'
import PartnerList from '../components/etc/PartnerList'


import SwiperBanner from '../components/common/SwiperBanner'
import Svgicon from '../components/util/Svgicon'
import ProductThumbSet from '../components/product/ProductThumbSet'
import BestItemThumb from '../components/product/BestItemThumb'

import SaleItemSet from '../components/product/SaleItemSet'
import RecommendedSet from '../components/product/Recommended'
import RecipeThumbSet from '../components/common/RecipeThumbSet'
import RacipeANDsubscribe from '../components/etc/RacipeANDsubscribe'
import ReviewContents from '../components/etc/ReviewContents'

export default function Home({ addToCart, isLoggedIn }) {


  return (
    <div className='w-100 overflow-hidden'>
      <SwiperBanner id="mainSwiper"></SwiperBanner>
      <Svgicon id='mainSvg' ></Svgicon> 
      
      {/* 컴포넌트 아이디, 스타일, 상품데이터 필더조건, 더보기의 링크값 */}
      <ProductThumbSet   id="newProduct"   style="" filterNV="badges|N" to="/product/newArrival" className='productThumbSet mw mb160 px-3 px-xxl-0'  addToCart={ addToCart } ></ProductThumbSet>
  
      <div className='' style={{ backgroundColor: '#EDF6F6' }}>
      <SaleItemSet id="mainSaleset" className='SaleItemSet mw mb160' to="/product/discount" addToCart={ addToCart }></SaleItemSet>
      </div>

      <BestItemThumb className='BestItemThumb mw mb160 px-3 px-xxl-0' addToCart={ addToCart }></BestItemThumb>

      <div className='' style={{ backgroundColor: '#FFF9F2' }}>
      <RecommendedSet className='mb mb160' addToCart={ addToCart } isLoggedIn={isLoggedIn}></RecommendedSet>
      </div>


      <RecipeThumbSet className='BestItemThumb mw mb160 px-3 px-xxl-0' addToCart={ addToCart }></RecipeThumbSet>
      <RacipeANDsubscribe className="mw mb160"></RacipeANDsubscribe>
      <ReviewContents></ReviewContents>
      <PartnerList className='px-3 px-xl-0'></PartnerList>
      
    </div>
  )
}
