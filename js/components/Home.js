const { useState } = React;

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-dark dark:text-light">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};
