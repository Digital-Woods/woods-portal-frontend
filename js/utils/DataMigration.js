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

function isImage(value, key = "") {
  const imageExtensions = /\.(png|jpeg|jpg|gif|bmp|svg|webp|tiff|ico)$/i;
  return imageExtensions.test(value) || key.includes("image");
}

const keysToSkipList = (key) => {
  return !!(
    key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("hs") ||
    key.includes("files") ||
    key.includes("iframe")
  );
};

const keysToSkipDetails = (key) => {
  return !!(
    key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("files") ||
    key.includes("image") ||
    key.includes("iframe")
  );
};

const keysToSkipAssociations = (key) => {
  return !!(
    key.includes("id") ||
    key.includes("archived") ||
    key.includes("associations") ||
    key.includes("createdAt") ||
    key.includes("updatedAt") ||
    key.includes("hs") ||
    key.includes("files") ||
    key.includes("image")
  );
};

const checkEquipments = (value, title) => {
  if (title == "Equipments" || title == "Equipment" || title == "/assets")
    return value.replace("Asset", "Equipment");
  return value;
};

const checkEquipmentsName = (value, title) => {
  if (title == "Equipment")
    if (value == "Asset Name")
      return value.replace("Asset Name", "Equipment Name");
  if (value == "Asset Type")
    return value.replace("Asset Type", "Equipment Type");
  return value;
};

const sortData = (item, viewType = "list", title = "") => {
  if (!item || !isObject(item)) return [];

  const fields = Object.keys(item);

  const imageFields = [];
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

    if (typeof value === "string" && isImage(value, key)) {
      imageFields.push({
        name: key,
        label: checkEquipments(
          key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
          title
        ),
        value: value,
      });
    } else if (key.startsWith("hs_")) {
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
        label: checkEquipments(value.headerLabel, title),
        value: value.headerLabel,
      });
    } else if (isObject(value)) {
      // Check if it's a field with a 'name' property and push accordingly
      if (value.key) {
        nameFields.push({
          name: key,
          label: checkEquipments(
            value.key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase()),
            title
          ),
          value: value.value,
        });
      } else {
        // Skip objects that don't have a 'name' or similar property
      }
    } else {
      simpleFields.push({
        name: key,
        label: checkEquipments(
          key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
          title
        ),
        value: value,
      });
    }
  });

  // Sort and concatenate
  const sortedFields = [
    ...imageFields,
    ...nameFields,
    ...simpleFields,
    ...objectFields,
    ...hsFields,
  ];

  return sortedFields;
};

const renderCellContent = (value, itemId = null, path = null) => {
  switch (true) {
    case (isObject(value) && isEmptyObject(value)) || isNull(value):
      return "-";

    case isObject(value) && value.type === "link": {
      const label = value.labels ? value.labels : value.featureName;
      return (
        <Link
          className="text-secondary font-bold border-input rounded-md"
          to={`/${value.featureName}?filterPropertyName=associations.${value.associateWith}&filterOperator=EQ&filterValue=${itemId}`}
        >
          {label.plural}
        </Link>
      );
    }

    case isObject(value) && value.type === "primaryDisplayProperty":
      return (
        <Link
          className="text-secondary font-bold border-input rounded-md"
          to={`${path}/${itemId}`}
        >
          {value.value}
        </Link>
      );

    case isImage(value):
      let urlArray = value.split(",");
      return (
        <img src={urlArray[0]} alt={urlArray[0]} class="w-10 h-10 rounded" />
      );

    case isDate(value):
      return formatDate(value);

    default: {
      const cellContent = isObject(value)
        ? JSON.stringify(value)
        : String(value);
      const { truncated, isTruncated } = truncateString(cellContent);
      return isTruncated ? (
        <Tooltip content={cellContent}>{truncated}</Tooltip>
      ) : (
        truncated
      );
    }
  }
};

// function setColorsFromMe() {
//   // Default colors
//   const defaultPrimaryColor = "#0000FF"; // Blue
//   const defaultSecondaryColor = "#000000"; // Black

//   // Retrieve user data using useMe hook
//   const { me } = useMe(); // Ensure this is called in a functional component or an appropriate hook

//   // Initialize colors with default values
//   let primaryColor = defaultPrimaryColor;
//   let secondaryColor = defaultSecondaryColor;

//   if (me && me.hubspotPortals && me.hubspotPortals.portalSettings) {
//     const portalSettings = me.hubspotPortals.portalSettings;

//     // Update colors if available in the portalSettings
//     if (portalSettings.primaryColor) {
//       primaryColor = portalSettings.primaryColor;
//     }
//     if (portalSettings.secondaryColor) {
//       secondaryColor = portalSettings.secondaryColor;
//     }
//   }

//   // Retrieve color parameters from URL
//   const urlParams = new URLSearchParams(window.location.search);
//   const urlPrimaryColor = urlParams.get("primaryColor");
//   const urlSecondaryColor = urlParams.get("secondaryColor");

//   // Override defaults with URL parameters if they are present and valid
//   const finalPrimaryColor = urlPrimaryColor ? urlPrimaryColor : primaryColor;
//   const finalSecondaryColor = urlSecondaryColor
//     ? urlSecondaryColor
//     : secondaryColor;

//   // Apply the colors as CSS custom properties
//   document.documentElement.style.setProperty(
//     "--primary-color",
//     finalPrimaryColor
//   );
//   document.documentElement.style.setProperty(
//     "--secondary-color",
//     finalSecondaryColor
//   );
// }

function getFirstName() {
  const { me, getMe } = useMe();
  const loggedInDetails = useRecoilValue(userDetailsAtom);

  if (loggedInDetails && loggedInDetails.firstName) {
    return loggedInDetails.firstName;
  } else if (me && me.firstName) {
    return me.firstName;
  } else {
    return "";
  }
}

function getLastName() {
  const { me, getMe } = useMe();
  const loggedInDetails = useRecoilValue(userDetailsAtom);

  if (loggedInDetails && loggedInDetails.lastName) {
    return loggedInDetails.lastName;
  } else if (me && me.lastName) {
    return me.lastName;
  } else {
    return "";
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
