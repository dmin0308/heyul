import { useEffect } from "react";

const _useKakaoScript = (appKey) => {
  useEffect(() => {
    if (document.getElementById("kakao-script")) return; // 이미 로드된 경우
    const script = document.createElement("script");
    script.id = "kakao-script";
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services`;
    script.async = true;
    document.head.appendChild(script);
  }, [appKey]);
};

export default _useKakaoScript;