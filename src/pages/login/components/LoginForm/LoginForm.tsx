import Input from "@/ui/Input/Input";
import styles from "./LoginForm.module.css";
import UserIcon from "@/icons/UserIcon";
import { LoginFormSchema } from "./types";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LockIcon from "@/icons/LockIcon";
import Checkbox from "@/ui/Checkbox/Checkbox";
import Button from "@/ui/Button/Button";
import clsx from "clsx";

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
    reset,
  } = formMethods;

  const dataInForm = useWatch({ control });

  async function onSubmit() {
    await trigger();
    if (isValid) {
      try {
        console.log("успешный логин", dataInForm);
      } catch (error) {
        console.log(error);
      } finally {
        reset();
      }
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
              clearBtn
              icon={<UserIcon />}
              onBlur={() => trigger("login")}
              error={errors?.login}
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
              icon={<LockIcon />}
              type="password"
              onBlur={() => trigger("password")}
              error={errors?.password}
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
          />
        )}
      />
      <Button text="Войти" size="l" className={styles.btn} onClick={onSubmit} />
      <div className={styles.orWrap}>
        <div className={styles.orWrapLine}></div>
        <div className={clsx(styles.orText, "text-l")}>или</div>
        <div className={styles.orWrapLine}></div>
      </div>
    </div>
  );
}
