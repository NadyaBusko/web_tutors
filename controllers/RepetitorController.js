import RepetitorModel from '../models/repetitor.js';

export const create = async (req, res) => {
    try{
        const doc = new RepetitorModel({
            coverUrl: req.body.coverUrl,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            person: req.body.person,
            experience: req.body.experience,
            subjects: req.body.subjects,
            programmes: req.body.programmes,
        });

        const repetitor = await doc.save();
        
        res.json(repetitor);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить репетитора',
       });
    }
};

export const getAll = async (req, res) => {
    try{
        const repetitors = await RepetitorModel.find();

        res.json(repetitors);
    }catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить репетиторов',
       });
    }
};

export const getOne = async (req, res) => {
    const repetitorSurname = req.params.surname;
    
    try {
        const doc = await RepetitorModel.findOneAndUpdate(
            { surname: repetitorSurname },
            { $inc: { requestCount: 1 } },
            { returnDocument: 'after' }
        ).exec();

        if (!doc) {
            return res.status(404).json({
                message: 'Репетитор не найден'
            });
        }

        res.json(doc);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Не удалось получить репетитора'
        });
    }

};

export const remove = async (req, res) => {
    try {
        const repetitorSurname = req.params.surname;
        
        const deletedRepetitor = await RepetitorModel.findOneAndDelete({ 
            surname: repetitorSurname,
         });

        if (!deletedRepetitor) {
            return res.status(404).json({
                 message: 'Не удалось найти репетитора',
                 });
        }

        res.json({ 
            success: true,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Не удалось удалить репетитора',
         });
    }
};

export const update = async (req, res) => {
    try{
        const repetitorSurname = req.params.surname;

        await RepetitorModel.updateOne({
            surname: repetitorSurname,
        },
        {
            coverUrl: req.body.coverUrl,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            person: req.body.person,
            experience: req.body.experience,
            subjects: req.body.subjects,
            programmes: req.body.programmes,
        });
        res.json({
            success: true,
        })
    } catch(err){
        console.error(err);
        res.status(500).json({ 
            message: 'Не удалось обновить репетитора',
         });
    }
}

export const sort = async (req, res) => {
    const sortBy1 = req.params.sortBy1;
    const sortBy2 = req.params.sortBy2;
    const sortBy3 = req.params.sortBy3;

    try {
        let sortedRepetitors;
        if(sortBy3 != 'Любой'){
            sortedRepetitors = await RepetitorModel.find({ subjects: sortBy1, programmes: sortBy2, person: sortBy3 });
            res.json(sortedRepetitors);
        }
        else {
            sortedRepetitors = await RepetitorModel.find({ subjects: sortBy1, programmes: sortBy2});
            res.json(sortedRepetitors);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Ошибка при сортировке репетиторов'
        });
    }
};

export const sortRepetitors = async (req, res) => {
    try {
        const repetitors = await RepetitorModel.find().sort({ requestCount: -1 }).exec();
        res.json(repetitors);
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Ошибка при сортировке репетиторов'
        });
    }
};