import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Allmenulist } from "../common/_common_navi";
import { MainQuickmenu } from "../common/_main_navi";

import mf from "./mfooter.module.scss";
import SearchBar from "../common/Searchinput";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Mfooter({ navidb, isLoggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    // 추가: 마이페이지 클릭 시 동작 제어
    if (!isLoggedIn) {
      navigate("/login"); // 로그인 상태가 아니면 로그인 페이지로 이동
    } else {
      navigate("/mypage"); // 로그인 상태면 마이페이지로 이동
    }
  };

  useEffect(() => {
    // 모달 백드롭 숨기기
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.style.display = "none";
    });
  }, []);

  const items = [
    { to: "subscription", text: "정기배송", w: "50.8" },
    { to: "event", text: "이벤트", w: "40.2" },
    { to: "coupon", text: "쿠폰", w: "42.7" },
    { to: "specialEvent", text: "기획전", w: "36.2" },
    { to: "recipe", text: "레시피", w: "45.4" },
    { to: "store", text: "매장찾기", w: "36.8" },
    { to: "gift", text: "선물하기", w: "42" },
    { to: "mealSalad", text: "밀키트" },
    { to: "lunchBox", text: "밥 / 면", w: "48.1" },
    { to: "beverage", text: "음료", w: "29.8" },
    { to: "seafood", text: "해조류", w: "37.7" },
    { to: "beauty", text: "이너뷰티", w: "31.2" },
    { to: "newitem", text: "신상품", w: "47" },
    { to: "sale", text: "할인", w: "34" },
  ];

  return (
    <footer className={`fixed-bottom bg-white ${mf.mf} zup d-block d-lg-none`}>
      <div
        className={`${mf.container} d-flex flex-column mx-auto mw  px-xxl-0`}
      >
        {/* gnav */}
        <div
          className={`d-flex align-items-center justify-content-between ${mf.gnbwrap}`}
        >
          <ul
            className={`d-flex align-items-center justify-content-between col col-lg-auto ${mf.gnb} me-auto `}
          >
            {/*홈 버튼(링크) */}
            <li className="d-flex align-items-center justify-content-center">
              <Link
                to="/"
                className="d-flex align-items-center justify-content-center flex-column"
              >
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.2,13c0.5,0,0.9,0.4,0.9,0.9v9.6c0,0.4,0.2,0.8,0.5,1.1C3.9,24.8,4.3,25,4.7,25h3.7c0.6,0,1-0.4,1-1v-4.8
	c0-0.4,0.2-0.8,0.5-1.1c0.3-0.3,0.7-0.4,1.1-0.4h3.1c0.4,0,0.8,0.2,1.1,0.4c0.3,0.3,0.5,0.7,0.5,1.1V24c0,0.6,0.4,1,1,1h3.7
	c0.4,0,0.8-0.2,1.1-0.4c0.3-0.3,0.5-0.7,0.5-1.1v-9.6c0-0.5,0.4-0.9,0.9-0.9h0c0.8,0,1.2-1,0.6-1.5h0L13.2,1.7c-0.4-0.4-1-0.4-1.4,0
	L1.6,11.5C1,12,1.4,13,2.2,13"
                    stroke="#999999"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>홈</span>
              </Link>
            </li>
            {/* 검색 버튼 */}
            <li className="d-flex align-items-center justify-content-center">
              <button
                className="p-0 border-0 bg-transparent d-flex align-items-center justify-content-center flex-column"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25 25L19.2 19.2M22.3333 11.6667C22.3333 17.5577 17.5577 22.3333 11.6667 22.3333C5.77563 22.3333 1 17.5577 1 11.6667C1 5.77563 5.77563 1 11.6667 1C17.5577 1 22.3333 5.77563 22.3333 11.6667Z"
                    stroke="#999999"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>검색</span>
              </button>
            </li>
            {/* 메뉴 버튼*/}
            <li className="d-flex align-items-center justify-content-center">
              <button
                className="p-0 border-0 bg-transparent d-flex align-items-center justify-content-center flex-column"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNewExample"
                aria-controls="offcanvasNewExample"
              >
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4H25.5"
                    stroke="#999999"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M1 13H25.5"
                    stroke="#999999"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M1 22H25.5"
                    stroke="#999999"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>

                <span>메뉴</span>
              </button>
            </li>
            {/*ai추천 버튼(링크) */}
            <li className="d-flex align-items-center justify-content-center">
              <Link
                to="/"
                className="d-flex align-items-center justify-content-center flex-column"
              >
                <svg
                  width="27"
                  height="26"
                  viewBox="0 0 27 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.0127 18.5347L26 25M11.5543 21.5485C12.9403 21.5485 14.3128 21.2827 15.5933 20.7664C16.8738 20.2501 18.0373 19.4933 19.0173 18.5392C19.9974 17.5852 20.7748 16.4526 21.3052 15.206C21.8356 13.9595 22.1086 12.6235 22.1086 11.2742C22.1086 9.92502 21.8356 8.58899 21.3052 7.34246C20.7748 6.09593 19.9974 4.96331 19.0173 4.00926C18.0373 3.05521 16.8738 2.29841 15.5933 1.78208C14.3128 1.26575 12.9403 1 11.5543 1C8.75513 1 6.0706 2.08246 4.09129 4.00926C2.11197 5.93605 1 8.54935 1 11.2742C1 13.9991 2.11197 16.6124 4.09129 18.5392C6.0706 20.466 8.75513 21.5485 11.5543 21.5485ZM5.43706 11.7296C4.72937 11.6077 4.72937 10.6015 5.43706 10.4795C6.68926 10.2628 7.84804 9.68166 8.76585 8.81014C9.68367 7.93863 10.319 6.81615 10.5909 5.58564L10.6332 5.39316C10.7871 4.69948 11.7813 4.69567 11.9409 5.38744L11.9928 5.61232C12.2763 6.83787 12.9186 7.9532 13.8392 8.81839C14.7599 9.68359 15.9178 10.2601 17.1678 10.4757C17.8794 10.5996 17.8794 11.6096 17.1678 11.7334C15.9182 11.9494 14.7606 12.526 13.8404 13.3912C12.9201 14.2564 12.2781 15.3715 11.9948 16.5968L11.9428 16.8217C11.7832 17.5135 10.789 17.5077 10.6351 16.816L10.5928 16.6254C10.3215 15.3939 9.68615 14.2704 8.76792 13.3982C7.84968 12.5259 6.69012 11.9463 5.43706 11.7296Z"
                    stroke="#999999"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>AI 추천</span>
              </Link>
            </li>
            {/* 마이페이지 버튼*/}
            <li className="d-flex align-items-center justify-content-center">
              <button
                className="text-decoration-none border-0 bg-transparent d-flex align-items-center justify-content-center flex-column px-0"
                onClick={handleMyPageClick}
              >
                <svg
                  width="24"
                  height="28"
                  viewBox="0 0 24 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8235 11.9474C8.83351 11.9474 6.41174 9.49789 6.41174 6.47368C6.41174 3.44947 8.83351 1 11.8235 1C14.8135 1 17.2353 3.44947 17.2353 6.47368C17.2353 9.49789 14.8135 11.9474 11.8235 11.9474Z"
                    stroke="#999999"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1 25.6317V24.2633C1 19.7338 4.63941 16.0527 9.11765 16.0527H14.5294C19.0076 16.0527 22.6471 19.7338 22.6471 24.2633V25.6317"
                    stroke="#999999"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>마이페이지</span>
              </button>
            </li>
          </ul>
          {/* 모바일 검색 슬라이드 */}
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className={`${mf.utilheader} mt-5 d-flex mx-3`}>
              <div className={`offcanvas-header ${mf.closeBtn} px-0`}>
                <button
                  type="button"
                  className="p-0 border-0 bg-transparent"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <svg
                    className="px-0 me-2"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 7L21 16L12 25"
                      stroke="#999999"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className={`${mf.utilMenu} d-flex align-items-center w-100`}>
                <SearchBar placeholder="검색어를 입력하세요" />
              </div>
            </div>
            <div className="offcanvas-body px-3">
              <div className="allNavi">
                <ul className={`${mf.allNaviul}`}>
                  {navidb["category"].map((v, i) => (
                    <li key={`naviallmenu${i}`}>
                      {/* 대메뉴 */}
                      <div
                        onClick={() => {
                          const submenu = document.getElementById(
                            `submenu-${i}`
                          );
                          if (submenu) {
                            submenu.classList.toggle("d-none"); // 토글: 숨기기/보이기
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <Allmenulist className="w-100" to={v.linkto} icon={v.linkto}>
                          <div
                            className={`d-flex w-100 justify-content-between align-items-center`}
                          >
                            {v.name}
                            <svg
                              width="8"
                              height="14"
                              viewBox="0 0 8 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 13L7 7L1 1"
                                stroke="#999999"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </Allmenulist>
                      </div>

                      {/* 소메뉴 */}
                      {v["subcategory"] && (
                        <ul
                          id={`submenu-${i}`}
                          className={`${mf.submenu} d-none`} // 초기 상태: 숨김
                        >
                          {v["subcategory"].map((vv, ii) => (
                            <li key={`subcategory${ii}`}>
                              <Link
                                to={`product/${vv.linkto}/${vv.categoryId}`}
                              >
                                {vv.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* 모바일 메뉴 슬라이드 */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNewExample"
            aria-labelledby="offcanvasNewExampleLabel"
          >
            <div className={`${mf.utilheader} mt-5 d-flex mx-3`}>
              <div className={`offcanvas-header ${mf.closeBtn} px-0`}>
                <button
                  type="button"
                  className="p-0 border-0 bg-transparent"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <svg
                    className="px-0 me-2"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 7L21 16L12 25"
                      stroke="#999999"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={`${mf.utilMenu} d-flex align-items-center w-100 pe-3`}
              >
                <span className="kr-h5">메뉴</span>
              </div>
            </div>
            {/* 카테고리 슬라이드 바디 */}
            <div
              className={`${mf.catebody} d-flex flex-column justify-content-between offcanvas-body px-3 `}
            >
              <ul className="row row-cols-4 g-3 px-4">
                {items.map(({ to, text, w, hiddenOnSmall }) => (
                  <li
                    key={to}
                    className={`col d-flex flex-column align-items-center ${
                      mf.svgItem
                    } ${text === "전체보기" ? "d-lg-none d-lg-flex" : ""} ${
                      hiddenOnSmall ? "d-none" : ""
                    }`}
                  >
                    <MainQuickmenu
                      to={to}
                      w={w}
                      className="mb-0"
                    ></MainQuickmenu>
                    <span className="kr-body pb-3">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${mf.loginbody} px-3 py-3`}>
              <ul className="d-flex justify-content-start align-items-center list-unstyled">
                {isLoggedIn ? (
                  <li className="px-2">
                    <button
                      className="border-0 bg-transparent d-flex align-items-center flex-column"
                      onClick={handleLogout}
                    >
                      <svg
                        width="24"
                        height="28"
                        viewBox="0 0 24 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8235 11.9474C8.83351 11.9474 6.41174 9.49789 6.41174 6.47368C6.41174 3.44947 8.83351 1 11.8235 1C14.8135 1 17.2353 3.44947 17.2353 6.47368C17.2353 9.49789 14.8135 11.9474 11.8235 11.9474Z"
                          stroke="#999999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 25.6317V24.2633C1 19.7338 4.63941 16.0527 9.11765 16.0527H14.5294C19.0076 16.0527 22.6471 19.7338 22.6471 24.2633V25.6317"
                          stroke="#999999"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="kr-btn">로그아웃</span>
                    </button>
                  </li>
                ) : (
                  <>
                    <li className="px-2">
                      <Link
                        className="d-flex align-items-center flex-column"
                        to="/login"
                      >
                        <svg
                          width="24"
                          height="28"
                          viewBox="0 0 24 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8235 11.9474C8.83351 11.9474 6.41174 9.49789 6.41174 6.47368C6.41174 3.44947 8.83351 1 11.8235 1C14.8135 1 17.2353 3.44947 17.2353 6.47368C17.2353 9.49789 14.8135 11.9474 11.8235 11.9474Z"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 25.6317V24.2633C1 19.7338 4.63941 16.0527 9.11765 16.0527H14.5294C19.0076 16.0527 22.6471 19.7338 22.6471 24.2633V25.6317"
                            stroke="#999999"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="kr-btn">로그인</span>
                      </Link>
                    </li>
                    <li className="px-2">
                      <Link
                        className="d-flex align-items-center flex-column"
                        to="/signup"
                      >
                        <svg
                          width="27"
                          height="28"
                          viewBox="0 0 27 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.8235 11.9474C8.83351 11.9474 6.41174 9.49789 6.41174 6.47368C6.41174 3.44947 8.83351 1 11.8235 1C14.8135 1 17.2353 3.44947 17.2353 6.47368C17.2353 9.49789 14.8135 11.9474 11.8235 11.9474Z"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M1 25.6317V24.2633C1 19.7338 4.63941 16.0527 9.11765 16.0527H14.5294C19.0076 16.0527 22.6471 19.7338 22.6471 24.2633V25.6317"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M20 5H26"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                          <path
                            d="M23 8L23 2"
                            stroke="#999999"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                        <span className="kr-btn">회원가입</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
