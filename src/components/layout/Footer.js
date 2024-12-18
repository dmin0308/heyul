import React from "react";
import { Link } from 'react-router-dom'
import { Syoutube,Sgit,Sinstar,Skakao,Badges } from "../common/util/_icon";
import ft from "./footer.module.scss";
import Linebanner from "../common/LineBanner";


const Footer = () => {
  return (
    <footer className={ft.footer}>
      <div className={ft.footerWarpper}>
      {/* 쿠폰 프로모션 배경 */}
      <div className={ft.promotionBanner}>
        <Linebanner></Linebanner>
      </div>

      {/* 풋터 메인 */}
      <div className={`${ft.footerMain} mw`}>
        {/* 이용약관 */}
        <div className={ft.footerTerms}>
          <div className="d-lg-flex justify-content-between">

            <ul className="d-flex">
              <li className="afterbar position-relative"><Link to={"/terms"}>이용약관</Link></li>
              <li className="afterbar position-relative"><Link to={"/terms"}>개인정보처리방침</Link></li>
              <li className="afterbar position-relative"><Link to={"/brand"}>해율소개</Link></li>
              <li className="afterbar position-relative"><Link to={"/terms"}>기업안내</Link></li>
              <li><Link to={"/support"}>고객센터</Link></li>
            </ul>
            
            <ul className="d-flex">
              <li className="afterbar position-relative"><a href="https://www.i-web.kr/green09/" target="_blank" rel="noopener noreferrer">윤슬</a></li>
              <li><a href="https://www.apgroup.com/int/ko/" target="_blank" rel="noopener noreferrer">아모레퍼시픽</a></li>
            </ul>

          </div>
        </div>

        {/* 3개의 덩어리 */}
        <div className={`${ft.footerContent} d-flex`}>
          <div className={ft.contentBox}>
          <h3 className="kr-h5 ">주식회사 해율</h3>

              <ul>
                <li>서울 구로구 새말로 97 (구로동, 신도림테크노마트) 6층</li>
                <li>대표<img src="/img/footer/vertical-bar.png" alt="" /><span>코딩러쉬</span>사업자등록번호<img src="/img/footer/vertical-bar.png" alt="" /><span>123-56-78900</span></li>
                <li>통신판매신고번호<img src="/img/footer/vertical-bar.png" alt="" /><span>제 2024-서울구로-0014호</span><b>FAX<img src="/img/footer/vertical-bar.png" alt="" /><span>02-1234-1234</span></b></li>
                <li className={ft.Copyright}>Copyright (c) 2024 Coding Rush All Rights <b>Reserved. <a href="https://www.figma.com/design/9OOgjEMYyD97MyvHVquG2o/2%ED%8C%80-%EC%BD%94%EB%94%A9%EB%9F%AC%EC%89%AC_%EB%A6%AC%EC%95%A1%ED%8A%B8_%ED%94%BC%EA%B7%B8%EB%A7%88?node-id=757-10674&t=qJV1npvyYEcnYm0U-1" target="_blank" rel="noopener noreferrer">Figma</a> <a href="https://www.figma.com/board/trqydOswenXiZZmbYZVODI/2%ED%8C%80-%EC%BD%94%EB%94%A9%EB%9F%AC%EC%89%AC_%EB%A6%AC%EC%95%A1%ED%8A%B8_%ED%94%BC%EA%B7%B8%EC%9E%BC?node-id=0-1&t=8I0KWr9QbDBLybe3-1" target="_blank" rel="noopener noreferrer">Figjam</a></b></li>
              </ul>
          </div>

          <div className={ft.contentBox}>
            <h3 className="kr-h5">고객센터</h3>
            <ul className={ft.contactSection}>
              <li><a href="tel:16440000">1644-0000</a></li>
              <li><span>평일</span>오전 10시 ~ 오후 6시(점심시간 12시~1시)</li>
              <li>· 주말 및 공휴일 휴무</li>
              <li><span>이메일</span>help@haeyul.com</li>
              <li>· 기업 문의는 기업 문의 탭을 확인해주세요</li>
            </ul>
          

          </div>

          <div className={ft.contentBox}>
            
              <div className={`d-flex ${ft.iconContainer}`}>
                <a href="" target="_blank" rel="noopener noreferrer"><Sinstar></Sinstar></a>
                <a href="https://github.com/GITwonwoo/practice" target="_blank" rel="noopener noreferrer"><Sgit></Sgit></a>
                <a href="" target="_blank" rel="noopener noreferrer"><Syoutube></Syoutube></a>
                <a href="" target="_blank" rel="noopener noreferrer"><Skakao></Skakao></a>
              </div>

              <div>
                  <img src="/img/footer/footerLogo.svg" alt="logo" className={ft.footerLogo}/>
              </div>
        
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
