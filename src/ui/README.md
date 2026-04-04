# ui/

Базовые UI-примитивы. Не содержат бизнес-логики и могут быть использованы на любой странице.

---

## `Button/`

Кнопка `<button>`. Пропсы: `text`, `leftIcon`, `rightIcon`, `variant` (`primary` | `neutral`), `styleVariant` (`fill` | `ghost` | `stroke` | `clear`), `size` (`xs` | `s` | `m` | `l`), `disabled`, `onlyIcon`, `onClick`, `type`.

---

## `Checkbox/`

Чекбокс с кастомным стилем. Пропсы: `value`, `onChange`, `label`, `size`, `error`, `disable`, `productCheck` (альтернативный стиль для строк таблицы).

---

## `Input/`

Поле ввода с поддержкой заголовка, иконки, кнопки очистки и показа пароля. Пропсы: `value`, `onChange`, `type` (включая `letters-only`, `digits-only`, `latin-cyrillic-digits-only`), `size`, `error`, `clearBtn`, `onKeyPress` и др.

---

## `Loader/`

Центрированный спиннер загрузки на основе `SpinnerIcon`. Используется в `GoodsList` во время получения данных.

---

## `Toast/`

Всплывающее уведомление, монтируемое через `createPortal`. Пропсы: `title`, `description`, `type` (`success` | `error` | `info`), `active`, `onClose`, `timeout`. Автоматически скрывается по истечении `timeout` (по умолчанию 3000 мс).
