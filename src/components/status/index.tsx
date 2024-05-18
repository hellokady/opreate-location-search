import { useEffect, useState } from "react";
import { Switch } from "antd";

import { DEFAULT_QUERY } from "~/data";
import { useSearchParams } from "~/hooks/use-search-params";

const Status = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    DEFAULT_QUERY,
    "query"
  );
  const [value, setValue] = useState(searchParams.value?.status);

  useEffect(() => {
    console.log(searchParams.value, "Status searchParams.value");
  }, [searchParams.value]);

  const handleChange = (status: boolean) => {
    setSearchParams({ status });
    setValue(status);
  };

  return (
    <h5>
      <span>状态：</span>
      <Switch value={value} onChange={handleChange} />
    </h5>
  );
};

export default Status;
