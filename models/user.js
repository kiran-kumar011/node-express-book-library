var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, unique: true },
	password: { type: String, required: true, minlength: 6 }
})

userSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(saltRounds, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		})
	})
})

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


var User = mongoose.model('User', userSchema);

module.exports = User;