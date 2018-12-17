import { SearchTourDb, SearchUserDb } from "../repository/Search";

import { Tour, User } from "../domain/types";

export type SearchTourService = (keyword: string) => Promise<Tour[]>;

export type searchUserService = (keyword: string) => Promise<User[]>;

export function searchTourService(
  searchTourDb: SearchTourDb
): SearchTourService {
  return async keyword => {
    const results = await searchTourDb(keyword);
    return results;
  };
}

export function searchUserService(
  SearchUserDb: SearchUserDb
): searchUserService {
  return async keyword => {
    const results = await SearchUserDb(keyword);
    return results;
  };
}
