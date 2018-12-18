import * as express from "express";
import * as uuid from "uuid/v4";
import { Db } from "mongodb";
import {
  publishTourService,
  editTourService,
  deleteTourService
} from "../service/TourService";
import { saveTour, updateTour, deleteTour } from "../repository/Tour";
import { updatePublishedTourOfUser } from "../repository/User";
const router = express.Router();

router.post("/publishTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tour } = req.body;
    tour.tourId = uuid();
    tour.isPublished = true;
    const tours = await publishTourService(
      saveTour(db),
      updatePublishedTourOfUser(db)
    )(tour);
    res.json(tours);
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
});

router.post("/editTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tour } = req.body;
    const newTour = await editTourService(
      updateTour(db),
      updatePublishedTourOfUser(db)
    )(tour);
    res.json(newTour);
  } catch (e) {
    res.json(e.message);
  }
});

router.post("/deleteTour", async (req, res) => {
  try {
    const db: Db = res.locals.db;
    const { tour } = req.body;
    const tours = await deleteTourService(
      deleteTour(db),
      updatePublishedTourOfUser(db)
    )(tour);
    res.json(tours);
  } catch (e) {
    res.json(e.message);
  }
});

export default router;
