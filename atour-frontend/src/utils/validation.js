export function validatePhone(phone) {
  if (!phone) return false;
  if (phone.length !== 10 || isNaN(phone)) {
    return "Invalid Phone number";
  }
  return false;
}

export function validateTourName(tourName) {
  if (!tourName || tourName.length > 20) {
    return "Tour name must not longer than 20";
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
  let regex = new RegExp("^($|)([1-9]d{0,2}(,d{3})*|([1-9]d*))(.d{2})?$");
  let passed = minimumSize.match(regex);
  if (passed == null || minimumSize.length > 50 || isNaN(minimumSize)) {
    return "minimum group size must be number which less than 20";
  }
  return false;
}

export function validateMaximumSize(maximumSize, minimumSize = 0) {
  let regex = new RegExp("^($|)([1-9]d{0,2}(,d{3})*|([1-9]d*))(.d{2})?$");
  let passed = maximumSize.match(regex);
  if (
    passed == null ||
    maximumSize.length > 50 ||
    isNaN(minimumSize) ||
    isNaN(maximumSize) ||
    parseInt(minimumSize) > parseInt(maximumSize)
  ) {
    return "maximum group size must be number which more than minimum size and more than 10";
  }
  return false;
}

export function validatePrice(price) {
  let regex = "^($|)([1-9]d{0,2}(,d{3})*|([1-9]d*))(.d{2})?$";
  let passed = price.match(regex);
  if (passed == null || price > 30000 || isNaN(price)) {
    return "price must be number and not exceed 30000";
  }
  return false;
}

export function validateDetail(detail) {
  if (!detail || detail.length < 20 || detail.length > 500) {
    return "Detail must longer than 20 and not over 500";
  }
  return false;
}
