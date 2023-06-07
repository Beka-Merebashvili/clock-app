import { useEffect, useState } from "react";
import GlobalStyles from "./styled-components/GlobalStyles";
import axios from "axios";
import Clock from "./components/Clock";

function App() {
  const [clockData, SetClockDate] = useState<ClockInfo | null>(null);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get(
        "http://worldtimeapi.org/api/timezone/Asia/Tbilisi"
      );
      const data = await response.data;
      SetClockDate(data);
    };
    request();
  }, []);
  return (
    <>
      <GlobalStyles />
      <Clock clockData={clockData} />
    </>
  );
}

export default App;
