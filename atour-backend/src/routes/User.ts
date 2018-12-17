import * as express from "express";
import { Db } from "mongodb";
import * as uuid from "uuid/v4";

import { getUser, updateUser, updateUserContact } from "../repository/User";

import {
  loginService,
  getUserInfoService,
  updateUserContactService
} from "../service/UserService";
import { searchTourService, searchUserService } from "../service/SearchService";
import { searchTour, searchUser } from "../repository/Search";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { userInfo } = req.body;
    const user = await loginService(updateUser(db))(userInfo, uuid());
    res.json(user);
  } catch (error) {
    res.json({ token: null, error: error.message });
  }
});

router.post("/updateUserContact", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const {
      token,
      userInfo,
      userInfo: { userId }
    } = req.body;
    const user = await db.collection("user").findOne({ userId });
    if (user.token !== token) {
      res.json({ error: "token doesn't match" });
      return;
    }
    const newUser = await updateUserContactService(updateUserContact(db))(
      userId,
      userInfo
    );
    res.json(newUser);
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.get("/searchTours", async (req, res) => {
  const db: Db = res.locals.db;
  const cursor = await db.collection("tour").find();
  const tours = await cursor.toArray();
  res.json(tours);
});

router.post("/getUserInfo", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { userId } = req.body;
    const results = await getUserInfoService(getUser(db))(userId);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.error.message });
  }
});

router.post("/searchTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { keyword } = req.body;
    const results = await searchTourService(searchTour(db))(keyword);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.json({ results: null, error: error.message });
  }
});

router.post("/searchUser", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { keyword } = req.body;
    const results = await searchUserService(searchUser(db))(keyword);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.json({ results: null, error: error.message });
  }
});

export default router;
