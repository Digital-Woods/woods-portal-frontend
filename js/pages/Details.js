const { useState } = React;

const Details = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-span-4">
        <div className="border bg-gray-100 rounded-lg w-fit py-2 px-4 border-flatGray">
          <Tabs defaultValue="overview" className="rounded-md">
            <TabsList className="">
              <TabsTrigger
                value="overview"
                isActive={activeTab === "overview"}
                onClick={() => handleTabClick("overview")}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="history"
                isActive={activeTab === "history"}
                onClick={() => handleTabClick("history")}
              >
                History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview"></TabsContent>
            <TabsContent value="history"></TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between py-4 px-2 border border-2 rounded-md my-10">
          <div className="flex items-center gap-x-3">
            <div className="h-16 w-16 bg-green-200 rounded-full"></div>
            <div>
              <h1 className="text-4xl font-semibold">Goodwill Co.</h1>
              <p className="text-xs  text-secondary">Tokyo</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="p-2 bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
            <div className="p-2 bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
            <div className="p-2 bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
            <div className="p-2 bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
            <div className="p-2 bg-gray-100 h-10 w-10 rounded-full flex items-center justify-center">
              +
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2">
        <div className="border rounded-lg py-2 px-4 border-flatGray">
          <div>djeidoe</div>
        </div>
      </div>
    </div>
  );
};
