import { Router } from 'express';
import SessionsController from '../controllers/sessions.controllers.js';
import passport from 'passport';

const router = Router();

router.post("/sessions/login", passport.authenticate('login', {failureRedirect: '/login'}), async (req, res) => {
    try {
        const redirectPath = await SessionsController.loginUser(req);
        res.redirect(redirectPath);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/sessions/register", async (req, res) => {
    try {
        const redirectPath = await SessionsController.registerUser(req);
        res.redirect(redirectPath);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/sessions/recovery-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        const redirectPath = await SessionsController.recoverPassword(email, password);
        res.redirect(redirectPath);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/sessions/profile", async (req, res) => {
    try {
        const profile = await SessionsController.viewProfile(req.session);
        res.status(200).json(profile);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.get("/session/logout", async (req, res) => {
    try {
        const redirectPath = await SessionsController.logoutUser(req);
        res.redirect(redirectPath);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/sessions/github', passport.authenticate('github', { scope: ['user:email']}));

router.get('/sessions/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/profile');
});

export default router;
