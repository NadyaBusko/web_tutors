import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');
            console.log(decoded);

            if (decoded.role === 'admin') {
                return next();
            } else {
                return res.status(403).json({ 
                    message: "Нет доступа 1" 
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(403).json({
                 message: "Нет доступа" 
                });
        }
    } else {
        return res.status(403).json({ 
            message: "Нет доступа" 
        });
    }
};