const { useState } = React;

const faqs = [
  {
    id: 1,
    header: "What is Lorem Ipsum?",
    text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  },
  {
    id: 2,
    header: "Where does it come from?",
    text: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
  {
    id: 3,
    header: "Why do we use it?",
    text: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,`,
  },
  {
    id: 4,
    header: "Where can I get some?",
    text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
  },
];

const Details = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [active, setActive] = useState(null);

  const handleToggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

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

        <Accordion items={faqs} active={active} handleToggle={handleToggle} />

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
