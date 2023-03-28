const User = require("../models/user.model")
const LocalStrategy = require("passport-local").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const { ExtractJwt } = require("passport-jwt")
const bcrypt = require("bcrypt")

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password",
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email })
                    if (!user) return done(null, false)
                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    )
                    if (!isMatch) return done(null, false)

                    return done(null, user)
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )

    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: "tes",
            },
            async (jwtPayload, done) => {
                try {
                    const user = jwtPayload
                    done(null, user)
                } catch (error) {
                    done(error, false)
                }
            }
        )
    )
}
