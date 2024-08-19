const { atom, useRecoilState } = Recoil;

const profileState = atom({
  key: "profileState",
  default: {
    firstName: "",
    lastName: "",
    email: "",
    hubId: "7869",
    templatename: "stonbury",
  },
});
