import passport from 'passport';
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser((user, callback) => {
  callback(null, user.id);
  console.log('User id: ', user.id);
});

passport.deserializeUser((id, callback) => {
  callback(null, id);
  console.log('User id 2: ', id);
});

export const githubAuthStrategy = (passport, strategy) => {
  passport.use(new GithubStrategy(
    {
      clientID: '52d790b26ee61d7cc119',
      clientSecret: 'db353b8e1b75c97d68064db95b75feddf9c2b8d1',
      callbackURL: 'http://localhost:8000/api/v1/auth/github/callback'
    },

    (accessToken, refreshToken, profile, callback) => {
      console.log('Printed Profile: ', profile);
      callback(null, profile);
    }
  ))
}

export const facebookAuthStrategy = (passport, strategy) => {
  passport.use(new FacebookStrategy(
    {
      clientID: '1065788820633925',
      clientSecret: '4037dc18880cc12ab1ae4d731a4d263a',
      callbackURL: 'http://localhost:8000/api/v1/auth/facebook/callback'
    },

    (accessToken, refreshToken, profile, callback) => {
      console.log('Printed FB Profile: ', profile);
      // callback(null, profile);
    }
  ))
}
