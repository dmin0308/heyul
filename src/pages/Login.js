import React from "react";
import supabase from "../api/superbase";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logoS from "../assets/logoS.svg";
import kakao from "../assets/svg/kakao.svg";
import toss from "../assets/svg/toss.png";
import naver from "../assets/svg/naver.svg";
import google from "../assets/svg/google.svg";
import bcrypt from "bcryptjs";
import {
  FormContainer,
  Form,
  FormGroup,
  Input,
  Button,
  ErrorMessage,
} from "../components/common/util/_form";
import styles from "./login.module.scss";

const Login = () => {
  const navigate = useNavigate(); // 페이지 이동
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // 1. 데이터베이스에서 사용자 정보 조회
      const { data: user, error: userError } = await supabase
        .from("users") // 사용자 테이블
        .select("username, password") // 필요한 필드 선택
        .eq("username", data.username) // username으로 검색
        .single();
  
      if (userError || !user) {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
  
      // 2. 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(data.password, user.password);
      if (!isPasswordValid) {
        throw new Error("비밀번호가 일치하지 않습니다.");
      }
  
      // 3. 로그인 성공
      localStorage.setItem("authToken", user.access_token);
      alert("로그인 성공!");
      console.log("로그인 사용자:", user);
      window.location.href = "/"; 
    } catch (error) {
      console.error("로그인 실패:", error.message);
      alert("로그인 실패: " + error.message);
    }
  };

  const handleSocialLogin = async (platform) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: platform, // 소셜 플랫폼 이름 (google, kakao, naver 등)
      });

      if (error) throw error;

      alert(`${platform} 로그인 성공!`);
      navigate("/"); // "/"라우터이동후 새로고침을 원함
    } catch (error) {
      console.error(`${platform} 로그인 실패:`, error.message);
      alert(`${platform} 로그인 실패: ${error.message}`);
    }
  };

  return (
    <FormContainer className={`${styles.logDiv} px-3 px-md-0 mb100 mt100`}>
      {/* 로고 섹션 */}
      <div className="text-center mb-4">
        <img src={logoS} alt="Logo" />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="border-0">
        {/* 아이디 입력 필드 */}
        <FormGroup className="mb-3">
          <Input
            id="username"
            type="text"
            placeholder="아이디를 입력해주세요."
            {...register("username", {
              required: "* 아이디를 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: "* 아이디는 영문과 숫자만 가능합니다.",
              },
            })}
            className={`form-control lh1-6 ${styles.input} ${errors.username ? "is-invalid" : ""}`}
          />
          {errors.username && (
            <ErrorMessage className="text-danger mt-1">
              {errors.username.message}
            </ErrorMessage>
          )}
        </FormGroup>

        {/* 비밀번호 입력 필드 */}
        <FormGroup className="mb-3">
          <Input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            {...register("password", {
              required: "* 비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,30}$/,
                message:
                  "* 비밀번호는 12~30자, 영문/숫자/특수문자를 포함해야 합니다.",
              },
            })}
            className={`form-control ${styles.input} ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && (
            <ErrorMessage className="text-danger mt-1">
              {errors.password.message}
            </ErrorMessage>
          )}
        </FormGroup>

        {/* 아이디/비밀번호 찾기 및 회원가입 */}
        <div className={`${styles.sub} d-flex justify-content-end px-2`}>
          <ul className="d-flex">
            <li className="afterbar position-relative">
              <Link to="/*" className="me-2 fw-300">
                아이디 찾기
              </Link>
            </li>
            <li className="afterbar position-relative">
              <Link to="/*" className="mx-2 fw-300">
                비밀번호 변경
              </Link>
            </li>
          
          
            <li>
              <Link to="/signup" className="ms-2 fw-500">
                회원가입
              </Link>
            </li>
          </ul>
         
        </div>

        {/* 로그인 버튼 */}
        <Button type="submit" className={styles.lgButton}>
          로그인
        </Button>
      </Form>

      {/* 간편 로그인 버튼 */}
      <div className={`${styles.ezlogin} d-flex justify-content-center mt-4 `}>
        <div
          className={`${styles.circleButton} ${styles.kakao}`}
          onClick={() => handleSocialLogin("kakao")}
        >
          <img src={kakao} alt="Kakao" width="24" />
        </div>
        <div
          className={`${styles.circleButton} ${styles.naver}`}
          onClick={() => handleSocialLogin("kakao")}
        >
          <img src={naver} alt="Naver" width="24" />
        </div>
        <div
          className={`${styles.circleButton} ${styles.toss}`}
          onClick={() => handleSocialLogin("kakao")}
        >
          <img src={toss} alt="Toss" width="24" />
        </div>
        <div
          className={`${styles.circleButton} ${styles.google}`}
          onClick={() => handleSocialLogin("kakao")}
        >
          <img src={google} alt="Google" width="24" />
        </div>
      </div>
    </FormContainer>
  );
};

export default Login;
