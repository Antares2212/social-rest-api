export const ErrorMsg = {
  // Дефолтные
  ValidationError: 'Ошибка валидации',
  FatalErrorServer: 'Критическая ошибка сервера',

  // Валидация
  UserNameMin: (n: number) => `Имя пользователя должен быть длиннее или равно ${n} символам`,
  UserNameEmpty: 'Имя пользователя не указано',
  UserEmailEmpty: 'Почта пользователя не указана',
  UserEmailValid: 'Почта пользователя не валидна',
  UserPasswordMin: (n: number) => `Пароль должен быть длиннее или равен ${n} символам`,
  UserPasswordEmpty: 'Пароль пользователя не указан',

  // Запросы
  UserNotFound: 'Пользователь не найден',
}