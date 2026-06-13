import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//Create Schema

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, length: 10 },
  password: { type: String, required: true, minlength: 6 },
  isArtist: { 
    type: Boolean, 
    default: false,
    validate: {
      validator: function(v) {
        if (v === true) {
          return this.artistName && this.artistDescription;
        }
        return true;
      },
      message: 'Artist name and description are required when isArtist is true'
    }
  },
  artistName: { 
    type: String,
    validate: {
      validator: function(v) {
        if (this.isArtist === true) {
          return v && v.length > 0;
        }
        return true;
      },
      message: 'Artist name is required when isArtist is true'
    }
  },
  artistDescription: { 
    type: String,
    validate: {
      validator: function(v) {
        if (this.isArtist === true) {
          return v && v.length > 0;
        }
        return true;
      },
      message: 'Artist description is required when isArtist is true'
    }
  },
  createOn: { type : Date, default: new Date().getTime() },
  resetTokenHash: { type: String, select: false },
  resetTokenExpires: { type: Date, select: false },
});

//Hash password

UserSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})





//User schema

export const User = model("User" , UserSchema);