function isObject<T = any>(o: T) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

export default function isPlainObject<T = any>(o: T) {
  if (isObject(o) === false) return false;

  // If has modified constructor
  const ctor = o?.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  const prot = ctor?.prototype;
  if (isObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty("isPrototypeOf") === false) return false;

  // Most likely a plain Object
  return true;
}
