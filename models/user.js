const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'please provide a valid email',
            isAsync: false
        }
    },
    role: {
      type: String,
      enum: ['customer', 'designer', 'employee', 'admin'],
      default: 'customer'
    },
    password: String,
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    phone: {
        type: String,
        required: true,
        minlength: 11,
        unique: true,
        trim: true,
      }
})

userSchema.pre('save',  async function (next) {
    if (!this.isModified('password')) return next()
    this.password =  await bcrypt.hash(this.password, 12)
    next()
  })
  

  userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
  })
  
  
  userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword)
  }
  
  userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = this.passwordChangedAt.getTime() / 1000
      return JWTTimeStamp < changedTimeStamp
    }
  
    // password hasn't been changed
    return false
  }
  
  userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')
  
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000
    return resetToken
  }
  

const User = mongoose.model('User', userSchema)
module.exports = User