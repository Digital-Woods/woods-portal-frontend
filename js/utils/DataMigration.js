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
      const { truncated, isTruncated } = truncateString(label.plural || "");

      return isTruncated ? (
        <Tooltip right content={label.plural}>
          <Link
            className="text-secondary font-bold border-input rounded-md"
            to={`/${value.featureName}?filterPropertyName=associations.${value.associateWith}&filterOperator=EQ&filterValue=${itemId}`}
          >
            {truncated}
          </Link>
        </Tooltip>
      ) : (
        <Link
          className="text-secondary font-bold border-input rounded-md"
          to={`/${value.featureName}?filterPropertyName=associations.${value.associateWith}&filterOperator=EQ&filterValue=${itemId}`}
        >
          {label.plural}
        </Link>
      );
    }

    case isObject(value) && value.type === "primaryDisplayProperty": {
      const { truncated, isTruncated } = truncateString(value.value || "");

      return isTruncated ? (
        <Tooltip content={value.value}>
          <Link
            className="text-secondary font-bold border-input rounded-md"
            to={`${path}/${itemId}`}
          >
            {truncated}
          </Link>
        </Tooltip>
      ) : (
        <Link
          className="text-secondary font-bold border-input rounded-md"
          to={`${path}/${itemId}`}
        >
          {value.value}
        </Link>
      );
    }

    case isImage(value): {
      let urlArray = typeof value === "string" ? value.split(",") : [];
      return urlArray.length > 0 ? (
        <img
          src={urlArray[0]}
          alt={urlArray[0]}
          className="w-10 h-10 rounded"
        />
      ) : null;
    }

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

const getIcon = (filename) => {
  const extension = filename.split(".").pop().toLowerCase();

  switch (extension) {
    case "pdf":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="red"
        >
          <path d="M19 2h-5L7 8v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 7H9V8h5V4h5v5h-5v1z"></path>
        </svg>
      );
    case "doc":
    case "docx":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="blue"
        >
          <path d="M19 2H9L5 6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 16H9V7h5V2h5v16z"></path>
        </svg>
      );
    case "xls":
    case "xlsx":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="green"
        >
          <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 12l-2 2H5v-2h2v-2H5v-2h2v-2H5V6h4v6zm6-6v4h-2V6h2zm-4 8v-4h2v4h-2zm4 2v2h-2v-2h2zm-4 2v-2h2v2h-2z"></path>
        </svg>
      );
    case "ppt":
    case "pptx":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="orange"
        >
          <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 18h2v-6H7v6zm10 0h2v-6h-2v6zm-4 0h2v-6h-2v6zM7 8h8v2H7V8z"></path>
        </svg>
      );
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="purple"
        >
          <path d="M19 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM5 18h14V6H5v12zm2-8l3 3.5L12 11l3 4H5z"></path>
        </svg>
      );
    case "svg":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="orange"
        >
          <path d="M6 2h12l4 6v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm12 16h2V8h-5V3H6v12h2v2h10z"></path>
        </svg>
      );
    default:
      // Default SVG for unmatched file types
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="gray"
        >
          <path d="M6 2h12v4H6V2zm2 8h2v6H8v-6zm4 0h2v6h-2v-6zm4 0h2v6h-2v-6z"></path>
        </svg>
      );
  }
};

const FileIcons = {
  PDF: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 21H5c-1.1 0-1.99-.9-1.99-2L3 3c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2zm-8-16h6v4h-6zm-1 6h8v10H10z" />
    </svg>
  ),
  Word: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 4v16h16V4H4zm9 14H8v-2h5v2zm0-4H8v-2h5v2zm3-4H8V8h8v2z" />
    </svg>
  ),
  Excel: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 4v16h16V4H4zm3 14h2v-2H7v2zm0-4h2v-2H7v2zm0-4h2V8H7v2zm4 8h5v-2h-5v2zm0-4h5v-2h-5v2zm0-4h5V8h-5v2z" />
    </svg>
  ),
  IMG: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      className="fill-primary  dark:fill-white"
    >
      <path d="M240.62-184q-24.32 0-40.47-16.5T184-240.62v-478.76q0-23.62 16.15-40.12Q216.3-776 240.62-776h478.76q24.32 0 40.47 16.5T776-719.38v478.76q0 23.62-16.15 40.12Q743.7-184 719.38-184H240.62Zm0-32h478.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93v-478.76q0-9.24-7.69-16.93-7.69-7.69-16.93-7.69H240.62q-9.24 0-16.93 7.69-7.69 7.69-7.69 16.93v478.76q0 9.24 7.69 16.93 7.69 7.69 16.93 7.69ZM324-308h318.15L535.08-450.77l-92.62 116.31-52-60.62L324-308Zm-108 92v-528 528Z" />
    </svg>
  ),
  PowerPoint: (
    <svg
      className="fill-primary  dark:fill-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M4 4v16h16V4H4zm10 10H8v-2h6v2zm0-4H8V8h6v2z" />
    </svg>
  ),
  Text: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M3 3h18v18H3V3zm3 15h12v-2H6v2zm0-4h12v-2H6v2zm0-4h12V8H6v2z" />
    </svg>
  ),
  file: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M19 21H5c-1.1 0-1.99-.9-1.99-2L3 3c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2zm-8-16h6v4h-6zm-1 6h8v10H10z" />
    </svg>
  ),
  folder: (
    <svg
      className="fill-current text-primary dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M10 4H2v16h20V4H12l-2-2zm0 2h4v4h-4V6zm0 8h4v2h-4v-2z" />
    </svg>
  ),
};

const getIconType = (type) => {
  switch (type) {
    case "PDF":
      return FileIcons.PDF;
    case "Word":
      return FileIcons.Word;
    case "Excel":
      return FileIcons.Excel;
    case "Image":
      return FileIcons.IMG;
    case "PowerPoint":
      return FileIcons.PowerPoint;
    case "Text":
      return FileIcons.Text;
    case "file":
      return FileIcons.file;
    case "folder":
      return FileIcons.folder;
    default:
      console.warn("Unknown file type:", type);
      return FileIcons.folder;
  }
};
