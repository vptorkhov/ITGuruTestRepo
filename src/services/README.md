# services/

Слой работы с API. Все запросы выполняются через общий `axiosInstance`. Входные и выходные данные валидируются Zod-схемами.

---

## `axiosInstance.ts`

Создаёт и экспортирует преднастроенный экземпляр `axios` с `baseURL` из переменной окружения `VITE_API_URL`.

---

## `auth/`

| Файл | Содержимое |
|---|---|
| `auth.types.ts` | Zod-схемы и TypeScript-типы для тела запроса (`TAuthBody`), ответа (`TAuthResponse`) и ответа рефреша (`TRefreshAuthResponse`). |
| `auth.service.ts` | `loginUser(data)` — POST `/auth/login`; `refreshAuth(refreshToken)` — POST `/auth/refresh`; `getUserData(accessToken)` — GET `/auth/me`; `getUserDataWithRefresh(...)` — пробует `/auth/me`, при 401 обновляет токен и повторяет. |

---

## `products/`

| Файл | Содержимое |
|---|---|
| `products.types.ts` | Zod-схемы и типы для `TProduct` и `TProductResponse` (список с пагинацией). |
| `products.service.ts` | `getProducts(limit, skip, sortBy, order, search)` — GET `/products` или `/products/search`; `addProduct(data)` — POST `/products/add`. |
