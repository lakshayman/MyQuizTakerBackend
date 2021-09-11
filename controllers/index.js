const User = require('../models/User');
const Quizes = require('../models/Quizes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
   createJWT,
} = require("../utils/auth");

exports.addQuiz = (req, res) => {
  let { userId, title, quizElements } = req.body;
  Quizes.findOne({userId: userId}).then(quizes => {
    if(quizes){
      Quizes.findOneAndUpdate({userId: userId}, {
        quizes: [...quizes.quizes, {title: title, quizElements: quizElements}]
      }).then(q => {
        if(q){
          res.status(200).json({
            userId: q.userId,
            quizes: q.quizes
          });
        }else{
          return res.status(404).json({errors: [{ quizes: "not Updated" }],});
        }
      }).catch(err => {
        res.status(500).json({ erros: err });
      });
    }else{
      return res.status(404).json({errors: [{ quizes: "not found" }],});
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}

exports.getQuizes = (req, res) => {
  let { userId } = req.body;
  Quizes.findOne({userId: userId}).then(quizes => {
    if(quizes){
      res.status(200).json({
        userId: quizes.userId,
        quizes: quizes.quizes
      });
    }else{
      return res.status(404).json({errors: [{ quizes: "not found" }],});
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}

exports.login = (req, res) => {
    let { emailid, password } = req.body;
    let errors = [];
    if (!emailid) {
      errors.push({ emailid: "required" });
    }
    if (!password) {
      errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
     return res.status(422).json({ errors: errors });
    }
    User.findOne({ emailid: emailid }).then((user) => {
      if (!user) {
        return res.status(404).json({errors: [{ user: "not found" }],});
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ errors: [{ password: "incorrect" }] });
        }
        let access_token = createJWT(
          user.emailid,
          user.name,
          user._id,
          "365d",
        );
        jwt.verify(access_token, "process.env.TOKEN_SECRET", (err,decoded) => {
        if (err)
          return res.status(500).json({ errors: err });
        if (decoded) {
          return res.status(200).json({
            success: true,
            token: access_token,
            message: user
          });
        }
        });
        });
    }
  }).catch(err => {
    res.status(500).json({ erros: err });
  });
}

exports.signup = (req, res) => {
  let { name, emailid, password, password_confirmation } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!emailid) {
    errors.push({ emailid: "required" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
     password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
  User.findOne({emailid: emailid})
    .then(user=>{
      if(user){
        return res.status(422).json({ errors: [{ user: "emailid already exists" }] });
      }else {
        const user = new User({
          name: name,
          emailid: emailid,
          password: password,
        });
      bcrypt.genSalt(10, function(err, salt) { 
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) throw err;
          user.password = hash;
          user.save()
            .then(response => {
              const quiz = new Quizes({
                userId: response._id,
                quizes: []
              })
              quiz.save();
              res.status(200).json({
                success: true,
                result: response
              })
            })
            .catch(err => {
              res.status(500).json({
                errors: [{ error: err }]
              });
            });
         });
      });
    }
  }).catch(err =>{
      res.status(500).json({
        errors: [{ error: 'Something went wrong' }]
      });
  })
}