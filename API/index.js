import express from "express";
import cors from "cors";

import UserModel from "./models/UserModel.js";
import PageModel from "./models/PageModel.js";
import BookingModel from "./models/BookingModel.js";
const app = express();
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import imageDownloader from "image-downloader";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import mime from "mime-types";
dotenv.config();
const PORT = process.env.PORT;
const bucket = "vel-booking-app";

// Use import.meta.url to get the current module's URL
const __filename = fileURLToPath(import.meta.url);
// Use dirname to extract the directory path
const __dirname = dirname(__filename);
const secretKey = "fjkhjvjkj";

// To generate encrypted passwords
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads/", express.static(__dirname + "/uploads"));

// give access to particular servers only using CORS.
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mar-booking-client.vercel.app"],
    credentials: true,
  })
);

async function uploadToS3(path, originalname, mimetype) {
  const client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}
// to post the user registration details into the database.
app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { name, email, password } = req.body;
  const existingUser = await UserModel.findOne({ name });
  if (existingUser) {
    return res.status(400).json({
      error: "Username already taken. Please choose a different one.",
    });
  }
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
  });
  try {
    res.status(200).send(user);
  } catch (err) {
    console.log("Error creating user");
    res.status(500).send(err);
  }
});

// to check if the user exists in the database in login
app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        secretKey,
        {},
        (err, token) => {
          if (err) {
            throw err;
          }
          res.cookie("token", token).status(200).send(user);
        }
      );
    } else {
      res.status(400).send({
        error: "Incorrect password",
      });
    }
  } else {
    res.status(400).send({
      error: "User not found",
    });
    console.error("User not found");
  }
});

// to delete all users.
app.delete("/users/deleteall", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  try {
    await UserModel.deleteMany({});
    res.status(200).send({
      message: "All users deleted",
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// to get the profile of logged in user
app.get("/profile", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretKey, {}, (err, userdata) => {
      if (err) throw err;
      res.status(200).send(userdata);
    });
  } else {
    res.send(null);
  }
});

// to logout a user we have to reset the cookie
app.post("/logout", (req, res) => {
  mongoose.connect(process.env.MONGODB);
  res.cookie("token", "").json(true);
});

//to post the new image using link.
app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName, //__dirname => full directory path of the folder.
  });
  try {
    const url = await uploadToS3(
      "/tmp/" + newName,
      newName,
      mime.lookup("/tmp/" + newName)
    );
    res.json(url);
  } catch (error) {
    res.status(404).json({
      message: "enter valid URL",
    });
  }
});

const photoMiddleware = multer({ dest: "/tmp" });
// to post the new image from the computer.
app.post("/upload", photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadPhotos = [];
  for (let index = 0; index < req.files.length; index++) {
    const { path, originalname, mimetype } = req.files[index];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadPhotos.push(url);
  }
  res.send(uploadPhotos);
});

// to post all the details of place.
app.post("/place", (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { token } = req.cookies;
  const {
    title,
    address,
    description,
    perks,
    photos,
    extrainfo,
    checkintime,
    checkouttime,
    guests,
    price,
  } = req.body;

  jwt.verify(token, secretKey, {}, async (err, userdata) => {
    if (err) throw err;
    //console.log(userdata);
    const place = await PageModel.create({
      owner: userdata.id,
      title,
      address,
      description,
      photos,
      perks,
      extrainfo,
      checkintime,
      checkouttime,
      guests,
      price,
    });
    res.status(200).send(place);
    // console.log(place.photos);
  });
});

app.get("/user-place", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretKey, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      const places = await PageModel.find({ owner: id });
      res.status(200).send(places);
    });
  } else {
    res.send(null);
  }
});

app.get("/place/:id", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { id } = req.params;
  const places = await PageModel.findById(id);
  res.status(200).send(places);
  console.log(places);
});

app.put("/place", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { token } = req.cookies;
  const {
    id,
    title,
    description,
    address,
    photos,
    guests,
    extrainfo,
    checkintime,
    checkouttime,
    perks,
    price,
  } = req.body;
  jwt.verify(token, secretKey, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await PageModel.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        description,
        perks,
        photos,
        extrainfo,
        checkintime,
        checkouttime,
        guests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/place", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const places = await PageModel.find();
  res.status(200).send(places);
});
app.delete("/place/deleteall", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const del = await PageModel.deleteMany();
  res.status(200).send({
    message: "successfully deleted",
  });
});

app.post("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const {
    place,
    checkIn,
    checkOut,
    guests,
    name,
    mobile,
    price,
    numberOfDays,
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, secretKey, {}, async (err, userdata) => {
    if (err) throw err;
    const booking = await BookingModel.create({
      user: userdata.id,
      place,
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      price,
      numberOfDays,
    });
    res.status(200).send(booking);
  });
});

app.get("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, secretKey, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      const bookings = await BookingModel.find({ user: id }).populate("place");
      res.status(200).send(bookings);
    });
  } else {
    res.send(null);
  }
});

app.get("/bookings/:id", async (req, res) => {
  mongoose.connect(process.env.MONGODB);
  const { id } = req.params;
  const bookings = await BookingModel.findById(id).populate("place");
  res.status(200).send(bookings);
  // console.log(bookings);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
