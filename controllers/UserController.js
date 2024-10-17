import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.js';

export const registr = async(req, res) => {
    try {

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);


    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        role: req.body.role,
    });

    const user = await doc.save();

    const token = jwt.sign({
        role: user.role,
    }, 'secret123',
    {
        expiresIn: '30d',
    }
);
    const {passwordHash, ...userData} = user._doc;

    res.json({
        ...userData,
        token,
    });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегестрироваться',
        });
    }
}

export const login = async(req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email});
        
        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass){
            return res.status(400).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign({
            _id: user._id,
        }, 'secret123',
        {
            expiresIn: '30d',
        }
        );

        const {passwordHash, ...userData} = user._doc;
        // const useremail = req.body.email;
        // req.session.useremail = useremail;
        // req.session.save((err) => {
        //     if (err) {
        //       return res.status(500).json({ error: 'Failed to save session' });
        //     }})
        //console.log(req.session.useremail);
        res.json({               //объект, который отправляется клиенту в ответ на успешную авторизацию
            ...userData,
            token,
            email: user.email
        });

    } catch (err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
}

export const getMe = async( req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
}