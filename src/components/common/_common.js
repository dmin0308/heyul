import styled from "styled-components";
import { Link } from "react-router-dom";

// 더보기 버튼
const svgPlus = encodeURIComponent(`
<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector" d="M10 4.83329H6V0.833293C6 0.656482 5.92976 0.486913 5.80474 0.361888C5.67971 0.236864 5.51014 0.166626 5.33333 0.166626C5.15652 0.166626 4.98695 0.236864 4.86193 0.361888C4.7369 0.486913 4.66667 0.656482 4.66667 0.833293V4.83329H0.666667C0.489856 4.83329 0.320287 4.90353 0.195262 5.02855C0.070238 5.15358 0 5.32315 0 5.49996C0 5.67677 0.070238 5.84634 0.195262 5.97136C0.320287 6.09639 0.489856 6.16663 0.666667 6.16663H4.66667V10.1666C4.66667 10.3434 4.7369 10.513 4.86193 10.638C4.98695 10.7631 5.15652 10.8333 5.33333 10.8333C5.51014 10.8333 5.67971 10.7631 5.80474 10.638C5.92976 10.513 6 10.3434 6 10.1666V6.16663H10C10.1768 6.16663 10.3464 6.09639 10.4714 5.97136C10.5964 5.84634 10.6667 5.67677 10.6667 5.49996C10.6667 5.32315 10.5964 5.15358 10.4714 5.02855C10.3464 4.90353 10.1768 4.83329 10 4.83329Z" fill="#222222"/>
</svg>
`);

const svgMore = encodeURIComponent(`
<svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="Vector 36" d="M1.38169 0.677029C1.20332 0.466226 0.887832 0.439935 0.677029 0.618307C0.466226 0.796679 0.439935 1.11217 0.618307 1.32297L1.38169 0.677029ZM6.5 7.5L6.88169 7.82297L7.15498 7.5L6.88169 7.17703L6.5 7.5ZM0.618307 1.32297L6.11831 7.82297L6.88169 7.17703L1.38169 0.677029L0.618307 1.32297ZM6.11831 7.17703L0.618307 13.677L1.38169 14.323L6.88169 7.82297L6.11831 7.17703Z" fill="#222222"/>
</svg>
`);

const svgArrow =encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
    <path d="M1 0.5L6.5 7L1 13.5" stroke="#B3B3B3"/>
  </svg>
  `);
const svgArrowActive =encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path d="M1 0.5L6.5 7L1 13.5" stroke="#24C57A"/>
    </svg>`
);

const svgDelete =encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
<path d="M1.14463 0.699463L0 1.84409L5.15083 6.99492L0 12.1457L1.14463 13.2904L6.29546 8.13955L11.4463 13.2904L12.5909 12.1457L7.44009 6.99492L12.5909 1.84409L11.4463 0.699463L6.29546 5.85029L1.14463 0.699463Z" fill="#CCCCCC"/>
</svg>
    `);

const svgDeleteActive =encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14" fill="none">
  <path d="M1.14463 0.699463L0 1.84409L5.15083 6.99492L0 12.1457L1.14463 13.2904L6.29546 8.13955L11.4463 13.2904L12.5909 12.1457L7.44009 6.99492L12.5909 1.84409L11.4463 0.699463L6.29546 5.85029L1.14463 0.699463Z" fill="#24C57A"/>
  </svg>
      `);
  

export const Plusbtn = styled(Link)`
  display: flex;
  height: 41px;
  padding: var(--Space-200, 8px) var(--height-32px, 32px);
  line-height: 0.85;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 41px;
  border: 1px solid var(--color--stoke, #ccc);
  background: #fff;

  &:hover {
    border-color: var(--primary, #24c57a);
    background: #f5faf9;
    &::after {
      transform: ${(props) =>
        props.icon === "plus" ? "rotate(-90deg)" : "translateX(5px)"};
    }
  }

  &::after {
    content: ${(props) =>
      `url("data:image/svg+xml,${props.icon === "plus" ? svgPlus : svgMore}")`};
    transition: 0.4s;
  }
`;

//문의하기 버튼
export const Qbtn = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #20b16e;
  }
`;

//밀키트 버튼
export const Tabbtn = styled.button`
  border: 1px solid var(--color--stoke);
  background-color: var(--color--bg-white);
  color: #222222;
  border-radius: 29px;
  padding: 8px 18px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  gap: 6px;

  &:hover {
    border: 1px solid var(--primary);
    background: #fff;
    color: var(--color--text-primary);
  }

  &:active {
    border: 1px solid #24c57a;
    background: var(--primary);
    color: #fff;
  }
`;

//총~얼마 장바구니에 담기 버튼
export const Cartbtn = styled.button`
  border: var(--primary);
  background: #fff;
  color: #222222;
  border: none;
  border: 1px solid var(--primary);
  border-radius: 55px;
  padding: 6px 81px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--primary);
  }
`;

//추천해요 버튼
export const Good = styled.button`
  display: inline-flex;
  height: var(--height-32px, 32px);
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color--stoke, #ccc);
  gap: 4px;
  font-size:14px;
  border-radius: 41px;
  background: var(--color--bg-white);
  color: var(--color--default-btn);

  &:hover {
    background-color: var(--color--bg-white);
    color: var(--primary);
    svg {
      path {
        fill: var(--primary);
      }
    }
  }

  &.active {
    background-color: var(--color--bg-sub02);
    border: 1px solid var(--primary);
    color: var(--primary);
    svg {
      path {
        fill: var(--primary);
      }
    }
  }
`;


// 등록, 팔로우 버튼
export const Submitbtn = styled.button`
  border: 1px solid var(--primary);
  background-color: var(--primary);
  color: #FFFFFF;
  border-radius: 29px;
  padding: 8px 18px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  gap: 6px;

  &:hover {
    border: 1px solid var(--primary);
    background: #fff;
    color: var(--color--text-primary);
  }

  &:active {
    border: 1px solid #24c57a;
    background: var(--primary);
    color: #fff;
  }
`;

// 사진추가
export const Addpicbtn = styled(Link)`
display: flex;
height: 41px;
padding: var(--Space-100, 4px) var(--height-24px, 24px);
line-height: 0.85;
justify-content: center;
align-items: center;
gap: 8px;
border-radius: 41px;
border: 1px solid var(--color--stoke, #ccc);
background: #fff;

&:hover {
  border-color: var(--primary, #24c57a);
  background: #f5faf9;
  &::before {
    transform: ${(props) =>
      props.icon === "plus" ? "rotate(-90deg)" : "translateX(5px)"};
  }
}

&::before {
  content: ${(props) =>
    `url("data:image/svg+xml,${props.icon === "plus" ? svgPlus : svgMore}")`};
  transition: 0.4s;
}
`;


//세일 뱃지
export const SaleBadge = styled.span`
  background: var(--color--labels);
  color: white;
  gap: 10px;
  border: none;
  border-radius: 4px;
  height: 24px;
  padding: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: var(--fontfamily-eng);
  @media (max-width:991px){
     font-size:12px;
  }
`;

//%할인쿠폰 뱃지
export const Coupon = styled.span`
  background: var(--color--labeld);
  color: white;
  gap: 10px;
  border: none;
  border-radius: 4px;
  height: 24px;
  padding: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: var(--fontfamily-kr);
   @media (max-width:991px){
     font-size:12px;
  }
`;

//New뱃지
export const New = styled.span`
  background: var(--primary);
  color: white;
  gap: 10px;
  border: none;
  border-radius: 4px;
  height: 24px;
  padding: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  font-family: var(--fontfamily-eng);
   @media (max-width:991px){
     font-size:12px;
  }
`;

//Heart뱃지
export const Heart = styled.span`
  display: inline-block;
  cursor: pointer;

  &:hover {
    svg {
      path {
        fill: var(--color--icon-line);
        stroke: var(--color--icon-line);
      }
      &.act{

      }
`;
// 스타일컴포넌트는 클래스를 그대로 받습니다.
// <Arrow icon="arrow" className='mx-3'> 회색과 활성화

export const Arrow = styled.i`
display:block;
height:20px;
 &::after {
    display:block;    
    content: ${(props) =>
      `url("data:image/svg+xml,${props.icon === "gray" ? svgArrow : svgArrowActive}")`};   
  }

`

export const Deleteicon = styled.i`
display:block;
 &::after {
    content: ${(props) =>
      `url("data:image/svg+xml,${props.icon === "gray" ? svgDelete : svgDeleteActive}")`};
   
  }

`
