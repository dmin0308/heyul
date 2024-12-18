import { createClient } from "@supabase/supabase-js";

// 환경 변수로 Supabase URL과 API 키 가져오기
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;