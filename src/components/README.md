# components/

Переиспользуемые функциональные компоненты, не привязанные к конкретной странице.

| Компонент | Описание |
|---|---|
| `RequireAuth/` | HOC-обёртка для защищённых маршрутов. Проверяет наличие `accessToken` / `refreshToken` в storage, при необходимости обновляет токен через refresh-эндпоинт. Если авторизация невозможна, перенаправляет на `/login`. |
| `QueryProvider/` | Оборачивает приложение в `QueryClientProvider` из `@tanstack/react-query`. Экземпляр `QueryClient` создаётся один раз за пределами компонента. |
| `PaginationButtons/` | Кнопки пагинации с эллипсисом. Принимает `currentPageNumber`, `totalPages` и `setCurrentPageNumber`. Логика вычисления видимых страниц вынесена в `utils.ts`. |
