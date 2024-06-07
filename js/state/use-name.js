
const { atom, useRecoilState } = Recoil;

const nameState = atom({
  key: "nameState",
  default: "",
});

function useName() {
  const [yourName, setYourName] = useRecoilState(nameState);

  return {
    yourName,
    setYourName
  };
}
