import React, { memo } from 'react'
import { Link } from 'react-router-dom'

// 랜더링을 피해갈 수없으나 콜백함수처럼 저장해두어서 최적화함
const Cartbtn = memo(({id, className,  cartItems }) => {
  return (
    <Link className={className} id={id} to="/cart" title="장바구니">
      <svg  width="26" height="27" viewBox="0 0 26 27" fill="none">
          <path d="M1 1.68799H5.36364L8.28727 16.9908C8.38703 17.517 8.66026 17.9897 9.05914 18.326C9.45802 18.6624 9.95712 18.8411 10.4691 18.8308H21.0727C21.5847 18.8411 22.0838 18.6624 22.4827 18.326C22.8816 17.9897 23.1548 17.517 23.2545 16.9908L25 7.40227H6.45455M10.8182 24.5451C10.8182 25.1763 10.3298 25.688 9.72727 25.688C9.12478 25.688 8.63636 25.1763 8.63636 24.5451C8.63636 23.9139 9.12478 23.4023 9.72727 23.4023C10.3298 23.4023 10.8182 23.9139 10.8182 24.5451ZM22.8182 24.5451C22.8182 25.1763 22.3298 25.688 21.7273 25.688C21.1248 25.688 20.6364 25.1763 20.6364 24.5451C20.6364 23.9139 21.1248 23.4023 21.7273 23.4023C22.3298 23.4023 22.8182 23.9139 22.8182 24.5451Z" stroke="#222222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className='bg-active text-white  kr-p fw-800 font_eng text-nowrap position-absolute end-0 top-0 rounded-circle d-flex align-items-center justify-content-center' style={{minWidth:"18px", height: "18px"}}>{ cartItems && cartItems.length > 0 ? cartItems.length :  0  }</div>
    </Link>
  )
})

export default Cartbtn;
