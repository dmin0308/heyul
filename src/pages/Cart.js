import React, { useEffect, useState } from "react";
import CartList from "../components/ec/CartList";
import {
  WhiteNormalBtn,
  LabelC,
  Warning,
} from "../components/common/util/_icon";
import { Button } from "../components/common/util/_form";
import { Link, useNavigate } from "react-router-dom";

import styles from "./cart.module.scss";

export default function Cart({ cartItems, cartToCart, isLoggedIn }) {
  const [selectCart, setSelectCart] = useState([]); // 선택된 상품 관리
  const [totalPrice, setTotalPrice] = useState(0); // 총 금액 계산

  const navigate = useNavigate();

  // 전체 선택/해제
  const allSelectCart = () => {
    const isAllSelected = selectCart.length === cartItems.length;
    setSelectCart(isAllSelected ? [] : [...cartItems]);
  };

  // 선택 삭제 핸들러
  const handleDeleteSelected = () => {
    if (selectCart.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }
    cartToCart(selectCart, true); // delstatu를 true로 설정하여 삭제 동작 수행
    setSelectCart([]);

    const updatedCartItems = cartItems.filter(
      (item) =>
        !selectCart.some((selected) => selected.productId === item.productId)
    );

    cartToCart(updatedCartItems); // 선택된 아이템 제외한 새로운 장바구니 업데이트
    setSelectCart([]); // 선택 초기화
  };

  // 수량 변경 핸들러
  const handleQuantityChange = (productId, delta) => {
    cartToCart([{ productId, quantity: delta }]); // 수량 변경
  };

  // 총 금액 계산
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + Number(item.purchasePr),
      0
    );
    setTotalPrice(total); // 총 금액 설정
  }, [cartItems]);

  //데이터 수집
  useEffect(() => {
    if (window?.wcs && typeof window.wcs.trans === "function") {
      var _conv = {};
      _conv.type = "lead"; // 전환 유형 설정
      window.wcs.trans(_conv); // 전환 데이터 서버 전송
    } else {
      console.warn("wcs is not defined or wcs.trans is not a function");
    }
  }, []);


  return (
    <div className="bg-sub01">
      <div className="mw pb-5 px-3 px-xxl-0">
        <h2 className="text-center py-5">장바구니</h2>
        <div className="row gx-3 gy-4">
          {/* 왼쪽 컬럼 */}
          <div className="col-lg-8 col-md-12">
            <div className="bg-white mb-3 round6 p-3 d-flex justify-content-between align-items-center">
              <input
                type="checkbox"
                id="allcart"
                className="d-none"
                checked={selectCart.length === cartItems.length}
                onChange={allSelectCart}
              />
              <LabelC htmlFor="allcart" size={[120, 20]}>
                <span className="ms-2 kr-body text-primary d-flex cursor-pointer ms-3 lh0-1">
                  전체선택
                  <span className="d-flex gap-1 ms-2">
                    {selectCart.length} / {cartItems.length}
                  </span>
                </span>
              </LabelC>
              <WhiteNormalBtn
                className="kr-btn fw700"
                onClick={handleDeleteSelected}
              >
                선택삭제
              </WhiteNormalBtn>
            </div>

            {cartItems.length > 0 ? (
              <div className="bg-white round6 py-3">
                <div className="d-flex border-bottom px-3 pb-3">
                  <input type="checkbox" id="normalsend" className="d-none" />
                  <LabelC htmlFor="normalsend" size={[120, 20]}>
                    <span className="ms-3 kr-h5 text-primary d-flex ">
                      일반배송
                    </span>
                  </LabelC>
                </div>
                {cartItems.map((v, i) => (
                  <CartList
                    key={v.productId}
                    v={v}
                    i={i}
                    cartToCart={cartToCart}
                    selected={selectCart.some(
                      (item) => item.productId === v.productId
                    )} // 선택 여부 전달
                    onSelect={(isSelected) => {
                      setSelectCart((prev) => {
                        if (isSelected) {
                          // 항목 추가
                          return [...prev, v];
                        } else {
                          // 항목 제거
                          return prev.filter(
                            (item) => item.productId !== v.productId
                          );
                        }
                      });
                    }}
                    onQuantityChange={(delta) =>
                      handleQuantityChange(v.productId, delta)
                    }
                  />
                ))}
                <div
                  className={`${styles.cartSbg} d-flex flex-column justify-content-center align-items-center fw-bold mx-3`}
                >
                  <div className="py-2 d-flex flex-column justify-content-center align-items-center">
                    <span className="kr-btn mt-1 text-tintdark">
                      상품 {totalPrice.toLocaleString()}원 + 배송비 무료
                    </span>
                    <span className="fs18 mb-1">
                      {totalPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`${styles.cartbg} d-flex flex-column align-items-center justify-content-center  text-center py-5 round6`}
              >
                <div className="pb-3">
                  <Warning></Warning>
                </div>
                <p className="text-muted fs-5 mb-3 fs18 ">
                  장바구니에 담긴 상품이 없습니다.
                </p>
                <button className={`${styles.btnPlsit} btn`}>
                  <Link to="/product/discount ">베스트 상품 보기</Link>
                </button>
              </div>
            )}
          </div>

          {/* 오른쪽 컬럼 */}
          <div className="col-lg-4 col-md-12">
            <div className={`bg-white mb-4 ${styles.rightCart}`}>
              <h3 className="kr-h5 lh1-0">결제금액</h3>
              <div>
                <p
                  className={`d-flex justify-content-between align-items-center  lh1-0 mb-3`}
                >
                  <span>상품금액</span>
                  <span className="kr-h6">
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + Number(item.originalPrice) * item.quantity,
                        0
                      )
                      .toLocaleString()}
                    원
                  </span>
                </p>

                <p
                  className={`d-flex justify-content-between align-items-center mb-1`}
                >
                  <span>상품할인금액</span>
                  <span className={`${styles.redtext} kr-h6`}>
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc +
                          (Number(item.originalPrice) * item.quantity -
                            Number(item.purchasePr)),
                        0
                      )
                      .toLocaleString()}
                    원
                  </span>
                </p>

                {!isLoggedIn && (
                  <span
                    className={`lh1-0 kr-p text-end d-block mb-3 ${styles.smalltext}`}
                  >
                    로그인 후 할인 금액 적용
                  </span>
                )}

                <p
                  className={`d-flex justify-content-between align-items-center"`}
                >
                  <span>배송비</span>
                  <span className="kr-h6">무료</span>
                </p>
                <hr></hr>

                <p
                  className={`d-flex justify-content-between align-items-center fw-bold"`}
                >
                  <span>결제예정금액</span>
                  <span className="kr-h4">{totalPrice.toLocaleString()}원</span>
                </p>

                <span
                  className={`lh1-0 kr-p text-end d-block mb-3 ${styles.smalltext}`}
                >
                  쿠폰/적립금은 구매단계에서 사용 가능합니다
                </span>
              </div>

              {isLoggedIn ? (
                <Button
                  type="submit"
                  className={styles.lgButton}
                  onClick={() => {
                    alert(totalPrice + "원 결제하셨습니다.");
                  }}
                >
                  구매하기
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={styles.lgButton}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  로그인
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
