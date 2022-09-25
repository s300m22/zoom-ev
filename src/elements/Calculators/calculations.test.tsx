import {
  calculateOvoEvUsageSavings,
  calculateOvoHomeUsageSavings,
  calculateChargerSharingSavings,
  calculateRapidChargingSavings,
} from './AdvancedSavingsCalculator/utils';

test('ovo ev usage calculator returns expected results', () => {
  const homeChargingMiles = 8000;
  const rangePerCharge = 180;
  const batterySize = 64;
  const homeChargerRate = 7;

  const costPerKwh = 0.195;
  const ovoRatePerKwh = 0.16;

  const numberOfCharges = homeChargingMiles / rangePerCharge;
  const chargingTime = batterySize / homeChargerRate;

  expect(
    calculateOvoEvUsageSavings(
      numberOfCharges,
      chargingTime,
      homeChargerRate,
      costPerKwh,
      ovoRatePerKwh,
    ),
  ).toEqual(99.56);

  expect(calculateOvoEvUsageSavings(53, 7, 7, 0.19, 0.16)).toEqual(77.91);
});

test('ovo home usage calculator returns expected results', () => {
  const savingPkw = 0.035;
  const homeUsage = 3285;

  expect(calculateOvoHomeUsageSavings(savingPkw, homeUsage)).toEqual(114.98);
  expect(calculateOvoHomeUsageSavings(0.03, 3000)).toEqual(90);
});

test('calculates ovo sharing correctly', () => {
  const sessionsPerMonth = 8;
  const pricePerHour = 1.75;
  const sessionLength = 6.08;
  const margin = 0.12;

  expect(
    calculateChargerSharingSavings(sessionsPerMonth, pricePerHour, sessionLength, margin),
  ).toEqual(30.64);
});

test('calculates rapid charging discount', () => {
  const chargingTime = 1.28;
  const chargingSpeed = 50;
  const costPerkwh = 0.35;
  const chargesPerMonth = 1.0185;
  const discount = 0.34;

  expect(
    calculateRapidChargingSavings(
      chargingTime,
      chargingSpeed,
      costPerkwh,
      chargesPerMonth,
      discount,
    ),
  ).toEqual(93.08);
});
