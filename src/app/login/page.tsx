'use client';

import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type memberInfo = {
  userId: string;
  password: string;
  nickname: string;
}

export default function LoginPage() {
  const [userId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const [step, setStep] = useState<"login" | "complete">("login");
  const [memberInfo, setMemberInfo] = useState<memberInfo>({
    userId: "",
    password: "",
    nickname: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data: member, error: fetchError } = await supabase.from("member").select("userId, password, nickname").eq("userId", userId).single(); 
      if (fetchError || !member) {
        setError("아이디가 존재하지 않습니다.");
        alert("아이디가 존재하지 않습니다.");
        return;
      }
      if (member.password != password) {
        setError("비밀번호가 틀립니다.");
        alert("비밀번호가 틀립니다.");
        return;
      }

      setMemberInfo(member);
      setStep("complete");
    } catch (err) {
        setError("로그인 처리 중 오류가 발생했습니다.");
        alert(err);
    }
  };


  return (
    <section className={`${styles.login_wrap} w-400`}>
      <div className={styles.inbox}>
        <h2 className={styles.title}>로그인 {step === "complete" && "성공🎉"}</h2>
        {step === "login" && (
        <form onSubmit={handleSubmit}>
          <div className={styles.input_box}>
            <label htmlFor="userId">
              <span>아이디</span>
              <input
                type="text"
                id="userId"
                placeholder="아이디를 입력해주세요."
                value={userId}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.input_box}>
            <label htmlFor="password">
              <span>비밀번호</span>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <div className={styles.btn_wrap}>
            <button type="submit">로그인</button>
            <Link href="/join">회원가입</Link>
          </div>
        </form>
        )}

        {step === "complete" && (
        <div className={styles.complete}>
          <p><b>{memberInfo?.nickname}</b>님 환영합니다!</p>
        </div>
        )}
      </div>
    </section>
  );
}
