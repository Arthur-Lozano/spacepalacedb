const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Float = require("mongoose-float").loadType(mongoose);

require("dotenv").config();

const { ProductSchema } = require("./products-model");

const OrderSchema = new mongoose.Schema(
  {
    products: [ProductSchema],
    totalPrice: Float,
    quantity: Number,
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password."],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    orders: [OrderSchema],
  },
  { timestamps: true }
);

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.virtual("token").get(function () {
  let tokenObject = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
  };
  return jwt.sign(tokenObject, process.env.SECRET);
});

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// BASIC AUTH
UserSchema.statics.authenticateBasic = async function (email, password) {
  const user = await this.findOne({ email: email });
  const valid = await bcrypt.compare(password, user.password);

  if (valid) {
    return user;
  }

  throw new Error("Invalid User");
};

//Bearer Auth
UserSchema.statics.authenticateWithToken = async function (token) {
  try {
    const parsedToken = jwt.verify(token, process.env.SECRET);
    const user = this.findOne({ email: parsedToken.email });
    if (user) {
      return user;
    }
    throw new Error("User Not Found");
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = mongoose.model("User", UserSchema);
