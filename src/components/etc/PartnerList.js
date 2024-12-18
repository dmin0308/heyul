import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import pn from "./partner.module.scss";

const FooterPartners = () => {
  // 이미지 리스트
  const partners = [
    "partner1.gif",
    "partner2.gif",
    "partner3.gif",
    "partner4.gif",
    "partner5.gif",
    "partner6.gif",
    "partner7.gif",
    "partner8.gif",
    "partner9.gif",
    "partner10.gif",
  ];

  return (
    <div className={`${pn.wrapper} mw  mb120`}>
      <h2 className={`${pn.heading} kr-h2 mb26`}>함께하는 기업</h2>
      <div className={`${pn.container} `}>

        <Swiper slidesPerView="auto" spaceBetween={23.5}>
          {/* 슬라이드 내용 */}
          {partners.map((image, index) => (

            <SwiperSlide key={index} className={pn.slide}>
              <div className={pn.overflowBOX}>
                <img
                  src={`/img/partner/${image}`} // 이미지 경로
                  alt={`Partner ${index + 1}`}
                  className={pn.image}
                />
              </div>
            </SwiperSlide>

          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FooterPartners;
