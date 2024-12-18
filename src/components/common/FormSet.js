import React, { useState, useEffect, useRef } from "react";
import supabase from "../../api/superbase";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import Term from "../common/Term";
import { LabelR } from "../common/util/_icon";
import AddressForm from "./AddressForm";
import {
  FormContainer,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  AtSymbol,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  Button,
  ErrorMessage,
  Signdiv,
} from "../common/util/_form";

const FormSet = () => {
  const [isTermsValid, setIsTermsValid] = useState(false); // 약관 검증 상태
  const [optionalTerms, setOptionalTerms] = useState({}); // 선택 약관 데이터
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  // 도메인 선택 로직
  const handleSelect = (domain) => {
    setSelectedDomain(domain);
    setShowDropdown(false);
  };

  // 연락처 관련 상태 및 타이머 관리
  const [timer, setTimer] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const timerRef = useRef(null);

  // 타이머 시작 및 초기화
  const handleSendCode = () => {
    setTimer(180);
    setIsTimerActive(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const registerUser = async (userData) => {
    try {
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(userData.password, 10);
  
      // Supabase에 데이터 삽입
      const { data, error } = await supabase.from("users").insert({
        username: userData.username,
        password: hashedPassword,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender,
        birthdate: userData.birthdate,
        detailed_address: userData.detailedAddress || null,
        marketing: userData.marketing || false,
        info_usage: userData.infoUsage || false,
      });
  
      if (error) throw error;
  
      console.log("회원가입 성공:", data);
      return data;
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (!selectedDomain) {
      alert("이메일 주소를 선택해주세요.");
      return;
    }

    // {(데이터 필터링)}
    const completeEmail = `${data.emailUsername}@${selectedDomain}`;
    // 불필요한 데이터 제거 후 필요한 데이터만 payload에 포함
    const { confirmPassword, emailUsername, ...filteredData } = data;
    const payload = {
      ...filteredData,
      email: completeEmail,
      ...optionalTerms,
    };

    // {(데이터 전송 확인 로그)}
    console.log("회원가입 데이터:", payload);
    // 서버로 전송하는 로직 추가 가능
    try {
      const response = await registerUser(payload);
      alert("회원가입 성공!");
      console.log("서버 응답:", response);
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <FormContainer className="px-3 px-md-0 fw-300">
      <div className="text-center mb-2 mt88">
        <Title>회원가입</Title>
        <Signdiv className="text-end mt-2 me-2">
          <p className="mb-0">
            <span>*</span> 필수입력사항
          </p>
        </Signdiv>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="needs-validation">
        {/* 아이디 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="username">
              아이디<span>*</span>
            </Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col-9 px-0">
                <Input
                  id="username"
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  {...register("username", {
                    required: "* 필수 항목입니다.",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "* 아이디는 영문과 숫자만 가능합니다.",
                    },
                  })}
                  className={`form-control flex-grow-1 ${
                    errors.username ? "is-invalid" : "d"
                  }`}
                />
              </div>
              <div className="col-3 px-0 ps-2">
                <Button type="button">중복확인</Button>
              </div>
            </div>
            {errors.username && (
              <ErrorMessage className="text-danger">
                {errors.username.message}
              </ErrorMessage>
            )}
          </div>
        </FormGroup>

        {/* 비밀번호 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="password">
              비밀번호<span>*</span>
            </Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col px-0">
                <Input
                  id="password"
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...register("password", {
                    required: "* 필수 항목입니다.",
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,30}$/,
                      message:
                        "* 비밀번호는 12~30자, 영문/숫자/특수문자를 포함해야 합니다.",
                    },
                  })}
                  className={`form-control flex-grow-1 ${
                    errors.password ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>
            {errors.password ? (
              <ErrorMessage className="text-danger">
                {errors.password.message}
              </ErrorMessage>
            ) : watch("password") &&
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,30}$/.test(
                watch("password")
              ) ? (
              <ErrorMessage className="text-success">
                * 사용 가능한 비밀번호입니다.
              </ErrorMessage>
            ) : null}
          </div>
        </FormGroup>

        {/* 비밀번호 확인 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="confirmPassword">
              비밀번호 확인<span>*</span>
            </Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col px-0">
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  {...register("confirmPassword", {
                    required: "* 비밀번호가 일치하지 않습니다.",
                    validate: (value) =>
                      value === watch("password") ||
                      "* 비밀번호가 일치하지 않습니다.",
                  })}
                  className={`form-control ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>
            {errors.confirmPassword ? (
              <ErrorMessage className="text-danger">
                {errors.confirmPassword.message}
              </ErrorMessage>
            ) : (
              watch("confirmPassword") &&
              watch("confirmPassword") === watch("password") && (
                <ErrorMessage className="text-success">
                  * 비밀번호가 일치합니다.
                </ErrorMessage>
              )
            )}
          </div>
        </FormGroup>
        {/* 이름 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="name">
              이름<span>*</span>
            </Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col px-0">
                <Input
                  id="name"
                  type="text"
                  placeholder="이름을 입력해주세요."
                  {...register("name", { required: "* 필수 항목입니다." })}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
              </div>
            </div>
            {errors.name && (
              <ErrorMessage className="text-danger">
                {errors.name.message}
              </ErrorMessage>
            )}
          </div>
        </FormGroup>

        {/* 이메일 */}
        <FormGroup className="enter-group d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="email">
              이메일<span>*</span>
            </Label>
          </div>
          <div className=" col-md-8">
            <div className=" enter-field row g-0 align-items-center">
              <div className="d-flex col px-0">
                <Input
                  id="email"
                  type="text"
                  placeholder="예: heyul"
                  {...register("emailUsername", {
                    required: "* 필수 항목입니다.",
                  })}
                  className={`enter-input  ${
                    errors.emailUsername ? "is-invalid" : ""
                  }`}
                />
                <AtSymbol>@</AtSymbol>
                <div className="dropdown-wrapper">
                  <DropdownButton
                    className="w-100 justify-content-between px-0"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {selectedDomain || "선택하기"}
                  </DropdownButton>
                  {showDropdown && (
                    <DropdownMenu>
                      {[
                        "gmail.com",
                        "naver.com",
                        "kakao.com",
                        "hanmail.net",
                      ].map((domain) => (
                        <DropdownItem
                          key={domain}
                          onClick={() => handleSelect(domain)}
                        >
                          {domain}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </div>
              </div>
            </div>
            {errors.emailUsername && (
            <ErrorMessage className="text-danger">
              {errors.emailUsername.message}
            </ErrorMessage>
          )}
          </div>
        </FormGroup>

        {/* 연락처 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-2">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="phone">
              연락처<span>*</span>
            </Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col-8 px-0">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="연락처를 입력해주세요."
                  {...register("phone", {
                    required: "* 연락처는 필수 항목입니다.",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "* 유효한 연락처를 입력해주세요.",
                    },
                  })}
                  onKeyDown={(e) => {
                    // 숫자와 백스페이스, 화살표 입력만 허용
                    if (
                      !(
                        (
                          (e.key >= "0" && e.key <= "9") || // 숫자 키
                          e.key === "Backspace" || // 백스페이스
                          e.key === "ArrowLeft" || // 왼쪽 화살표
                          e.key === "ArrowRight" || // 오른쪽 화살표
                          e.key === "Tab"
                        ) // Tab 키
                      )
                    ) {
                      e.preventDefault(); // 다른 키 입력 차단
                    }
                  }}
                  className={`form-control flex-grow-1 ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                />
              </div>
              <div className="col-4 px-0 ps-2">
                <Button type="button" onClick={handleSendCode}>
                  인증번호 받기
                </Button>
              </div>
            </div>
          </div>
        </FormGroup>
        {/* 인증번호 */}
        <FormGroup className="enter-group d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center"></div>
          <div className="d-flex col-md-8" >
          <div className="enter-field col-md-8">
            <div className="row g-0 align-items-center">
              <div className="d-flex col px-0">
                <Input
                  id="vscode"
                  type="text"
                  placeholder="인증번호"
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 6) {
                      setVerificationCode(value);
                    }
                  }}
                  maxLength={6}
                  onKeyDown={(e) => {
                    // 숫자와 백스페이스, 화살표 입력만 허용
                    if (
                      !(
                        (
                          (e.key >= "0" && e.key <= "9") || // 숫자 키
                          e.key === "Backspace" || // 백스페이스
                          e.key === "ArrowLeft" || // 왼쪽 화살표
                          e.key === "ArrowRight" || // 오른쪽 화살표
                          e.key === "Tab"
                        ) // Tab 키
                      )
                    ) {
                      e.preventDefault(); // 다른 키 입력 차단
                    }
                  }}
                  className={`form-control enter-input ${
                    errors.vscode ? "is-invalid" : ""
                  }`}
                />
                {isTimerActive && <span>{formatTime(timer)}</span>}
              </div>
            </div>
          </div>
          <div className="col-3 px-0 ps-2">
            <Button type="button" onClick={handleSendCode}>
              번호 확인
            </Button>
          </div>
          </div>
        </FormGroup>

        {/* 주소 */}

<AddressForm
      register={register}
      errors={errors}
      onAddressSelect={(address) => console.log("선택된 주소:", address)}
    />


        {/* 성별 */}
        <FormGroup className="enter-group d-flex flex-column flex-md-row mb-3">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label id="gender-group-label">성별</Label>
          </div>
          <div>
          <div
            role="radiogroup"
            aria-labelledby="gender-group-label"
            className="col-md-8 d-flex align-items-center justify-content-start   radiogroup"
          >
            <div className="d-flex align-items-center justify-content-start pe-5">
              <div className="d-flex justify-content-center me-2">
              <input
                  id="gender-male"
                  type="radio"
                  name="gender"
                  value="male"
                  {...register("gender", {
                    required: "* 성별을 선택해주세요.",
                  })}
                />
                  <LabelR htmlFor="gender-male" size={[35, 20]} ><span className="genderSpan ms-2">남자</span></LabelR>
              </div>
            
            </div>
            <div className="d-flex align-items-center justify-content-start pe-5">
              <div className="me-2">
              <input
                  id="gender-female"
                  type="radio"
                  name="gender"
                  value="female"
                  {...register("gender", {
                    required: "* 성별을 선택해주세요.",
                  })}
                />
                <LabelR htmlFor="gender-female" ><span className="genderSpan ms-2">여자</span></LabelR>
              </div>
            
            </div>
            <div className="d-flex align-items-center justify-content-start ">
              <div className="me-2">
              <input
                  id="gender-none"
                  type="radio"
                  name="gender"
                  value="none"
                  {...register("gender", {
                    required: "* 성별을 선택해주세요.",
                  })}
                />
                <LabelR htmlFor="gender-none"><span className="genderSpan ms-2">선택안함</span></LabelR>
              </div>
            </div>
          </div>
          <div >
          {errors.gender && (
            <ErrorMessage className="text-danger">
              {errors.gender.message}
            </ErrorMessage>
          )}
          </div>
          </div>
        </FormGroup>

        {/* 생년월일 */}
        <FormGroup className="d-flex flex-column flex-md-row mb-4">
          <div className="d-flex col-md-4 mb-2 mb-md-0 align-items-center">
            <Label htmlFor="birthdate">생년월일</Label>
          </div>
          <div className="col-md-8">
            <div className="row g-0 align-items-center">
              <div className="col px-0">
                <Input
                  id="birthdate"
                  type="text"
                  placeholder="생년월일 8자리를 입력해주세요."
                  {...register("birthdate", {
                    maxLength: {
                      value: 8,
                      message: "* 생년월일은 8자리 숫자로 입력해주세요.",
                    },
                    pattern: {
                      value: /^\d{8}$/,
                      message: "* 생년월일을 정확히 입력해주세요.",
                    },
                  })}
                  onKeyDown={(e) => {
                    // 숫자와 백스페이스, 화살표 입력만 허용
                    if (
                      !(
                        (
                          (e.key >= "0" && e.key <= "9") || // 숫자 키
                          e.key === "Backspace" || // 백스페이스
                          e.key === "ArrowLeft" || // 왼쪽 화살표
                          e.key === "ArrowRight" || // 오른쪽 화살표
                          e.key === "Tab"
                        ) // Tab 키
                      )
                    ) {
                      e.preventDefault(); // 다른 키 입력 차단
                    }
                  }}
                  className={`form-control ${
                    errors.birthdate ? "is-invalid" : ""
                  }`}
                />
              </div>
            </div>
            {errors.birthdate && (
              <ErrorMessage className="text-danger">
                {errors.birthdate.message}
              </ErrorMessage>
            )}
          </div>
        </FormGroup>

        {/* 이용약관 */}
        <Term
          className="mb-5"
          onValidation={(valid) => setIsTermsValid(valid)} // 약관 유효성만 처리
          onOptionalTerms={(terms) => setOptionalTerms(terms)} // 선택 약관 데이터 설정
        />

        {/* 가입 버튼 */}
        <div className="d-flex col-md-4 mx-auto mb120">
          <Button className="submit-btn " type="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default FormSet;
