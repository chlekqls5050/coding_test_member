"use client";

import { createClient, Provider } from "@supabase/supabase-js";
import Image from "next/image";
import styles from './SocialLogin.module.scss';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Step3() {
  const handleSocialLogin = async (provider: "kakao" | "naver") => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as Provider,
        options: {
          queryParams: { prompt: "login" },
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      if (data?.url) {
        const loginWindow = window.open( data.url, "_blank", "width=500,height=600" );

        const pollTimer = setInterval(async () => {
          if (loginWindow?.closed) {
            clearInterval(pollTimer);
            const { data: { session }, } = await supabase.auth.getSession();

            if (session?.user) {
              console.log("로그인 완료 :", session.user);
            } else {
              console.log("로그인 세션 에러");
            }
          }
        }, 500);
      }
    } catch (err) {
      alert(`로그인 실패: ${(err as Error).message}`);
    }
  };

  return (
    <button className={`${styles.btn} ${styles.kakao_btn}`} onClick={() => handleSocialLogin("kakao")}>
        <Image src="/images/kakao_logo.png" alt="카카오 연동" width={30} height={30}/>
        카카오 계정 연결
    </button>
  );
}
