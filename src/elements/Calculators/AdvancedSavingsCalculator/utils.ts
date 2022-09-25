export const calculateOvoEvUsageSavings = (
  numberOfCharges: number,
  chargingTime: number,
  homeChargerRate: number,
  costPerKwh: number,
  ovoRatePerKwh: number,
) => {
  return Number(
    (numberOfCharges * chargingTime * homeChargerRate * (costPerKwh - ovoRatePerKwh)).toFixed(2),
  );
};

export const calculateOvoHomeUsageSavings = (ovoRatePerKwh: number, homeUsage: number) => {
  return Number((homeUsage * ovoRatePerKwh).toFixed(2));
};

export const calculateChargerSharingSavings = (
  sessions: number,
  pricePerHour: number,
  sessionLength: number,
  margin: number,
) => {
  return Number(((sessions * 12 * pricePerHour * sessionLength * margin * 3) / 12).toFixed(2));
};

export const calculateRapidChargingSavings = (
  chargingTime: number,
  chargingSpeed: number,
  costPerkwh: number,
  chargesPerMonth: number,
  discount: number,
) => {
  const costPerCharge = chargingTime * chargingSpeed * costPerkwh;

  const costPerAnum = costPerCharge * chargesPerMonth * 12;

  return Number((costPerAnum * discount).toFixed(2));
};
export default {};
