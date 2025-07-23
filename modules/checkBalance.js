const checkBalance = (currentBalance, incommingBalance) => {
  let updateBalance;
  if (
    (currentBalance === "good" && parseInt(incommingBalance) === 1) ||
    (currentBalance === "good" && parseInt(incommingBalance) === 0)
  ) {
    updateBalance = "good";
  }

  if (
    (currentBalance === "neutral" && parseInt(incommingBalance) === 1) ||
    (currentBalance === "neutral" && parseInt(incommingBalance) === 0) ||
    (currentBalance === "good" && parseInt(incommingBalance) === -1)
  ) {
    updateBalance = "neutral";
  }

  if (
    (currentBalance === "neutral" && parseInt(incommingBalance) === -1) ||
    currentBalance === "bad"
  ) {
    updateBalance = "bad";
  }
  return updateBalance;
};

module.exports = { checkBalance };
