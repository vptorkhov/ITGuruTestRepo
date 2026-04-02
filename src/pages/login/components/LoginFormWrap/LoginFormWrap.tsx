import LogoIcon from "@/icons/LogoIcon";
import styles from "./LoginFormWrap.module.css";
import clsx from "clsx";
import { Link } from "react-router";
import LoginForm from "../LoginForm/LoginForm";

export default function LoginFormWrap() {
  return (
    <div className={styles.block}>
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <LogoIcon />
        </div>
        <div className={styles.titleWrap}>
          <div className="h2">Добро пожаловать!</div>
          <div className="text-xl text-secondary">
            Пожалуйста, авторизируйтесь
          </div>
        </div>
        <LoginForm />
        <div className={clsx(styles.createLogin, "text-xl text-secondary")}>
          Нет аккаунта?{" "}
          <Link to="#" className="text-primary text-semi underline">
            Создать
          </Link>
        </div>
      </div>
    </div>
  );
}
