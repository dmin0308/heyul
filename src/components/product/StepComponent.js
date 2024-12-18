import React from "react";

import styles from "./StepComponent.module.scss";

// StepComponent.js
function StepComponent({ recipeNumber, recipeStep, recipeUrl }) {
  return (
    <div className="">
      <div
        className="rounded-3 stepImg d-md-none"
        style={{
          backgroundImage: `url(${recipeUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "280px",
          height: "280px",
        }}
      ></div>
    <div className="d-flex gap-5 align-items-start justify-content-between mb-5">
      {/* Left Section */}
      <div className="d-flex flex-row gap-4 align-items-start">
        {/* Number */}
        <div
          className={`text-success fw-semibold ${styles.numbertext}`}
        >
          {recipeNumber}
        </div>
        {/* Text */}
        <div className="d-flex align-items-start justify-content-start flex-grow-1">
          <p className="kr-h4 fw-normal lh-base">
            {recipeStep}
          </p>
        </div>
      </div>
      {/* Right Section */}
      <div
        className="rounded-3 d-none d-md-flex"
        style={{
          backgroundImage: `url(${recipeUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "280px",
          height: "280px",
        }}
      ></div>
    </div>
    </div>
  );
}

export default function RecipeSteps() {
  const recipeData = [
    {
      recipeNumber: 1,
      recipeStep: "소고기 등심에 설탕 4스푼, 물엿 2스푼을 넣어줍니다.",
      recipeUrl: "/img/recipedetail/1.jpg",
    },
    {
      recipeNumber: 2,
      recipeStep: "거기에 매실액, 다진마늘 3스푼, 간장 1스푼, 후추 약간 넣고 주물러 양념이 배게 해줍니다.",
      recipeUrl: "/img/recipedetail/2.jpg",
    },
    {
      recipeNumber: 3,
      recipeStep: "여기에 참기름 1스푼을 넣고 주물러 30분 기다려줘요.",
      recipeUrl: "/img/recipedetail/3.jpg",
    },
    {
      recipeNumber: 4,
      recipeStep: "기다리는 동안 야채와 버섯 손질도 해줍니다.",
      recipeUrl: "/img/recipedetail/4.jpg",
    },
    {
      recipeNumber: 5,
      recipeStep: "재워 둔 고기에 야채를 모두 넣고 참기름 2스푼 더 첨가한 뒤 섞어주고 센 불에 볶아줍니다.",
      recipeUrl: "/img/recipedetail/5.jpg",
    },
    {
      recipeNumber: 6,
      recipeStep: "혹시라도 고기 냄새에 좀 민감하시면 청주나 맛술 한스푼 추가를 추천합니다!",
      recipeUrl: "/img/recipedetail/6.jpg",
    },
  ];

  return (
    <div>
      {recipeData.map((step, index) => (
        <StepComponent
          key={index}
          recipeNumber={step.recipeNumber}
          recipeStep={step.recipeStep}
          recipeUrl={step.recipeUrl}
        />
      ))}
    </div>
  );
}
