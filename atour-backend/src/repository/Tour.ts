import { Tour } from "../domain/types";
import { Db } from "mongodb";
import {} from "./User";

export type SaveTourDb = (tour: Tour) => Promise<void>;
export type UpdateTourDb = (tour: Tour) => Promise<void>;
export type DeleteTourDb = (tour: Tour) => Promise<void>;

export function saveTour(db: Db): SaveTourDb {
  return async tour => {
    await db.collection("tour").insert(tour);
  };
}

export function updateTour(db: Db): UpdateTourDb {
  return async tour => {
    const tourId = tour.tourId;
    await db.collection("tour").update({ tourId }, tour);
  };
}

export function deleteTour(db: Db): DeleteTourDb {
  return async tour => {
    const tourId = tour.tourId;
    await db.collection("tour").remove({ tourId });
  };
}
