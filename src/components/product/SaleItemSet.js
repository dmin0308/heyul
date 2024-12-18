import React, { useState, useRef , useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Plusbtn } from "../common/_common";
import PaginationSet from "../common/PaginationSet";

import styles from "./SaleItemSet.module.scss";
import productdb from "../../data/product.json";
import ProductItem from "./ProductItem";

export default function SaleItemSet({
  id, style, ea, filterNV, to, className, addToCart,
}) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isBelow768, setIsBelow768] = useState(false); 
  const swiperRef = useRef(null);

  // 창 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsBelow768(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 

    return () => window.removeEventListener("resize", handleResize); 
  }, []);

  // 상품 데이터 처리
  const productset = productdb.filter(
    (item) => item.badges && item.badges.includes("S")
  );
  const maxPages = 5;
  const maxItems = itemsPerPage * maxPages;
  const visibleProducts = productset.slice(0, maxItems);

  // 화면 크기에 따른 슬라이드 수 조정
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.matchMedia("(max-width: 575px)").matches) {
        setItemsPerPage(1); 
      } else if (window.matchMedia("(max-width: 767px)").matches) {
        setItemsPerPage(2); 
      } else if (window.matchMedia("(max-width: 991px)").matches) {
        setItemsPerPage(3); 
      } else {
        setItemsPerPage(4); 
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // 페이지 이동 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    swiperRef.current?.swiper.slideTo((page - 1) * itemsPerPage);
  };

  return (
    <div className={`${className || ""} px-3 px-xxl-0 `} style={style} id={id}>
      <div
        className={`${styles.container} d-flex row position-relative mw align-items-stretch py-5 py-md-auto`}
      >
        <div className="d-flex flex-column justify-content-between align-items-stretch col-12 col-md-3 py-3 px-0">
          <h2 className="kr-h2 d-flex gap-1 w-100 row text-align-left pb-2">
            <span>놓치기 아쉬운</span>
            <span className={`${styles.textGreen}`}>할인 상품</span>
          </h2>
          <svg
            className="vector-5 d-none d-md-block"
            width="180"
            height="1"
            viewBox="0 0 180 1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 1L180 1.00002" stroke="#898989" />
          </svg>

          <div className="kr-body py-2 px-0">
            {/* md 이상: 두 줄 */}
            <div className="d-none d-md-block">
              <p className="lh1-5 mb-0 ">가격 인하 상품을</p>
              <p className="lh1-5 mb-0">지금 바로 확인해보세요!</p>
            </div>

            {/* md 이하: 한 줄 */}
            <div className="d-block d-md-none">
              <p className="lh1-5 ">
                가격 인하 상품을 지금 바로 확인해보세요!
              </p>
            </div>
          </div>
          <div className="d-none d-md-flex">
            <Plusbtn icon="plus2" to={to} className={`${styles.plusBtn} my-4`}>
              더보기
            </Plusbtn>
          </div>

          {/* 페이지네이션 컴포넌트 */}
          <div className="d-none d-md-flex">
            <PaginationSet
              totalPages={maxPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>

        <div className={`px-0 ${isBelow768 ? "w-100 pb-3" : "col-9"}`}>
          {/* Swiper 컴포넌트 */}
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={itemsPerPage}
            slidesPerGroup={itemsPerPage}
            // navigation={{ nextEl: null, prevEl: null }}
            loop={true}
            onSlideChange={(swiper) => {
              const newPage = Math.ceil(swiper.activeIndex / itemsPerPage) + 1;
              setCurrentPage(newPage); 
            }}
          >
            {visibleProducts.map((product) => (
              <SwiperSlide key={product.productId}>
                <ProductItem info={product} ct="sale" addToCart={addToCart} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="d-md-none px-0">
          <Plusbtn icon="plus2" to={to}>
            더보기
          </Plusbtn>
        </div>
      </div>
    </div>
  );
}
