const fakeUserDetails = {
  userId: userData.id || 1,
  firstName: userData.firstname || 'No firstname',
  lastName: userData.lastname || 'No lastname',
  email: userData.email || 'No email',
  roles: [],
  authorities: [],
  hubspotPortals: {
    hubId: 1,
    subscriptionLevel: 1,
    hubspotDomain: "",
    hubspotSelectedDomain: "",
    portalSettings: {
      theme: "light",
      logo: baseCompanyOptions.logoImg || "",
      primaryColor: primarycolor,
      secondaryColor: secondarycolor,
      brandName: baseCompanyOptions.companyName || "Digitalwoods",
    },
    onboardStatus: true,
    templateName: "dw_office",
    activeStatus: true,
  },
  sideMenu: moduleText,
  sideBarOptions:sidebarCtaDetails,
};
const fakeTableData = {
  statusCode: "200",
  data: {
    results: objectList,
    total: objectList.length,
  },
  statusMsg: "Record(s) has been successfully retrieved.",
};
