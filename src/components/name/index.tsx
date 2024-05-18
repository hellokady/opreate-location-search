import { useState, useEffect } from "react";
import { Input } from "antd";

import { DEFAULT_QUERY } from "~/data";
import { useSearchParams } from "~/hooks/use-search-params";

const Name = () => {
  const [searchParams, setSearchParams] = useSearchParams(
    DEFAULT_QUERY,
    "query"
  );
  const [value, setValue] = useState(searchParams.value?.name);
  const [composition, setComposition] = useState(false);

  useEffect(() => {
    console.log(searchParams.value, "Name searchParams.value");
  }, [searchParams.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (composition) return;
    const name = e.target.value;
    setSearchParams({ name });
    setValue(name);
  };

  const handleCompositionStart = () => {
    setComposition(true);
  };

  const handleCompositionEnd = (
    e: React.CompositionEvent<HTMLInputElement>
  ) => {
    const name = e.currentTarget.value;
    setSearchParams({ name });
    setValue(name);
    setComposition(false);
  };

  return (
    <h5>
      <span>名字：</span>
      <Input
        defaultValue={value}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
    </h5>
  );
};

export default Name;
