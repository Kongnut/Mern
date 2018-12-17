export const SELECT_TOUR = "SELECT_TOUR";
export function selectTour(tour) {
  return { type: SELECT_TOUR, payload: tour };
}

export const SELECT_USER = "SELECT_USER";
export function selectUser(user) {
  return { type: SELECT_USER, payload: user };
}
