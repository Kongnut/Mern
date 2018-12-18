export const SELECT_TOUR = "SELECT_TOUR";
export function selectTour(tour) {
  const {
    detail,
    imageUrl,
    isPublished,
    maximumSize,
    minimumSize,
    price,
    tourId,
    tourName,
    userId
  } = tour;
  return {
    type: SELECT_TOUR,
    payload: {
      detail,
      imageUrl,
      isPublished,
      maximumSize,
      minimumSize,
      price,
      tourId,
      tourName,
      userId
    }
  };
}

export const SELECT_USER = "SELECT_USER";
export function selectUser(user) {
  return { type: SELECT_USER, payload: user };
}
