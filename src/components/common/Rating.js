// Rating.js
import React from 'react';
import styles from './Rating.module.scss';
import { RateBt } from './util/_icon';

const Rating = ({ ratingValue }) => {
  return (
    <div className={styles.rating}>
      {[...Array(5)].map((_, index) => (
        <RateBt
          key={index}
          className={index < ratingValue ? styles.ratingActive : styles.ratingInactive}
        />
      ))}
    </div>
  );
};

export default Rating;
