import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import bestitemdb from "../../data/best.json";

import { Plusbtn } from "../common/_common";
import { Viewicon, Carticon } from "../common/util/_icon";

import bestcard from "./BestItemThumb.module.scss";

export default function ProductThumbSet({
  id, style, ea, filterNV, to, className, addToCart, rateview,
}) {
  const listea = ea || 4; // 노출 전체 개수 (기본값 4)
  const filternm = filterNV ? filterNV.split("|")[0] : null; // 필터 이름
  const filtervalue = filterNV ? filterNV.split("|")[1] : null; // 필터 값

  const productset = bestitemdb.filter((item) => {
    if (!filternm || !filtervalue) return true; // 필터가 없으면 전체 출력
    return item[filternm]?.toString().includes(filtervalue); // 필터 조건 확인
  });

  const limitedProducts = productset.slice(0, listea);

  const BestItemData = {
    BestProduct: bestitemdb[0],
    sideProducts: bestitemdb.slice(1, 5),
  };

  const handleAddToCart = (product) => {
    alert(`${product.name} 상품이 추가되었습니다.`);
    addToCart([product]); // 장바구니에 상품 추가
  };

  return (
    <div id={id} className={className}>
      <div className="d-flex align-items-top justify-content-between position-relative">
        <h2 className="kr-h2 mb32 lh0-8">
          지금 가장 많이 구매하는 인기상품
          <span className="emoji kr_h3">🔥</span>
        </h2>
        <Plusbtn className="d-none d-sm-flex" icon="arrow" to={"/product/hot"}>
          더보기
        </Plusbtn>
      </div>

      <div>
        {/* Main Product */}
        <div className="d-flex flex-wrap">
          <div className="col-12 col-lg-6 ">
            <div className="rounded-3">
              <div className={`${bestcard.imglg}`}>
                <img
                  src={BestItemData.BestProduct.image_url}
                  alt=""
                  className="img-fluid"
                />
                <div
                  className={`position-absolute top-0 w-100 h-100 justify-content-center align-items-center ${bestcard.thumbwrap}`}
                >
                  <div className="d-flex h-100 justify-content-center align-items-center gap-3">
                    <Carticon
                      onClick={() => handleAddToCart(BestItemData.BestProduct)}
                    />
                    <Viewicon
                      to={`/detail/${BestItemData.BestProduct.productId}`}
                    />
                  </div>
                </div>
              </div>
              <div className="content-spacing px-2">
                <div className="text-overflow">
                  <h2 className="kr-h4 pt-2 pb-2" style={{ maxHeight: "48px" }}>
                    {BestItemData.BestProduct.simple_description}
                  </h2>
                </div>
                <p className="kr-body">바쁜 아침 건강 챙기기 프로젝트</p>
              </div>
            </div>
          </div>

          {/* Side Products */}
          <div className="d-lg-flex flex-wrap col-6 d-none">
            {BestItemData.sideProducts.map((product, index) => (
              <div key={index} className="col-12 col-lg-6 ps-3 ">
                <div className={`${bestcard.imgsm}`}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={`Product ${index + 1}`}
                      className="img-fluid"
                    />
                  ) : (
                    <div className="placeholder"></div>
                  )}
                  <div
                    className={`position-absolute top-0 w-100 h-100 justify-content-center align-items-center ${bestcard.thumbwrap}`}
                  >
                    <div className="d-flex justify-content-center h-100 align-items-center gap-3">
                      <Carticon
                        onClick={() =>
                          handleAddToCart(BestItemData.BestProduct)
                        }
                      />
                      <Viewicon
                        to={`/detail/${BestItemData.BestProduct.productId}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="content-spacing text-overflow">
                  <h3
                    className="kr-body px-2 pt-2 fw-500"
                    style={{ maxHeight: "24px" }}
                  >
                    {product.simple_description}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* MSide Products */}
          <Swiper
            className="d-lg-none d-flex col-12"
            loop={false}
            modules={[Pagination, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={false}
            breakpoints={{
              500: {
                slidesPerView: 1.5, // 모바일에서 1.2개의 슬라이드 표시
                spaceBetween: 10, // 슬라이드 간 간격 설정
              },
              1300: {
                slidesPerView: 4.6,
              },
            }}
          >
            <div className="d-lg-none col-6 d-flex gap-3">
              {BestItemData.sideProducts.map((product, index) => (
                <SwiperSlide>
                  <div key={index} className="col-12">
                    <div className={`${bestcard.imgsm}`}>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={`Product ${index + 1}`}
                          className="img-fluid"
                        />
                      ) : (
                        <div className="placeholder"></div>
                      )}
                     <div
                    className={`position-absolute top-0 w-100 h-100 justify-content-center align-items-center ${bestcard.thumbwrap}`}
                  >
                    <div className="d-flex justify-content-center h-100 align-items-center gap-3">
                      <Carticon
                        onClick={() =>
                          handleAddToCart(BestItemData.BestProduct)
                        }
                      />
                      <Viewicon
                        to={`/detail/${BestItemData.BestProduct.productId}`}
                      />
                    </div>
                  </div>
                    </div>
                    <div className="content-spacing text-overflow">
                      <h3
                        className="kr-body px-2 pt-2 fw-500"
                        style={{ maxHeight: "24px" }}
                      >
                        {product.simple_description}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
