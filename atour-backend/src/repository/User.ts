import { User, Tour, UserContact } from "../domain/types";
import { Db } from "mongodb";

export type GetUserDb = (userId: string) => Promise<User>;
export type UpdateUserDb = (User: User, token: string) => Promise<User>;
export type UpdateUserContactDb = (
  userId: string,
  userContact: UserContact
) => Promise<User>;
export type GetPublishedToursOfUserDb = (userId: string) => Promise<Tour[]>;
export type UpdatePublishedTourOfUserDb = (userId: string) => Promise<Tour[]>;

export function getUser(db: Db): GetUserDb {
  return async userId => {
    return await db.collection("user").findOne({ userId });
  };
}

export function updateUser(db: Db): UpdateUserDb {
  return async (User, token) => {
    const userId = User.userId;
    const { firstName, lastName, profileImageUrl, gender, age } = User;
    const oldUser = await db.collection("user").findOne({ userId });
    if (oldUser) {
      const { facebookUrl, instagramUrl, phoneNumber, publishedTour } = oldUser;
      const newUser = {
        token,
        facebookUrl,
        instagramUrl,
        phoneNumber,
        publishedTour,
        firstName,
        lastName,
        profileImageUrl,
        gender,
        age,
        userId
      };
      await db.collection("user").update({ userId }, newUser);
    } else {
      User.token = token;
      User.publishedTour = [];
      User.facebookUrl = "";
      User.instagramUrl = "";
      User.phoneNumber = "";
      await db.collection("user").insert(User);
    }
    return await db.collection("user").findOne({ userId });
  };
}

export function updateUserContact(db: Db): UpdateUserContactDb {
  return async (userId, userContact) => {
    const { phoneNumber, facebookUrl, instagramUrl } = userContact;
    const user = await db.collection("user").findOne({ userId });
    user.phoneNumber = phoneNumber;
    user.facebookUrl = facebookUrl;
    user.instagramUrl = instagramUrl;
    await db.collection("user").update({ userId }, user);
    return await db.collection("user").findOne({ userId });
  };
}

export function updatePublishedTourOfUser(db: Db): UpdatePublishedTourOfUserDb {
  return async userId => {
    const user = await db.collection("user").findOne({ userId });
    if (!user) throw Error("user not found");
    const newPublishedTour = await db
      .collection("tour")
      .find({ userId })
      .toArray();
    const { ["publishedTour"]: deletedKey, ...otherKeys } = user;
    const newUser = { ...otherKeys, publishedTour: newPublishedTour };
    await db.collection("user").update({ userId }, newUser);
    return newPublishedTour;
  };
}

export function getPublishedToursOfUser(db: Db): GetPublishedToursOfUserDb {
  return async userId => {
    const tours = await db
      .collection("tour")
      .find({ userId })
      .toArray();
    return tours;
  };
}
