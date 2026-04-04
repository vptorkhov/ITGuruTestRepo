import Input from "@/ui/Input/Input";
import styles from "./LoginForm.module.css";
import UserIcon from "@/icons/UserIcon";
import { LoginFormSchema, type TLoginFormData } from "./types";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "@/icons/LockIcon";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Button from "@/ui/Button/Button";
import clsx from "clsx";
import { loginUser } from "@/services/auth/auth.service";
import { serializeLoginBodyData } from "./utils";
import {
  isAxiosError,
  removeStorageData,
  saveStorageData,
} from "@/utils/utils";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const formMethods = useForm({
    defaultValues: {
      login: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const {
    control,
    formState: { isValid, errors },
    trigger,
    setError,
  } = formMethods;

  const dataInForm = useWatch({ control });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit() {
    await trigger();
    if (isValid) {
      setIsLoading(true);
      try {
        const res = await loginUser(
          serializeLoginBodyData(dataInForm as TLoginFormData),
        );
        saveStorageData(
          "token",
          res.accessToken,
          dataInForm?.rememberMe ?? false,
        );
        saveStorageData(
          "refreshToken",
          res.refreshToken,
          dataInForm?.rememberMe ?? false,
        );
        if (dataInForm?.rememberMe) {
          saveStorageData("rememberMe", "true", true);
        } else {
          removeStorageData("rememberMe");
        }
        navigate("/");
      } catch (error) {
        if (isAxiosError<{ message: string }>(error)) {
          console.log(error.response?.data?.message);
          setError("login", {
            message: error.response?.data?.message ?? "Ошибка при входе",
          });
        } else {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleKeyPress() {
    if (isValid) {
      onSubmit();
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.input}>
        <Controller
          name="login"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите логин"
              size="l"
              title="Логин"
              name="login"
              clearBtn
              icon={<UserIcon />}
              onBlur={() => trigger("login")}
              error={errors?.login}
              onKeyPress={handleKeyPress}
            />
          )}
        />
      </div>
      <div className={styles.input}>
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={onChange}
              placeholder="Введите пароль"
              size="l"
              title="Пароль"
              name="password"
              icon={<LockIcon />}
              type="password"
              onBlur={() => trigger("password")}
              error={errors?.password}
              onKeyPress={handleKeyPress}
            />
          )}
        />
      </div>
      <Controller
        name="rememberMe"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            onChange={onChange}
            label={
              <span className="text-l text-secondary">Запомнить меня</span>
            }
            size="m"
            name="rememberMe"
          />
        )}
      />
      <Button
        text="Войти"
        size="l"
        className={styles.btn}
        onClick={onSubmit}
        disabled={isLoading}
      />
      <div className={styles.orWrap}>
        <div className={styles.orWrapLine}></div>
        <div className={clsx(styles.orText, "text-l")}>или</div>
        <div className={styles.orWrapLine}></div>
      </div>
    </div>
  );
}
