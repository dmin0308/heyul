import React, { useEffect, useState } from "react";
import sd from "./sidebar.module.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isLoggedIn, handleLogout }) {
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(isLoggedIn); // 추가: 로그인 상태 관리
  const navigate = useNavigate(); // 페이지 이동

  // 부모 컴포넌트의 로그인 상태 변경 시 동기화
  useEffect(() => {
    setLocalIsLoggedIn(isLoggedIn); // props 변경 시 동기화
  }, [isLoggedIn]);

  const handleLogoutClick = () => {
    handleLogout(); // props로 전달받은 handleLogout 호출
    setLocalIsLoggedIn(false); // 로컬 상태도 업데이트
  };
  const handleMyPageClick = () => {
    if (!isLoggedIn) {
      navigate("/login"); // 로그인 상태가 아니면 로그인 페이지로 이동
    } else {
      navigate("/mypage"); // 로그인 상태면 마이페이지로 이동
    }
  };

  return (
    <>
      <div
        className={`${sd.Sidebar} overflow-hidden d-flex flex-column align-items-center justify-content-end zup d-none d-xxl-flex `}
        id="quick"
      >
        <div
          className={`${sd.svgbox} d-flex flex-column justify-content-between align-items-center flex-grow-1 flex-shrink-0 flex-basis-0 gap-2`}
        >
          <div
            className={`${`${sd.svgs} d-flex flex-column justify-content-center align-items-center`} d-flex flex-column justify-content-center align-items-center`}
          >
            {isLoggedIn ? (
              <button
                className="border-0 bg-transparent text-decoration-none d-flex flex-column align-items-center"
                onClick={handleLogoutClick} // 로그아웃 처리
              >
                <svg
                  width="26"
                  height="29"
                  viewBox="0 0 26 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 28V26.5C1 21.535 5.035 17.5 10 17.5H16C20.965 17.5 25 21.535 25 26.5V28"
                    stroke="black"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 13C9.685 13 7 10.315 7 7C7 3.685 9.685 1 13 1C16.315 1 19 3.685 19 7C19 10.315  16.315 13 13 13Z"
                    stroke="black"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="d-block mt-2">로그아웃</span>
              </button>
            ) : (
              <Link
                to={"/login"}
                className="d-flex flex-column align-items-center"
              >
                <svg
                  width="26"
                  height="29"
                  viewBox="0 0 26 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 28V26.5C1 21.535 5.035 17.5 10 17.5H16C20.965 17.5 25 21.535 25 26.5V28"
                    stroke="black"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 13C9.685 13 7 10.315 7 7C7 3.685 9.685 1 13 1C16.315 1 19 3.685 19 7C19 10.315  16.315 13 13 13Z"
                    stroke="black"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="d-block mt-2">로그인</span>
              </Link>
            )}
          </div>

          <div
            className={`${sd.svgs} d-flex flex-column justify-content-center align-items-center`}
          >
            <button
              className="border-0 bg-transparent text-decoration-none d-flex flex-column align-items-center"
              onClick={handleMyPageClick} // handleMyPageClick 함수 재사용
            >
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 1V7M3 7H9M3 7C6 2.5 10 1 14 1C20.5 1 27 6 27 14.5C27 23 20 27.5 14 27.5C8 27.5 1 22.5 1 14.5M14 6.5V15L19 20"
                  stroke="#222222"
                  stroke-width="1.7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="d-block mt-2">최근 본 상품</span>
            </button>
          </div>

          <div
            className={`${sd.svgs} d-flex flex-column justify-content-center align-items-center`}
          >
            <Link
              to={"/login"}
              className="d-flex flex-column align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              >
                <path
                  d="M9.3877 24.2225C8.95304 24.0465 8.7117 23.9612 8.57837 23.9785C8.41304 23.9985 8.17304 24.1745 7.69304 24.5252C6.8477 25.1465 5.7837 25.5918 4.2037 25.5532C3.40504 25.5345 3.00637 25.5252 2.8277 25.2212C2.64904 24.9185 2.8717 24.4985 3.31704 23.6585C3.93437 22.4932 4.32504 21.1598 3.73304 20.0918C2.7117 18.5665 1.8437 16.7585 1.71704 14.8078C1.65027 13.7476 1.65027 12.6841 1.71704 11.6238C2.06504 6.26518 6.29437 1.99718 11.6037 1.64518C13.4117 1.52518 15.3024 1.52518 17.113 1.64518C22.3997 1.99584 26.6157 6.22918 26.9957 11.5558"
                  stroke="black"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.597 27.752C15.2504 27.5387 12.5837 24.9293 12.365 21.6547C12.3219 21.0065 12.3219 20.3562 12.365 19.708C12.585 16.4333 15.2504 13.8253 18.597 13.6107C19.7384 13.5373 20.9304 13.5373 22.069 13.6107C25.4157 13.8253 28.0824 16.4333 28.301 19.7093C28.3437 20.3493 28.3437 21.0133 28.301 21.6547C28.221 22.8467 27.6744 23.952 27.0304 24.884C26.657 25.5373 26.9037 26.3507 27.293 27.0627C27.573 27.576 27.7144 27.8333 27.601 28.0187C27.4877 28.204 27.237 28.2093 26.7344 28.2213C25.7384 28.2453 25.0677 27.972 24.5344 27.5933C24.2317 27.3787 24.081 27.2707 23.977 27.2587C23.873 27.2467 23.6677 27.328 23.257 27.4907C22.8771 27.  6377 22.4769 27.7258 22.0704 27.752C20.9137 27.8239 19.7537 27.8239 18.597 27.752Z"
                  stroke="black"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="d-block mt-2">상담 문의</span>
            </Link>
          </div>

          <div
            className={`${sd.svgs} d-flex flex-column justify-content-center align-items-center`}
          >
            <Link
              to={"/login"}
              className="d-flex flex-column align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <path
                  d="M24.0562 23.649L33 32M14.5095 27.5418C16.2836 27.5418 18.0403 27.1985 19.6794 26.5316C21.3184 25.8647 22.8077 24.8872 24.0622 23.6548C25.3167 22.4225 26.3118 20.9596 26.9907 19.3495C27.6696 17.7394 28.019 16.0137 28.019 14.2709C28.019 12.5281 27.6696 10.8024 26.9907 9.19235C26.3118 7.58225 25.3167 6.11928 24.0622 4.88696C22.8077 3.65464 21.3184 2.67711 19.6794 2.01019C18.0403 1.34326 16.2836 1 14.5095 1C10.9266 1 7.49037 2.39818 4.95685 4.88696C2.42332 7.37573 1 10.7512 1 14.2709C1 17.7906 2.42332 21.1661 4.95685 23.6548C7.49037 26.1436 10.9266 27.5418 14.5095 27.5418Z"
                  stroke="black"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.67938 14.8594C5.77354 14.7019 5.77354 13.4022 6.67938 13.2446C8.2822 12.9647 9.76544 12.2141 10.9402 11.0884C12.115 9.96267 12.9282 8.5128 13.2763 6.92339L13.3305 6.67478C13.5274 5.77878 14.8 5.77385 15.0043 6.66739L15.0708 6.95785C15.4336 8.54086 16.2558 9.98149 17.4342 11.099C18.6126 12.2166 20.0948 12.9613 21.6948 13.2397C22.6055 13.3997 22.6055 14.7043 21.6948 14.8643C20.0952 15.1432 18.6136 15.8881 17.4356 17.0056C16.2577 18.1231 15.4359 19.5635 15.0732 21.1462L15.0068 21.4366C14.8025 22.3302 13.5298 22.3228 13.3329 21.4292L13.2788 21.1831C12.9314 19.5924 12.1182 18.1413 10.9429 17.0146C9.76754 15.8879 8.28329 15.1392 6.67938 14.8594Z"
                  stroke="black"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="d-block mt-2">AI추천</span>
            </Link>
          </div>
        </div>{" "}
        <div
          className={`${sd.topbtn} overflow-hidden d-flex flex-column align-items-center justify-content-end`}
        >
          <a href="#">TOP</a>
        </div>
      </div>
      {/* 반응형 탑버튼 */}
      <div
        className={`${sd.smtopbtn} mb-3 me-2 d-xxl-none`} // 추가: d-md-none로 작은 화면에서만 보이도록 설정
      >
        <div className="d-flex flex-column align-items-center gap-2">
          <Link to="/subscription">
          <button
            className="btn bg-transparent border-0 p-0" // 수정: 배경색과 여백 조정
          >
            {/* 커스텀 SVG 아이콘 추가 */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="19.5"
                fill="#FFF9F2"
                stroke="#24C57A"
              />
              <path
                d="M29.7949 19C29.2426 19 28.7949 19.4477 28.7949 20V22C28.7949 22.5523 29.2426 23 29.7949 23H31.6769C32.4203 23 32.9038 22.2177 32.5713 21.5528L31.5713 19.5528C31.4019 19.214 31.0557 19 30.6769 19H29.7949Z"
                fill="#24C57A"
              />
              <path
                d="M19.531 27.1822H25.4987M25.4987 27.1822V14.719C25.4987 14.5283 25.4225 14.3454 25.2869 14.2106C25.1512 14.0758 24.9672 14 24.7754 14H20.2947M25.4987 27.1822L26.7044 27.1823M14.2263 27.1822H12.5C12.405 27.1822 12.3109 27.1636 12.2232 27.1275C12.1354 27.0913 12.0557 27.0384 11.9885 26.9716C11.9213 26.9048 11.8681 26.8256 11.8317 26.7383C11.7953 26.6511 11.7766 26.5576 11.7766 26.4632V21.7895M25.4988 17.5952H31.6186C31.7584 17.5952 31.8952 17.6356 32.0125 17.7113C32.1298 17.787 32.2224 17.8949 32.2793 18.0218L34.4373 22.8489C34.4784 22.9406 34.4998 23.0398 34.5 23.1401V26.4632C34.5 26.5576 34.4813 26.6511 34.4449 26.7384C34.4086 26.8256 34.3553 26.9049 34.2881 26.9717C34.221 27.0384 34.1412 27.0914 34.0535 27.1275C33.9657 27.1637 33.8716 27.1823 33.7766 27.1823H32.1296M9.79465 21.7895H5M9.79465 24H7.29492M17.0584 29.5789C17.6979 29.5789 18.3112 29.3264 18.7634 28.8769C19.2156 28.4274 19.4696 27.8178 19.4696 27.1822C19.4696 26.5465 19.2156 25.9369 18.7634 25.4874C18.3112 25.0379 17.6979 24.7854 17.0584 24.7854C16.4189 24.7854 15.8056 25.0379 15.3534 25.4874C14.9012 25.9369 14.6472 26.5465 14.6472 27.1822C14.6472 27.8178 14.9012 28.4274 15.3534 28.8769C15.8056 29.3264 16.4189 29.5789 17.0584 29.5789ZM29.1144 29.5789C29.7539 29.5789 30.3672 29.3264 30.8194 28.8769C31.2716 28.4274 31.5257 27.8178 31.5257 27.1822C31.5257 26.5465 31.2716 25.9369 30.8194 25.4874C30.3672 25.0379 29.7539 24.7854 29.1144 24.7854C28.475 24.7854 27.8617 25.0379 27.4095 25.4874C26.9573 25.9369 26.7032 26.5465 26.7032 27.1822C26.7032 27.8178 26.9573 28.4274 27.4095 28.8769C27.8617 29.3264 28.475 29.5789 29.1144 29.5789Z"
                stroke="#24C57A"
                stroke-miterlimit="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.7949 20C14.2536 20 15.6526 19.4205 16.684 18.3891C17.7155 17.3576 18.2949 15.9587 18.2949 14.5M12.7949 20C11.3362 20 9.93728 19.4205 8.90583 18.3891C7.87438 17.3576 7.29492 15.9587 7.29492 14.5M12.7949 20V19.5M18.2949 14.5C18.2949 13.0413 17.7155 11.6424 16.684 10.6109C15.6526 9.57946 14.2536 9 12.7949 9M18.2949 14.5H17.7949M12.7949 9C11.3362 9 9.93728 9.57946 8.90583 10.6109C7.87438 11.6424 7.29492 13.0413 7.29492 14.5M12.7949 9V9.5M7.29492 14.5H7.79492M13.1485 14.8536C13.0547 14.9473 12.9275 15 12.7949 15C12.6623 15 12.5351 14.9473 12.4414 14.8536C12.3476 14.7598 12.2949 14.6326 12.2949 14.5C12.2949 14.3674 12.3476 14.2402 12.4414 14.1464C12.5351 14.0527 12.6623 14 12.7949 14M13.1485 14.8536C13.2422 14.7598 13.2949 14.6326 13.2949 14.5C13.2949 14.3674 13.2422 14.2402 13.1485 14.1464C13.0547 14.0527 12.9275 14 12.7949 14M13.1485 14.8536L14.7949 16.5M12.7949 14V11"
                stroke="#24C57A"
                stroke-miterlimit="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          </Link>
          <button
            className="btn bg-transparent border-0 p-0" // 수정: 배경색과 여백 조정
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // TOP 버튼 클릭 시 동작
          >
            {/* 커스텀 SVG 아이콘 추가 */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="20" fill="#24C57A" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.8545 16.8331C10.4265 17.1822 10.3626 17.8122 10.7117 18.2401C11.0609 18.668 11.6908 18.732 12.1187 18.3828L18.9424 12.8161V29.1787C18.9424 29.731 19.3901 30.1787 19.9424 30.1787C20.4947 30.1787 20.9424 29.731 20.9424 29.1787V12.9317L27.0673 18.3566C27.4807 18.7227 28.1127 18.6844 28.4789 18.271C28.8451 17.8576 28.8068 17.2256 28.3933 16.8594L20.6053 9.96137C20.2383 9.63637 19.6899 9.62525 19.3101 9.9351L10.8545 16.8331Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
