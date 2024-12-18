import React, { memo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Bellbtn.module.scss";

// 기본 알림 데이터
const defaultBellItems = [
  "[레시피] 새로운 댓글이 달렸습니다.💬",
  "장바구니에 담긴 상품 '돈코츠라멘'의 가격이 내렸습니다",
  "오늘의 특별 혜택을 확인하세요!"
];

const Bellbtn = memo(({ id, className }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 닫힌 상태
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.bellButtonWrapper} ref={dropdownRef} title="알림"> 
      {/* 알림 링크 */}
      <Link
        to="#"
        className={`${className} ${styles.bellButton} d-flex align-items-center`}
        id={id}
        onClick={(e) => {
          e.preventDefault(); // 기본 링크 동작 방지
          setIsDropdownOpen((prev) => !prev);
        }}
      >
        <svg
          width="25"
          height="29"
          viewBox="0 0 25 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8954 21.9139C17.8954 24.991 15.4799 27.4853 12.5 27.4853C9.52022 27.4853 7.10461 24.991 7.10461 21.9139M3.50768 10.771C3.50768 5.64265 7.53369 1.48529 12.5 1.48529C17.4663 1.48529 21.4923 5.64265 21.4923 10.771V17.8281C21.4923 18.8516 22.6113 19.8706 23.7329 20.6352C24.2206 20.9675 23.9971 21.9139 23.4127 21.9139H1.58722C1.0029 21.9139 0.779443 20.9675 1.2671 20.6352C2.38864 19.8706 3.50768 18.8516 3.50768 17.8281V10.771Z"
            stroke="#222222"
            strokeWidth="1.8"
          />
        </svg>
        {/* 알림 불 항상 표시 */}
        <div className={styles.notificationDot}></div>
      </Link>

      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          {defaultBellItems.map((item, index) => (
            <div key={index} className={styles.dropdownItem}>
              <p>{item}
                {index==2&&<span className="emoji">🔥</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Bellbtn;
