const fakeUserDetails = {
  userId: 1,
  firstName: "",
  lastName: "",
  email: "",
  roles: [],
  authorities: [],
  hubspotPortals: {
    hubId: 1,
    subscriptionLevel: 1,
    hubspotDomain: "test.com",
    hubspotSelectedDomain: "test.com",
    portalSettings: {
      theme: "light",
      logo: "",
      primaryColor: "#7B4C4C",
      secondaryColor: "#923A3A",
      brandName: "Digitalwoods",
    },
    onboardStatus: true,
    templateName: "dw_office",
    activeStatus: true,
  },
  sideMenu: [
    {
      name: "live-preview",
      labels: {
        singular: "Asset",
        plural: "Assets",
      },
      icon: "",
    },
    {
      name: "dw_cabins",
      labels: {
        singular: "Cabin",
        plural: "Cabins",
      },
      icon: "",
    },
    {
      name: "dw_employees",
      labels: {
        singular: "Employee",
        plural: "Employees",
      },
      icon: "",
    },
  ],
};

const fakeTableData = [];
