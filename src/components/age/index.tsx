import { useState, useEffect } from "react";
import { InputNumber } from "antd";

import { DEFAULT_QUERY } from "~/data";
import { useSearchParams } from "~/hooks/use-search-params";

const Age = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    DEFAULT_QUERY,
    "query"
  );
  const [value, setValue] = useState(searchParams.value?.age);

  useEffect(() => {
    console.log(searchParams.value, "Age searchParams.value");
  }, [searchParams.value]);

  const handleChange = (age: number | null) => {
    setSearchParams({ age: age as number });
    setValue(age as number);
  };

  return (
    <h5>
      <span>年龄：</span>
      <InputNumber value={value} onChange={handleChange} />
    </h5>
  );
};

export default Age;
