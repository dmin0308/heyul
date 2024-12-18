import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductItem from '../components/product/ProductItem';
import { Plusbtn, Arrow } from '../components/common/_common';
import { Link } from 'react-router-dom';

import ms from './productlist.module.scss';

const BADGES_MAP = {
  newArrival: { badges: "N", locationtext: "신상품" },
  discount: { badges: "S", locationtext: "할인상품" },
  hot: { badges: "H", locationtext: "인기상품" },
  default: { badges: "P", locationtext: "기획상품" },
};

export default function ProductList({ addToCart, productinfo, naviinfo }) {
  const { catenm, cateid } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const [datainfo, setDatainfo] = useState(null);

  const filterProductLocation = async (naviinfo, cateid, catenm, productinfo, query) => {
    if (cateid) {
      const oneDepth = naviinfo.find(
        (subnavi) => String(subnavi.categoryId) === cateid.toString()[0]
      );
      if (!oneDepth) return { oneDepth: null, twoDepth: null, productlist: [] };

      const twoDepth = oneDepth.subcategory.find(
        (item) => String(item.categoryId) === cateid
      );
      if (!twoDepth) return { oneDepth, twoDepth: null, productlist: [] };

      const productlist = productinfo.filter(
        (product) => twoDepth.categoryId.toString() === product.categoryId
      );
      return { oneDepth, twoDepth, productlist };
    } else if (query) {
      // 검색 쿼리가 있는 경우
      const productlist = productinfo.filter((product) =>
        product.name.includes(query)
      );
      console.log("검색 필터링 결과:", productlist);
      return { oneDepth: null, twoDepth: null, productlist };
    } else {
      const oneDepth = naviinfo.find(
        (subnavi) => subnavi.linkto && subnavi.linkto === catenm
      );
      if (oneDepth) {
        const productlist = productinfo.filter(
          (product) => oneDepth.categoryId.toString() === product.categoryId[0]
        );
        return { oneDepth, twoDepth: null, productlist };
      }
      const badgeInfo = BADGES_MAP[catenm] || BADGES_MAP.default;
      const productlist = productinfo.filter(
        (product) =>
          product["badges"].split("|").includes(badgeInfo.badges) &&
          product["badges"] === badgeInfo.badges
      );
      return { oneDepth: null, twoDepth: null, productlist };
    }
  };

  useEffect(() => {
    const fetchLocationData = async () => {
      if (productinfo && naviinfo) {
        try {
          const productpagedata = await filterProductLocation(
            naviinfo,
            cateid,
            catenm,
            productinfo,
            query
          );
          setDatainfo(productpagedata);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      }
    };

    fetchLocationData();
  }, [productinfo, naviinfo, catenm, cateid, query]);

  return (
    <div className="mw px-3 px-xxl-0 mb120">
      {query ? (
        <div className='text-center my-4'>
          <p className='kr-h3'>
            "<span className='text-labeln'>{query}</span>" 에 대한 검색 결과
          </p>
        </div>
      ) : (
        <>
          {datainfo && (
            <div className="location d-flex justify-content-end py-4 align-items-center">
              <span>
                <Link to="/">홈</Link>
              </span>
              <span className="mx-2">
                <Arrow icon="gray" />
              </span>
              {datainfo.oneDepth && (
                <span>
                  <Link to={`/product/${datainfo.oneDepth.linkto}`}>
                    {datainfo.oneDepth.name}
                  </Link>
                </span>
              )}
              {BADGES_MAP[catenm] && (
                <span>{BADGES_MAP[catenm]?.locationtext}</span>
              )}
              {cateid && datainfo.twoDepth && (
                <>
                  <span className="mx-2">
                    <Arrow icon="gray" />
                  </span>
                  <span>
                    <Link
                      to={`/product/${datainfo.twoDepth.linkto}/${datainfo.twoDepth.categoryId}`}
                    >
                      {datainfo.twoDepth.name}
                    </Link>
                  </span>
                </>
              )}
            </div>
          )}
        </>
      )}

      {query && datainfo?.productlist?.length === 0 && (
        <div className="text-center py-5">
          <p>
            <strong>"{query}"</strong>에 대한 검색 결과가 없습니다.
          </p>
          <p>다른 검색어를 입력해 주세요.</p>
        </div>
      )}

      <ul className={`${ms.productGrid} px-0 pb-5`}>
        {datainfo &&
          datainfo.productlist.map((v, i) => (
            <li key={`prd_item${i}`}>
              <ProductItem
                info={v}
                rateview="show"
                addToCart={addToCart}
              ></ProductItem>
            </li>
          ))}
      </ul>

      <div className="d-flex justify-content-center">
        <Plusbtn icon="plus">더보기</Plusbtn>
      </div>
    </div>
  );
}
