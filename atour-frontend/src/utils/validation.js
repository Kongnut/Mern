export function validatePhone(phone) {
  if (!phone) return false;
  if (phone.length !== 10 || isNaN(phone)) {
    return "Invalid Phone number";
  }
  return false;
}

export function validateTourName(tourName) {
  if (!tourName || tourName.length > 50) {
    return "Tour name must not longer than 50";
  }
  return false;
}

export function validateImageUrl(url) {
  const regex = /.(jpeg|jpg|gif|png)$/;
  if (url.match(regex)) {
    return false;
  }
  return "Image Url is invalid";
}

export function validateFacebook(url) {
  const regex = new RegExp("https://www.facebook.com/[^:;/+-=,.]");
  if (!url || url.match(regex)) {
    return false;
  }
  return "Facebook url is invalid";
}

export function validateInstagram(url) {
  const regex = new RegExp("https://www.instagram.com/[^:;/+-=,.]");
  if (!url || url.match(regex)) {
    return false;
  }
  return "Instagram url is invalid";
}

export function validateMinimumSize(minimumSize) {
  if (isNaN(minimumSize) || parseInt(minimumSize) >= 20) {
    return "minimum group size must be number which less than 20";
  }
  return false;
}

export function validateMaximumSize(maximumSize, minimumSize = 0) {
  if (
    isNaN(minimumSize) ||
    isNaN(maximumSize) ||
    parseInt(minimumSize) > parseInt(maximumSize) ||
    parseInt(maximumSize) <= 10
  ) {
    return "maximum group size must be number which more than minimum size and more than 10";
  }
  return false;
}

export function validatePrice(price) {
  if (isNaN(price) || parseInt(price) > 30000) {
    return "price must be number and not exceed 30000";
  }
  return false;
}

export function validateDetail(detail) {
  if (!detail || detail.length < 100 || detail.length > 1000) {
    return "Detail must longer than 100 and not over 1000";
  }
  return false;
}
