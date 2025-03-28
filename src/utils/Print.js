const Print = (...message) => {
  if (import.meta.env.NODE_ENV === "development") {
    console.log(...message);
  }
};

export default Print;
