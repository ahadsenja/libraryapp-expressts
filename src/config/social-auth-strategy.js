import passport from 'passport';

const GithubStrategy = require('passport-github2').Strategy;

export const githubAuthStrategy = (passport, strategy) => {
  console.log('exported from social auth strategy');
  passport.use(new GithubStrategy(
    {
      clientID: '52d790b26ee61d7cc119',
      clientSecret: 'db353b8e1b75c97d68064db95b75feddf9c2b8d1',
      callbackURL: 'http://localhost:8000/api/v1/auth/github'
    },

    (accessToken, refreshToken, profile, callbcak) => {
      console.log(null, profile)
    },
    console.log('Ini juga')
  ))
}
