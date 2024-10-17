import { body } from 'express-validator'

export const loginValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
];

export const registrValidation = [
    body('email','Неверный формат почты').isEmail(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({ min: 5 }),
    body('fullName','Имя должно содержать минимум 2 символа').isLength({ min: 2 }),
];

export const repetitorCreateValidation = [
    body('coverUrl', 'Неверная ссылка').isString({min: 2}),
    body('name', 'Введите имя').isLength({min: 2}).isString(),
    body('surname', 'Введите фамилию').isLength({min: 3}).isString(),
    body('email','Неверный формат почты').isEmail(),
    body('person', 'Выберите пол').isString(),
    body('experience', 'Введите стаж работы').isNumeric({min: 0, max: 100}),
    body('subjects', 'Выберите предмет').isString(),
    body('programmes', 'Введите программу').isString(),
];