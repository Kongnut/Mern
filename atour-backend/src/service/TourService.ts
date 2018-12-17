import * as _ from "lodash";

import { SaveTourDb, UpdateTourDb, DeleteTourDb } from "../repository/Tour";
import { UpdatePublishedTourOfUserDb } from "../repository/User";

import { Tour } from "../domain/types";

type PublishTourService = (tour: Tour) => Promise<Tour[]>;

type EditTourService = (tour: Tour) => Promise<Tour>;

type DeleteTourService = (tour: Tour) => Promise<Tour[]>;

export function publishTourService(
  saveTour: SaveTourDb,
  savePublishedTourOfUser: UpdatePublishedTourOfUserDb
): PublishTourService {
  return async (tour: Tour) => {
    await saveTour(tour);
    return await savePublishedTourOfUser(tour.userId);
  };
}

export function editTourService(
  updateTour: UpdateTourDb,
  updatePublishedTourOfUser: UpdatePublishedTourOfUserDb
): EditTourService {
  return async (tour: Tour) => {
    await updateTour(tour);
    await updatePublishedTourOfUser(tour.userId);
    return tour;
  };
}

export function deleteTourService(
  deleteTour: DeleteTourDb,
  deletePublishedTourOfUser: UpdatePublishedTourOfUserDb
): DeleteTourService {
  return async (tour: Tour) => {
    await deleteTour(tour);
    return await deletePublishedTourOfUser(tour.userId);
  };
}
