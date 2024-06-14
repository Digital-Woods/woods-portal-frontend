const { useState } = React;

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-dark dark:text-light">
      <Card>
        <div>
          <img
            className="rounded-t-lg"
            src="https://m.media-amazon.com/images/I/71aOEQfivmL._AC_UF1000,1000_QL80_.jpg"
            alt=""
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </Card>

      <div className="py-4">
        {/* <Tabs /> */}

        {/* <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Test 3</TabsContent>
          <TabsContent value="password">Test 2</TabsContent>
        </Tabs> */}

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">Test Account Content</TabsContent>
          <TabsContent value="password">Test Password Content</TabsContent>
        </Tabs>
      </div>

      <div className="py-4">
        <ActivityLog />
      </div>

      <div className="py-4">
        <Timeline />
      </div>

      <p>You clicked {count} times</p>
      <Button onClick={() => setCount(count + 1)} label="Click">
        Click
      </Button>
    </div>
  );
};
