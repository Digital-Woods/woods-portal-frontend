const { useSetRecoilState } = Recoil;

function DataInitializer() {
  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await Client.getProfileDetails.all;
        const { firstName, lastName, email, hubId, templatename } =
          response.data;

        setProfile({
          firstName: firstName || "",
          lastName: lastName || "",
          email: email || "",
          hubId: "7869",
          templatename: "stonbury",
        });
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };

    fetchProfileData();
  }, [setProfile]);

  return null;
}
