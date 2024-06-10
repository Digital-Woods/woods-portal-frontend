const { useState } = React;

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="text-brand">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
