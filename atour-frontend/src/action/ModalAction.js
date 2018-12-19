export const OPEN_MODAL = "OPEN_MODAL";

export function closeAllModal() {
  return {
    type: OPEN_MODAL,
    payload: ""
  };
}

export function publishNewTour(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "publishNewTour";
  }
  console.log(payload);
  return {
    type: OPEN_MODAL,
    payload
  };
}

export function editTourModal(isOpen) {
  let payload = "";
  if (isOpen) {
    payload = "editTour";
  }
  return {
    type: OPEN_MODAL,
    payload
  };
}
