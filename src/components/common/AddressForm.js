import React, { useEffect, useState } from "react";
import { Button, Input, FormGroup, Label } from "../common/util/_form";

const useKakaoScript = (appKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("kakao-script")) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "kakao-script";
    script.src = `https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error("카카오 API 스크립트 로드 실패");

    document.head.appendChild(script);
  }, [appKey]);

  return isLoaded;
};

const AddressForm = ({ register, errors, onAddressSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const isKakaoLoaded = useKakaoScript("32462da25aef42b84ac439913eb376cf");

  const openAddressPopup = () => {
    if (!isKakaoLoaded) {
      alert("카카오 API가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const popup = new window.daum.Postcode({
      oncomplete: (data) => {
        setSelectedAddress(data.address);
        onAddressSelect?.(data.address); // Optional chaining으로 전달
      },
    });

    popup.open();
  };

  return (
    <>
      <FormGroup className="d-flex flex-column flex-md-row mb-2 h-100">
        <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
          <Label htmlFor="address">
            주소<span>*</span>
          </Label>
        </div>
        <div className="col-md-8">
          <Button
            className="adbtn g-2 d-flex align-items-center justify-content-center"
            type="button"
            onClick={openAddressPopup}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="me-2"><path d="M13 13L10.1 10.1M11.6667 6.33333C11.6667 9.27885 9.27885 11.6667 6.33333 11.6667C3.38781 11.6667 1 9.27885 1 6.33333C1 3.38781 3.38781 1 6.33333 1C9.27885 1 11.6667 3.38781 11.6667 6.33333Z" stroke="#222222" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            주소 검색
          </Button>
        </div>
      </FormGroup>

      <FormGroup className="d-flex flex-column flex-md-row mb-3 justify-content-end">
        <div className="col-md-8 offset-md-3">
          <Input
            id="detailedAddress"
            type="text"
            value={selectedAddress}
            placeholder="상세주소"
            {...register("detailedAddress", {
              maxLength: {
                value: 100,
                message: "* 상세 주소는 100자 이내로 입력해주세요.",
              },
            })}
            className={`form-control ${
              errors.detailedAddress ? "is-invalid" : ""
            }`}
            readOnly
          />
        </div>
      </FormGroup>
    </>
  );
};

export default AddressForm;
