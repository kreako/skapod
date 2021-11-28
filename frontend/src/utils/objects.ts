/// Return an object from an array
/// Initial array contains object with {id: ...}
/// Returned object contains a map id -> object
export function fromArrayToIdObjects(array) {
  const obj = {}
  for (const o of array) {
    obj[Number(o.id)] = o
  }
  return obj
}
