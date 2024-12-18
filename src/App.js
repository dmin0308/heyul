import React, { useEffect, useRef, useState } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'

//json
import navidb from './data/navi.json';
import productinfoData from './data/product.json';

//layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Sidebar from './components/layout/Sidebar'
import Mfooter from './components/layout/Mfooter';

//index페이지
import Home from './pages/Home'
//장바구니
import Cart from './pages/Cart'
//상품목록
import ProductList from './pages/ProductList'
//상품상세
import ProductDetail from './pages/ProductDetail'
//기획전
import EventList from './pages/EventList'
//레시피
import Recipe from './pages/Recipe'
//레시피 상세
import RecipeDetail from './pages/RecipeDetail';
//구독
import Subscription from './pages/Subscription'
//에러페이지(404)
import Error from './pages/Error'
//로그인
import Login from './pages/Login'
//회원가입
import SignUp from './pages/SignUp'
//마이페이지
import Mypage from './pages/Mypage'
//브랜드소개
import Brand from './pages/Brand';

import './pages/_pages.scss'

//util
import ScrollToTop from './components/common/util/ScrollToTop';

export default function App() {


  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 추가

  //최적화발표
  //상품전달 데이터를 App.js 2차부모 컴포넌트에서 1회 저장한다.
  //데이터 1회 저장할 상태변수
  const [productinfo, setProductinfo] = useState([]);
  const [naviinfo, setNaviinfo] = useState([]);


  const handleLogin = () => {
    // 로그인 처리 (예: 로그인 성공 시 localStorage 저장 및 상태 변경)
    setIsLoggedIn(true);
    localStorage.setItem("authToken", "dummyAuthToken"); // 예제 토큰 저장
  };

  const handleLogout = () => {
    // 로그아웃 처리
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  //장바구니 
  // 개수가 중복일 경우 하나씩 추가
   const addToCart = (items) => {

    console.log("장바구니 추가될 정보확인 : ",items);
    
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems]; 
      // 이전배열 객체를 새로운 배열로 옮김 useState 상태변수대상이 배열이라 새로운 배열이 필요
      
      
      
      items.forEach((item) => {
        // 추가항목의 pk 배열 index 찾기
        const existingItemIndex = updatedItems.findIndex(existingItem => existingItem.productId === item.productId);
  
        if (existingItemIndex !== -1) {
          // 존재하면 그 배열객체만 찾아서 수량만 없데이트한다. (추가)
          console.log("장바구니에 기존에 있던 아이템")
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1, // 장바구니와 상세에서 넘겨주는 데이터 추가삭제기능 필요해서 함수를 분리
            purchasePr : updatedItems[existingItemIndex].purchasePr * (updatedItems[existingItemIndex].quantity + 1)
          };
        } else {
          // 처음 클릭된 상품인 경우 추가 , 원래의 데이터에 추가로 수량을 넣는다.
          console.log("장바구니에 처음들어가는 아이템")
          updatedItems.push({ ...item, quantity: 1, purchasePr : item.discountPrice || item.originalPrice })
        }
      });  
      return updatedItems; // 장바구니 배열객체로 cartItems업데이트한다.
    });
  };
  // 상세페이지 장바구니 버튼 -> 증가 추가개수만큼 처리
  const detailToCart = (items) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems]; 
      // 이전배열 객체를 새로운 배열로 옮김 useState 상태변수대상이 배열이라 새로운 배열이 필요 
  
      items.forEach((item) => {
        // 추가항목의 pk 배열 index 찾기
        const existingItemIndex = updatedItems.findIndex(
          (existingItem) => existingItem.productId === item.productId
        );
  
        if (existingItemIndex !== -1) {
          // 존재하면 그 배열객체만 찾아서 수량만 업데이트한다. (추가)
          console.log("장바구니에 기존에 있던 아이템");
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + item.quantity,
            purchasePr:
              (updatedItems[existingItemIndex].discountPrice || 
              updatedItems[existingItemIndex].originalPrice) *
              (updatedItems[existingItemIndex].quantity + item.quantity), // `purchasePr` 업데이트
          };
        } else {
          // 처음 클릭된 상품인 경우 추가 , 원래의 데이터에 추가로 수량을 넣는다.
          console.log("장바구니에 처음들어가는 아이템");
          updatedItems.push({
            ...item,
            purchasePr: (item.discountPrice || item.originalPrice) * item.quantity, // 새로운 항목에 `purchasePr` 추가
          });
        }
      });
      return updatedItems; // 장바구니 배열객체로 cartItems 업데이트
    });
  };
// 장바구니 -> 삭제처리가 추가
const cartToCart = (items, delstatu = false) => {
  console.log(`장바구니 라우터입니다. delstatu: ${delstatu} (true = 삭제)`);

  setCartItems((prevCartList) => {
    return prevCartList.reduce((updatedCart, cartItem) => {
      const matchingItem = items.find((item) => item.productId === cartItem.productId);

      if (matchingItem) {
        if (delstatu || (cartItem.quantity + matchingItem.quantity) <= 0) {
          // 삭제 조건: delstatu가 true이거나 수량이 0 이하인 경우
          console.log("삭제된 아이템:", cartItem);
          return updatedCart; // 제외하고 다음 항목으로 넘어감
        }

        // 수량 업데이트 조건
        updatedCart.push({
          ...cartItem,
          quantity: cartItem.quantity + matchingItem.quantity,
          purchasePr :(cartItem.discountPrice || cartItem.originalPrice) *
          (cartItem.quantity + matchingItem.quantity)
        });
      } else {
        // 매칭되는 아이템이 없으면 그대로 유지
        updatedCart.push(cartItem);
      }

      return updatedCart;
    }, []);
  });
};


  // addToCart 함수내의 cartItems 상태변수를 위한 함수실행으로 관리중
  useEffect(() => {
    console.log(cartItems);    
  }, [cartItems]);  

  
  useEffect(() => {
    // 로그인 상태 확인 (예: localStorage에 authToken 확인)
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태 true

    // 최적화된 랜딩을 위한 데이터캐싱 설계에 대한 리뷰입니다. //
    setProductinfo(productinfoData); // productinfo 상품데이터를 딱 한번 저장해둠
    setNaviinfo(navidb) // naviinfo 카테고리데이터를 딱 한번 저장해둠
    // 데이터캐싱마침 //


  }, []);

  
  return (
    <div className="heyul">
      {/* Link 클릭 후 이동시 최상단으로 변경 */}
      <ScrollToTop />
        {/* 상단의 카테고리변수와 장바구니,로그인 상태변수 전달 */}
      <Header 
          navidb={ navidb } 
          cartItems={cartItems} 
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          productinfo={productinfo}
        ></Header>

      <Routes>
          <Route path='/' element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} ></Home>}></Route>
          <Route path='/cart' element={<Cart cartItems={cartItems} cartToCart={cartToCart} isLoggedIn={isLoggedIn}></Cart>}></Route>
          <Route
            path="/search"
            element={<ProductList addToCart={addToCart} productinfo={productinfo} naviinfo={naviinfo["category"]}></ProductList>}
          />
          <Route path='/subscription' element={<Subscription></Subscription>}></Route>
          <Route path='/recipe' element={<Recipe></Recipe>}></Route>
          <Route path="/recipe/:id" element={<RecipeDetail></RecipeDetail>}></Route>
          
          <Route path='/product/:catenm?/:cateid?' element={<ProductList  addToCart={addToCart} productinfo={productinfo} naviinfo={naviinfo["category"]}></ProductList>}></Route>

          {/* 상세페이지 
          현재 구조에서 ProductDetail에 특정 productId에 해당하는 데이터를 필터링해서 전달하려면, 라우트 설정 단계에서는 :productId 값을 알 수 없으므로 전체 상품 데이터를 전달하고 ProductDetail 컴포넌트 내부에서 useParams를 사용해 productId를 읽어 필터링하는 것이 최적입니다.
          */}
          <Route path='/detail/:productId?' element={<ProductDetail  detailToCart={detailToCart} productinfo={productinfo} naviinfo={naviinfo["category"]}></ProductDetail>}></Route>

          <Route path='/brand' element={<Brand></Brand>}></Route>
          <Route path='/event' element={<EventList addToCart={addToCart}></EventList>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<SignUp></SignUp>}></Route>
          <Route path='/mypage' element={<Mypage cartItems={cartItems}></Mypage>}></Route>

          <Route path='*' element={<Error></Error>}></Route>
      </Routes>

            
      <Sidebar
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      ></Sidebar>

      <Mfooter
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        navidb={ navidb }
      ></Mfooter>
      <Footer></Footer>
    </div>
  )
}