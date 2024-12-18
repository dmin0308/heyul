import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./mypage.module.scss";
import {
  MypageCoupon,
  MypageList,
  MypageRecent,
  MypageWish,
} from "../components/common/util/_icon";
import { Tabbtn, Plusbtn } from "../components/common/_common";
import { Warning } from "../components/common/util/_icon";

const MyPage = ({ cartItems = [] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectCart, setSelectcart] = useState([]);
  const tabs = ["1개월", "3개월", "6개월", "1년"];

  const allSelectCart = () => {
    const isAllSelected = selectCart.length === cartItems.length;
    setSelectcart(isAllSelected ? [] : [...cartItems]);
  };
  useEffect(() => {
    console.log("여기 장바구니" + JSON.stringify(cartItems, null, 2));
  }, []);

  return (
    <div className={`${styles.page} bg-sub01`}>
      <div className={`${styles.containerFluid} px-3 px-xl-0 py-5`}>
        <div className={`${styles.container}`}>
          <div className="row px-0 g-0">
            {/* 왼쪽 4컬럼 영역 */}
            <div className="col-md-4 col-12 mb-3 pe-md-4 px-md-0">
              <div className={`${styles.sidebar}`}>
                <div className={`${styles.ldiv} `}>
                  <p className="mb-2">
                    <strong>반가워요!</strong> 안유진님
                  </p>
                  <span>최초 1회 무료배송</span>
                </div>
                <div
                  className={`${styles.mdiv}  d-flex justify-content-between pt-3 flex-wrap mt-3`}
                >
                  <div className={`${styles.bd} col-6 ps-3`}>
                    <p className="mb-1">적립금</p>
                    <span>0원</span>
                  </div>
                  <div className={`${styles.bd} col-6 ps-3 border-0`}>
                    <p className="mb-1">해율캐시</p>
                    <span>0원</span>
                  </div>
                  <div
                    className={`${styles.smdiv} col-12 mt-3 px-3 py-2 bg-sub01 d-flex justify-content-between`}
                  >
                    <p className="mb-0">해율멤버스 2개월 무료 체험하기</p>
                    <span>12월 31일 종료 &gt;</span>
                  </div>
                </div>
                {/* 주문 내역 */}
                <div className={`${styles.listContainer} pt-4 pb-3 border-0`}>
                  <h5>자주 찾는 메뉴</h5>
                  <ul className="list-group">
                    <li className={`${styles.listGroupItem}`}>
                      <div className="d-flex align-items-center gap-4">
                        <MypageList className="icon" />
                        <span>주문 내역</span>
                      </div>
                    </li>
                    <li className={`${styles.listGroupItem}`}>
                      <div className="d-flex align-items-center gap-4">
                        <MypageCoupon />
                        <span>쿠폰</span>
                      </div>
                      <span className="badge bg-active">0</span>
                    </li>
                    <li className={`${styles.listGroupItem}`}>
                      <div className="d-flex align-items-center gap-4">
                        <MypageWish />
                        <span>찜한 상품</span>
                      </div>
                      <span className="badge bg-active">0</span>
                    </li>
                    <li className={`${styles.listGroupItem}`}>
                      <div className="d-flex align-items-center gap-4">
                        <MypageRecent />
                        <span>최근 본 상품</span>
                      </div>
                      <span className="badge bg-active">0</span>
                    </li>
                    <li className={`${styles.listGroupItem}`}>
                      <img
                        className="img-fluid"
                        src="/img/sns/mypageEvent.png"
                        alt="멤버쉽이벤트"
                      />
                    </li>
                  </ul>
                </div>

                {/* 쇼핑 */}
                <div className={`${styles.listContainer} pt-4 pb-3`}>
                  <h5>쇼핑</h5>
                  <ul className="list-group">
                    <li className={`${styles.listGroupItem}`}>
                      결제수단 / 해율페이
                    </li>
                    <li className={`${styles.listGroupItem}`}>
                      취소 · 반품 · 환불 내역
                    </li>
                    <li className={`${styles.listGroupItem}`}>상품 리뷰</li>
                    <li className={`${styles.listGroupItem}`}>상품 문의</li>
                  </ul>
                </div>

                {/* 혜택 */}
                <div className={`${styles.listContainer} pt-4 pb-3`}>
                  <h5>혜택</h5>
                  <ul className="list-group">
                    <li className={`${styles.listGroupItem}`}>해율멤버스</li>
                  </ul>
                </div>

                {/* 내 정보관리 */}
                <div className={`${styles.listContainer} pt-4 pb-3`}>
                  <h5>내 정보관리</h5>
                  <ul className="list-group">
                    <li className={`${styles.listGroupItem}`}>배송지 관리</li>
                    <li className={`${styles.listGroupItem}`}>
                      나의 해율스타일
                    </li>
                    <li className={`${styles.listGroupItem}`}>개인정보 수정</li>
                  </ul>
                </div>
                {/* 서비스 */}
                <div className={`${styles.listContainer} pt-4 pb-3`}>
                  <h5>서비스</h5>
                  <ul className="list-group">
                    <li className={`${styles.listGroupItem}`}>배송관련 안내</li>
                    <li className={`${styles.listGroupItem}`}>
                      VIP 회원 가이드
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 오른쪽 8컬럼 영역 */}
            <div className="col-md-8 d-none d-md-block px-0">
              <div className={`${styles.content}`}>
                <div className="mb-3">
                  <h4>주문 내역</h4>
                </div>
                <div
                  className={`${styles.tabs} d-flex justify-content-center pb-3 gap-3`}
                >
                  {tabs.map((tab, index) => (
                    <Tabbtn
                      key={index}
                      className={index === activeTab ? styles.active : ""}
                      onClick={() => setActiveTab(index)}
                    >
                      {tab}
                    </Tabbtn>
                  ))}
                </div>

                {/* 주문내역 섹션 */}
                <div className="">
                  {cartItems.length > 0 && (
                    <div className={`${styles.ldiv} my-3`}>
                      <p>일반배송</p>
                    </div>
                  )}
                  {cartItems.length > 0 ? (
                    cartItems.map((v, i) => {
                      return (
                        <div>
                          <div className="d-md-flex col mb32 justify-content-between align-items-center">
                            <div className="d-flex col-7">
                              <div className="pe-3">
                                <img
                                  src={v.image_url}
                                  alt={v.image_alt}
                                  className="img-fluid rounded-4"
                                  style={{ width: "80px", height: "80px" }}
                                ></img>
                              </div>
                              <div className="px-0">
                                <p className="mb-1 px-0 fs18 fw400">{v.name}</p>
                                <p className="mb-2 px-0 kr-body text-tintdark">
                                  {v.simple_description}
                                </p>
                                <p className="mb-0 px-0 kr-h6">
                                  {Number(v.discountPrice) > 0
                                    ? v.discountPrice
                                    : v.originalPrice}
                                  <span className="pe-3">원</span>
                                  <span className="pe-2 kr-btn text-muted ">
                                    X
                                  </span>
                                  <span>{v.quantity}개</span>
                                </p>
                              </div>
                            </div>
                            <div className="d-flex col-5">
                              <div className="d-flex justify-content-center align-items-center w-100 px-3 kr-h6">
                                배송중
                              </div>
                              <div className="row mx-0 g-1">
                                <button className={`${styles.btnPlsit} btn`}>
                                  재구매하기
                                </button>
                                <button className={`${styles.btnPlsit} btn`}>
                                  리뷰 작성하기
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center  text-center py-5">
                      <div className="pb-3">
                      <Warning ></Warning>
                      </div>
                      <p className="text-muted fs-5 mb-3 fs18 ">
                        1개월간 주문 내역이 없습니다.
                      </p>
                      <button className={`${styles.btnPlsit} btn`}>
                        <Link to="/product/discount ">베스트 상품 보기</Link>
                      </button>
                    </div>
                  )}
                  {cartItems.length > 0 && (
                    <Plusbtn className="col-3 mx-auto">더보기</Plusbtn>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
