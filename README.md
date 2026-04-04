# ITGuru — Тестовое задание

Небольшое SPA на React + TypeScript. Реализованы две функциональные страницы: **страница входа** и **страница списка товаров** с поиском, сортировкой, пагинацией и добавлением товара.

Данные берутся из публичного REST API [dummyjson.com](https://dummyjson.com).

---

## Технологии и библиотеки

| Библиотека | Назначение |
|---|---|
| React 19 | UI-фреймворк |
| TypeScript | Типизация |
| Vite | Сборщик |
| react-router 7 | Клиентский роутинг |
| @tanstack/react-query 5 | Серверный стейт, кеширование запросов |
| axios | HTTP-клиент |
| react-hook-form | Управление формами |
| zod | Валидация схем данных |
| clsx | Условные CSS-классы |

---

## Команды

```bash
# Установить зависимости
npm install

# Запустить в режиме разработки
npm run dev

# Собрать продакшн-билд
npm run build

# Запустить готовый билд локально
npm run preview
```

---

## Структура `src/`

| Папка | Описание | Документация |
|---|---|---|
| `components/` | Переиспользуемые функциональные компоненты | [components/README.md](src/components/README.md) |
| `constants/` | Глобальные константы | [constants/README.md](src/constants/README.md) |
| `hooks/` | Кастомные React-хуки | [hooks/README.md](src/hooks/README.md) |
| `icons/` | SVG-иконки в виде React-компонентов | [icons/README.md](src/icons/README.md) |
| `pages/` | Страницы приложения | [pages/README.md](src/pages/README.md) |
| `router/` | Конфигурация маршрутов | [router/README.md](src/router/README.md) |
| `services/` | API-сервисы и Zod-схемы | [services/README.md](src/services/README.md) |
| `ui/` | Базовые UI-примитивы | [ui/README.md](src/ui/README.md) |
| `utils/` | Вспомогательные утилиты | [utils/README.md](src/utils/README.md) |