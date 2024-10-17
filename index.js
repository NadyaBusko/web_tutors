import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
//import session from 'express-session';
//import cors from 'cors';

import {UserController, RepetitorController, ApplicationController} from './controllers/index.js';
import { checkAuth, checkRole} from './utils/index.js';
import Application from './models/application.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose
.connect('mongodb+srv://nadyaoj4:jodena@cluster0.bgppw24.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0',)
.then(() => console.log('База данных подключена'))
.catch((err) => console.log('Ошибка подключения базы данных', err));

const app = express();

// Настройка express-session
// app.use(session({
//     secret: 'your-secret-key', // Секретный ключ для подписи сессии
//     resave: true,
//     saveUninitialized: false,
// }));

// const corsOptions = {
//   origin: 'http://localhost:4444', // Замените на ваш клиентский URL
//   credentials: true, // Важно для отправки куки
// };
// app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'resources');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const resource = multer({storage});

app.use(express.json());
app.use(express.static('pages', {
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (path.endsWith('.js')) {
        res.setHeader('Content-Type', 'text/javascript');
      }
    }
  }));
  app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/resources', express.static(path.join(__dirname, 'resources')));

app.post('/auth/login',UserController.login);
app.post('/auth/registr',UserController.registr);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/resource', resource.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
  }
  res.json({
      url: `/resources/${req.file.originalname}`,
  });
});


app.get('/pages/:page', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', `${req.params.page}`));
  });


app.post('/repetitors', RepetitorController.create);
app.get('/repetitors', RepetitorController.getAll);
app.get('/repetitors/:surname', RepetitorController.getOne);
app.post('/repetitors/:surname', RepetitorController.remove);
app.post('/repetitors/change/:surname', RepetitorController.update);
app.get('/repetitors/sort/:sortBy1/:sortBy2/:sortBy3', RepetitorController.sort);

app.post('/applications', ApplicationController.create);
app.get('/applications', ApplicationController.getAll);
app.post('/applications/:id', ApplicationController.remove);
app.put('/applications/:id/status', (req, res) => {
  const applicationId = req.params.id;
  const newStatus = req.body.status;

  Application.findByIdAndUpdate(applicationId, { status: newStatus }, { new: true })
      .then((updatedApplication) => {
          if (!updatedApplication) {
              return res.status(404).send({ message: 'Заявка не найдена' });
          }
          res.json(updatedApplication);
      })
      .catch((err) => {
          console.error('Ошибка обновления статуса', err);
          res.status(500).send({ message: 'Ошибка обновления статуса' });
      });
});

app.get('/repetitors/sort/requests', RepetitorController.sortRepetitors);

app.get('/main', (req, res) => {
    res.sendFile('pages/main.html', { root : path.resolve(__dirname)});
})


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Сервер успешно запущен');
});