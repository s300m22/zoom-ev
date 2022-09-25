/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';
import { Divider, RichTextRenderer, Tooltip } from '../..';
import { ICalculatorSectionFields } from '../../../interfaces/contentful.types.generated';
import Heading from '../../Heading';
import { Checkbox, InputContainer, RangeSlider, TextField } from '../../Inputs';
import { formatPrice } from '../../../utils';
import {
  AdditionalLabel,
  CustomCheckboxWrapper,
  Wrapper,
  Summary,
  Form,
  SummaryPrice,
  SummaryParagraph,
  SummaryPartial,
  InlineLabel,
  CalculatorWrapper,
  EntrySummary,
  SummarySplit,
  TitleWrapper,
} from './AdvancedSavingsCalculator.styled';
import Popup from '../../Popup';
import { QuestionIcon } from '../../../icons';
import {
  calculateOvoHomeUsageSavings,
  calculateOvoEvUsageSavings,
  calculateChargerSharingSavings,
  calculateRapidChargingSavings,
} from './utils';
import mixpanel from 'mixpanel-browser';

const AdvancedSavingsCalculator = ({
  chargerPrice = 50,
  defaultEvRange,
  defaultMileagePerYear,
  evRange,
  mileagePerYear,
  plugsurfingRate = 0,
  tariffs,
  title,
  publicParkingPerDay = 0,
  parkingDiscount = 1,
  ospreyDiscount = 1,
  bpHomeCharger = 50,
  popupTitle,
  popupContent,
  batterySize,
  defaultBatterySize,
  publicChargingHelpText = '',
  homeChargingHelpText = 'Off- street parking is required.',
  chargerSharingHelpText = 'Off- street parking is required.',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  homeEnergySavingsHelpText = 'Not available for Single Fuel customers or homes with storage heaters',
  evParkingHelpText = '',
  deltaValue,
  deltaDiscount,
  rechargeRescueAmount,
  rechargeRescueDiscount,
  autoservePolicyAmount,
  autoserveRetailAmount,
  autoserveDiscount,
}: ICalculatorSectionFields) => {
  // to  be added to contentful
  const homeChargerRate = 7;
  const ovoRatePkwh = 0.16;
  const bpMonthsFree = 1;
  const bpPercentageOff = 0.125;
  const rapidChargingDiscount = 0.2;

  const bpPulseMembership = 7.85;
  const bpPulseCredits = 45;

  const chargingSpeed = 50;

  const [minBatterySize, maxBatterySize] = [
    Number(batterySize?.split(',')[0] || 0),
    Number(batterySize?.split(',')[1] || 0),
  ];
  const [minMileage, maxMileage] = [
    Number(mileagePerYear?.split(',')[0] || 0),
    Number(mileagePerYear?.split(',')[1] || 0),
  ];
  const [minEvRange, maxEvRange] = [
    Number(evRange?.split(',')[0] || 0),
    Number(evRange?.split(',')[1] || 0),
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [mileage, setMileage] = useState(defaultMileagePerYear || 0);
  const [sharedSessions, setSharedSessions] = useState(8);
  const [tariff, setTariff] = useState(tariffs ? tariffs[0] : ''); // eslint-disable-line
  const [annualUsage, setAnnualUsage] = useState(0); // eslint-disable-line
  const [batterySizeV, setBatterySizeV] = useState(defaultBatterySize || 64);
  const [range, setRange] = useState(defaultEvRange || 0);
  const [parkingDays, setParkingDays] = useState(2);
  const [chargerDiscount, setChargerDiscount] = useState(true);
  const [useOvoEnergy, setUseOvoEnergy] = useState(false);
  const [plugsurfingKey, setPlugsurfingKey] = useState(true);

  const [useRechargeRescue, setUseRechargeRescue] = useState(true);
  const [useDelta, setUseDelta] = useState(true);
  const [useAutoServe, setUseAutoServe] = useState(true);

  const milesCharged = useMemo(() => mileage * (1 - 8000 / mileage), [mileage]);

  const numberOfCharges = useMemo(() => milesCharged / range / 12, [range, milesCharged]);

  const bpPartnerDiscount = useMemo(() => bpPulseMembership * bpMonthsFree, []);

  const bpChargingCost = useMemo(
    () => bpPulseMembership * bpPercentageOff * (12 - bpMonthsFree),
    [],
  );

  const ospreyChargingTime = useMemo(() => batterySizeV / chargingSpeed, []);
  const ospreyCostPerCharge = useMemo(() => ospreyChargingTime * chargingSpeed * 0.66, []);

  const ospreyChargingCostAnnum = useMemo(
    () => ospreyCostPerCharge * (numberOfCharges / 2) * 12,
    [numberOfCharges],
  );

  const ospreyChargingCost = useMemo(
    () => (ospreyChargingCostAnnum * ospreyDiscount * 11) / 12 + (ospreyChargingCostAnnum / 12) * 2,
    [ospreyChargingCostAnnum],
  );

  const rapidChargingSavings = useMemo(
    () =>
      calculateRapidChargingSavings(
        batterySizeV / chargingSpeed,
        chargingSpeed,
        0.52,
        numberOfCharges / 2,
        rapidChargingDiscount,
      ),
    [numberOfCharges, batterySizeV, tariff],
  );

  const calculateParkingCost = useMemo(
    () => parkingDays * Number(publicParkingPerDay) * 12 * parkingDiscount,
    [parkingDays],
  );

  const calculateOvoDiscountHome = useMemo(
    () => calculateOvoHomeUsageSavings(Number(tariff) - ovoRatePkwh, annualUsage),
    [annualUsage, tariff],
  );

  const calculateChargerSharing = useMemo(() => {
    const pricePerHour = 2.2;
    const sessionLength = 6.08;
    const margin = 0.12;

    return calculateChargerSharingSavings(sharedSessions, pricePerHour, sessionLength, margin);
  }, [sharedSessions]);

  // eslint-disable-next-line
  const calculateOvoDiscountEv = useMemo(() => {
    const chargingTime = batterySizeV / homeChargerRate;
    const homeChargingMiles = mileage * (8000 / mileage);
    const numOfCharges = homeChargingMiles / range;

    return calculateOvoEvUsageSavings(
      numOfCharges,
      chargingTime,
      homeChargerRate,
      Number(tariff),
      ovoRatePkwh,
    );
  }, [numberOfCharges, homeChargerRate, batterySizeV, homeChargerRate, tariff, ovoRatePkwh]);

  const publicChargingCost = useMemo(
    () =>
      bpPartnerDiscount +
      bpChargingCost +
      bpPulseCredits +
      ospreyChargingCost +
      rapidChargingSavings +
      (plugsurfingKey ? plugsurfingRate : 0),
    [bpChargingCost, ospreyChargingCost, bpPartnerDiscount, plugsurfingKey, rapidChargingSavings],
  );

  const homeEnergySavings = () =>
    Math.max(calculateOvoDiscountHome, 0) +
    (useOvoEnergy ? bpHomeCharger : 0) +
    Math.max(calculateOvoDiscountEv, 0);

  const [estimatedSavings, setEstimatedSavings] = useState({
    parking: calculateParkingCost,
    homeCharging: chargerDiscount ? chargerPrice : 0,
    homeEnergy: homeEnergySavings(),
    publicCharging: publicChargingCost,
    chargerSharing: calculateChargerSharing,
    delta: useDelta ? deltaValue * deltaDiscount : 0,
    rechargeRescue: useRechargeRescue ? rechargeRescueAmount * rechargeRescueDiscount : 0,
    autoServe: useAutoServe ? autoservePolicyAmount * autoserveDiscount + autoserveRetailAmount : 0,
  });

  const sumValues = (obj: typeof estimatedSavings) => Object.values(obj).reduce((a, b) => a + b);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      homeCharging: chargerDiscount ? chargerPrice : 0,
    });
  }, [chargerDiscount]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      parking: calculateParkingCost,
    });
  }, [parkingDays, calculateParkingCost]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      publicCharging: publicChargingCost,
      homeEnergy: homeEnergySavings(),
    });
  }, [publicChargingCost, calculateOvoDiscountHome, calculateOvoDiscountEv, useOvoEnergy]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      chargerSharing: calculateChargerSharing,
    });
  }, [calculateChargerSharing]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      delta: useDelta ? deltaValue * deltaDiscount : 0,
    });
  }, [useDelta]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      rechargeRescue: useRechargeRescue ? rechargeRescueAmount * rechargeRescueDiscount : 0,
    });
  }, [useRechargeRescue]);

  useEffect(() => {
    setEstimatedSavings({
      ...estimatedSavings,
      autoServe: useAutoServe
        ? autoservePolicyAmount * autoserveDiscount + autoserveRetailAmount
        : 0,
    });
  }, [useAutoServe]);

  useEffect(() => {
    mixpanel.track('savings.calculation', {
      savings: estimatedSavings,
      selections: {
        mileage,
        sharedSessions,
        tariff,
        annualUsage,
        batterySizeV,
        range,
        parkingDays,
        chargerDiscount,
        useOvoEnergy,
        plugsurfingKey,
        useRechargeRescue,
        useDelta,
        useAutoServe,
      },
    });
  }, [estimatedSavings]);

  const PopupContent = () => (
    <>
      <Heading variant="h3">{popupTitle}</Heading>
      <RichTextRenderer>{popupContent}</RichTextRenderer>
    </>
  );

  const PopupTrigger = () => <QuestionIcon />;

  return (
    <Wrapper>
      {title && (
        <TitleWrapper id="calc">
          <Heading variant="h2">{title}</Heading>
          <Popup isOpen={showPopup} setIsOpen={setShowPopup} trigger={<PopupTrigger />}>
            <PopupContent />
          </Popup>
        </TitleWrapper>
      )}
      <CalculatorWrapper>
        <Form>
          <InputContainer>
            <RangeSlider
              initValue={mileage}
              label="How many miles do you travel per year?"
              maxValue={maxMileage}
              minValue={minMileage}
              onChange={setMileage}
              unit="miles"
            />
          </InputContainer>
          <Divider />
          <InputContainer>
            <RangeSlider
              initValue={range}
              label="What is the range of your EV?"
              maxValue={maxEvRange}
              minValue={minEvRange}
              onChange={setRange}
              unit="miles"
            />
          </InputContainer>
          <Divider />
          <InputContainer>
            <RangeSlider
              initValue={batterySizeV}
              label="What is the battery size of your EV?"
              maxValue={maxBatterySize}
              minValue={minBatterySize}
              onChange={setBatterySizeV}
              unit="kWh"
            />
          </InputContainer>
          <Divider />
          {/* <InputContainer>
            <RadioLabel>What is your energy tariff?</RadioLabel>
            <RadioInputsWrapper>
              {tariffs?.map((tariffI, index) => (
                <RadioInput
                  key={tariffI}
                  additionalLabel="perkWh"
                  checked={index === 0}
                  name="tariffE"
                  onChange={setTariff}
                  value={tariffI}
                />
              ))}
            </RadioInputsWrapper>
          </InputContainer>
          <Divider />

          <InputContainer>
            <RangeSlider
              initValue={annualUsage}
              label="And your typical annual energy usage?"
              maxValue={4500}
              minValue={0}
              onChange={setAnnualUsage}
              unit="kWh"
            />
          </InputContainer>
          <Divider /> */}
          <br />
          {/* <InputContainer>
            <InlineLabel noMargin>
              Would you take up OVO Drive home energy?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={useOvoEnergy}
                  handleChange={setUseOvoEnergy}
                  label="OVO Discount"
                  name="charger"
                />
                <SummaryPartial>{formatPrice(bpHomeCharger)}</SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br /> */}

          <InputContainer>
            <InlineLabel noMargin>
              Do you want a Plugsurfing key?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={plugsurfingKey}
                  handleChange={setPlugsurfingKey}
                  label="Charging key discount"
                  name="plugsurf"
                />
                <SummaryPartial>{formatPrice(plugsurfingRate)}</SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br />
          <InputContainer>
            <InlineLabel noMargin>
              Do you need a charging cable?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={useDelta}
                  handleChange={setUseDelta}
                  label="Cable discount"
                  name="delta"
                />
                <SummaryPartial>{formatPrice(deltaValue * deltaDiscount)}</SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br />

          <InputContainer>
            <InlineLabel noMargin>
              Do you need home a charger?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={chargerDiscount}
                  handleChange={setChargerDiscount}
                  label="Home charger discount"
                  name="charger"
                />
                <SummaryPartial>{formatPrice(chargerPrice)}</SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br />

          <InputContainer>
            <InlineLabel noMargin>
              Do you want to be rescued if you run out of charge?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={useRechargeRescue}
                  handleChange={setUseRechargeRescue}
                  label="Recharge Rescue discount"
                  name="rechargeRescue"
                />
                <SummaryPartial>
                  {formatPrice(rechargeRescueAmount * rechargeRescueDiscount, 2)}
                </SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br />
          <InputContainer>
            <InlineLabel noMargin>
              Will you service & maintain your EV?
              <CustomCheckboxWrapper>
                <Checkbox
                  checked={useAutoServe}
                  handleChange={setUseAutoServe}
                  label="Autoserve savings"
                  name="autoserve"
                />
                <SummaryPartial>
                  {formatPrice(
                    autoservePolicyAmount * autoserveDiscount + autoserveRetailAmount,
                    2,
                  )}
                </SummaryPartial>
              </CustomCheckboxWrapper>
            </InlineLabel>
          </InputContainer>
          <br />
          <InputContainer>
            <InlineLabel noMargin>
              <div style={{ paddingRight: '20px' }}>
                How often would you share your home charger with others (to make money) ?
              </div>
              <div style={{ width: 'auto' }}>
                <TextField
                  defaultValue={sharedSessions}
                  handleChange={setSharedSessions}
                  name="sharedSessions"
                  type="number"
                />
                <AdditionalLabel>sessions / month</AdditionalLabel>
              </div>
            </InlineLabel>
          </InputContainer>

          <InputContainer>
            <InlineLabel noMargin>
              How often do you use public parking?
              <div style={{ width: 'auto' }}>
                <TextField
                  defaultValue={parkingDays}
                  handleChange={setParkingDays}
                  name="parkingDays"
                  type="number"
                />
                <AdditionalLabel>days / month</AdditionalLabel>
              </div>
            </InlineLabel>
          </InputContainer>
          <Divider />
        </Form>
        <SummarySplit>
          <EntrySummary>
            {publicChargingHelpText !== '' && <Tooltip content={publicChargingHelpText} />}
            Public charging
            <SummaryPartial>{formatPrice(estimatedSavings.publicCharging)}</SummaryPartial>
          </EntrySummary>
          <EntrySummary>
            Home charging
            {homeChargingHelpText !== '' && <Tooltip content={homeChargingHelpText} />}
            <SummaryPartial>{formatPrice(estimatedSavings.homeCharging)}</SummaryPartial>
          </EntrySummary>
          <EntrySummary>
            Charger sharing
            {chargerSharingHelpText !== '' && <Tooltip content={chargerSharingHelpText} />}
            <SummaryPartial>{formatPrice(estimatedSavings.chargerSharing)}</SummaryPartial>
          </EntrySummary>
          {/* <EntrySummary>
            Home energy
            {homeEnergySavingsHelpText !== '' && <Tooltip content={homeEnergySavingsHelpText} />}
            <SummaryPartial>{formatPrice(estimatedSavings.homeEnergy)}</SummaryPartial>
          </EntrySummary> */}

          <EntrySummary>
            EV parking
            {evParkingHelpText !== '' && <Tooltip content={evParkingHelpText} />}
            <SummaryPartial>{formatPrice(estimatedSavings.parking)}</SummaryPartial>
          </EntrySummary>

          <EntrySummary>
            EV Maintenance & Accessories
            <SummaryPartial>
              {formatPrice(estimatedSavings.delta + estimatedSavings.autoServe)}
            </SummaryPartial>
          </EntrySummary>
          <EntrySummary>
            Rescue Services
            <SummaryPartial>{formatPrice(estimatedSavings.rechargeRescue)}</SummaryPartial>
          </EntrySummary>
        </SummarySplit>
        <Summary className="block md:flex">
          <SummaryParagraph>Estimated savings with Zoom EV’s Partners in year 1</SummaryParagraph>
          <SummaryPrice>{formatPrice(sumValues(estimatedSavings))}</SummaryPrice>
        </Summary>
      </CalculatorWrapper>
    </Wrapper>
  );
};

export default AdvancedSavingsCalculator;
