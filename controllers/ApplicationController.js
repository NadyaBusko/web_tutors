import ApplicationModel from '../models/application.js';

export const create = async (req, res) => {
    try{
        const doc = new ApplicationModel({
            useremail: req.body.useremail,
            userName: req.body.userName,
            email: req.body.email,
            name: req.body.name,
            surname: req.body.surname,
            subjects: req.body.subjects,
            programmes: req.body.programmes,
        });

        const apllication = await doc.save();
        
        res.json(apllication);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить заявку',
       });
    }
};

export const getAll = async (req, res) => {
    try{
        const applications = await ApplicationModel.find();

        //const user = req.session.useremail;
        //console.log(user);
        //const applications = await ApplicationModel.find({ useremail: user });

        res.json(applications);
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить заявки',
       });
    }
};

// export const dataemail = async (req, res) =>{
//     try {
//         const { useremail } = req.body;

//   // Записать этот объект в сессию
//         req.session.useremail = useremail;

//     } catch(err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Не удалось получить почту',
//        });
//     }
// }

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedRepetitor = await ApplicationModel.findOneAndDelete({ 
            _id: id,
         });

        if (!deletedRepetitor) {
            return res.status(404).json({
                 message: 'Не удалось найти заявку',
                 });
        }

        res.json({ 
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Не удалось удалить заявку',
         });
    }
};
