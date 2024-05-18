import { useEffect } from "react";
import { Button } from "antd";

import { useSearchParams, eventEmitter } from "~/hooks/use-search-params";
import { Age, Name, Status } from "~/components";
import { DEFAULT_QUERY } from "~/data";

import "./App.css";

function App() {
  const [searchParams] = useSearchParams(DEFAULT_QUERY, "query");

  useEffect(() => {
    console.log(eventEmitter, "App eventEmitter");
  }, []);

  useEffect(() => {
    console.log(searchParams.value, "App searchParams.value");
  }, [searchParams.value]);

  const logParams = () => {
    console.log(searchParams.value, "logParams App searchParams.value");
  };

  return (
    <>
      <Name />
      <Age />
      <Status />
      <Button type="primary" onClick={logParams}>
        get searchParams
      </Button>
    </>
  );
}

export default App;
