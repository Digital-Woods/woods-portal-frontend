const { atom, useRecoilState } = Recoil;

const logoutDialogState = atom({
  key: "logoutDialogState",
  default: false,
});
