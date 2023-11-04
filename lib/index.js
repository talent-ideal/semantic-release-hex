export function add(a, b) {
  if (Array.isArray(a)) {
    return a.reduce((sum, val) => sum + val, 0);
  } else if (
    arguments.length === 2 &&
    typeof a === "number" &&
    typeof b === "number"
  ) {
    return a + b;
  }

  throw new Error("Invalid input");
}
