export type UseSearchParams<T> = [
  {
    value: Partial<T>;
    toString(): string;
  },
  (newParams: Partial<T>) => void
];

export type Handler = (...args: any[]) => void;

export interface Query {
  name: string;
  age: number;
  status: boolean;
}
