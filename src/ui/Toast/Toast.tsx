import { useEffect, useRef, useState } from "react";
import styles from "./toast.module.css";
import cx from "clsx";
import { createPortal } from "react-dom";
import AlertSuccess from "@/icons/AlertSuccess";
import AlertError from "@/icons/AlertError";
import CloseAlert from "@/icons/CloseAlert";
import AlertInfoIcon from "@/icons/AlertInfoIcon";

type TToast = {
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  active: boolean;
  timeout?: number;
  noTimeout?: boolean;
  addClass?: string;
};

export default function Toast({
  title,
  description,
  type = "success",
  addClass,
  onClose,
  active,
  timeout = 3000,
  noTimeout,
}: TToast) {
  const notificationRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const subtimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  function closeAlert() {
    notificationRef?.current?.classList.remove(styles["notification--visible"]);
    subtimer.current = setTimeout(() => onClose(), 300);
  }

  useEffect(() => {
    clearTimeout(timer.current);
    clearTimeout(subtimer.current);
    if (active) {
      notificationRef?.current?.classList.add(styles["notification--active"]);
      setTimeout(
        () =>
          notificationRef?.current?.classList.add(
            styles["notification--visible"],
          ),
        0,
      );
      if (!noTimeout) {
        timer.current = setTimeout(() => {
          notificationRef?.current?.classList.remove(
            styles["notification--visible"],
          );
          notificationRef?.current?.classList.remove(
            styles["notification--active"],
          );
          subtimer.current = setTimeout(() => onClose(), 300);
        }, timeout);
      }
    } else {
      notificationRef?.current?.classList.remove(
        styles["notification--visible"],
      );
      notificationRef?.current?.classList.remove(
        styles["notification--active"],
      );
    }
  }, [active, mounted]);

  useEffect(() => {
    setMounted(true);
    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(
        <div
          ref={notificationRef}
          className={cx(styles.notification, addClass, "trd")}
        >
          <div className={styles["left-row"]}>
            <div className={styles.notificationIcon}>
              {type === "success" && <AlertSuccess />}
              {type === "error" && <AlertError />}
              {type === "info" && <AlertInfoIcon />}
            </div>
            <div className={styles.notificationTextRow}>
              <div className={cx(styles.notificationTitle, "text-l-semi")}>
                {title}
              </div>
              {description && (
                <div
                  className={cx(styles.notificationDescription, "text-m")}
                  dangerouslySetInnerHTML={{
                    __html: description || "",
                  }}
                />
              )}
            </div>
          </div>
          <div className={styles.closeBtn}>
            <button type="button" onClick={closeAlert}>
              <CloseAlert />
            </button>
          </div>
        </div>,
        document.body,
      )
    : null;
}
