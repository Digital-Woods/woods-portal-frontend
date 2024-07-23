function isDate(data) {
  const date = new Date(data);
  const isValid = !isNaN(date.getTime());
  return isValid;
}

const formatDateString = (date) => {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-GB", options);
};

const formatDate = (data) => {
  const date = new Date(data);
  if (!isNaN(date.getTime())) {
    const formatted = formatDateString(date);
    const [datePart, timePart] = formatted.split(", ");
    const [day, month, year] = datePart.split("/");
    const formattedLocalDate = `${day}-${month}-${year} ${timePart.toLowerCase()}`;
    return formattedLocalDate;
  }
  return data;
};

function isNull(data) {
  if (data === undefined || data === null || data === "") {
    return true;
  }
  return false;
}

function isObject(data) {
  if (typeof data === "object") {
    return true;
  }
  return false;
}

function isEmptyObject(data) {
  if (Object.keys(data).length === 0) {
    return true;
  }
  return false;
}
