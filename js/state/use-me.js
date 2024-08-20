const { atom, useRecoilState } = Recoil;

const profileState = atom({
  key: "profileState",
  default: {
    firstName: "",
    lastName: "",
    email: "",
    hubId: "",
    templatename: "",
  },
});
