const { useSetRecoilState } = Recoil;

function DataInitializer() {
  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Client.getProfileDetails.all;
        const { firstName, lastName, email, hubspotPortals, templates } =
          response.data;

        console.log(response.data);

        setProfile({
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          hubId: hubspotPortals.hubId || "",
          templatename: templates[0].name || "",
          logo: hubspotPortals.portalSettings.logo || "",
          primaryColor: hubspotPortals.portalSettings.primaryColor || "",
          secondaryColor: hubspotPortals.portalSettings.secondaryColor || "",
          hubspotDomain: hubspotPortals.hubspotDomain || "",
          templateLabel: templates[0].label || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [setProfile]);

  return null;
}
