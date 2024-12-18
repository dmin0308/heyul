import styles from "./RacipeANDsubscribe.module.scss";
import { Link } from "react-router-dom";

export default function RacipeANDsubscribe() {
  return (
    <div className="mw px-3 px-xxl-0">
      <div className="d-flex flex-column flex-lg-row">
        <div className="col-12 col-lg-6 px-0 pe-lg-2">
          {/* Section 1 */}
          <div className={`${styles.artbox1} h-100 d-flex justify-content-between`}>
            <div className="d-flex flex-column justify-content-between col-6">
              <Link to="/Recipe">
                <h3 className={`${styles.heading} kr-h2`}>
                  레시피 공유하고<br />요리 재료 받기!
                </h3>
              </Link>
              <div className={`${styles.arrowbox} mb-lg-5 mb-3 d-flex align-items-center`}>
                <svg
                  className={styles.arrowbar}
                  width="46"
                  viewBox="0 0 46 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 2L43.25 2"
                    stroke="#222222"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className={styles.arrowhead}
                  width="20"
                  viewBox="0 0 20 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 2L17.75 21L2.25 38.5"
                    stroke="#222222"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3 mt-md-0">
              <img
                className={`${styles.art1} img-fluid mt-auto`}
                src="/img/RacipeANDsubscribe/imgLeft.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 px-0 ps-lg-2 mt-4 mt-lg-0">
          {/* Section 2 */}
          <div className={`${styles.artbox2} h-100 d-flex justify-content-between`}>
            <div className="d-flex flex-column justify-content-between col-6">
              <Link to="/Subscription">
                <h3 className={`${styles.heading} kr-h2`}>
                  정기배송<br />구독하러 가기!
                </h3>
              </Link>
              <div className={`${styles.arrowbox} d-flex align-items-center mb-lg-5 mb-3`}>
                <svg
                  className={styles.arrowbar}
                  width="46"
                  viewBox="0 0 46 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 2L43.25 2"
                    stroke="#222222"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className={styles.arrowhead}
                  width="20"
                  viewBox="0 0 20 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 2L17.75 21L2.25 38.5"
                    stroke="#222222"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="d-flex justify-end mt-3 mt-md-0">
              <img
                className={`${styles.art2} img-fluid ms-auto mt-auto pb-1 pb-lg-3`}
                src="/img/RacipeANDsubscribe/imgRight.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
