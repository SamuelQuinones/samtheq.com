export const fetcherGET = async (url: string) => {
  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  const res = await fetch(url);
  if (!res.ok) {
    // Attach extra info to the error object.
    const error = await res.json();
    throw error;
  }
  return res.json();
};
