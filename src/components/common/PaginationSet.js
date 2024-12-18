import React from "react";
import { ArrowPre, ArrowNext } from "./PaginationArrow";

import styles from "./PaginationSet.module.scss";

function PaginationSet({ totalPages, currentPage, onPageChange, variant = "default" }) {
  const handlePrevious = () => {
    const newPage = currentPage === 1 ? totalPages : currentPage - 1;
    onPageChange(newPage);
  };

  const handleNext = () => {
    const newPage = currentPage === totalPages ? 1 : currentPage + 1;
    onPageChange(newPage);
  };

  if (variant === "dots") {
    // Dot 스타일 출력
    return (
      <div className={styles.paginationDots}>
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              currentPage === index + 1 ? styles.dotActive : ""
            }`}
            onClick={() => onPageChange(index + 1)} // 클릭하면 페이지 변경
          ></div>
        ))}
      </div>
    );
  }

  // 기본 스타일 출력
  return (
    <div className="pagination d-flex align-items-center gap-3">
      <ArrowPre onClick={() => onPageChange(currentPage - 1 || totalPages)}>
        Prev
      </ArrowPre>
      <span>{currentPage} / {totalPages}</span>
      <ArrowNext onClick={() => onPageChange(currentPage + 1 > totalPages ? 1 : currentPage + 1)}>
        Next
      </ArrowNext>
    </div>
  );
}

export default PaginationSet;
