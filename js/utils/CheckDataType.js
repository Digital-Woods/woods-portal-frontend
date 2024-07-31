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

const truncateString = (str, MAX_LENGTH = 50) => {
  if (str.length > MAX_LENGTH) {
    return {
      truncated: str.substring(0, MAX_LENGTH) + "...",
      isTruncated: true,
    };
  }
  return { truncated: str, isTruncated: false };
};

const filterKeys = (object) => {
  for (const key in object) {
    if (Array.isArray(object[key].list)) {
      object[key].list = object[key].list.map((item) => {
        const newObj = {};
        // Extract keys containing "name"
        const nameKeys = Object.keys(item).filter((itemKey) => {
          if (typeof item[itemKey] === "object" && itemKey.includes("name")) {
            return itemKey.includes("name");
          }
        });

        // Extract remaining keys
        const remainingKeys = Object.keys(item).filter(
          (itemKey) =>
            !itemKey.includes("id") &&
            !itemKey.includes("hs") &&
            !itemKey.includes("date") &&
            !itemKey.includes("files")
        );

        // Add keys containing "name" to the new object first
        nameKeys.forEach((nameKey) => {
          newObj[nameKey] = item[nameKey];
        });

        // Add the remaining keys to the new object
        remainingKeys.forEach((remainingKey) => {
          newObj[remainingKey] = item[remainingKey];
        });
        return newObj;
      });
    }
  }
  return object;
};

const sortData = (item, detailPage = false, header = true) => {
  if (!item || typeof item !== "object") return [];

  const fields = Object.keys(item);

  const keysToSkip = new Set([
    "id",
    "archived",
    "associations",
    "createdAt",
    "updatedAt",
  ]);

  const simpleFields = [];
  const objectFields = [];
  const hsFields = [];
  const nameFields = [];

  fields.forEach((key) => {
    if (keysToSkip.has(key)) {
      return;
    }
    if (
      (key.includes("id") ||
      key.includes("files")) &&
      detailPage === true
    ) {
      return;
    }

    if (
      key.includes("hs") &&
      detailPage === false
    ) {
      return;
    }

    const value = item[key];

    if (
      typeof value === "object" &&
      value.associateWith &&
      value.detailPageHidden == detailPage
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
    } else if (typeof value === "object" && value.associateWith) {
      objectFields.push({
        name: key,
        label: value.headerLabel,
        value: value.headerLabel,
      });
    } else if (typeof value === "object") {
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
