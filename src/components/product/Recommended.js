import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Plusbtn, Tabbtn, Submitbtn } from "../common/_common";
import PaginationSet from "../common/PaginationSet";

import styles from "./Recommended.module.scss";

import productdb from "../../data/product.json";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

export default function RecommendedSet({
  id, style, ea, filterNV, to, className, addToCart, isLoggedIn
}) {
  // 상태 관리
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDimVisible, setIsDimVisible] = useState(!isLoggedIn);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const swiperRef = useRef(null);

  const navigate = useNavigate();

  // 카테고리 매핑 (categoryId -> 대체 텍스트)
  const categoryMap = {
    101: "밀키트",
    102: "샌드위치·샐러드",
    103: "시리얼",
    301: "과일·야채음료",
  };

  // 상품 데이터 처리
  const productset = productdb;

  // 카테고리 필터 적용
  const filteredProducts = selectedCategory
    ? productset.filter((item) => item.categoryId === selectedCategory)
    : productset;

    const maxPages = 2;
    const maxItems = itemsPerPage * maxPages;
    const visibleProducts = filteredProducts.slice(0, maxItems);
  
    // 화면 크기에 따른 슬라이드 수 조정
    useEffect(() => {
      const updateItemsPerPage = () => {
        if (window.matchMedia("(max-width: 575px)").matches) {
          setItemsPerPage(2); 
        } else if (window.matchMedia("(max-width: 768px)").matches) {
          setItemsPerPage(3); 
        } else if (window.matchMedia("(max-width: 992px)").matches) {
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

  // 뷰포트 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 576);
    };
    handleResize(); // 초기값 설정
    window.addEventListener("resize", handleResize); // 리스너 추가
    return () => window.removeEventListener("resize", handleResize); // 클린업
  }, []);

  // 페이지 이동 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
    swiperRef.current?.swiper.slideTo((page - 1) * itemsPerPage);
  };

  // 카테고리 필터 핸들러
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    swiperRef.current?.swiper.slideTo(0);
  };

  useEffect(() => {
    console.log("isLoggedIn 상태:", isLoggedIn);
    const swiper = swiperRef.current?.swiper;
    if (!swiper) return;

    const updatePagination = () => {
      const newPage = Math.ceil(swiper.activeIndex / itemsPerPage) + 1;
      setCurrentPage(newPage);
    };

    swiper.on("slideChange", updatePagination);
    return () => {
      swiper.off("slideChange", updatePagination);
    };
  }, [itemsPerPage]);
  
  useEffect(() => {
    console.log("isLoggedIn 상태:", isLoggedIn);
    setIsDimVisible(!isLoggedIn); // 로그인 상태에 따라 딤 처리
  }, [isLoggedIn]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className={`${className || ""}`} style={style} id={id}>
      <div className='position-relative py-5'>
              {/* 딤처리 레이어 */}
      {isDimVisible && (
        <div
          className={styles.dimLayer}
        >
          <div className="d-flex flex-column text-center">
            <h4 className="kr-h4 mb-3" style={{ lineHeight: "1.3" }}>
            나만을 위한 맞춤 상품을<br />보고싶다면?
            </h4>
            <p className="kr-body mb26">로그인 후 AI 맞춤 상품을 볼 수 있어요 !</p>
            <div className="d-flex justify-content-center">
            <Submitbtn onClick={handleLoginClick}>로그인하러 가기</Submitbtn>
            </div>
          </div>

        </div>
      )}
        <div className="d-flex flex-column justify-content-between py-3">
          <h2 className="kr-h2 d-flex gap-1 w-100 row text-center">
            <span>( 안유진 )님을 위한 추천 상품</span>
          </h2>

          {/* 카테고리 선택 버튼 */}
          <div className="d-flex align-items-center justify-content-center gap-3 py-3 mt26">
          {Object.entries(categoryMap).map(([categoryId, categoryName]) => (
        <Tabbtn
          key={categoryId}
          onClick={() => handleCategoryClick(categoryId)}
          className={`${selectedCategory === categoryId ? "active" : ""} ${
            isSmallScreen && categoryId === "301" ? "d-none" : ""
          }`}
        >
          {categoryName}
              </Tabbtn>
            ))}
          </div>

          {/* 상품 리스트 */}
          <div className="mw px-3 col-12">
            <Swiper
              ref={swiperRef}
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={itemsPerPage}
              slidesPerGroup={itemsPerPage}
              loop={true}
              navigation={{
                nextEl: `.${styles.swiperButtonNext}`,
                prevEl: `.${styles.swiperButtonPrev}`,
              }}
            >
              {visibleProducts.map((product) => (
                <SwiperSlide key={product.productId}>
                  <ProductItem info={product} ct="sale" addToCart={addToCart} />
                </SwiperSlide>
              ))}
            </Swiper>
            
            <div className={styles.swiperNavigation}>
              {/* <div className={`swiper-button-prev d-none d-xl-block ${styles.swiperButtonPrev}`}></div>
              <div className={`swiper-button-next d-none d-xl-block ${styles.swiperButtonNext}`}></div> */}
            </div>


          {/* 페이지네이션 컴포넌트 */}
          <div className="d-flex mt26 justify-content-center">
            <PaginationSet
              totalPages={maxPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              variant="dots"
            />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
