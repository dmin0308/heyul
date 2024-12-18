import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import rs from "./reviewContents.module.scss";
import reviews from "../../data/review.json";

// userId를 마스킹 처리하는 함수
function maskUserId(userId) {
  if (userId.length <= 3) {
    return userId.replace(/./g, '*'); // 3글자 이하는 모두 마스킹
  }
  return userId.slice(0, userId.length - 3) + '***'; // 마지막 3글자 마스킹
}

export default function ReviewContents() {
  return (
    <div className={`${rs.reviewContents} mt120 mb120`}>
      <h2 className="kr-h2 mb26 mw">소비자의 생생한 이용후기</h2>
      <div className={rs.swiperwarpper}>
        <Swiper
          className={rs.swiper}
          loop={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={16} 
          breakpoints={{
            1200: { // 화면 크기 1200px 이상
              spaceBetween: 24,
            }
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index} className={rs.swiperSlide}>
              <div className={rs.mainImg}>
                <img
                  src={item.userImg}
                  style={{ borderRadius: "8px" }}
                  alt={item.image_alt}
                />
              </div>
              <div className="d-flex">
                <div className={rs.contentsbox}>
                  <div className={`${rs.text} kr-body`}>{item.userReview}</div>
                  <div className="kr-h5 ms-2">
                    <span style={{ color: 'var(--color--stoke)' }}>
                      {maskUserId(item.userId)} {/* 마스킹된 아이디 표시 */}
                    </span>
                  </div>
                </div>
                <div>
                  <div className={rs.smallpicture}>
                    <img
                      src={item.image_url}
                      className="img-fluid"
                      alt={`${item.userId}의 리뷰 이미지`}
                    />
                  </div>
                  <p className={`${rs.productName} kr-body`}>{item.name}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
