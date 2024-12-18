import React, { useState, useEffect } from 'react';
import styles from './ReviewItem.module.scss';
import Rating from './Rating';
import { Good } from './_common';
import { Badges } from './util/_icon';

const ReviewItem = (props) => {
  const [goodCount, setGoodCount] = useState(props.reviewData.count);
  const [isActive, setIsActive] = useState(false);
  const [showReportButton, setShowReportButton] = useState(false);

  const handleToggle = () => {
    setGoodCount((prevCount) => (isActive ? prevCount - 1 : prevCount + 1));
    setIsActive((prevState) => !prevState);
  };

  const handleToggleReport = () => {
    setShowReportButton((prevState) => !prevState);
  };

  const handleReportClick = () => {
    alert('신고가 접수되었습니다. \n해당 사항을 신속하게 확인하고 처리하겠습니다.');
  };

  const handleCloseReport = (e) => {
    if (!e.target.closest(`.${styles.separator}`)) {
      setShowReportButton(false);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => handleCloseReport(e);
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={`${styles.container} py-4`}>
      <div className={styles.userInfo}>
        <div className="d-flex gap-2">
          {props.reviewData.badges.map((badge, index) => (
            <Badges key={index} className={badge === '베스트' ? 'S' : 'N'}>
              {badge}
            </Badges>
          ))}
        </div>
        <div className={styles.username}>{props.reviewData.name}</div>
      </div>

      <div className={styles.reviewContent}>
        <div className={styles.imagesSection}>
          <div className={styles.images}>
            {[...Array(4)].map((_, index) => (
              <div key={index} className={styles.imagePlaceholder} />
            ))}
          </div>
          <div className={styles.separator} onClick={handleToggleReport}>
            <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.98999 9H1.99999V9.01H1.98999V9ZM1.98999 2H1.99999V2.01H1.98999V2ZM1.98999 16H1.99999V16.01H1.98999V16Z"
                stroke="#999999"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
            {showReportButton && (
              <div className={styles.reportButton} onClick={handleReportClick}>
                🚨 신고하기
              </div>
            )}
          </div>
        </div>

        <Rating ratingValue={props.reviewData.rating} />

        <div className={`${styles.reviewText} text-start`}>
          정말 만족스러웠어요. 잡내 없이 깔끔하고 신선한 맛이 인상적이었고, 구웠을 때 식감이 부드러우면서도 씹을수록 풍부한 육즙이 입안에 가득 퍼져요. <br/><br/>저는 야채와 함께 볶아서 짜파게티 위에 올려 먹었는데, 고기의 쫄깃한 식감과 짜파게티의 깊은 맛이 아주 잘 어울리더라고요. 고소하면서도 감칠맛이 더해져 평소 먹던 짜파게티보다 한층 특별한 한 끼가 되었어요. 특히 목초육이라 그런지 육질이 깔끔하고 건강한 느낌이 들어서 자주 애용하게 될 것 같아요. 담백하면서도 풍미가 있는 치마살이라 다양한 요리에 활용하기도 좋고, 간단히 구워 먹기에도 훌륭한 제품입니다.
        </div>
        <div className={styles.productName}>{props.reviewData.pdname}</div>
        <div className={styles.footer}>
          <div className={styles.date}>2024.10.11</div>
          <Good
            onClick={handleToggle}
            className={`goodbt ${isActive ? 'active' : ''}`}
          >
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.2916 2.7749C10.8974 2.77487 11.4803 3.00633 11.921 3.42192C12.3618 3.83751 12.6271 4.40582 12.6626 5.01057L12.6666 5.1499V8.31657H14.2499C14.8319 8.31647 15.3936 8.53007 15.8285 8.9168C16.2634 9.30353 16.5412 9.83649 16.6091 10.4145L16.621 10.5522L16.6249 10.6916L16.6091 10.8467L15.8127 14.8304C15.511 16.1177 14.6236 17.0439 13.5881 17.0312L13.4583 17.0249H7.12492C6.93101 17.0249 6.74386 16.9537 6.59896 16.8248C6.45405 16.696 6.36148 16.5184 6.33879 16.3259L6.33325 16.2332L6.33404 8.6839C6.33419 8.54507 6.37083 8.40872 6.44031 8.28853C6.50979 8.16834 6.60965 8.06853 6.72988 7.99911C7.06737 7.80403 7.35166 7.52888 7.55765 7.19794C7.76365 6.86699 7.88501 6.49043 7.91104 6.10149L7.91659 5.94157V5.1499C7.91659 4.52001 8.16681 3.91592 8.61221 3.47052C9.05761 3.02512 9.6617 2.7749 10.2916 2.7749ZM3.95825 8.31657C4.15216 8.31659 4.33931 8.38778 4.48421 8.51664C4.62912 8.64549 4.72169 8.82304 4.74438 9.01561L4.74992 9.10824V16.2332C4.74989 16.4271 4.6787 16.6143 4.54985 16.7592C4.421 16.9041 4.24345 16.9967 4.05088 17.0194L3.95825 17.0249H3.16659C2.76713 17.025 2.38239 16.8742 2.08948 16.6026C1.79658 16.3309 1.61717 15.9587 1.58721 15.5603L1.58325 15.4416V9.8999C1.58313 9.50045 1.73399 9.1157 2.0056 8.8228C2.27722 8.5299 2.6495 8.35049 3.04784 8.32053L3.16659 8.31657H3.95825Z" fill="#BBBBBB"/>
            </svg>
            추천해요 {goodCount}
          </Good>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
