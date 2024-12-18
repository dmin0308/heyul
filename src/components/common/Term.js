import React, { useState, useEffect } from "react";
import { TermsContainer, Title, TermsList, TermsItem } from "./util/_term";
import { LabelC } from "./util/_icon";
import { ErrorMessage } from "./util/_form";

const Term = ({ onValidation, onOptionalTerms }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [terms, setTerms] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
    ageCheck: false,
  });

  const [errors, setErrors] = useState({
    term1: "",
    term2: "",
    ageCheck: "",
  });

  // 선택 항목 변경 시 부모에 전달
  useEffect(() => {
    onOptionalTerms({
      marketing: terms.term3,
      infoUsage: terms.term4,
    });


  }, [terms.term3, terms.term4]); // term3, term4가 변경될 때만 실행

  // 전체 동의 핸들러
  const handleAllChecked = () => {
    const newCheckedState = !allChecked;

    // 전체 동의 상태 업데이트
    setAllChecked(newCheckedState);
    setTerms((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({ ...acc, [key]: newCheckedState }),
        {}
      )
    );

    // 필수 항목 검증
    if (newCheckedState) {
      setErrors({});
      onValidation(true);
    } else {
      validateRequiredFields({
        term1: false,
        term2: false,
        ageCheck: false,
      });
    }
  };

  // 개별 체크 핸들러
  const handleIndividualCheck = (term) => {
    setTerms((prev) => {
      const updatedTerms = { ...prev, [term]: !prev[term] };

      // 전체 동의 해제 조건
      if (allChecked && !updatedTerms[term]) {
        setAllChecked(false);
      }

      // 필수 항목 검증
      if (["term1", "term2", "ageCheck"].includes(term)) {
        validateRequiredFields(updatedTerms);
      }

      // 선택 항목 전달 (이 부분은 useEffect로 처리됨)
      return updatedTerms;
    });
  };

  // 필수 항목 검증 함수
  const validateRequiredFields = (currentTerms) => {
    const isValid =
      currentTerms.term1 && currentTerms.term2 && currentTerms.ageCheck;
    setErrors((prev) => ({
      ...prev,
      term1: currentTerms.term1 ? "" : "* 항목에 동의해야 합니다.",
      term2: currentTerms.term2 ? "" : "* 항목에 동의해야 합니다.",
      ageCheck: currentTerms.ageCheck ? "" : "* 항목에 동의해야 합니다.",
    }));
    onValidation(isValid);
  };

  return (
    <TermsContainer className="container d-flex justify-content-between">
      <div className="row w-100 mx-0">
        {/* 약관 동의 제목 */}
        <div className="col-md-4 px-0 lh0-9 mb-5">
          <span>
            이용약관동의<span className="span-text ms-1">*</span>
          </span>
        </div>

        {/* 약관 전체 및 개별 동의 */}
        <div className="col-md-8 px-0">
          {/* 전체 동의 */}
          <Title>
            <div className="d-flex align-items-start">
              <input
                type="checkbox"
                id="allAgree"
                checked={allChecked}
                onChange={handleAllChecked}
              />
              <LabelC htmlFor="allAgree" className="lh0-9" />
              <div className="lh0-9">
                <span className="ms-2 mb-2 title-text d-block">
                  전체 동의합니다.
                </span>
                <span className="ms-2 sub-text">
                  선택 항목에 동의하지 않아도 회원가입 및 일반 서비스 이용이
                  가능합니다.
                </span>
              </div>
            </div>
          </Title>

          {/* 약관 리스트 */}
          <TermsList>
            {/* 필수 항목 */}
            <TermsItem className="d-flex align-items-start">
              <input
                id="term1"
                type="checkbox"
                checked={terms.term1}
                onChange={() => handleIndividualCheck("term1")}
                aria-required="true"
              />
              <LabelC htmlFor="term1" />
              <div className="ms-2 me-auto col mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    이용약관 동의 <span className="required-text">(필수)</span>
                  </span>
                  <a href="#!" className="terms-link">
                    약관 보기 &gt;
                  </a>
                </div>
                {errors.term1 && (
                  <ErrorMessage className="ms-0">{errors.term1}</ErrorMessage>
                )}
              </div>
            </TermsItem>

            {/* 개인정보 수집·이용 동의 (필수) */}
            <TermsItem className="d-flex align-items-start">
              <input
                id="term2"
                type="checkbox"
                checked={terms.term2}
                onChange={() => handleIndividualCheck("term2")}
                aria-required="true"
              />
              <LabelC htmlFor="term2" />
              <div className="ms-2 me-auto col mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    개인정보 수집·이용 동의{" "}
                    <span className="required-text">(필수)</span>
                  </span>
                  <a href="#!" className="terms-link">
                    약관 보기 &gt;
                  </a>
                </div>
                {errors.term2 && (
                  <ErrorMessage className="ms-0">{errors.term2}</ErrorMessage>
                )}
              </div>
            </TermsItem>

            {/* 개인정보 수집·이용 동의 (선택) */}
            <TermsItem className="d-flex align-items-start">
              <input
                id="term3"
                type="checkbox"
                checked={terms.term3}
                onChange={() => handleIndividualCheck("term3")}
              />
              <LabelC htmlFor="term3" />
              <div className="ms-2 me-auto col mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    개인정보 수집·이용 동의{" "}
                    <span className="optional-text">(선택)</span>
                  </span>
                  <a href="#!" className="terms-link">
                    약관 보기 &gt;
                  </a>
                </div>
              </div>
            </TermsItem>

            {/* 마케팅 혜택/정보 수신 동의 (선택) */}
            <TermsItem className="d-flex align-items-start">
              <input
                id="term4"
                type="checkbox"
                checked={terms.term4}
                onChange={() => handleIndividualCheck("term4")}
              />
              <LabelC htmlFor="term4" />
              <div className="ms-2 me-auto col mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    마케팅 혜택/정보 수신 동의{" "}
                    <span className="optional-text">(선택)</span>
                  </span>
                  <a href="#!" className="terms-link">
                    더보기 &gt;
                  </a>
                </div>
              </div>
            </TermsItem>

            {/* 14세 이상 확인 */}
            <TermsItem className="d-flex align-items-start">
              <input
                id="ageCheck"
                type="checkbox"
                checked={terms.ageCheck}
                onChange={() => handleIndividualCheck("ageCheck")}
                aria-required="true"
              />
              <LabelC htmlFor="ageCheck" />
              <div className="ms-2 me-auto col mb-3">
                <div className="d-flex justify-content-between">
                  <span>
                    본인은 14세 이상입니다.{" "}
                    <span className="required-text">(필수)</span>
                  </span>
                </div>
                {errors.ageCheck && (
                  <ErrorMessage className="ms-0">{errors.ageCheck}</ErrorMessage>
                )}
              </div>
            </TermsItem>
          </TermsList>
        </div>
      </div>
    </TermsContainer>
  );
};

export default Term;
