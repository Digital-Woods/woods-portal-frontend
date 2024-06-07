const { useQuery } = ReactQuery;

const Recoiljs = () => {
  const { yourName, setYourName } = useName();
  const onChange = (event) => {
    setYourName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={yourName} onChange={onChange} />
      <br />
      Echo: {yourName}
    </div>
  );
};
