import {
  GetUserDb,
  UpdateUserDb,
  UpdateUserContactDb,
  SaveTourDb,
  GetSavedToursOfUserDb
} from "../repository/User";

import { User, UserContact, Tour } from "../domain/types";

export type GetUserService = (userId: string) => Promise<User>;

export type LoginService = (userInfo: User, token: string) => Promise<User>;

export type GetCustomerProfileService = (userId: string) => Promise<User>;

export type GetSavedTourService = (userId: string) => Promise<Tour[]>;

export type SaveTourService = (userId: string, tour: Tour) => Promise<Tour[]>;

export type UpdateContactService = (
  userId: string,
  userContact: UserContact
) => Promise<User>;

export function getUserInfoService(getUserDb: GetUserDb): GetUserService {
  return async userId => {
    const user = await getUserDb(userId);
    return user;
  };
}

export function updateUserContactService(
  updateUserContact: UpdateUserContactDb
): UpdateContactService {
  return async (userId, userContact) => {
    const user = await updateUserContact(userId, userContact);
    return user;
  };
}

export function loginService(updateUser: UpdateUserDb): LoginService {
  return async (userInfo, token) => {
    const user = await updateUser(userInfo, token);
    return user;
  };
}

export function saveTourService(saveTour: SaveTourDb): SaveTourService {
  return async (userId, tour) => {
    const tours = await saveTour(userId, tour);
    return tours;
  };
}

export function getSavedTourService(
  getSavedTour: GetSavedToursOfUserDb
): GetSavedTourService {
  return async userId => {
    const tours = await getSavedTour(userId);
    return tours;
  };
}
