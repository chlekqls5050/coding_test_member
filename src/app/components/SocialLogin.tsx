"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Step3() {
  const handleSocialLogin = async (provider: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        queryParams: { prompt: "login" }, // 매번 로그인 유도
        skipBrowserRedirect: true, // 👈 새 창 대신 url을 반환받음
      },
    });

    if (error) {
      alert(`로그인 실패: ${error.message}`);
    } else if (data?.url) {
      console.log("OAuth URL:", data.url);
      // 👇 직접 새 창 열기
      window.open(data.url, "_blank", "width=500,height=600");
    }
  };

  return (
    <div>
      <h2>3단계: SNS 계정 연결</h2>
      <p>회원가입을 완료하려면 SNS 계정을 연동하거나, 건너뛸 수 있습니다.</p>

      <button onClick={() => handleSocialLogin("kakao")}>카카오 계정 연결</button>
      <button onClick={() => handleSocialLogin("naver")}>네이버 계정 연결</button>
    </div>
  );
}
