'use client'

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js"; // User 타입 임포트

export default function CallbackPage() {
  const [user, setUser] = useState<User | null>(null); // any 대신 User | null

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("유저 정보 가져오기 실패", error.message);
      } else {
        console.log("카카오 로그인 성공!", data.user);
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <h2>카카오 로그인 결과</h2>
      {user ? (
        <pre>{JSON.stringify(user, null, 2)}</pre>
      ) : (
        <p>로그인 처리중...</p>
      )}
    </div>
  );
}
