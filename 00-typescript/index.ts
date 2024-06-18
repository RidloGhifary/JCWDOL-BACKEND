function sum(a: number, b: number): number {
  return a + b;
}

sum(1, 2);

const isBoolean = (x: any): x is boolean => typeof x === "boolean";
const number: number = 10;
