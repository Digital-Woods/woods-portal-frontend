function isDate(dateString) {
  // Regular expression to match the expected date format
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  if (!regex.test(dateString)) {
    return false;
  }

  // Parse the date string and check if it's valid
  const date = new Date(dateString);
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
  if (isDate(data)) {
    const date = new Date(data);
    const formatted = formatDateString(date);
    const [datePart, timePart] = formatted.split(", ");
    const [day, month, year] = datePart.split("/");
    const formattedLocalDate = `${day}-${month}-${year} ${timePart.toLowerCase()}`;
    return formattedLocalDate;
  }
  return data;
};

function isNull(data) {
  return !!(data === undefined || data === null || data === "");
}

function isObject(data) {
  return typeof data === "object";
}

function isEmptyObject(data) {
  return Object.keys(data).length === 0;
}

const truncateString = (str, MAX_LENGTH = 50) => {
  if (str.length > MAX_LENGTH) {
    return {
      truncated: str.substring(0, MAX_LENGTH) + "...",
      isTruncated: true,
    };
  }
  return { truncated: str, isTruncated: false };
};

const keysToSkipList = (key) => {
  return !!(key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("hs") ||
    key.includes("files"));
};

const keysToSkipDetails = (key) => {
  return !!(key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("files"));
};

const keysToSkipAssociations = (key) => {
  return !!(key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("hs") ||
    key.includes("files"));
};

const sortData = (item, viewType = "list") => {
  if (!item || !isObject(item)) return [];

  const fields = Object.keys(item);

  const simpleFields = [];
  const objectFields = [];
  const hsFields = [];
  const nameFields = [];

  fields.forEach((key) => {
    switch (viewType) {
      case "details":
        if (keysToSkipDetails(key)) return;
        break;
      case "associations":
        if (keysToSkipAssociations(key)) return;
        break;
      default:
        if (keysToSkipList(key)) return;
    }

    const value = item[key];

    if (
      isObject(value) &&
      value.associateWith &&
      value.detailPageHidden == (viewType == "details")
    ) {
      return;
    }

    if (key.startsWith("hs_")) {
      hsFields.push({
        name: key,
        label: key
          .replace(/^hs_/, "Hs ")
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        value: value,
      });
    } else if (isObject(value) && value.associateWith) {
      objectFields.push({
        name: key,
        label: value.headerLabel,
        value: value.headerLabel,
      });
    } else if (isObject(value)) {
      // Check if it's a field with a 'name' property and push accordingly
      if (value.key) {
        nameFields.push({
          name: key,
          label: value.key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase()),
          value: value.value,
        });
      } else {
        // Skip objects that don't have a 'name' or similar property
      }
    } else {
      simpleFields.push({
        name: key,
        label: key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        value: value,
      });
    }
  });

  // Sort and concatenate
  const sortedFields = [
    ...nameFields,
    ...simpleFields,
    ...objectFields,
    ...hsFields,
  ];

  return sortedFields;
};
