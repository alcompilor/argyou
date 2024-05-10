import mongoose from "mongoose";
import bcrypt from "bcrypt";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;'?/><.,])(?!.*\s).{10,}$/;
const usernameRegex = /^[a-zA-Z0-9]+(?:[_-]?[a-zA-Z0-9]+)*$/;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [usernameRegex, "Please fill a valid username"],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: [emailRegex, "Please fill a valid email address"],
    },
    birthDate: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      match: [passwordRegex, "Password is not strong enough"],
    },
    gender: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: Buffer,
    },
    debates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "debates",
      },
    ],
    inDebate: {
      type: Boolean,
      default: false,
    },
    specialization: {
      type: String,
      enum: {
        values: [
          "Policy Debator",
          "Value Debator",
          "Fact-Value Policy Debator",
          "Lincoln-Douglas Debator",
          "Public Form Debator",
          "Parliamentary Debator",
          "Mock Trial Debator",
          "Science and Technology Debator",
          "Ethics Debator",
        ],
        message: "Specialization not found.",
      },
    },
    notifications: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: {
              values: ["read", "unread"],
              message: "Invalid status."
            },
            default: "unread"
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
    owner: {
      type: String,
      default: function () {
        return this.username;
      },
      immutable: true,
      validate: {
        validator: function (owner) {
          return owner === this.username;
        },
        message: "Owner must match username",
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const data = this.getUpdate();

  if (data.password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
  }
  next();
});

const User = mongoose.model("users", userSchema);
export default User;
