# constants/

Глобальные константы приложения.

| Файл | Экспорт | Описание |
|---|---|---|
| `auth.constants.ts` | `expiresTokenTime` | Время жизни токена в минутах (60). Передаётся в тело запросов `/auth/login` и `/auth/refresh`. |
| `products.constants.ts` | `ProductsPerPage` | Количество товаров на одной странице (20). Используется в запросе `getProducts` и при расчёте пагинации. |
