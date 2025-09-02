import Link from 'next/link';
import styles from './page.module.scss';
export default function Page() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inbox}>
        <h2 className={styles.title}>안녕하세요😉</h2>
        <div className={styles.btn_wrap}>
          <Link href="/login" className={styles.login_btn}>로그인</Link>
          <Link href="/join" className={styles.join_btn}>회원가입</Link>
        </div>
      </div>
    </div>
  );
}
