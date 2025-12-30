export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (date) => {
  if (!date) return "Date not provided";
  return new Date(date).toLocaleDateString("en-US");
};

export const getStatusMessage = (status) => {
  const messages = {
    loading: "Loading...",
    success: "Ready!",
    error: "Server Error",
  };
  return messages[status] || "Unknown status";
};
