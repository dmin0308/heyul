import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // js-cookie 라이브러리 import

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { Wishheart } from "../components/common/util/_icon";
import ReviewItem from "../components/common/ReviewItem";
import { Arrow } from "../components/common/_common";
import { Button } from "../components/common/util/_form";

import styles from "./productdetail.module.scss";

export default function ProductDetail({ detailToCart, productinfo, naviinfo }) {
  
  const { productId } = useParams();
  const [detailinfo, setDetailinfo] = useState({});
  const [locationinfo, setLocationinfo] = useState(null);
  const [subloactioninfo, setSubLocationinfo] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // 현재 활성화된 이미지의 인덱스
  const [hasClaimedCoupon, setHasClaimedCoupon] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const buttonRef = useRef(null);
  const wishbuttonRef = useRef(null); //찜하기 버튼

  const swiperRef = useRef(null); // Swiper 인스턴스 참조
  const [isFixed, setIsFixed] = useState(false);

  const productImages = [
    "https://via.placeholder.com/550x550",
    "https://via.placeholder.com/550x550/ff0000",
    "https://via.placeholder.com/550x550/00ff00",
    "https://via.placeholder.com/550x550/0000ff",
  ];
  const reviews = [
    {
      count: 200,
      rating: 3,
      name: "김**",
      pdname: detailinfo?.name,
      badges: ["베스트", "정기배송"],
    },
    {
      count: 13,
      rating: 4,
      name: "이**",
      pdname: detailinfo?.name,
      badges: ["베스트"],
    },
    {
      count: 5,
      rating: 2,
      name: "박**",
      pdname: detailinfo?.name,
      badges: ["정기배송"],
    },
    { count: 6, rating: 4, name: "최**", pdname: detailinfo?.name, badges: [] },
    { count: 6, rating: 4, name: "최**", pdname: detailinfo?.name, badges: [] },
    { count: 6, rating: 4, name: "최**", pdname: detailinfo?.name, badges: [] },
  ];

  //함수선언
  const purchasePr =
  (Number(detailinfo?.discountPrice || 0) || Number(detailinfo?.originalPrice || 0)) *
  (quantity || 1);

console.log("detailinfo:", detailinfo);
console.log("quantity:", quantity);
console.log("purchasePr 계산:", purchasePr);

  const handleAddToCart = (e) => {
    detailToCart([...detailinfo], e); // 장바구니에 상품 추가
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleCouponClick = () => {
    if (!hasClaimedCoupon) {
      alert("쿠폰이 발급되었습니다!");
      Cookies.set("couponClaimed", "true"); // 쿠키에 쿠폰 발급 정보 저장
      setHasClaimedCoupon(true); // 상태 업데이트
    } else {
      alert("이미 발급된 쿠폰입니다!");
    }
  };

  const findSubLocation = async (대분류포함된네비, 상품데이터의카테고리) => {
    // 먼저 비동기 작업을 수행하여 결과를 처리
    const results = await Promise.all(
      대분류포함된네비.map(async (subnavi) => {
        console.log(subnavi.categoryId); // 소분류내의 categoryId 모두 출력해보기
        return {
          ...subnavi, // 하나만 찾기
          matches: String(subnavi.categoryId) === String(상품데이터의카테고리), // 비동기 조건 확인
        };
      })
    );

    // 비동기 결과 중에서 조건에 맞는 항목을 찾기
    return results.find((subnavi) => subnavi.matches);
  };

  // 후기 그룹화 및 Swiper로 매핑
  const reviewSlides = reviews
    .reduce((acc, cur, index) => {
      if (index % 3 === 0) acc.push([]);
      acc[acc.length - 1].push(cur);
      return acc;
    }, [])
    .map((group, i) => (
      <SwiperSlide key={i}>
        {group.map((review, j) => (
          <ReviewItem key={j} reviewData={review} />
        ))}
      </SwiperSlide>
    ));

  const thumbnails = [
    detailinfo?.image_url,
    ...(detailinfo?.addimage?.split("|") || []),
  ];

  const handleToggle = (index) => {
    console.log(index);

    const currentButton = buttonRef.current;
    if (currentButton) {
      // 이전에 열려 있던 항목이 있으면, 해당 항목에서 expend 클래스를 제거
      if (expandedIndex !== null) {
        currentButton.classList.remove(styles.expend);
      }

      // 클릭한 항목에 expend 클래스를 추가/제거
      if (expandedIndex === index) {
        setExpandedIndex(null);
      } else {
        if (index === 0) {
          const userInput = prompt("비밀번호를 입력하세요:");
          console.log("사용자가 입력한 값:", userInput);
          if (userInput === "1234") {
            setExpandedIndex(index);
            currentButton.classList.add(styles.expend);
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        } else {
          setExpandedIndex(index);
          currentButton.classList.add(styles.expend);
        }
        if (index === 2 || index === 3) {
          alert("비밀글입니다.");
        }
      }
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    const wishbutton = wishbuttonRef.current;

    console.log("왜 안들어와", wishbutton);

    const toggleClass = (element, className) => {
      if (element) {
        element.classList.toggle(className);
      }
    };

    // 버튼이 렌더링된 후 이벤트 리스너 추가
    if (button) {
      button.addEventListener("click", () => toggleClass(button, "active"));
    }

    if (wishbutton) {
      wishbutton.addEventListener("click", () =>
        toggleClass(wishbutton, "active")
      );
    }

    const handleScroll = () => {
      if (window.scrollY > 1010) {
        // 스크롤이 1010px 이상 내려가면 고정
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener("scroll", handleScroll);

    // 클린업 함수로 이벤트 리스너 제거
    return () => {
      if (button) {
        button.removeEventListener("click", () =>
          toggleClass(button, "active")
        );
      }

      if (wishbutton) {
        wishbutton.removeEventListener("click", () =>
          toggleClass(wishbutton, "active")
        );
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  //함수마침

  //실행식
  useEffect(() => {
    if (productinfo && naviinfo && productId) {
      const product = productinfo.find((item) => item.productId === productId);

      setDetailinfo(product);
      const locationNavidata = naviinfo.find(
        (navidata) =>
          String(navidata.categoryId) === product.categoryId.substring(0, 1)
      );
      setLocationinfo(locationNavidata); // locationinfo
    }
    console.log(
      "분리할",
      detailinfo &&
        detailinfo.productInfo &&
        detailinfo.productInfo.split("|")[0]
    );
  }, [productinfo, naviinfo, productId]);

  useEffect(() => {
    const fetchData = async () => {
      if (locationinfo && locationinfo.subcategory && detailinfo) {
        // 비동기 find 호출 여기 실행시 주의
        const subLocationData = await findSubLocation(
          locationinfo.subcategory,
          detailinfo.categoryId
        );

        console.log(
          "서브로케이션 데이터",
          subLocationData,
          "대분류",
          locationinfo.subcategory,
          "소분류아이디 ",
          detailinfo.categoryId
        );

        setSubLocationinfo(subLocationData); // 서브로케이션 정보 설정
      }
    };
    fetchData(); // 비동기 함수 호출
  }, [locationinfo, productId]); // 의존성 배열

  // 필수 데이터가 없는 경우 처리
  if (!productinfo || !naviinfo) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        상품준비중입니다.
      </div>
    );
  }

  return (
    <div className="mw">
      {locationinfo && (
        <div className="location d-flex justify-content-end py-4 align-items-center">
          <span>
            <Link to="/">홈</Link>
          </span>
          <span className="mx-2">
            <Arrow icon="gray"></Arrow>
          </span>
          <span>
            <Link to={`/product/${locationinfo.linkto}`}>
              {locationinfo.name}
            </Link>
          </span>
          {subloactioninfo && (
            <>
              <span className="mx-2">
                <Arrow icon="gray"></Arrow>
              </span>
              <span>
                <Link
                  to={`/product/${subloactioninfo.linkto}/${subloactioninfo.categoryId}`}
                >
                  {subloactioninfo.name}
                </Link>
              </span>
            </>
          )}
        </div>
      )}
      <div
        className={`${styles.productDetailContainer} d-flex align-items-start justify-contents-between`}
      >
        <div className={`${styles.productDetailLeft} col-auto`}>
          {/* 큰 이미지 Swiper */}
          <div className={styles.productImageWrapper}>
            <Swiper
              spaceBetween={0}
              loop={true}
              className={`w-100 round-pagination`}
              modules={[Pagination]}
              pagination={{
                clickable: true,
                type: "fraction",
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)} // Swiper 인스턴스 저장
              onSlideChange={(swiper) => setActiveImageIndex(swiper.realIndex)} // 활성 슬라이드 업데이트
            >
              {thumbnails.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`상품 이미지 ${index + 1}`}
                    className={styles.largeImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 썸네일 */}
          <div className={styles.imageThumbnails}>
            <div className={styles.thumbnailPack}>
              {thumbnails.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${
                    activeImageIndex === index ? styles.active : ""
                  }`}
                  style={{
                    opacity: activeImageIndex === index ? 1 : 0.5,
                  }}
                  onClick={() => {
                    setActiveImageIndex(index); // 썸네일 활성화 상태 업데이트
                    swiperRef.current?.slideToLoop(index); // Swiper의 슬라이드 이동
                  }}
                >
                  <img
                    src={image}
                    alt={`썸네일 ${index + 1}`}
                    className={styles.thumbImage}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/*오른쪽  상품정보 */}
        <div className={`${styles.productDetailRight} col-auto`}>
          <div className={styles.productInfo}>
            <div className={styles.productName}>{detailinfo.name}</div>
            <div className={styles.discountInfo}>
              <div className={styles.originalPrice}>
                {/* Show the discount percentage if discountPrice is valid and greater than 0 */}
                {detailinfo && Number(detailinfo.discountPrice) > 0 && (
                  <span
                    className={`${styles.discount} org-current-price text-discount`}
                  >
                    {`${Math.round(
                      (Number(detailinfo.discountPrice) /
                        Number(detailinfo.originalPrice)) *
                        100
                    )}%`}
                  </span>
                )}
                <div className={styles.price}>
                  {/* Display the purchase price with currency formatting */}
                  {new Intl.NumberFormat("ko-KR").format(
                    Number(detailinfo.discountPrice) > 0
                      ? Number(detailinfo.discountPrice)
                      : Number(detailinfo.originalPrice)
                  )}
                  원
                </div>
                <div className={styles.originalPriceCrossed}>
                  {Number(detailinfo.discountPrice) > 0
                    ? `${new Intl.NumberFormat("ko-KR").format(
                        Number(detailinfo.originalPrice)
                      )}원`
                    : null}
                </div>
              </div>
            </div>
            <div className={styles.originInfo}>
              원산지: 상품설명/상세정보 참조
            </div>
          </div>
          <div className={styles.promotionBoxes}>
            <div className={`${styles.promotionBox} ${styles.firstPurchase}`}>
              <span className="kr-btn d-flex justify-content-between w-100">
                <span>
                  첫 구매라면 <strong>5,000원</strong> 즉시 할인
                </span>
                <Arrow icon="grayGreen" />
              </span>
              <div className="divider" />
            </div>
            <button
              className={`${styles.promotionBox} ${styles.coupon}`}
              onClick={handleCouponClick}
            >
              <span className={`${styles.couponText} kr-body d-flex gap-2`}>
                2,000원 할인 쿠폰 받기
                <Arrow icon="grayGreen" />
              </span>
              <div className="divider" />
            </button>
          </div>
          <div className={styles.sectionDivider} />
          <div className={styles.storageInfo}>
            <div className={styles.storageTitle}>보관방법</div>
            <div className={styles.storageValue}>
              {" "}
              {detailinfo.productInfo &&
              typeof detailinfo.productInfo === "string"
                ? detailinfo.productInfo.split("|")[0]
                : null}
            </div>
          </div>
          <div className={styles.storageInfo}>
            <div className={styles.storageTitle}>포장타입</div>
            <div className={styles.storageValue}>
              {detailinfo.productInfo &&
              typeof detailinfo.productInfo === "string"
                ? detailinfo.productInfo.split("|")[1]
                : null}
            </div>
          </div>
          <div className={styles.storageInfo}>
            <div className={styles.storageTitle}>
              소비기한/
              <br />
              유통기한 정보
            </div>
            <div className={styles.storageValue}>
              {detailinfo.productInfo &&
              typeof detailinfo.productInfo === "string"
                ? detailinfo.productInfo.split("|")[2]
                : null}
            </div>
          </div>
          <div className={`${styles.storageInfo} mb-0`}>
            <div className={styles.storageTitle}>쇼핑정보</div>
            <div className={styles.storageValue}>
              {detailinfo.productInfo &&
              detailinfo.productInfo.split("|")[3] !== '""' &&
              detailinfo.productInfo.split("|")[3] !== ""
                ? detailinfo.productInfo.split("|")[3]
                : null}
            </div>
          </div>
          <div className={styles.sectionDivider} />
          <div className={`${styles.quantityBox} `}>
            <div className={`${styles.storageInfo} mb-0`}>
              <div className={styles.storageTitle}>수량/개수</div>
            </div>
            <div className={styles.itembox}>
              <div className={styles.quantitySelector}>
                <div>{detailinfo.name}</div>
                <div className={`${styles.quantityButtons}`}>
                  <button className={styles.btn} onClick={handleDecrement}>
                    -
                  </button>
                  <span className={styles.quantity}>{quantity}</span>
                  <button className={styles.btn} onClick={handleIncrement}>
                    +
                  </button>
                </div>
              </div>
              <div className={styles.totalInfo}>
                <div className="kr-body lh1-2">총 상품금액 : </div>
                {detailinfo && detailinfo.originalPrice && (
  <span className="kr-h2 lh0-8">
    {new Intl.NumberFormat("ko-KR").format(purchasePr)}
    <strong className="kr-h4">원</strong>
  </span>
)}
              </div>
            </div>
          </div>
          <div
            className={`${styles.buttoncontainer} d-flex justify-content-start align-items-center`}
          >
            <div
              className={`${styles.button} ${styles.carticon} d-flex justify-content-center align-items-center carticon button`}
            >
              {/* 찜하기 */}
              <Wishheart
                ref={wishbuttonRef}
                className={`iconwrapper position-relative pb-4`}
              ></Wishheart>
            </div>
            <div
              className={`${styles.button} ${styles.carttext} d-flex justify-content-center align-items-center`}
            >
              <button
                className={styles.text}
                onClick={() => {
                  detailToCart([{ ...detailinfo, quantity }]);
                  alert(detailinfo.name + "상품이 장바구니에 담겼습니다.");
                }}
              >
                장바구니 담기
              </button>
            </div>
            <div
              className={`${styles.button} ${styles.buynow} d-flex justify-content-center align-items-center`}
            >
              <div className={styles.text}>바로 구매하기</div>
            </div>
          </div>
        </div>
      </div>
      {/* 상품상세내용 */}
      <div className={`${styles.banner} h-50`}>
        <img
          src="https://github.com/chae0924/heayul/blob/chae0924-patch-1/detail_app_banner.jpg?raw=true"
          alt="banner"
        />
      </div>

      <div className={styles.productHeaderContainer} id="taplist">
        <div className={`${styles.productHeaderRow} d-flex`}>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-1">상품설명</a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-2">상세정보</a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-3">
              <span className={styles.productHeaderReview}>후기</span>
              <span className={styles.productHeaderReviewCount}>
                ({reviews.length})
              </span>
            </a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-4">상품문의</a>
          </div>
        </div>
      </div>
      <div
        className={`${styles.productHeaderContainer} ${
          isFixed ? styles.fixedHeader : ""
        } pt-5 d-none`}
        id="taplist"
      >
        <div className={`${styles.productHeaderRow} d-flex`}>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-1">상품설명</a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-2">상세정보</a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-3">
              <span className={styles.productHeaderReview}>후기</span>
              <span className={styles.productHeaderReviewCount}>
                ({reviews.length})
              </span>
            </a>
          </div>
          <div className={`${styles.productHeaderCol} col-auto`}>
            <a href="#list-item-4">상품문의</a>
          </div>
        </div>
      </div>

      {/* 상품 list 섹션 */}
      <div
        data-bs-spy="scroll"
        data-bs-target="#taplist"
        data-bs-offset="50"
        tabindex="0"
      >
        <div
          className={`${styles.noticeCard} container ${styles.scrollspySection}`}
          id="list-item-1"
        >
          <div className={`${styles.noticeCardHeader} row`}>
            <div className={`${styles.noticeIcon} col-auto`}>
              <div className={styles.noticeIconText}>!</div>
            </div>
            <div className={`${styles.noticeTitle} col`}>알려드립니다</div>
          </div>
          <div className={`${styles.noticeDescription} col-12`}>
            ㆍ어획지역 : 서해/ 어획 시기 : 연중
          </div>
        </div>
        <div className={` h-auto bg-white mb-5 ${styles.detailImage} `}>
          <img
            src="https://cdn.oasis.co.kr:48580/se/2022/2/11/se_2022d0e17176-c479-4bf2-b3f9-d03532cddce9.jpg"
            alt="상품상세이미지1"
            className=""
          />
          <img
            src="https://cdn.oasis.co.kr:48580/se/2022/2/11/se_2022f3e43620-43cc-4ef8-b090-891ce2b9a64f.jpg"
            alt="상품상세이미지2"
            className=""
          />
        </div>
        <div className={styles.container}>
          <div
            className={`${styles.header} ${styles.scrollspySection} kr-h4`}
            id="list-item-2"
          >
            물품기본정보
          </div>
        </div>
        {/* 상품상세설명 */}
        <div className={styles.detailsContainer}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>물품명</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>{detailinfo.name}</div>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>중량/용량</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>15g</div>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>영양정보</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>
                    * %영양소 기준치: 1일 영양소 기준치에 대한 비율
                    <br />* 영양성분 검사에 해당되지 않는 항목은 수치가 표기되지
                    않습니다
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>원산지</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>국산</div>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>생산자/생산지</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>
                    농장 : 경기 화성, 충남 홍성
                    <br />
                    가공 : 씨알살림축산(주) / 경기도 이천시 대월면 양녕로
                    169번길 5-24
                  </div>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.labelContainer}>
                  <div className={styles.label}>소비기한</div>
                </div>
                <div className={styles.valueContainer}>
                  <div className={styles.value}>
                    제조일로부터 12개월까지(제조일은 물품포장 별도표기)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.labelContainer}>
              <div className={styles.label}>보관/취급방법</div>
            </div>
            <div className={styles.valueContainer}>
              <div className={styles.value}>물품 상세 정보 참고</div>
            </div>
          </div>
        </div>
        {/* 상품후기 */}
        <div className={styles.container}>
          <div
            className={`${styles.header} kr-h3 ${styles.scrollspySection}`}
            id="list-item-3"
          >
            상품 후기
          </div>
        </div>
        {/* 후기 사진 모음 */}
        <div className={styles.imageThumbnail}>
          <div className={styles.thumbnailPack}>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>

            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
            <div className={`${styles.thumbnail} d-flex gap-2`}>
              <img src="https://via.placeholder.com/126x120" alt="후기사진" />
            </div>
          </div>
        </div>
        {/* 구분선 */}
        <div className="d-flex justify-content-between border-bottom border-black pb-2 mb-5">
          <div className="kr-h5 lh1-5">총 {reviews.length}개</div>
          <div className="d-inline-flex align-items-center text-center">
            <div className="kr-body afterbar position-relative px-2 lh0-9 fw-500">
              추천순
            </div>
            <div className="kr-body text-bold ps-2 lh0-9">최신순</div>
          </div>
        </div>
        {/* 후기 컴포넌트 */}
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoHeight={true} // 슬라이드 높이 자동 조정
          modules={[Pagination, Navigation]}
          className={`mySwiper ${styles.swiperCustom}`}
          pagination={{
            clickable: true,
            type: "fraction",
            el: `.reviewPagination`,
            renderFraction: (current, total) => `
        <span class="${current} me-1">${current}</span>/
        <span class="${total}">${total}</span>
      `,
          }}
          navigation={{
            prevEl: `.${styles.swiperPrev}`,
            nextEl: `.${styles.swiperNext}`,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = `.${styles.swiperPrev}`;
            swiper.params.navigation.nextEl = `.${styles.swiperNext}`;
          }}
        >
          {reviewSlides}
        </Swiper>
        <div className={styles.swiperCustom}>
          {/* 내비게이션 버튼 */}
          <div
            className={`${styles.swiperNavigation} d-inline-flex justity-content-center position-relative`}
          >
            {/* 내비게이션 버튼 (SVG로 교체) */}
            <div
              className={`swiper-button-prev ${styles.swiperPrev} ${styles.bt} after-no position-unset`}
            >
              <svg
                class="vector"
                width="12"
                height="11"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.15517 10.6981C5.25187 10.7856 5.37893 10.8319 5.50925 10.827C5.63957 10.8222 5.76284 10.7666 5.85277 10.6722C5.94269 10.5777 5.99216 10.4519 5.99062 10.3215C5.98907 10.1911 5.93664 10.0664 5.8445 9.97414L1.67717 6.00481L11.4998 6.00481C11.6324 6.00481 11.7596 5.95213 11.8534 5.85836C11.9472 5.76459 11.9998 5.63741 11.9998 5.50481C11.9998 5.3722 11.9472 5.24502 11.8534 5.15125C11.7596 5.05748 11.6324 5.00481 11.4998 5.00481L1.67717 5.00481L5.8445 1.03481C5.89209 0.989543 5.93029 0.935352 5.95693 0.875326C5.98357 0.815301 5.99812 0.750615 5.99976 0.684964C6.0014 0.619313 5.9901 0.553983 5.96649 0.492701C5.94288 0.431419 5.90743 0.375388 5.86217 0.327806C5.81691 0.280223 5.76272 0.242022 5.70269 0.215383C5.64266 0.188744 5.57798 0.174188 5.51233 0.172547C5.44668 0.170907 5.38135 0.182214 5.32007 0.205822C5.25878 0.229429 5.20275 0.264876 5.15517 0.310139L0.208503 5.02147C0.100448 5.12435 0.0300246 5.2605 0.00850349 5.40814C-0.00305431 5.47209 -0.00282843 5.53761 0.0091701 5.60147C0.0309753 5.74863 0.101377 5.88427 0.20917 5.9868L5.15517 10.6981Z"
                  fill="#222222"
                ></path>
              </svg>
            </div>
            <div
              className={`${styles.pagination} reviewPagination position-unset transfromNo`}
            ></div>
            <div
              className={`swiper-button-next ${styles.swiperNext} ${styles.bt} after-no position-unset`}
            >
              <svg
                class="vector"
                width="10"
                height="9"
                viewBox="0 0 12 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.84459 10.6981C6.74789 10.7856 6.62083 10.8319 6.49051 10.827C6.36018 10.8222 6.23692 10.7666 6.14699 10.6722C6.05706 10.5777 6.0076 10.4519 6.00914 10.3215C6.01068 10.1911 6.06312 10.0664 6.15525 9.97414L10.3226 6.00481L0.499918 6.00481C0.36731 6.00481 0.240132 5.95213 0.146364 5.85836C0.0525961 5.76459 -8.2016e-05 5.63741 -8.2016e-05 5.50481C-8.2016e-05 5.3722 0.0525961 5.24502 0.146364 5.15125C0.240132 5.05748 0.36731 5.00481 0.499918 5.00481L10.3226 5.00481L6.15525 1.03481C6.10767 0.989543 6.06947 0.935352 6.04283 0.875326C6.01619 0.815301 6.00164 0.750615 5.99999 0.684964C5.99835 0.619313 6.00966 0.553983 6.03327 0.492701C6.05688 0.431419 6.09232 0.375388 6.13759 0.327806C6.18285 0.280223 6.23704 0.242022 6.29706 0.215383C6.35709 0.188744 6.42178 0.174188 6.48743 0.172547C6.55308 0.170907 6.61841 0.182214 6.67969 0.205822C6.74097 0.229429 6.797 0.264876 6.84459 0.310139L11.7913 5.02147C11.8993 5.12435 11.9697 5.2605 11.9913 5.40814C12.0028 5.47209 12.0026 5.53761 11.9906 5.60147C11.9688 5.74863 11.8984 5.88427 11.7906 5.9868L6.84459 10.6981Z"
                  fill="#222222"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <div className={`${styles.container}`}>
          <div
            className={`${styles.header} kr-h3 ${styles.scrollspySection}`}
            id="list-item-4"
          >
            상품 문의
          </div>
          <Button type="submit" className={styles.questionButton}>
            문의하기
          </Button>
        </div>

        <ul className={`${styles.list} fw-300 pt-1 mb-5 `}>
          <li>
            상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은
            사전동의 없이 담당 게시판으로 이동될 수 있습니다.
          </li>
          <li>
            배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은{" "}
            <Link to="/support" className="underline fw-400">
              고객센터
            </Link>{" "}
            내 1:1 문의에 남겨주세요.
          </li>
        </ul>

        <div className={styles.content}>
          <div className="px-0 mb160">
            <dl className="mb-0 border-black border-2  border-top">
              <dt className="d-flex py-3 justify-content-center align-items-center">
                <div className="col-7 text-center kr-body py-1">제목</div>
                <div className="col-1 text-center kr-body py-1">작성자</div>
                <div className="col-2 text-center kr-body py-1">작성일</div>
                <div className="col-2 text-end pe-5 kr-body py-1">답변상태</div>
              </dt>
              <dt
                className=" border-bottom"
                onClick={() => handleToggle(0)}
                ref={buttonRef} // ref를 사용하여 버튼에 접근
              >
                <div className="border-0 kr-body fw-300 d-flex py-4 justify-content-center align-items-center">
                  <div
                    className={`${styles.secret} col-7 border-0 ps-4 d-flex align-items-center gap-1`}
                  >
                    비밀글입니다.
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.875 12.5C7.875 12.2016 7.99353 11.9155 8.2045 11.7045C8.41548 11.4935 8.70163 11.375 9 11.375C9.29837 11.375 9.58452 11.4935 9.7955 11.7045C10.0065 11.9155 10.125 12.2016 10.125 12.5C10.125 12.7984 10.0065 13.0845 9.7955 13.2955C9.58452 13.5065 9.29837 13.625 9 13.625C8.70163 13.625 8.41548 13.5065 8.2045 13.2955C7.99353 13.0845 7.875 12.7984 7.875 12.5Z"
                        fill="#999999"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.71652 8.44774L5.47952 6.31849C5.44945 6.04557 5.44945 5.77017 5.47952 5.49724L5.49677 5.34349C5.59295 4.48165 6.00345 3.68551 6.64976 3.10732C7.29607 2.52913 8.13283 2.20947 9.00002 2.20947C9.86721 2.20947 10.704 2.52913 11.3503 3.10732C11.9966 3.68551 12.4071 4.48165 12.5033 5.34349L12.5205 5.49724C12.5505 5.77074 12.5505 6.04449 12.5205 6.31849L12.2835 8.44849L12.7988 8.48899C13.1934 8.52038 13.566 8.68313 13.8573 8.95124C14.1485 9.21934 14.3414 9.57733 14.4053 9.96799C14.6797 11.6448 14.6797 13.3552 14.4053 15.032C14.3414 15.4227 14.1485 15.7806 13.8573 16.0488C13.566 16.3169 13.1934 16.4796 12.7988 16.511L11.6768 16.601C9.89477 16.7435 8.10527 16.7435 6.32327 16.601L5.20127 16.511C4.80667 16.4796 4.43398 16.3169 4.14276 16.0488C3.85154 15.7806 3.6586 15.4227 3.59477 15.032C3.3203 13.3552 3.3203 11.6448 3.59477 9.96799C3.6586 9.57733 3.85154 9.21934 4.14276 8.95124C4.43398 8.68313 4.80667 8.52038 5.20127 8.48899L5.71652 8.44774ZM8.71952 3.34999C9.03382 3.31305 9.35233 3.33864 9.65671 3.42527C9.96109 3.51191 10.2453 3.65789 10.4931 3.85482C10.7408 4.05174 10.9472 4.29571 11.1002 4.5727C11.2533 4.84968 11.3501 5.15421 11.385 5.46874L11.4023 5.62249C11.4233 5.81299 11.4233 6.00399 11.4023 6.19549L11.1615 8.36299C9.722 8.27061 8.27804 8.27061 6.83852 8.36299L6.59852 6.19549C6.57761 6.00507 6.57761 5.81292 6.59852 5.62249L6.61502 5.46874C6.67484 4.92976 6.91543 4.42693 7.2976 4.04218C7.67976 3.65744 8.18095 3.41345 8.71952 3.34999ZM11.5875 9.52174C9.86525 9.3844 8.13478 9.3844 6.41252 9.52174L5.29127 9.61174C5.14724 9.62296 5.01115 9.68221 4.9048 9.77999C4.79846 9.87776 4.72801 10.0084 4.70477 10.151C4.45011 11.7071 4.45011 13.2943 4.70477 14.8505C4.72786 14.9932 4.79824 15.124 4.9046 15.222C5.01096 15.3199 5.14713 15.3792 5.29127 15.3905L6.41327 15.4805C8.13527 15.6177 9.86477 15.6177 11.5875 15.4805L12.7095 15.3905C12.8535 15.3791 12.9895 15.3197 13.0957 15.2217C13.2019 15.1238 13.2722 14.9931 13.2953 14.8505C13.5499 13.2943 13.5499 11.7071 13.2953 10.151C13.2722 10.0084 13.2019 9.87766 13.0957 9.77975C12.9895 9.68184 12.8535 9.62241 12.7095 9.61099L11.5875 9.52174Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                  <div
                    className={`col-1 border-0 text-center ${styles.userName}`}
                  >
                    최*서
                  </div>
                  <div className={`col-2 border-0 text-center ${styles.date}`}>
                    2024.11.13
                  </div>
                  <div
                    className={`${styles.answerNo} col-2 border-0 text-end pe-5 fw-400`}
                  >
                    답변대기
                  </div>
                </div>
              </dt>
              <dd
                className={`py-3 m-0 ${
                  expandedIndex === 0 ? "d-block" : "d-none"
                } bg-sub03 ps-4 d-flex flex-column text-sns-active border-gray border-1 border-bottom`}
              >
                <div className="border-0 ps-2 d-flex gap-3 py-3 align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="32" height="32" rx="16" fill="#24C57A" />
                    <path
                      d="M14.7031 17.5781H16.7188L17.5781 18.6875C18.1172 18.0547 18.4219 17.1016 18.4219 15.8438C18.4219 13.4219 17.2812 12.1094 15.5312 12.1094C13.7812 12.1094 12.625 13.4219 12.625 15.8438C12.625 18.2656 13.7812 19.5781 15.5312 19.5781C15.7578 19.5781 15.9766 19.5547 16.1875 19.5156L14.7031 17.5781ZM20.8125 15.8438C20.8125 17.8594 20.125 19.4141 19.0156 20.3906L20.625 22.4375H18.4219L17.5156 21.2969C16.9062 21.5391 16.2344 21.6562 15.5312 21.6562C12.5156 21.6562 10.2344 19.5156 10.2344 15.8438C10.2344 12.1562 12.5156 10.0312 15.5312 10.0312C18.5156 10.0312 20.8125 12.1562 20.8125 15.8438Z"
                      fill="white"
                    />
                  </svg>
                  <span className={`${styles.Q} fw-300`}>
                    상품 포장이 뜯겨 왔습니다.{" "}
                  </span>
                </div>
                <div className="border-0 ps-2 d-flex gap-3 py-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31"
                      height="31"
                      rx="15.5"
                      fill="white"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31"
                      height="31"
                      rx="15.5"
                      stroke="#DDDDDD"
                    />
                    <path
                      d="M13.2601 14.9071C13.6004 14.9071 13.9219 14.6859 14.0516 14.3293L14.9823 11.7328C15.2268 11.0493 14.6326 10.2482 13.7395 10.5989C13.6192 10.6468 13.5233 10.7504 13.4782 10.8779L12.3895 13.9128C12.3425 14.0423 12.35 14.1878 12.4121 14.3093C12.6283 14.7298 12.9517 14.9091 13.2582 14.9091L13.2601 14.9071Z"
                      fill="#24C57A"
                    />
                    <path
                      d="M17.7515 14.9084C18.0918 14.9084 18.4133 14.6872 18.543 14.3306L19.5527 11.5149C19.5978 11.3873 19.5922 11.2419 19.532 11.1223C19.0845 10.2296 18.1369 10.4129 17.8925 11.0944L16.8828 13.9121C16.8358 14.0416 16.8433 14.1871 16.9054 14.3086C17.1216 14.7291 17.445 14.9084 17.7515 14.9084Z"
                      fill="#24C57A"
                    />
                    <path
                      d="M26.692 19.0519C26.6469 18.8725 26.4438 18.8048 26.3066 18.9204C25.782 19.3627 25.2536 19.6617 24.5711 19.6955C24.2834 19.7095 23.8548 19.6517 23.4016 18.9861C22.7154 17.9798 23.49 15.8676 23.9525 14.6062L24.0221 14.4169C24.0935 14.2495 24.1594 14.0881 24.2158 13.9307C24.2759 13.7693 24.1951 13.5879 24.039 13.5301L23.2606 13.2492C22.9635 13.1416 22.642 13.295 22.5142 13.5979C22.0573 14.6939 21.2582 15.9652 20.6678 16.4893C19.7822 17.2744 18.8308 17.934 17.8381 18.4481C15.6796 19.566 13.4158 19.9187 11.4604 19.4405C10.9998 19.3269 10.3586 19.0818 9.91488 18.5477C9.2004 17.6869 9.08759 16.2721 9.29253 15.0525C9.32262 14.935 9.35082 14.8234 9.37526 14.7138C9.42603 14.4906 9.2963 14.2734 9.08383 14.2316C8.94658 14.2037 8.78676 14.1718 8.62694 14.1399L8.4784 14.0941C8.108 13.9785 7.7188 14.2216 7.64547 14.6241C7.64171 14.6401 7.63983 14.656 7.63795 14.67C7.20738 16.3079 6.47974 17.8981 5.50015 19.2492C5.38734 19.4066 5.26701 19.558 5.14479 19.7075C4.93797 19.9546 4.95301 20.3312 5.18804 20.5484C5.3535 20.6998 5.52083 20.8513 5.69005 21.0047C5.88747 21.1841 6.18455 21.1602 6.35377 20.9529C6.9686 20.2017 7.49505 19.3667 7.93502 18.5298C8.10988 18.9622 8.34303 19.3687 8.64762 19.7354C9.23425 20.4408 10.0766 20.9449 11.0825 21.19C11.8308 21.3734 12.5622 21.4511 13.2673 21.4511C15.3807 21.4511 17.2533 20.7497 18.5827 20.0602C19.5829 19.5421 20.5418 18.8945 21.4425 18.1333C21.4725 18.8108 21.6418 19.4624 22.0328 20.0343C22.8394 21.2179 23.804 21.487 24.5147 21.487C24.5617 21.487 24.6087 21.487 24.6538 21.483C25.5018 21.4411 26.1825 21.1621 26.7747 20.7676C26.9552 20.648 27.038 20.4169 26.9834 20.1977L26.6976 19.0479L26.692 19.0519Z"
                      fill="#24C57A"
                    />
                  </svg>
                  <span
                    className={`${styles.A} ${styles.answerNo}  fw-300 pt-1`}
                  >
                    남겨주신 문의를 확인 중입니다.
                    <br /> 빠른 시일 내에 답변 드리도록 하겠습니다. 불편을 드려
                    죄송합니다.
                  </span>
                </div>
              </dd>

              <dt
                className=" border-bottom"
                onClick={() => handleToggle(1)}
                ref={buttonRef} // ref를 사용하여 버튼에 접근
              >
                <div className="border-0 kr-body fw-300 d-flex py-4 justify-content-center align-items-center">
                  <div className="col-7 border-0 ps-4">
                    상품 품질 관련 문의드립니다.
                  </div>
                  <div
                    className={`col-1 border-0 text-center ${styles.userName}`}
                  >
                    홍*동
                  </div>
                  <div className={`col-2 border-0 text-center ${styles.date}`}>
                    2024.11.12
                  </div>
                  <div className="col-2 border-0 text-end pe-5 text-labeln fw-400">
                    답변완료
                  </div>
                </div>
              </dt>
              <dd
                className={`py-3 m-0 ${
                  expandedIndex === 1 ? "d-block" : "d-none"
                } bg-sub03 ps-4 d-flex flex-column text-sns-active border-gray border-1 border-bottom`}
              >
                <div className="border-0 ps-2 d-flex gap-3 py-3 align-items-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="32" height="32" rx="16" fill="#24C57A" />
                    <path
                      d="M14.7031 17.5781H16.7188L17.5781 18.6875C18.1172 18.0547 18.4219 17.1016 18.4219 15.8438C18.4219 13.4219 17.2812 12.1094 15.5312 12.1094C13.7812 12.1094 12.625 13.4219 12.625 15.8438C12.625 18.2656 13.7812 19.5781 15.5312 19.5781C15.7578 19.5781 15.9766 19.5547 16.1875 19.5156L14.7031 17.5781ZM20.8125 15.8438C20.8125 17.8594 20.125 19.4141 19.0156 20.3906L20.625 22.4375H18.4219L17.5156 21.2969C16.9062 21.5391 16.2344 21.6562 15.5312 21.6562C12.5156 21.6562 10.2344 19.5156 10.2344 15.8438C10.2344 12.1562 12.5156 10.0312 15.5312 10.0312C18.5156 10.0312 20.8125 12.1562 20.8125 15.8438Z"
                      fill="white"
                    />
                  </svg>
                  <span className={`${styles.Q} fw-300`}>
                    김에서 약간 냄새가 나는데 환불해주던지 교환해주세요.
                  </span>
                </div>
                <div className="border-0 ps-2 d-flex gap-3 py-3">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31"
                      height="31"
                      rx="15.5"
                      fill="white"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31"
                      height="31"
                      rx="15.5"
                      stroke="#DDDDDD"
                    />
                    <path
                      d="M13.2601 14.9071C13.6004 14.9071 13.9219 14.6859 14.0516 14.3293L14.9823 11.7328C15.2268 11.0493 14.6326 10.2482 13.7395 10.5989C13.6192 10.6468 13.5233 10.7504 13.4782 10.8779L12.3895 13.9128C12.3425 14.0423 12.35 14.1878 12.4121 14.3093C12.6283 14.7298 12.9517 14.9091 13.2582 14.9091L13.2601 14.9071Z"
                      fill="#24C57A"
                    />
                    <path
                      d="M17.7515 14.9084C18.0918 14.9084 18.4133 14.6872 18.543 14.3306L19.5527 11.5149C19.5978 11.3873 19.5922 11.2419 19.532 11.1223C19.0845 10.2296 18.1369 10.4129 17.8925 11.0944L16.8828 13.9121C16.8358 14.0416 16.8433 14.1871 16.9054 14.3086C17.1216 14.7291 17.445 14.9084 17.7515 14.9084Z"
                      fill="#24C57A"
                    />
                    <path
                      d="M26.692 19.0519C26.6469 18.8725 26.4438 18.8048 26.3066 18.9204C25.782 19.3627 25.2536 19.6617 24.5711 19.6955C24.2834 19.7095 23.8548 19.6517 23.4016 18.9861C22.7154 17.9798 23.49 15.8676 23.9525 14.6062L24.0221 14.4169C24.0935 14.2495 24.1594 14.0881 24.2158 13.9307C24.2759 13.7693 24.1951 13.5879 24.039 13.5301L23.2606 13.2492C22.9635 13.1416 22.642 13.295 22.5142 13.5979C22.0573 14.6939 21.2582 15.9652 20.6678 16.4893C19.7822 17.2744 18.8308 17.934 17.8381 18.4481C15.6796 19.566 13.4158 19.9187 11.4604 19.4405C10.9998 19.3269 10.3586 19.0818 9.91488 18.5477C9.2004 17.6869 9.08759 16.2721 9.29253 15.0525C9.32262 14.935 9.35082 14.8234 9.37526 14.7138C9.42603 14.4906 9.2963 14.2734 9.08383 14.2316C8.94658 14.2037 8.78676 14.1718 8.62694 14.1399L8.4784 14.0941C8.108 13.9785 7.7188 14.2216 7.64547 14.6241C7.64171 14.6401 7.63983 14.656 7.63795 14.67C7.20738 16.3079 6.47974 17.8981 5.50015 19.2492C5.38734 19.4066 5.26701 19.558 5.14479 19.7075C4.93797 19.9546 4.95301 20.3312 5.18804 20.5484C5.3535 20.6998 5.52083 20.8513 5.69005 21.0047C5.88747 21.1841 6.18455 21.1602 6.35377 20.9529C6.9686 20.2017 7.49505 19.3667 7.93502 18.5298C8.10988 18.9622 8.34303 19.3687 8.64762 19.7354C9.23425 20.4408 10.0766 20.9449 11.0825 21.19C11.8308 21.3734 12.5622 21.4511 13.2673 21.4511C15.3807 21.4511 17.2533 20.7497 18.5827 20.0602C19.5829 19.5421 20.5418 18.8945 21.4425 18.1333C21.4725 18.8108 21.6418 19.4624 22.0328 20.0343C22.8394 21.2179 23.804 21.487 24.5147 21.487C24.5617 21.487 24.6087 21.487 24.6538 21.483C25.5018 21.4411 26.1825 21.1621 26.7747 20.7676C26.9552 20.648 27.038 20.4169 26.9834 20.1977L26.6976 19.0479L26.692 19.0519Z"
                      fill="#24C57A"
                    />
                  </svg>
                  <span className={`${styles.A} fw-300 pt-1`}>
                    안녕하세요 고객님
                    <br />
                    오늘도 해율을 방문해 주셔서 감사합니다.
                    <br />
                    <br />
                    해율을 믿고 구매해 주셨는데 예기치 못하게 상품 불량으로
                    불편을 안겨 드리게 되어 죄송한 마음입니다.
                    <br />
                    <br />
                    빠르게 도움을 드려야 하나 문의하신 상품문의 채널은 상품과
                    관련한 궁금하신 점을 문의해 주시는 공간으로
                    <br />
                    고객님의 소중한 개인 정보가 필요한 CS조치에 대해서는 직접
                    도움드리기 어려운 점 고객님의 너그러운 양해 부탁드립니다
                    <br />
                    이에 상품 수령 후 불편을 드린 사항에 대해서는 보다 상세히
                    내용 확인 후 신속한 문제 해결을 위해 번거로우시더라도
                    <br />
                    <br />
                    고객행복센터(1234-5678) / 1:1문의 또는 카카오톡채널로 문의해
                    주시면 성심을 다해 안내해 드리겠습니다
                    <br />
                    <br />
                    더불어 접수해 주신 내용은 추후 개선을 위해 유관부서와
                    공유하여 동일 불편을 드리지 않도록 더욱 세심히
                    관리하겠습니다
                    <br />
                    <br />
                    고객님, 가을 햇살처럼 풍요롭고 여유로운 마음으로 감사하는
                    일이 많은 날들이었으면 좋겠습니다.
                  </span>
                </div>
              </dd>

              <dt
                className=" border-bottom"
                onClick={() => handleToggle(2)}
                ref={buttonRef} // ref를 사용하여 버튼에 접근
              >
                <div className="border-0 kr-body fw-300 d-flex py-4 justify-content-center align-items-center">
                  <div
                    className={`${styles.secret} col-7 border-0 ps-4 d-flex align-items-center gap-1`}
                  >
                    비밀글입니다.
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.875 12.5C7.875 12.2016 7.99353 11.9155 8.2045 11.7045C8.41548 11.4935 8.70163 11.375 9 11.375C9.29837 11.375 9.58452 11.4935 9.7955 11.7045C10.0065 11.9155 10.125 12.2016 10.125 12.5C10.125 12.7984 10.0065 13.0845 9.7955 13.2955C9.58452 13.5065 9.29837 13.625 9 13.625C8.70163 13.625 8.41548 13.5065 8.2045 13.2955C7.99353 13.0845 7.875 12.7984 7.875 12.5Z"
                        fill="#999999"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.71652 8.44774L5.47952 6.31849C5.44945 6.04557 5.44945 5.77017 5.47952 5.49724L5.49677 5.34349C5.59295 4.48165 6.00345 3.68551 6.64976 3.10732C7.29607 2.52913 8.13283 2.20947 9.00002 2.20947C9.86721 2.20947 10.704 2.52913 11.3503 3.10732C11.9966 3.68551 12.4071 4.48165 12.5033 5.34349L12.5205 5.49724C12.5505 5.77074 12.5505 6.04449 12.5205 6.31849L12.2835 8.44849L12.7988 8.48899C13.1934 8.52038 13.566 8.68313 13.8573 8.95124C14.1485 9.21934 14.3414 9.57733 14.4053 9.96799C14.6797 11.6448 14.6797 13.3552 14.4053 15.032C14.3414 15.4227 14.1485 15.7806 13.8573 16.0488C13.566 16.3169 13.1934 16.4796 12.7988 16.511L11.6768 16.601C9.89477 16.7435 8.10527 16.7435 6.32327 16.601L5.20127 16.511C4.80667 16.4796 4.43398 16.3169 4.14276 16.0488C3.85154 15.7806 3.6586 15.4227 3.59477 15.032C3.3203 13.3552 3.3203 11.6448 3.59477 9.96799C3.6586 9.57733 3.85154 9.21934 4.14276 8.95124C4.43398 8.68313 4.80667 8.52038 5.20127 8.48899L5.71652 8.44774ZM8.71952 3.34999C9.03382 3.31305 9.35233 3.33864 9.65671 3.42527C9.96109 3.51191 10.2453 3.65789 10.4931 3.85482C10.7408 4.05174 10.9472 4.29571 11.1002 4.5727C11.2533 4.84968 11.3501 5.15421 11.385 5.46874L11.4023 5.62249C11.4233 5.81299 11.4233 6.00399 11.4023 6.19549L11.1615 8.36299C9.722 8.27061 8.27804 8.27061 6.83852 8.36299L6.59852 6.19549C6.57761 6.00507 6.57761 5.81292 6.59852 5.62249L6.61502 5.46874C6.67484 4.92976 6.91543 4.42693 7.2976 4.04218C7.67976 3.65744 8.18095 3.41345 8.71952 3.34999ZM11.5875 9.52174C9.86525 9.3844 8.13478 9.3844 6.41252 9.52174L5.29127 9.61174C5.14724 9.62296 5.01115 9.68221 4.9048 9.77999C4.79846 9.87776 4.72801 10.0084 4.70477 10.151C4.45011 11.7071 4.45011 13.2943 4.70477 14.8505C4.72786 14.9932 4.79824 15.124 4.9046 15.222C5.01096 15.3199 5.14713 15.3792 5.29127 15.3905L6.41327 15.4805C8.13527 15.6177 9.86477 15.6177 11.5875 15.4805L12.7095 15.3905C12.8535 15.3791 12.9895 15.3197 13.0957 15.2217C13.2019 15.1238 13.2722 14.9931 13.2953 14.8505C13.5499 13.2943 13.5499 11.7071 13.2953 10.151C13.2722 10.0084 13.2019 9.87766 13.0957 9.77975C12.9895 9.68184 12.8535 9.62241 12.7095 9.61099L11.5875 9.52174Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                  <div
                    className={`col-1 border-0 text-center ${styles.userName}`}
                  >
                    이*은
                  </div>
                  <div className={`col-2 border-0 text-center ${styles.date}`}>
                    2024.11.09
                  </div>
                  <div
                    className={`${styles.answerNo} col-2 border-0 text-labeln text-end pe-5 fw-400`}
                  >
                    답변완료
                  </div>
                </div>
              </dt>
              <dt
                className=" border-bottom"
                onClick={() => handleToggle(2)}
                ref={buttonRef} // ref를 사용하여 버튼에 접근
              >
                <div className="border-0 kr-body fw-300 d-flex py-4 justify-content-center align-items-center">
                  <div
                    className={`${styles.secret} col-7 border-0 ps-4 d-flex align-items-center gap-1`}
                  >
                    비밀글입니다.
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.875 12.5C7.875 12.2016 7.99353 11.9155 8.2045 11.7045C8.41548 11.4935 8.70163 11.375 9 11.375C9.29837 11.375 9.58452 11.4935 9.7955 11.7045C10.0065 11.9155 10.125 12.2016 10.125 12.5C10.125 12.7984 10.0065 13.0845 9.7955 13.2955C9.58452 13.5065 9.29837 13.625 9 13.625C8.70163 13.625 8.41548 13.5065 8.2045 13.2955C7.99353 13.0845 7.875 12.7984 7.875 12.5Z"
                        fill="#999999"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.71652 8.44774L5.47952 6.31849C5.44945 6.04557 5.44945 5.77017 5.47952 5.49724L5.49677 5.34349C5.59295 4.48165 6.00345 3.68551 6.64976 3.10732C7.29607 2.52913 8.13283 2.20947 9.00002 2.20947C9.86721 2.20947 10.704 2.52913 11.3503 3.10732C11.9966 3.68551 12.4071 4.48165 12.5033 5.34349L12.5205 5.49724C12.5505 5.77074 12.5505 6.04449 12.5205 6.31849L12.2835 8.44849L12.7988 8.48899C13.1934 8.52038 13.566 8.68313 13.8573 8.95124C14.1485 9.21934 14.3414 9.57733 14.4053 9.96799C14.6797 11.6448 14.6797 13.3552 14.4053 15.032C14.3414 15.4227 14.1485 15.7806 13.8573 16.0488C13.566 16.3169 13.1934 16.4796 12.7988 16.511L11.6768 16.601C9.89477 16.7435 8.10527 16.7435 6.32327 16.601L5.20127 16.511C4.80667 16.4796 4.43398 16.3169 4.14276 16.0488C3.85154 15.7806 3.6586 15.4227 3.59477 15.032C3.3203 13.3552 3.3203 11.6448 3.59477 9.96799C3.6586 9.57733 3.85154 9.21934 4.14276 8.95124C4.43398 8.68313 4.80667 8.52038 5.20127 8.48899L5.71652 8.44774ZM8.71952 3.34999C9.03382 3.31305 9.35233 3.33864 9.65671 3.42527C9.96109 3.51191 10.2453 3.65789 10.4931 3.85482C10.7408 4.05174 10.9472 4.29571 11.1002 4.5727C11.2533 4.84968 11.3501 5.15421 11.385 5.46874L11.4023 5.62249C11.4233 5.81299 11.4233 6.00399 11.4023 6.19549L11.1615 8.36299C9.722 8.27061 8.27804 8.27061 6.83852 8.36299L6.59852 6.19549C6.57761 6.00507 6.57761 5.81292 6.59852 5.62249L6.61502 5.46874C6.67484 4.92976 6.91543 4.42693 7.2976 4.04218C7.67976 3.65744 8.18095 3.41345 8.71952 3.34999ZM11.5875 9.52174C9.86525 9.3844 8.13478 9.3844 6.41252 9.52174L5.29127 9.61174C5.14724 9.62296 5.01115 9.68221 4.9048 9.77999C4.79846 9.87776 4.72801 10.0084 4.70477 10.151C4.45011 11.7071 4.45011 13.2943 4.70477 14.8505C4.72786 14.9932 4.79824 15.124 4.9046 15.222C5.01096 15.3199 5.14713 15.3792 5.29127 15.3905L6.41327 15.4805C8.13527 15.6177 9.86477 15.6177 11.5875 15.4805L12.7095 15.3905C12.8535 15.3791 12.9895 15.3197 13.0957 15.2217C13.2019 15.1238 13.2722 14.9931 13.2953 14.8505C13.5499 13.2943 13.5499 11.7071 13.2953 10.151C13.2722 10.0084 13.2019 9.87766 13.0957 9.77975C12.9895 9.68184 12.8535 9.62241 12.7095 9.61099L11.5875 9.52174Z"
                        fill="#999999"
                      />
                    </svg>
                  </div>
                  <div
                    className={`col-1 border-0 text-center ${styles.userName}`}
                  >
                    박*
                  </div>
                  <div className={`col-2 border-0 text-center ${styles.date}`}>
                    2024.11.08
                  </div>
                  <div
                    className={`${styles.answerNo} col-2 border-0 text-labeln text-end pe-5 fw-400`}
                  >
                    답변완료
                  </div>
                </div>
              </dt>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
