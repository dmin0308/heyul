import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wishheart, BookmarkBt } from "../common/util/_icon";

import "./RecipeBanner.module.scss";

const RecipeBanner = () => {
  const navigate = useNavigate();
  const buttonsRef = useRef([]);
  const [heartnumer, setHNum] = useState(1512);

  useEffect(() => {

    const toggleClass = (event) => {
      const button = event.currentTarget;
      button.classList.toggle("active"); // 클래스 토글
      console.log("Toggled classList:", button.classList);

      if (button.classList.contains("wishicon")) {
        setHNum((prev) => (button.classList.contains("active") ? prev + 1 : prev - 1));
      }
    };

    buttonsRef.current.forEach((button) => {
      if (button) {
        button.addEventListener("click", toggleClass);
      }
    });

    return () => {
      buttonsRef.current.forEach((button) => {
        if (button) {
          button.removeEventListener("click", toggleClass);
        }
      });
    };
  }, []);

  const handleBannerClick = () => {
    navigate("/recipe/detail"); // 단순히 RecipeDetail로 이동
  };

  return (
    <div className="position-relative overflow-hidden rounded-3 mw"
    style={{ height: "400px", cursor: "pointer" }}
    onClick={handleBannerClick}
    >
      {/* Background Image */}
      <div
        className="position-relative w-100 h-100 overflow-hidden top-0 start-0"
        style={{
          backgroundImage: "url('/img/recipe/0.jpg')", // 이미지 경로
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="position-absolute bottom-0 d-flex flex-column justify-content-end p-4 w-100 h-100">
        {/* Recipe Title */}
        <h2 className="kr-h2 mb-3 text-white">밥 한그릇 뚝딱 소불고기 황금 양념 레시피</h2>
        {/* Metadata */}
        <div className="d-flex start-0 w-100 justify-content-between align-items-center text-white">
          <span className="text-white">오늘은뭐먹지</span>
          <div className="d-flex align-items-center gap-3">
            <span className="text-white">스크랩</span>
            <span className="text-white">1563</span>
            <span className="text-white">·</span>
            <span className="text-white">조회수</span>
            <span className="text-white">8154</span>
          </div>
        </div>

      </div>

      {/* Buttons */}
      <div className="d-flex position-absolute justify-content-between align-items-center top-0 w-100 p-3 text-white">
        {[Wishheart, BookmarkBt].map((Icon, index) => (
          <div key={`icon${index}`} className="d-flex align-items-center gap-2">
            <Icon
              ref={(el) => (buttonsRef.current[index] = el)} 
              className={`ms-auto w_icon ${index === 0 ? "wishicon" : ""}`} 
            />
            {index === 0 && <span className="fw-bold">{heartnumer}</span>}
          </div>
        ))}
      </div>

    </div>
  );
};

export default RecipeBanner;
