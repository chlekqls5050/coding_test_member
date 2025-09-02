'use client';
import { supabase } from "@/lib/supabaseClient";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<"step1" | "step2" | "step3" | "complete">("step1");

  const handleSubmit = () => {
    setStep("complete");
  };
  return (
    <section className={styles.join_wrap}>
      <div className={styles.inbox}>
        <form id="">
          {step === "step1" ? 
          <>
          <div className={styles.step1}>
            <div className={styles.title_wrap}>
              <h3>STEP01</h3>
            </div>
            <div className={styles.input_wrap}>
              <div className={styles.input_box}>
                <label>
                  <span>아이디</span>
                  <input type="text" name="id" placeholder="아이디를 입력해 주세요." />
                </label>
              </div>
              <div className={styles.input_box}>
                <label>
                  <span>비밀번호</span>
                  <input type="password" name="password" placeholder="비밀번호를 입력해 주세요." />
                </label>
              </div>
              <div className={styles.input_box}>
                <label>
                  <span>이메일</span>
                  <input type="email" name="email" placeholder="이메일을 입력해 주세요." />
                </label>
              </div>
              <div className={styles.input_box}>
                <label>
                  <span>전화번호</span>
                  <input type="tel" name="phone" placeholder="전화번호를 입력해 주세요." />
                </label>
              </div>
            </div>
          </div>
          <div className={styles.btn_wrap}>
            <button type="button" onClick={()=>setStep("step2")}>다음</button>
          </div>
          </>
          :step === "step2" ? 
          <>
          <div className={styles.step2}>
            <div className={styles.title_wrap}>
              <h3>STEP02</h3>
            </div>
            <div className={styles.input_wrap}>
              <div className={styles.input_box}>
                <label>
                  <span>생년월일</span>
                  <input type="date" name="birth" placeholder="생년월일을 입력해 주세요." />
                </label>
              </div>
              <div className={`${styles.input_box} ${styles.radio_box}`}>
                <label>
                  <input type="radio" name="gender" value="male" />
                  남성
                </label>
                <label>
                  <input type="radio" name="gender" value="female" />
                  여성
                </label>
              </div>
            </div>
          </div>
          
          <div className={styles.btn_wrap}>
            <button type="button" onClick={()=>setStep("step1")}>이전</button>
            <button type="button" onClick={()=>setStep("step3")}>다음</button>
          </div>
          </>
          :step === "step3" ?
          <>
          <div className={styles.step3}>
            <button>카카오</button>
            <button>구글</button>
            <button>네이버</button>
          </div>

          <div className={styles.btn_wrap}>
            <button type="button" onClick={()=>setStep("step2")}>이전</button>
            <button type="button" onClick={handleSubmit}>회원가입 완료</button>
          </div>
          </>
          :
          <p>회원가입 완료</p>
          }
        </form>
      </div>
    </section>
  );
}
