import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {Strategy as GithubStrategy} from 'passport-github2'
import UserModel from "../dao/models/user.model.js";
import {createHash, isValidPassword} from '../utils/utils.js'
import { logger } from "./logger.js";

//Vamos a confiugar el passport
export const init = () => {
      const registerOpts = {
            usernameField: 'email',
            passReqToCallback: true,
      };
      passport.use('register', new LocalStrategy(registerOpts, async (req, email, password, done) => {
            const {
                  body: { first_name, last_name, age },
            } = req;
            if (!first_name || !last_name) {
                  return done(new Error('Todos los campos son requeridos.'));
            }
            const user = await UserModel.findOne({ email })
            if (user) {
                  return done(new Error(`Ya existe el usuario con el correo ${email} en el sistema`));
            }
            const newUser = await UserModel.create({
                  first_name,
                  last_name,
                  email,
                  password: createHash(password),
                  age,
            });
            done(null, newUser);
      }));
      passport.use('login', new LocalStrategy({usernameField: 'email'}, async(email, password, done)=>{
            const user = await UserModel.findOne({ email});
            if(!user) {
                  logger.error('Correo o Contraseña invalidos.');
                  return done(new Error('Correo o Contraseña invalidos.'));
            }
            const isNotValidPass = !isValidPassword(password, user)
            if(isNotValidPass) {
                  logger.error('Correo o Contraseña invalidos.');
                  return done(new Error('Correo o Contraseña invalidos.'));
            }
            done(null, user);
      }));

      const githubOpts = {
            
            clientID: "Iv1.4354af7a77f3e166",
            clientSecret: "74ea0a09ddc9d6fe58259d1278b6cf47d2d8e64d",
            callbackURL: "http://localhost:8080/api/sessions/github/callback",
          };
          passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshToken, profile, done) => {
            const email = profile._json.email;
            let user = await UserModel.findOne({ email });
            if (user) {
              return done(null, user);
            }
            user = {
              first_name: profile._json.name,
              last_name: '',
              email, 
              password: '',
              age: 18,
            };
            const newUser = await UserModel.create(user);
            done(null, newUser);
          }));
      
      passport.serializeUser((user, done) =>{
            done(null, user._id);
      });
      passport.deserializeUser(async(uid, done) =>{ //Inflar sesion
            const user = await UserModel.findById(uid);
            done(null, user);
      });
};

