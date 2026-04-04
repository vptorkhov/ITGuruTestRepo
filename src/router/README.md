# router/

Конфигурация клиентского роутинга на базе `react-router` v7.

## Маршруты

| Путь | Компонент | Доступ |
|---|---|---|
| `/` | `IndexPage` | Только авторизованным (обёрнут в `RequireAuth`) |
| `/login` | `LoginPage` | Публичный |
| `*` | `NotFoundPage` | Публичный |

## Файл

**`router.tsx`** — создаёт `BrowserRouter` через `createBrowserRouter` и экспортирует экземпляр `router`, который подключается в `main.tsx` через `RouterProvider`.
