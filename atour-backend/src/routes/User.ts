import * as express from "express";
import { Db } from "mongodb";
import * as uuid from "uuid/v4";

import {
  getUser,
  updateUser,
  updateUserContact,
  saveTour,
  getSavedToursOfUser
} from "../repository/User";

import {
  loginService,
  getUserInfoService,
  updateUserContactService,
  saveTourService,
  getSavedTourService
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

router.post("/saveTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { userId, tourId } = req.body;
    const tours = await saveTourService(saveTour(db))(userId, tourId);
    const results = mapToTourId(tours);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.json({ results: null, error: error.message });
  }
});

router.post("/getSavedTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { userId } = req.body;
    const tours = await getSavedTourService(getSavedToursOfUser(db))(userId);
    const results = mapToTourId(tours);
    res.json(results);
  } catch (error) {
    console.log(error.message);
    res.json({ results: null, error: error.message });
  }
});
export default router;

function mapToTourId(item) {
  return item.map(i => {
    return i.tourId;
  });
}
