export const linearCongruentialGenerator = (seed: string) => {
  const a = 1664525
  const c = 1013904223
  const m = Math.pow(2, 32)
  let value = 0
  for (let i = 0; i < seed.length; i++) {
    value += seed.charCodeAt(i)
  }
  return {
    next: function () {
      value = (a * value + c) % m
      return value
    }
  }
}
