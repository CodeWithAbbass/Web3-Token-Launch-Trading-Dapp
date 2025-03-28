const handleApiError = (err) => {
  if (err?.error?.data?.body?.message) {
    return err?.error?.data?.body.message;
  }
  if (err?.error?.data?.error?.message) {
    return err?.error?.data?.error.message;
  }
  if (err?.error?.status === "FETCH_ERROR") {
    return err?.error.error;
  }
  if (err.request) {
    return { message: err.message };
  }
  if (err?.error?.data?.message) {
    return err?.error?.data?.message;
  }
  // Something happened in setting up the request that triggered an Error

  return { message: "Error setting up the request" };
};

export default handleApiError;
