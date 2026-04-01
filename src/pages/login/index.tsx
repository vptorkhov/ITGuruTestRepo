import LoginFormWrap from "./components/LoginFormWrap/LoginFormWrap";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.formWrap}>
        <LoginFormWrap />
      </div>
    </div>
  );
}
