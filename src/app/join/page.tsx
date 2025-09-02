'use client'

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  const [step, setStep] = useState<"step1" | "step2" | "step3" | "complete">("step1");
  
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    nickname: "",
    snsId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { data, error } = await supabase
      .from("member")
      .insert([formData]);

    if (error) {
      console.error("회원가입 실패:", error.message);
      alert("회원가입 실패: " + error.message);
    } else {
      console.log("회원가입 성공:", data);
      setStep("complete");
    }
  };

  const checkUserId = async (userId: string) => {
    const { data, error } = await supabase
      .from("member")
      .select("userId")
      .eq("userId", userId);

    if (error) {
      console.error("아이디 중복", error.message);
      return false;
    }

    return data && data.length > 0; // true면 이미 존재
  };

  const validateStep = async () => {
    if (step === "step1") {
      const { userId, password, email, phone } = formData;

      if (!userId) {
        alert("아이디를 입력하세요.");
        return false;
      } else if (!password) {
        alert("비밀번호를 입력하세요.");
        return false;
      } else if (!email) {
        alert("이메일을 입력하세요.");
        return false;
      } else if (!phone) {
        alert("전화번호를 입력하세요.");
        return false;
      }

      // 아이디 중복 체크
      const { data, error } = await supabase
        .from("member")
        .select("userId")
        .eq("userId", userId);

      if (error) {
        alert("아이디 체크 중 오류가 발생했습니다.");
        return false;
      }

      if (data && data.length > 0) {
        alert("이미 사용 중인 아이디입니다.");
        return false;
      }
    }

    if (step === "step2") {
      const { birthDate, gender, nickname } = formData;
      if (!birthDate) {
        alert("생년월일을 입력하세요.");
        return false;
      } else if (!gender) {
        alert("성별을 선택해주세요.");
        return false;
      } else if (!nickname) {
        alert("닉네임을 입력해주세요.");
        return false;
      }
    }

    return true;
  };


  return (
    <section className={`${styles.join_wrap} w-400`}>
      <div className={styles.inbox}>
        <h2 className={styles.title}>회원가입 {step === "complete" && "완료🎉"}</h2>
        <form>
          {step !== "complete" && (
            <div className={styles.step_wrap}>
              <ul>
                {["step1", "step2", "step3"].map((s, i) => (
                  <li key={s} className={step === s ? styles.activate : ""}>
                    <span></span>
                    <p>STEP{String(i + 1).padStart(2, "0")}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {step === "step1" &&
            <>
              <div className={styles.step1}>
                <div className={styles.input_wrap}>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>아이디</span>
                    <label>
                      <input type="text" name="userId" onChange={handleChange} value={formData.userId} placeholder="아이디를 입력해 주세요." />
                    </label>
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>비밀번호</span>
                    <label>
                      <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="비밀번호를 입력해 주세요." />
                    </label>
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>이메일</span>
                    <label>
                      <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder="이메일을 입력해 주세요." />
                    </label>
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>전화번호</span>
                    <label>
                      <input type="tel" name="phone" onChange={handleChange} value={formData.phone} placeholder="전화번호를 입력해 주세요." />
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.btn_wrap}>
                <button type="button" className={styles.next_btn} onClick={async () => { if (await validateStep()) setStep("step2"); }}>다음</button>
              </div>
            </>
          }

          {step === "step2" &&
            <>
              <div className={styles.step2}>
                <div className={styles.input_wrap}>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>닉네임</span>
                    <label>
                      <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="닉네임을 입력해 주세요." />
                    </label>
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.input_title}>생년월일</span>
                    <label>
                      <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                    </label>
                  </div>
                  <div className={`${styles.input_box} ${styles.radio_box}`}>
                    <span className={styles.input_title}>성별</span>
                    <label>
                      <input type="radio" name="gender" value="male" onChange={handleChange} checked={formData.gender === "male"} />
                      <span>남성</span>
                    </label>
                    <label>
                      <input type="radio" name="gender" value="female" onChange={handleChange} checked={formData.gender === "female"} />
                      <span>여성</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.btn_wrap}>
                <button type="button" className={styles.prev_btn} onClick={() => setStep("step1")}>이전</button>
                <button type="button" className={styles.next_btn} onClick={async () => { if (await validateStep()) setStep("step3"); }}>다음</button>
              </div>
            </>
          }

          {step === "step3" &&
            <>
              <div className={styles.step3}>
              </div>
              <div className={styles.btn_wrap}>
                <button type="button" className={styles.prev_btn} onClick={() => setStep("step2")}>이전</button>
                <button type="button" className={styles.complete_btn} onClick={handleSubmit}>회원가입 완료</button>
              </div>
            </>
          }
        </form>
        

          {step === "complete" &&
          <div className={styles.complete_wrap}>
            <p>회원가입이 완료 되었습니다.</p>
          </div>
          }
      </div>
    </section>
  );
}
