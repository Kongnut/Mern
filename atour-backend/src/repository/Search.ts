import { Tour, User } from "../domain/types";
import { Db } from "mongodb";

export type SearchTourDb = (keyword: string) => Promise<Tour[]>;
export type SearchUserDb = (keyword: string) => Promise<User[]>;

export function searchTour(db: Db): SearchTourDb {
  return async keyword => {
    if (keyword === "") {
      const cursor = await db
        .collection("tour")
        .find()
        .limit(9);
      const results = await cursor.toArray();
      return results;
    } else {
      const keywords: RegExp[] = keyword
        .split(" ")
        .map(word => new RegExp(word, "i"));
      const cursor = await db
        .collection("tour")
        .find({ tourName: { $in: keywords } });
      const results = await cursor.toArray();
      return results;
    }
  };
}

export function searchUser(db: Db): SearchUserDb {
  return async keyword => {
    if (keyword === "") {
      const cursor = await db
        .collection("user")
        .find()
        .limit(9);
      const results = await cursor.toArray();
      return results;
    } else {
      const keywords: RegExp[] = keyword
        .split(" ")
        .map(word => new RegExp(word, "i"));
      const cursor = await db
        .collection("user")
        .find({ firstName: { $in: keywords } });
      const results = await cursor.toArray();
      return results;
    }
  };
}
