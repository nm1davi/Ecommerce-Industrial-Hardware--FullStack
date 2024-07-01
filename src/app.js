import express from 'express';
import handlebars from 'express-handlebars';
import sessions from 'express-session';
import passport from 'passport';
import path from 'path';
import MongoStore from 'connect-mongo';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import indexRouter from './routers/index.router.js';
import sessionsRouter from './routers/sessions.router.js';
import cartRouter from './routers/cart.router.js';
import productRouter from './routers/product.router.js';
import notificationRouter from './routers/notifications.router.js';
import userRouter from './routers/user.router.js';

import { errorHandlerMiddleware} from './middlewares/errorHandlerMiddleware.js'
import { __dirname } from './utils/utils.js';
import { URI } from './db/mongodb.js';
import { init as initPassport} from './config/passport.config.js'
import { addLogger } from './config/logger.js';

const app = express();

const SESSION_SECRET = '|7@3BBY5jH:@zFQIg_v47HkKP5S#p&Uc';


app.use(addLogger);

app.use(sessions({
  store: MongoStore.create({
    mongoUrl: URI,
    mongoOptions: {},
    ttl: 60*30,
  }), 
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../public')));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'handlebars');

initPassport();
app.use(passport.initialize());
app.use(passport.session())

//Documentacion de API
if (process.env.NODE_ENV !== 'production') {
  const swaggerOpts = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Ecommerce API',
        description: '<h2>Esta es la documentación de la API de Ecommcerce. Una aplicación para comprar productos 🛠.</h2>',
      },
    },
    apis: [path.join(__dirname, '..', 'docs', '**', '*.yaml')],
  };
  const specs = swaggerJsDoc(swaggerOpts);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/', indexRouter);
app.use('/api', sessionsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/product', productRouter);
app.use('/api/users', userRouter);
app.use('/api/notification', notificationRouter);


app.use(errorHandlerMiddleware);

export default app;