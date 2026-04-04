# utils/

Вспомогательные утилиты общего назначения.

## `utils.ts`

| Функция | Описание |
|---|---|
| `isAxiosError<T>(error)` | Type guard — проверяет, является ли `error` экземпляром `AxiosError<T>`. |
| `getStorageData(name)` | Читает значение из `localStorage`, при отсутствии — из `sessionStorage`. |
| `saveStorageData(name, value, rememberMe)` | Сохраняет значение в `localStorage` (если `rememberMe = true`) или в `sessionStorage`. |
| `removeStorageData(name)` | Удаляет значение из обоих хранилищ одновременно. |
