const getError = (error) => {
  let message;
  if (error?.response?.data?.error) message = error?.response?.data?.error;
  return message;
};

export default getError;
