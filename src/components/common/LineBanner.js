// LineBanner.jsx
import lb from "./lineBanner.module.scss";

import hsvg from '../../assets/svg/h.svg';  // 이미지 경로 import
import esvg from '../../assets/svg/e.svg';  // 이미지 경로 import
import ysvg from '../../assets/svg/y.svg';  // 이미지 경로 import
import usvg from '../../assets/svg/u.svg';  // 이미지 경로 import
import lsvg from '../../assets/svg/l.svg';  // 이미지 경로 import
import download from '../../assets/svg/download.svg';  // 이미지 경로 import

export default function Linebanner() {
  return (
    <div>

      <div className={lb.greenBanner}>
      <div className={`d-flex ${lb.movingTextBox} mw`}>

            <div style={{ backgroundImage: `url(${hsvg})` }} className={`${lb.h}`}></div>
            <div style={{ backgroundImage: `url(${esvg})` }} className={`${lb.e}`}></div>
            <div style={{ backgroundImage: `url(${ysvg})` }} className={`${lb.y}`}></div>
            <div style={{ backgroundImage: `url(${usvg})` }} className={`${lb.u}`}></div>
            <div style={{ backgroundImage: `url(${lsvg})` }} className={`${lb.l}`}></div>
          

            <div className={`${lb.TextBox} d-flex gap-3`}>
              <div className={`${lb.text}`}>
                해율의 서비스를 모바일에서 편하게 즐겨보세요!
              </div>
              <a href="/path/to/download"download                  
                  style={{ backgroundImage: `url(${download})` }} 
                  className={`${lb.downbtn}`}>
              </a>
            </div>

        </div>
      </div>
    </div>
  );
}
