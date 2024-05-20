import { useCallback, useEffect, useMemo, useState } from "react";

import { EventEmitter } from "~/utils";
import { EMPTY_LIST, GLOBAL_CHANNEL_ID } from "~/data";
import { UseSearchParams } from "~/types";

const eventEmitter = new EventEmitter();

/**
 * 同步location.search参数，该hook更新时不发生页面跳转；可跨组件通信
 * @param fields 用于初始化location.search参数的类型校验，注意：该值不表示默认值
 * @param channelId 通信Id，不传递时默认使用全局通信Id【global】
 */
const useSearchParams = <T extends object>(
  fields: T,
  channelId?: string
): UseSearchParams<T> => {
  const CHANNEL_ID = channelId || GLOBAL_CHANNEL_ID;
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    eventEmitter.on(CHANNEL_ID, updateByChannelId);
    return () => {
      eventEmitter.off(CHANNEL_ID, updateByChannelId);
    };
  }, []);

  const checkType = useCallback((key: keyof T, value: any) => {
    const type = typeof fields[key];

    switch (type) {
      case "number": {
        return +value;
      }
      case "boolean": {
        return JSON.parse(value);
      }
      default: {
        return value;
      }
    }
  }, []);

  const init = useCallback(() => {
    const tasks = new URLSearchParams(location.search).entries();
    const result: Partial<T> = {};
    let run = tasks.next();

    while (!run.done) {
      const [key, value] = run.value as [keyof T, any];
      result[key] = checkType(key, value);
      run = tasks.next();
    }

    return result;
  }, []);

  const toString = useCallback(() => {
    let result = "";
    const kv: string[] = [];

    for (const key in search.value) {
      const value = search.value[key];
      if (!EMPTY_LIST.includes(value as any)) {
        kv.push(`${key}=${value}`);
      }
    }

    if (kv.length > 0) {
      result = `?${kv.join("&")}`;
    }

    return result;
  }, []);

  const search = useMemo(
    () => ({
      value: init(),
      toString,
    }),
    []
  );

  const updateByChannelId = useCallback((newParams: Partial<T>) => {
    search.value = {
      ...search.value,
      ...newParams,
    };

    const url = new URL(location.href);
    url.search = toString();
    window.history.replaceState({}, "", url);

    forceUpdate((c) => c + 1);
  }, []);

  const update = useCallback((newParams: Partial<T>) => {
    eventEmitter.emit(CHANNEL_ID, newParams);
  }, []);

  return [search, update];
};

export { useSearchParams, eventEmitter };
