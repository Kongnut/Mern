import {
  GetUserDb,
  UpdateUserDb,
  UpdateUserContactDb
} from "../repository/User";

import { User, UserContact } from "../domain/types";

export type GetUserService = (userId: string) => Promise<User>;

export type LoginService = (userInfo: User, token: string) => Promise<User>;

export type GetCustomerProfileService = (userName: string) => Promise<User>;

export type UpdateContactService = (
  userId: string,
  userContact: UserContact
) => Promise<User>;

export function getUserInfoService(
  getUserDb: GetUserDb
): GetCustomerProfileService {
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
