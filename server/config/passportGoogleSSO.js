const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const url = require("./url");
// const { sendRegisterMail } = require("../services/Mail");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: url.urlServer() + "/auth/google/callback"
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                }

                try {
                    let user = await User.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await User.create(newUser)
                        sendRegisterMail(user.email);
                        done(null, user)
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    })
}