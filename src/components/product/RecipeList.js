import React, { useEffect, useRef, useState } from "react";
import {
  Wishheart,
  BookmarkBt
} from "../common/util/_icon";

import recipecard from "./RecipeList.module.scss";

export default function RecipeList({ data }) {
  const buttonsRef = useRef([]);
  const [heartnumer, setHNum] = useState(1512);

  useEffect(() => {
    const toggleClass = (event) => {
      const button = event.currentTarget;
      button.classList.toggle("active");
      // console.log("Toggled classList:", button.classList);

      if (button.classList.contains("wishicon")) {
        setHNum((prev) =>
          button.classList.contains("active") ? prev + 1 : prev - 1
        );
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

  return (
    <div className="pb-5">

        <div className=" bg-dark rounded-3">
          <div className={recipecard.commuImg}>

          <img src={data.img_url}
              alt={data.recipename}
              className="img-fluid" />
            <div className={`position-absolute top-0 w-100 h-100 justify-content-center align-items-center ${recipecard.thumbwrap}`}>
            <div className="d-flex h-100 justify-content-center align-items-center gap-5">
              {[Wishheart, BookmarkBt].map((Icon, index) => (
                <div
                  key={`icon${index}`}
                  className={recipecard["icon-bg"]} >
                  <Icon
                    ref={(el) => (buttonsRef.current[index] = el)}
                    className={`h-100 w-100 ms-auto w_icon ${
                      index === 0 ? "wishicon" : ""
                    }`}
                  />
                </div>
              ))}
            </div>
            </div>
            

          </div>
        </div>

        <div className="h-100">

          <h2 className="kr-h4 py-3">{data.recipename}</h2>

          <div className="d-flex justify-content-between align-items-center w-100">
            <span className="kr-body">{data.writer}</span>

            <div className="d-flex align-items-center gap-3">
              <span className="kr-body text-muted opacity-50">스크랩</span>
              <span className="kr-body text-muted opacity-50">
                {data.scrap}
              </span>
              <span className="kr-body text-muted opacity-50">·</span>
              <span className="kr-body text-muted opacity-50">조회수</span>
              <span className="kr-body text-muted opacity-50">
                {data.view}
              </span>
            </div>

            
          </div>
        </div>
    </div>
  );
}
