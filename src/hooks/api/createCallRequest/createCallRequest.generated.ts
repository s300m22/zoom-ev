import * as Types from '../../../interfaces/api.types.generated.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Scalar for receiving email from client */
  Email: any;
};

export type AddCarAvailabilityPeriodInputType = {
  /** Date in format YYYY-MM-DD (use this field or timeStart/timeEnd - never together) */
  allDayDate?: InputMaybe<Scalars['String']>;
  carId: Scalars['String'];
  /** Required when recurringWeekly is set to true */
  recurringUntil?: InputMaybe<Scalars['Float']>;
  /** Indicates whether availability should be recurring on weekly basis (can be used only with timeStart/timeEnd) */
  recurringWeekly?: InputMaybe<Scalars['Boolean']>;
  /** Timestamp in milliseconds */
  timeEnd?: InputMaybe<Scalars['Float']>;
  /** Timestamp in milliseconds */
  timeStart?: InputMaybe<Scalars['Float']>;
};

export enum BundleBenefitRequestStatusEnum {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS'
}

export type BundleBenefitRequestType = {
  __typename?: 'BundleBenefitRequestType';
  businessId: Scalars['String'];
  createdAt: Scalars['Float'];
  details: Scalars['String'];
  id: Scalars['String'];
  status: BundleBenefitRequestStatusEnum;
  type: BundleBenefitRequestTypeEnum;
  userId: Scalars['String'];
};

export enum BundleBenefitRequestTypeEnum {
  Other = 'OTHER',
  PhysicalKey = 'PHYSICAL_KEY'
}

export type BundleCodeType = {
  __typename?: 'BundleCodeType';
  available: Scalars['Boolean'];
  code: Scalars['String'];
  id: Scalars['String'];
  subscription?: Maybe<BundleSubscriptionType>;
  subscriptionId?: Maybe<Scalars['String']>;
};

export type BundleCodesQueryParamsInput = {
  assignedToSubscription?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  searchPhrase?: InputMaybe<Scalars['String']>;
  unavailable?: InputMaybe<Scalars['Boolean']>;
};

export type BundleCodesV2QueryResultType = {
  __typename?: 'BundleCodesV2QueryResultType';
  codes: Array<BundleCodeType>;
  overallCount: Scalars['Int'];
};

export type BundleInviteInternalNoteType = {
  __typename?: 'BundleInviteInternalNoteType';
  createdAt: Scalars['Float'];
  createdBy: User;
  id: Scalars['String'];
  note: Scalars['String'];
};

export type BundlePdfUploadCredentialsType = {
  __typename?: 'BundlePdfUploadCredentialsType';
  fields: Scalars['String'];
  url: Scalars['String'];
};

export type BundleSubscriptionAdditionalDataType = {
  __typename?: 'BundleSubscriptionAdditionalDataType';
  carMakerName?: Maybe<Scalars['String']>;
  carModelName?: Maybe<Scalars['String']>;
  estimatedCarDeliveryDate?: Maybe<Scalars['String']>;
  isCarPartOfFleet?: Maybe<Scalars['Boolean']>;
};

export type BundleSubscriptionCreateInput = {
  bundleTypeId: Scalars['String'];
  userId: Scalars['String'];
};

export type BundleSubscriptionPeriodType = {
  __typename?: 'BundleSubscriptionPeriodType';
  id: Scalars['String'];
  timeEnd: Scalars['Float'];
  timeStart: Scalars['Float'];
};

export type BundleSubscriptionPurchaseType = {
  __typename?: 'BundleSubscriptionPurchaseType';
  bundleSubscription: BundleSubscriptionType;
  stripeClientSecret?: Maybe<Scalars['String']>;
  stripeSubscriptionStatus: Scalars['String'];
};

export type BundleSubscriptionResellerDiscountAdditionalDataType = {
  __typename?: 'BundleSubscriptionResellerDiscountAdditionalDataType';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  carMakerName?: Maybe<Scalars['String']>;
  carModelName?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  estimatedCarDeliveryDate?: Maybe<Scalars['String']>;
  granteePhoneNumber?: Maybe<Scalars['String']>;
  isCarPartOfFleet?: Maybe<Scalars['Boolean']>;
  postcode?: Maybe<Scalars['String']>;
};

export type BundleSubscriptionResellerDiscountGranteeType = {
  __typename?: 'BundleSubscriptionResellerDiscountGranteeType';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  user?: Maybe<User>;
};

export enum BundleSubscriptionResellerDiscountStatusEnum {
  CustomerDenied = 'CUSTOMER_DENIED',
  Deleted = 'DELETED',
  Pending = 'PENDING',
  Revoked = 'REVOKED',
  Used = 'USED'
}

export type BundleSubscriptionResellerDiscountType = {
  __typename?: 'BundleSubscriptionResellerDiscountType';
  bundleType: BundleTypeType;
  carMakerName?: Maybe<Scalars['String']>;
  carModelName?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  createdBy?: Maybe<User>;
  estimatedCarDeliveryDate?: Maybe<Scalars['String']>;
  grantee: BundleSubscriptionResellerDiscountGranteeType;
  id: Scalars['String'];
  isCarPartOfFleet?: Maybe<Scalars['Boolean']>;
  notes: Array<BundleInviteInternalNoteType>;
  resellerBusiness: BusinessType;
  resellerPrice?: Maybe<Scalars['Int']>;
  status: Scalars['String'];
};

export enum BundleSubscriptionStatusEnum {
  Active = 'Active',
  Canceled = 'Canceled',
  Created = 'Created',
  Expired = 'Expired'
}

export type BundleSubscriptionSubscriberDetailsType = {
  __typename?: 'BundleSubscriptionSubscriberDetailsType';
  addressLine1: Scalars['String'];
  addressLine2: Scalars['String'];
  county: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  postCode: Scalars['String'];
  town: Scalars['String'];
};

export type BundleSubscriptionType = {
  __typename?: 'BundleSubscriptionType';
  additionalData: BundleSubscriptionAdditionalDataType;
  bundleType: BundleTypeType;
  code?: Maybe<Scalars['String']>;
  createdAt: Scalars['Float'];
  /** Not available in list/search queries */
  currentPeriod?: Maybe<BundleSubscriptionPeriodType>;
  currentPeriodEnd?: Maybe<Scalars['Float']>;
  currentPeriodPrice?: Maybe<Scalars['Int']>;
  currentPeriodStart?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  paymentMethod?: Maybe<PaymentMethodType>;
  periods: Array<BundleSubscriptionPeriodType>;
  resellerBusiness?: Maybe<BusinessType>;
  status: BundleSubscriptionStatusEnum;
  stripeInvoices?: Maybe<Array<StripeInvoiceType>>;
  stripeSubscriptionId?: Maybe<Scalars['String']>;
  stripeSubscriptionUrl?: Maybe<Scalars['String']>;
  subscriberDetails?: Maybe<BundleSubscriptionSubscriberDetailsType>;
  usedPromoCode?: Maybe<Scalars['String']>;
  user: User;
  yearOfSubscription: Scalars['Int'];
};

export type BundleSubscriptionsQueryParamsInput = {
  bundleTypeId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  onlyDueToRenewal?: InputMaybe<Scalars['Boolean']>;
  resellerBusinessId?: InputMaybe<Scalars['String']>;
  searchPhrase?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<BundleSubscriptionStatusEnum>;
};

export type BundleSubscriptionsV2QueryResultType = {
  __typename?: 'BundleSubscriptionsV2QueryResultType';
  overallCount: Scalars['Int'];
  subscriptions: Array<BundleSubscriptionType>;
};

export enum BundleTypePeriodDurationEnum {
  Month = 'Month',
  Year = 'Year'
}

export type BundleTypeResellerType = {
  __typename?: 'BundleTypeResellerType';
  active: Scalars['Boolean'];
  bundleType: BundleTypeType;
  business: BusinessType;
  id: Scalars['String'];
  resellerPrice: Scalars['Int'];
};

export type BundleTypeResellerUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  bundleTypeId: Scalars['String'];
  businessId: Scalars['String'];
  resellerPrice?: InputMaybe<Scalars['Int']>;
};

export type BundleTypeType = {
  __typename?: 'BundleTypeType';
  /** contentful page slug associated with this bundle */
  contentPageUrl: Scalars['String'];
  /** contentful banner component id associated with bundle */
  contentfulBannerComponentId?: Maybe<Scalars['String']>;
  /** contentful benefits component id associated with bundle */
  contentfulBenefitsComponentId?: Maybe<Scalars['String']>;
  /** Indicates current (newest) version of BundleType */
  currentVersionId: Scalars['String'];
  description: Scalars['String'];
  /** Information about Business which granted ResellerDiscount to available BundleType */
  grantedBy?: Maybe<BusinessType>;
  id: Scalars['String'];
  /** internal name to be used for mailchimp lists */
  internalName: Scalars['String'];
  /** Indicates whether given BundleType is default (only one can be default) */
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  periodDuration: BundleTypePeriodDurationEnum;
  price: Scalars['Int'];
  /** Returns resellers of given BundleType */
  resellers: Array<BundleTypeResellerType>;
};

export type BusinessCreateInput = {
  name: Scalars['String'];
  type: BusinessTypeEnum;
};

export type BusinessType = {
  __typename?: 'BusinessType';
  address: Scalars['String'];
  apiKey: Scalars['String'];
  brandName: Scalars['String'];
  companyNumber: Scalars['String'];
  displayName: Scalars['String'];
  emailAddress: Scalars['String'];
  id: Scalars['String'];
  isFleetInsuranceInPlace: Scalars['Boolean'];
  locationName: Scalars['String'];
  logoImage?: Maybe<ImageType>;
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  reviews: Array<ReviewType>;
  reviewsAverageScore?: Maybe<Scalars['Float']>;
  reviewsCount: Scalars['Int'];
  tradingHours: Scalars['String'];
  type: BusinessTypeEnum;
  users: Array<User>;
};

export enum BusinessTypeEnum {
  BundlePartner = 'BundlePartner',
  Insurer = 'Insurer',
  Reseller = 'Reseller'
}

export type BusinessUpdateInput = {
  address?: InputMaybe<Scalars['String']>;
  brandName?: InputMaybe<Scalars['String']>;
  companyNumber?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  emailAddress?: InputMaybe<Scalars['String']>;
  isFleetInsuranceInPlace?: InputMaybe<Scalars['Boolean']>;
  locationName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  tradingHours?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<BusinessTypeEnum>;
};

export type BusinessUserInvitationCreateInput = {
  email: Scalars['String'];
};

export type BusinessUserInvitationType = {
  __typename?: 'BusinessUserInvitationType';
  email: Scalars['String'];
  id: Scalars['String'];
};

export enum BusinessUserRoleEnum {
  Operator = 'Operator',
  Owner = 'Owner'
}

export enum CallRequestRequestedTimeTypeEnum {
  Am = 'AM',
  Any = 'ANY',
  Pm = 'PM'
}

export enum CallRequestStatusEnum {
  Complete = 'COMPLETE',
  NoResponse = 'NO_RESPONSE',
  Pending = 'PENDING'
}

export enum CallRosterDateFilterEnum {
  ThisDay = 'THIS_DAY',
  ThisMonth = 'THIS_MONTH',
  ThisWeek = 'THIS_WEEK'
}

export enum CallRosterListOrderEnum {
  CreatedAtAsc = 'CreatedAtASC',
  CreatedAtDesc = 'CreatedAtDESC',
  RequestedDateAsc = 'RequestedDateASC',
  RequestedDateDesc = 'RequestedDateDESC'
}

export type CallRosterQueryParamsInput = {
  dateFilter?: InputMaybe<CallRosterDateFilterEnum>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<CallRosterListOrderEnum>;
  requestedTime?: InputMaybe<CallRequestRequestedTimeTypeEnum>;
  showCompleted?: InputMaybe<Scalars['Boolean']>;
};

export type CallRosterQueryResultType = {
  __typename?: 'CallRosterQueryResultType';
  overallCount: Scalars['Int'];
  requests: Array<CallRosterRequestType>;
};

export type CallRosterRequestCreateInput = {
  requestedDate: Scalars['Float'];
  requestedTime: CallRequestRequestedTimeTypeEnum;
};

export type CallRosterRequestType = {
  __typename?: 'CallRosterRequestType';
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  requestStatus: CallRequestStatusEnum;
  requestedDate: Scalars['Float'];
  requestedTime: CallRequestRequestedTimeTypeEnum;
  /** returns the reseller name of the subscription the user have for this call roster request */
  resellerName?: Maybe<Scalars['String']>;
  /** returns the user attached to the call roster request */
  user: User;
};

export type CallRosterRequestUpdateInput = {
  id: Scalars['String'];
  requestedDate: Scalars['Float'];
  requestedTime: CallRequestRequestedTimeTypeEnum;
};

export type CarAvailabilityPeriodComputedType = {
  __typename?: 'CarAvailabilityPeriodComputedType';
  timeEnd: Scalars['Float'];
  timeStart: Scalars['Float'];
};

export type CarAvailabilityPeriodType = {
  __typename?: 'CarAvailabilityPeriodType';
  allDayDate?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  timeEnd?: Maybe<Scalars['Float']>;
  timeStart?: Maybe<Scalars['Float']>;
};

export enum CarDetailsApproveStatusEnum {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type CarDetailsType = {
  __typename?: 'CarDetailsType';
  approveStatus?: Maybe<CarDetailsApproveStatusEnum>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  doors?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  images: Array<ImageType>;
  mainImageId?: Maybe<Scalars['String']>;
  maker?: Maybe<CarMakerType>;
  mileage?: Maybe<Scalars['Int']>;
  model?: Maybe<CarModelType>;
  motor?: Maybe<CarMotorEnum>;
  range?: Maybe<CarRangeEnum>;
  registration: Scalars['String'];
  rejectionReason?: Maybe<Scalars['String']>;
  seats?: Maybe<Scalars['Int']>;
  transmission?: Maybe<CarTransmissionTypeEnum>;
  type?: Maybe<CarTypeEnum>;
  value?: Maybe<CarValueEnum>;
  vin?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type CarDetailsUpdateInputType = {
  carMakerId?: InputMaybe<Scalars['String']>;
  carMakerName?: InputMaybe<Scalars['String']>;
  carModelId?: InputMaybe<Scalars['String']>;
  carModelName?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  doors?: InputMaybe<Scalars['Int']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  mainImageId?: InputMaybe<Scalars['String']>;
  mileage?: InputMaybe<Scalars['Int']>;
  motor?: InputMaybe<CarMotorEnum>;
  range?: InputMaybe<CarRangeEnum>;
  registration?: InputMaybe<Scalars['String']>;
  seats?: InputMaybe<Scalars['Int']>;
  transmission?: InputMaybe<CarTransmissionTypeEnum>;
  type?: InputMaybe<CarTypeEnum>;
  value?: InputMaybe<CarValueEnum>;
  vin?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type CarEarningsInputType = {
  daily: Scalars['Int'];
  hourly: Scalars['Int'];
  weekly: Scalars['Int'];
};

export type CarEarningsType = {
  __typename?: 'CarEarningsType';
  daily: Scalars['Int'];
  hourly: Scalars['Int'];
  weekly: Scalars['Int'];
};

export type CarFakeLocationType = {
  __typename?: 'CarFakeLocationType';
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  radius: Scalars['Int'];
};

export type CarFeatureType = {
  __typename?: 'CarFeatureType';
  id: Scalars['String'];
  name: Scalars['String'];
  type: CarFeatureTypeEnum;
};

export enum CarFeatureTypeEnum {
  Extra = 'Extra',
  Other = 'Other'
}

export type CarFlagsType = {
  __typename?: 'CarFlagsType';
  isInsuredByOwner: Scalars['Boolean'];
  isMotValid: Scalars['Boolean'];
  isTaxed: Scalars['Boolean'];
};

export type CarFlagsUpdateInput = {
  isInsuredByOwner: Scalars['Boolean'];
  isMotValid: Scalars['Boolean'];
  isTaxed: Scalars['Boolean'];
};

export type CarMakerType = {
  __typename?: 'CarMakerType';
  id: Scalars['String'];
  models: Array<CarModelType>;
  name: Scalars['String'];
  visible: Scalars['Boolean'];
};

export type CarModelType = {
  __typename?: 'CarModelType';
  id: Scalars['String'];
  name: Scalars['String'];
  visible: Scalars['Boolean'];
};

export enum CarMotorEnum {
  Electric = 'Electric',
  Hybrid = 'Hybrid'
}

export type CarPricingRecommendedPriceType = {
  __typename?: 'CarPricingRecommendedPriceType';
  pricePerDay: Scalars['Int'];
  pricePerHour: Scalars['Int'];
  pricePerWeek: Scalars['Int'];
};

export type CarPricingThresholdType = {
  __typename?: 'CarPricingThresholdType';
  pricePerDay: Scalars['Int'];
  pricePerHour: Scalars['Int'];
  pricePerWeek: Scalars['Int'];
  valueMax: Scalars['Int'];
  valueMin: Scalars['Int'];
};

export type CarPricingUpdateThresholdInputType = {
  business: Scalars['Boolean'];
  pricePerDay: Scalars['Int'];
  valueMax: Scalars['Int'];
  valueMin: Scalars['Int'];
};

export enum CarRangeEnum {
  UpTo_200 = 'UP_TO_200',
  UpTo_300 = 'UP_TO_300',
  UpTo_400 = 'UP_TO_400'
}

export type CarRealLocationType = {
  __typename?: 'CarRealLocationType';
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};

export type CarRentalMarginSplitType = {
  __typename?: 'CarRentalMarginSplitType';
  owner: Scalars['Int'];
  zoom: Scalars['Int'];
};

export type CarRentalOverviewResultType = {
  __typename?: 'CarRentalOverviewResultType';
  rows: Array<CarRentalOverviewRowType>;
};

export enum CarRentalOverviewRowKindEnum {
  AcceptedPendingClosure = 'AcceptedPendingClosure',
  AcceptedUpcoming = 'AcceptedUpcoming',
  WaitingForAcceptance = 'WaitingForAcceptance'
}

export type CarRentalOverviewRowType = {
  __typename?: 'CarRentalOverviewRowType';
  kind: CarRentalOverviewRowKindEnum;
  rentalRequestId: Scalars['String'];
  text: Scalars['String'];
  user: User;
};

export enum CarRentalRequestPaymentStatusEnum {
  Completed = 'Completed',
  Failed = 'Failed',
  InProgress = 'InProgress',
  None = 'None',
  RequiresAction = 'RequiresAction'
}

export type CarRentalRequestPricesType = {
  __typename?: 'CarRentalRequestPricesType';
  additionalFee: Scalars['Int'];
  rentalFeeOwner: Scalars['Int'];
  rentalFeeSum: Scalars['Int'];
  rentalFeeZoom: Scalars['Int'];
};

export enum CarRentalRequestStatusEnum {
  Accepted = 'Accepted',
  Cancelled = 'Cancelled',
  Finished = 'Finished',
  Incidented = 'Incidented',
  Rejected = 'Rejected',
  WaitingForAcceptance = 'WaitingForAcceptance'
}

export type CarRentalRequestType = {
  __typename?: 'CarRentalRequestType';
  acceptanceNote?: Maybe<Scalars['String']>;
  additionalFee: Scalars['Int'];
  cancellationNote?: Maybe<Scalars['String']>;
  car: CarType;
  createdAt: Scalars['Float'];
  id: Scalars['String'];
  incidentDescription?: Maybe<Scalars['String']>;
  internalNote?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<PaymentMethodType>;
  paymentStatus: CarRentalRequestPaymentStatusEnum;
  prices: CarRentalRequestPricesType;
  rejectionNote?: Maybe<Scalars['String']>;
  rentalFeeOwner: Scalars['Int'];
  rentalFeeSum: Scalars['Int'];
  rentalFeeZoom: Scalars['Int'];
  status: CarRentalRequestStatusEnum;
  stripePaymentIntentClientSecret?: Maybe<Scalars['String']>;
  stripePaymentIntentId?: Maybe<Scalars['String']>;
  stripePaymentIntentUrl?: Maybe<Scalars['String']>;
  stripeSetupIntentId?: Maybe<Scalars['String']>;
  stripeSetupIntentUrl?: Maybe<Scalars['String']>;
  timeEnd: Scalars['Float'];
  timeStart: Scalars['Float'];
  user: User;
};

export type CarRentalRequestsQueryParamsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  ownerBusinessId?: InputMaybe<Scalars['String']>;
  ownerUserId?: InputMaybe<Scalars['String']>;
  renterUserId?: InputMaybe<Scalars['String']>;
  requestingAsRenter?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<CarRentalRequestStatusEnum>;
};

export type CarRentalRequestsQueryResultType = {
  __typename?: 'CarRentalRequestsQueryResultType';
  overallCount: Scalars['Int'];
  rentalRequests: Array<CarRentalRequestType>;
};

export type CarSalesInfoInputType = {
  description: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  url?: InputMaybe<Scalars['String']>;
};

export type CarSalesInfoType = {
  __typename?: 'CarSalesInfoType';
  description: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  url?: Maybe<Scalars['String']>;
};

export type CarSearchParamsInputType = {
  availabilityReturnUnavailable?: InputMaybe<Scalars['Boolean']>;
  availabilityTimeEnd?: InputMaybe<Scalars['Float']>;
  availabilityTimeStart?: InputMaybe<Scalars['Float']>;
  carMakerId?: InputMaybe<Scalars['String']>;
  features?: InputMaybe<Array<Scalars['String']>>;
  isAvailableToBuy?: InputMaybe<Scalars['Boolean']>;
  lat: Scalars['Float'];
  lon: Scalars['Float'];
  motor?: InputMaybe<Array<CarMotorEnum>>;
  ownedByBusiness?: InputMaybe<Scalars['Boolean']>;
  ownedByIndividual?: InputMaybe<Scalars['Boolean']>;
  radius: Scalars['Int'];
  range?: InputMaybe<CarRangeEnum>;
  seats?: InputMaybe<Scalars['Int']>;
  transmission?: InputMaybe<Array<CarTransmissionTypeEnum>>;
  type?: InputMaybe<Array<CarTypeEnum>>;
};

export type CarSearchResultCarRowType = {
  __typename?: 'CarSearchResultCarRowType';
  addressPublic?: Maybe<Scalars['String']>;
  available?: Maybe<Scalars['Boolean']>;
  business?: Maybe<BusinessType>;
  id: Scalars['String'];
  imagesUrls: Array<Scalars['String']>;
  isAvailableToBuy?: Maybe<Scalars['Boolean']>;
  location: CarFakeLocationType;
  mainImageUrl?: Maybe<Scalars['String']>;
  makerName: Scalars['String'];
  modelName: Scalars['String'];
  pricePerDay: Scalars['Int'];
  pricePerHour: Scalars['Int'];
  pricePerWeek: Scalars['Int'];
  reviewsAverageScore?: Maybe<Scalars['Float']>;
  reviewsCount: Scalars['Int'];
};

export type CarSearchResultObjectType = {
  __typename?: 'CarSearchResultObjectType';
  cars: Array<CarSearchResultCarRowType>;
  overallCount: Scalars['Int'];
};

export enum CarTransmissionTypeEnum {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export type CarType = {
  __typename?: 'CarType';
  addressPrivate?: Maybe<Scalars['String']>;
  addressPublic?: Maybe<Scalars['String']>;
  availabilityPeriods: Array<CarAvailabilityPeriodType>;
  availabilityPeriodsComputed: Array<CarAvailabilityPeriodComputedType>;
  bookedPeriods: Array<CarAvailabilityPeriodType>;
  business?: Maybe<BusinessType>;
  createdAt: Scalars['Float'];
  details: CarDetailsType;
  detailsRequested?: Maybe<CarDetailsType>;
  fakeLocation?: Maybe<CarFakeLocationType>;
  features: Array<CarFeatureType>;
  flags: CarFlagsType;
  id: Scalars['String'];
  isAvailableToBuy: Scalars['Boolean'];
  isDraft: Scalars['Boolean'];
  pricePerDay?: Maybe<Scalars['Int']>;
  pricePerHour?: Maybe<Scalars['Int']>;
  pricePerWeek?: Maybe<Scalars['Int']>;
  realLocation?: Maybe<CarRealLocationType>;
  reviews: Array<ReviewType>;
  reviewsAverageScore?: Maybe<Scalars['Float']>;
  reviewsCount: Scalars['Int'];
  salesInfo?: Maybe<CarSalesInfoType>;
  user?: Maybe<User>;
  visible: Scalars['Boolean'];
};

export enum CarTypeEnum {
  Car = 'Car',
  Van = 'Van'
}

export enum CarValueEnum {
  Between10And20 = 'Between10And20',
  Between20And30 = 'Between20And30',
  Between30And40 = 'Between30And40',
  Between40And60 = 'Between40And60',
  Between60And75 = 'Between60And75',
  MoreThan75 = 'MoreThan75'
}

export type CarsQueryParamsInput = {
  businessId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  searchPhrase?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<CarsSortEnum>;
  userId?: InputMaybe<Scalars['String']>;
  withDrafts?: InputMaybe<Scalars['Boolean']>;
  withPendingDetailsRequestedOnly?: InputMaybe<Scalars['Boolean']>;
};

export enum CarsSortEnum {
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc',
  RegistrationAsc = 'RegistrationAsc',
  RegistrationDesc = 'RegistrationDesc'
}

export type CarsV2QueryResultType = {
  __typename?: 'CarsV2QueryResultType';
  cars: Array<CarType>;
  overallCount: Scalars['Int'];
};

export type CommunicationPreferencesRequestInput = {
  email: Scalars['Email'];
  emailAllowed?: InputMaybe<Scalars['Boolean']>;
  phoneAllowed?: InputMaybe<Scalars['Boolean']>;
  smsAllowed?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CommunicationPreferencesType = {
  __typename?: 'CommunicationPreferencesType';
  email: Scalars['String'];
  emailAllowed: Scalars['Boolean'];
  id: Scalars['String'];
  phoneAllowed: Scalars['Boolean'];
  smsAllowed: Scalars['Boolean'];
};

export type ContactFormRequestInput = {
  email?: InputMaybe<Scalars['Email']>;
  message: Scalars['String'];
  name: Scalars['String'];
  telephone: Scalars['String'];
  topic: Scalars['String'];
};

export type ContactFormRequestType = {
  __typename?: 'ContactFormRequestType';
  createdAt: Scalars['Float'];
  email: Scalars['String'];
  id: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  telephone: Scalars['String'];
  topic: Scalars['String'];
};

export type CreateBundleTypeInput = {
  /** contentful page slug associated with this bundle */
  contentPageUrl: Scalars['String'];
  /** contentful banner component id associated with bundle */
  contentfulBannerComponentId?: InputMaybe<Scalars['String']>;
  /** contentful benefits component id associated with bundle */
  contentfulBenefitsComponentId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  /** internal name to be used for mailchimp lists */
  internalName: Scalars['String'];
  name: Scalars['String'];
  periodDuration?: InputMaybe<BundleTypePeriodDurationEnum>;
  price: Scalars['Int'];
};

export type CreateCarInputType = {
  businessId?: InputMaybe<Scalars['String']>;
  registration: Scalars['String'];
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateRentalRequestInputType = {
  carId: Scalars['String'];
  skipAvailabilityCheck?: InputMaybe<Scalars['Boolean']>;
  stripeSetupIntentId: Scalars['String'];
  timeEnd: Scalars['Float'];
  timeStart: Scalars['Float'];
};

export type CreateStripeSetupIntentResultType = {
  __typename?: 'CreateStripeSetupIntentResultType';
  clientSecret?: Maybe<Scalars['String']>;
  setupIntentId: Scalars['String'];
  status: StripeSetupIntentStatusEnum;
};

export enum EmailTemplateNameEnum {
  BasicTemplate = 'BasicTemplate',
  BasicTemplateRaw = 'BasicTemplateRaw'
}

export type EmailTemplateType = {
  __typename?: 'EmailTemplateType';
  htmlPart: Scalars['String'];
  subjectPart: Scalars['String'];
  templateName: EmailTemplateNameEnum;
  textPart: Scalars['String'];
};

export type EmailTemplateUpdateInputType = {
  htmlPart: Scalars['String'];
  subjectPart: Scalars['String'];
  templateName: EmailTemplateNameEnum;
  textPart: Scalars['String'];
};

export type GrantBundleSubscriptionResellerDiscountInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  bundleTypeId: Scalars['String'];
  carMakerName?: InputMaybe<Scalars['String']>;
  carModelName?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  estimatedCarDeliveryDate?: InputMaybe<Scalars['String']>;
  isCarPartOfFleet?: InputMaybe<Scalars['Boolean']>;
  postcode?: InputMaybe<Scalars['String']>;
  userEmail: Scalars['String'];
  userFirstName: Scalars['String'];
  userLastName: Scalars['String'];
  userPhoneNumber: Scalars['String'];
};

export type GrantedBundleSubscriptionResellerDiscountsV2Type = {
  __typename?: 'GrantedBundleSubscriptionResellerDiscountsV2Type';
  invites: Array<BundleSubscriptionResellerDiscountType>;
  overallCount: Scalars['Int'];
};

export enum GrantedBundleSubscriptionsResellerDiscountsSortEnum {
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc'
}

export enum ImagePurposeEnum {
  BusinessLogo = 'BusinessLogo',
  CarImage = 'CarImage',
  DrivingLicenseFront = 'DrivingLicenseFront',
  DrivingLicenseSelfie = 'DrivingLicenseSelfie',
  PassportFront = 'PassportFront',
  UserAvatar = 'UserAvatar'
}

export type ImageType = {
  __typename?: 'ImageType';
  id: Scalars['String'];
  url: Scalars['String'];
};

export type ImageUploadCredentialsType = {
  __typename?: 'ImageUploadCredentialsType';
  fields: Scalars['String'];
  imageId: Scalars['String'];
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Accepts pending invitation to Business (must be called by invited user) */
  acceptBusinessInvitation?: Maybe<BusinessUserInvitationType>;
  /** Accepts car details change */
  acceptCarDetailsUpdate: CarType;
  /** Accepts CarRentalRequest */
  acceptCarRentalRequest: CarRentalRequestType;
  /** Adds BundleTypeReseller */
  addBundleTypeReseller: BundleTypeResellerType;
  /** Adds car availability period */
  addCarAvailabilityPeriod: Array<CarAvailabilityPeriodType>;
  /** Adds car sales info */
  addCarSalesInfo: CarType;
  /** Add communication preferences via email. */
  addCommunicationPreferencesByEmail: CommunicationPreferencesType;
  /** Adds review to given resource */
  addReview: ReviewType;
  /** Appends tag to subscription */
  appendTagToSubscription: Array<TagType>;
  /** Appends tag to user */
  appendTagToUser: Array<TagType>;
  approveUserDetailsChange: User;
  /** Attaches user to given business */
  attachUserToBusiness: User;
  /** Bans user with given id */
  banUser: User;
  calculateCarEarnings: CarEarningsType;
  /** Cancels BundleSubscription and returns number of canceled subscriptions */
  cancelBundleSubscription: Scalars['Int'];
  /** Cancels CarRentalRequest */
  cancelCarRentalRequest: CarRentalRequestType;
  /** Cancels StripeSetupIntent */
  cancelStripeSetupIntent: Array<Scalars['String']>;
  commitBundlePdfUpload: Scalars['String'];
  /** Commits image upload and make image available */
  commitImageUpload: ImageType;
  /** Creates new bundle invite internal note */
  createBundleInviteInternalNote: BundleInviteInternalNoteType;
  /** Creates new bundleSubscription */
  createBundleSubscription: BundleSubscriptionType;
  /** Creates new Bundle Subscription Purchase */
  createBundleSubscriptionPurchase: BundleSubscriptionPurchaseType;
  /** Creates new bundleType */
  createBundleType?: Maybe<BundleTypeType>;
  /** Creates new business */
  createBusiness: BusinessType;
  /** Mutation to create a call request */
  createCallRequest: CallRosterRequestType;
  /** Creates car */
  createCar: CarType;
  /** Creates CarFeature */
  createCarFeature: CarFeatureType;
  /** Creates CarMaker */
  createCarMaker: CarMakerType;
  /** Creates CarModel */
  createCarModel: CarModelType;
  /** Creates CarRentalRequest */
  createCarRentalRequest: CarRentalRequestType;
  /** Creates new internal user note */
  createInternalUserNote: UserInternalNoteType;
  /** creates a plugsurfing key request for the user */
  createPlugSurfingBenefitRequest: BundleBenefitRequestType;
  /** Creates Stripe SetupIntent for future usage */
  createStripeSetupIntent: CreateStripeSetupIntentResultType;
  /** Creates new tag */
  createTag: TagType;
  /** Deletes bundle invite internal note */
  deleteBundleInviteInternalNote: Array<BundleInviteInternalNoteType>;
  /** Expires BundleSubscription and returns number of expired subscriptions */
  deleteBundleSubscription: Scalars['Int'];
  /** Delete BundleSubscriptionResellerDiscount PII data */
  deleteBundleSubscriptionResellerInvitePersonalData: BundleSubscriptionResellerDiscountType;
  /** Deletes BundleTypeReseller */
  deleteBundleTypeReseller: Scalars['Int'];
  /** Deletes business */
  deleteBusiness: Array<Scalars['String']>;
  /** Deletes pending Business invitation (must be called by Admin or Business Owner) */
  deleteBusinessInvitation?: Maybe<BusinessUserInvitationType>;
  /** Deletes car */
  deleteCar: Array<Scalars['String']>;
  /** Deletes CarAvailability by given id */
  deleteCarAvailabilityPeriod: Array<CarAvailabilityPeriodType>;
  /** Deletes all availabilities with given chainId (recurring) */
  deleteCarAvailabilityPeriodChain: Array<CarAvailabilityPeriodType>;
  /** Deletes CarFeature */
  deleteCarFeature: Scalars['Int'];
  /** Deletes Car.isDraft flag */
  deleteCarIsDraftFlag: CarType;
  /** Deletes car location */
  deleteCarLocation: CarType;
  /** Deletes CarMaker */
  deleteCarMaker: Array<Scalars['String']>;
  /** Deletes CarModel */
  deleteCarModel: Array<Scalars['String']>;
  /** Deletes car sales info */
  deleteCarSalesInfo: CarType;
  /** Deletes new internal user note */
  deleteInternalUserNote: Array<UserInternalNoteType>;
  /** Deletes Review */
  deleteReview: Scalars['Float'];
  /** Deletes tag */
  deleteTag: Array<TagType>;
  /** Deletes the user with given id */
  deleteUser: UserDeleteType;
  /** Detaches tag from subscription */
  detachTagFromSubscription: Array<TagType>;
  /** Detaches tag from user */
  detachTagFromUser: Array<TagType>;
  /** Detaches user from given business */
  detachUserFromBusiness: User;
  /** Finishes CarRentalRequest */
  finishCarRentalRequest: CarRentalRequestType;
  /** Generates requested quantity of codes */
  generateBundleCodes: Scalars['Int'];
  /** Grants admin privileges */
  grantAdminPrivileges: User;
  /** Grants BundleSubscriptionResellerDiscount */
  grantBundleSubscriptionResellerDiscount: BundleSubscriptionResellerDiscountType;
  /** Creates Business invitation (must be called by Admin or Business Owner) */
  inviteUserToBusiness: BusinessUserInvitationType;
  /** Marks the BundleSubscriptionResellerDiscount as Customer Denied */
  markAsCustomerDeniedBundleSubscriptionResellerDiscount: BundleSubscriptionResellerDiscountType;
  /** Mutation to mark the call request as done */
  markCallRequestAsDone: CallRosterRequestType;
  /** Mutation to mark the call request as No Response */
  markCallRequestAsNoResponse: CallRosterRequestType;
  /** Mark a subscription as LBG subscription */
  markSubscriptionAsLbg: Array<TagType>;
  /** Predicts car details based on provided car registration */
  predictCarDetails?: Maybe<PredictCarDetailsResultType>;
  /** Prepares report */
  prepareReport: PrepareReportResultType;
  /** Rejects pending invitation to Business (must be called by invited user) */
  rejectBusinessInvitation?: Maybe<BusinessUserInvitationType>;
  /** Rejects car details change */
  rejectCarDetailsUpdate: CarType;
  /** Rejects CarRentalRequest */
  rejectCarRentalRequest: CarRentalRequestType;
  rejectUserDetailsChange: User;
  /** Reloads cars locations */
  reloadCarsLocationCache: Scalars['Boolean'];
  removeCarFromFavourites: Array<Scalars['String']>;
  /** Reports incident during CarRentalRequest */
  reportCarRentalRequestIncidentAsOwner: CarRentalRequestType;
  /** Resets requesting user detailsRequested */
  resetMyDetailsRequested: UserDetailsType;
  /** Reverts the BundleSubscriptionResellerDiscount from Customer Denied to Pending */
  revertCustomerDeniedBundleSubscriptionResellerDiscount: BundleSubscriptionResellerDiscountType;
  /** Revokes admin privileges */
  revokeAdminPrivileges: User;
  /** Revokes granted BundleSubscriptionResellerDiscount */
  revokeBundleSubscriptionResellerDiscount: BundleSubscriptionResellerDiscountType;
  /** Sends BundleSubscriptionResellerDiscount notification */
  sendBundleSubscriptionResellerDiscountNotification: Scalars['Boolean'];
  /** Sets User.isBusinessInvitationPopupClosed */
  setBusinessInvitationPopupClosed: User;
  setCarAsFavourite: Array<Scalars['String']>;
  /** Updates car visibility */
  setCarVisible: CarType;
  /** Sets User.isOwnerProfileSetupFlowInitiated */
  setOwnerProfileSetupFlowInitiated: User;
  /** Updates User.validAsCarOwner */
  setValidAsCarOwner: User;
  /** Updates User.validAsCarRenter */
  setValidAsCarRenter: User;
  signBundlePdfUploadCredentials: BundlePdfUploadCredentialsType;
  /** Creates direct image upload credentials */
  signImageUploadCredentials: ImageUploadCredentialsType;
  /** Creates URL for Stripe Express Dashboard */
  signStripeConnectExpressDashboardLink: Scalars['String'];
  /** Creates URL for Stripe Account OnBoarding */
  signStripeConnectOnBoardingLink: Scalars['String'];
  submitContactFormRequest: ContactFormRequestType;
  /**
   * Adds email to newsletter subscribers list
   * @deprecated use addCommunicationPreferencesByEmail instead
   */
  subscribeNewsletter: Scalars['String'];
  /** Unbans user with given id */
  unbanUser: User;
  /**
   * Deletes email from newsletter subscribers list
   * @deprecated use updateCommunicationPreferences instead
   */
  unsubscribeNewsletter: Scalars['String'];
  /** Updates bundle invite internal note */
  updateBundleInviteInternalNote: BundleInviteInternalNoteType;
  /** Updates Bundle Subscription Payment Method */
  updateBundleSubscriptionPaymentMethod: BundleSubscriptionPurchaseType;
  /** Updates bundleType */
  updateBundleType: BundleTypeType;
  /** Updates BundleTypeReseller */
  updateBundleTypeReseller: Scalars['Int'];
  /** Updates business */
  updateBusiness: BusinessType;
  /** Updates business logo image */
  updateBusinessLogoImage: BusinessType;
  /** Mutation to update a call request */
  updateCallRequest: CallRosterRequestType;
  /** Updates car details (or creates/updates details change request) */
  updateCarDetails: CarType;
  /** Updates CarFeature */
  updateCarFeature: CarFeatureType;
  /** Updates car features */
  updateCarFeatures: CarType;
  /** Updates Car.flags */
  updateCarFlags: CarType;
  /** Updates car guide */
  updateCarGuide?: Maybe<Array<Scalars['String']>>;
  /** Updates car location */
  updateCarLocation: CarType;
  /** Updates car locationTips */
  updateCarLocationTips?: Maybe<Array<Scalars['String']>>;
  /** updates CarMaker */
  updateCarMaker: CarMakerType;
  /** Updates CarModel */
  updateCarModel: CarModelType;
  /** Updates car prices */
  updateCarPrices: CarType;
  /** Updates given pricing threshold */
  updateCarPricingThreshold: Array<CarPricingThresholdType>;
  /** Updates CarRentalRequest.internalNote */
  updateCarRentalRequestInternalNote: CarRentalRequestType;
  /** Update car sales info */
  updateCarSalesInfo: CarType;
  /** update communication preferences for the user */
  updateCommunicationPreferences: CommunicationPreferencesType;
  /** Updates email template */
  updateEmailTemplate: EmailTemplateType;
  /** Updates new internal user note */
  updateInternalUserNote: UserInternalNoteType;
  /** Updates requesting user avatar */
  updateMyAvatar: UserDetailsType;
  /** Updates requesting user details */
  updateMyDetails: UserDetailsType;
  /** Updates requesting user phone number */
  updateMyPhoneNumber: UserDetailsType;
  /** Updates User.businessRole */
  updateUserBusinessRole: User;
  /** Updates requested user details */
  updateUserDetails: UserDetailsType;
  /** Updates User.internalDetails */
  updateUserInternalDetails: UserInternalDetailsType;
  /**
   * Returns value of promotion code or null when is invalid
   * @deprecated Replaced with validatePromotionCodeV2
   */
  validatePromotionCode?: Maybe<Scalars['Int']>;
  /** Returns details of promotion code or null when is invalid */
  validatePromotionCodeV2?: Maybe<PromotionCodeType>;
};


export type MutationAcceptCarDetailsUpdateArgs = {
  carId: Scalars['String'];
};


export type MutationAcceptCarRentalRequestArgs = {
  id: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};


export type MutationAddBundleTypeResellerArgs = {
  bundleTypeId: Scalars['String'];
  businessId: Scalars['String'];
};


export type MutationAddCarAvailabilityPeriodArgs = {
  input: AddCarAvailabilityPeriodInputType;
};


export type MutationAddCarSalesInfoArgs = {
  carId: Scalars['String'];
  salesInfoInput: CarSalesInfoInputType;
};


export type MutationAddCommunicationPreferencesByEmailArgs = {
  preferencesInput: CommunicationPreferencesRequestInput;
};


export type MutationAddReviewArgs = {
  note: Scalars['String'];
  rentalRequestId: Scalars['String'];
  reviewType: ReviewTypeEnum;
  score: Scalars['Int'];
};


export type MutationAppendTagToSubscriptionArgs = {
  subscriptionId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationAppendTagToUserArgs = {
  tagId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationApproveUserDetailsChangeArgs = {
  userId: Scalars['String'];
};


export type MutationAttachUserToBusinessArgs = {
  businessId: Scalars['String'];
  businessRole: BusinessUserRoleEnum;
  userId: Scalars['String'];
};


export type MutationBanUserArgs = {
  userId: Scalars['String'];
};


export type MutationCalculateCarEarningsArgs = {
  input: CarEarningsInputType;
};


export type MutationCancelBundleSubscriptionArgs = {
  bundleSubscriptionId?: InputMaybe<Scalars['String']>;
};


export type MutationCancelCarRentalRequestArgs = {
  id: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};


export type MutationCancelStripeSetupIntentArgs = {
  id: Scalars['String'];
};


export type MutationCommitBundlePdfUploadArgs = {
  bundleTypeId: Scalars['String'];
  fileName: Scalars['String'];
};


export type MutationCommitImageUploadArgs = {
  imageId: Scalars['String'];
};


export type MutationCreateBundleInviteInternalNoteArgs = {
  bundleInviteId: Scalars['String'];
  note: Scalars['String'];
};


export type MutationCreateBundleSubscriptionArgs = {
  input: BundleSubscriptionCreateInput;
};


export type MutationCreateBundleSubscriptionPurchaseArgs = {
  input: PurchaseBundleSubscriptionInput;
};


export type MutationCreateBundleTypeArgs = {
  bundleInput: CreateBundleTypeInput;
};


export type MutationCreateBusinessArgs = {
  input: BusinessCreateInput;
};


export type MutationCreateCallRequestArgs = {
  input: CallRosterRequestCreateInput;
};


export type MutationCreateCarArgs = {
  input: CreateCarInputType;
};


export type MutationCreateCarFeatureArgs = {
  name: Scalars['String'];
  type: CarFeatureTypeEnum;
};


export type MutationCreateCarMakerArgs = {
  name: Scalars['String'];
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateCarModelArgs = {
  carMakerId: Scalars['String'];
  name: Scalars['String'];
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type MutationCreateCarRentalRequestArgs = {
  input: CreateRentalRequestInputType;
};


export type MutationCreateInternalUserNoteArgs = {
  isDraft: Scalars['Boolean'];
  note: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreatePlugSurfingBenefitRequestArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStripeSetupIntentArgs = {
  paymentMethodId: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationDeleteBundleInviteInternalNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationDeleteBundleSubscriptionArgs = {
  bundleSubscriptionId: Scalars['String'];
};


export type MutationDeleteBundleSubscriptionResellerInvitePersonalDataArgs = {
  resellerDiscountId: Scalars['String'];
};


export type MutationDeleteBundleTypeResellerArgs = {
  bundleTypeId: Scalars['String'];
  businessId: Scalars['String'];
};


export type MutationDeleteBusinessArgs = {
  businessId: Scalars['String'];
};


export type MutationDeleteBusinessInvitationArgs = {
  email: Scalars['String'];
};


export type MutationDeleteCarArgs = {
  carId: Scalars['String'];
};


export type MutationDeleteCarAvailabilityPeriodArgs = {
  periodId: Scalars['String'];
};


export type MutationDeleteCarAvailabilityPeriodChainArgs = {
  chainId: Scalars['String'];
};


export type MutationDeleteCarFeatureArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCarIsDraftFlagArgs = {
  carId: Scalars['String'];
};


export type MutationDeleteCarLocationArgs = {
  carId: Scalars['String'];
};


export type MutationDeleteCarMakerArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCarModelArgs = {
  id: Scalars['String'];
};


export type MutationDeleteCarSalesInfoArgs = {
  carId: Scalars['String'];
};


export type MutationDeleteInternalUserNoteArgs = {
  noteId: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['String'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String'];
};


export type MutationDetachTagFromSubscriptionArgs = {
  subscriptionId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationDetachTagFromUserArgs = {
  tagId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDetachUserFromBusinessArgs = {
  userId: Scalars['String'];
};


export type MutationFinishCarRentalRequestArgs = {
  id: Scalars['String'];
};


export type MutationGenerateBundleCodesArgs = {
  quantity: Scalars['Int'];
};


export type MutationGrantAdminPrivilegesArgs = {
  userId: Scalars['String'];
};


export type MutationGrantBundleSubscriptionResellerDiscountArgs = {
  input: GrantBundleSubscriptionResellerDiscountInput;
};


export type MutationInviteUserToBusinessArgs = {
  businessId?: InputMaybe<Scalars['String']>;
  input: BusinessUserInvitationCreateInput;
};


export type MutationMarkAsCustomerDeniedBundleSubscriptionResellerDiscountArgs = {
  resellerDiscountId: Scalars['String'];
};


export type MutationMarkCallRequestAsDoneArgs = {
  id: Scalars['String'];
};


export type MutationMarkCallRequestAsNoResponseArgs = {
  id: Scalars['String'];
};


export type MutationMarkSubscriptionAsLbgArgs = {
  response: Scalars['Boolean'];
  subscriptionId: Scalars['String'];
};


export type MutationPredictCarDetailsArgs = {
  registration: Scalars['String'];
};


export type MutationPrepareReportArgs = {
  report: Scalars['String'];
  timeEnd?: InputMaybe<Scalars['Float']>;
  timeStart?: InputMaybe<Scalars['Float']>;
};


export type MutationRejectCarDetailsUpdateArgs = {
  carId: Scalars['String'];
  rejectionReason: Scalars['String'];
};


export type MutationRejectCarRentalRequestArgs = {
  id: Scalars['String'];
  note?: InputMaybe<Scalars['String']>;
};


export type MutationRejectUserDetailsChangeArgs = {
  rejectionReason: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveCarFromFavouritesArgs = {
  carId: Scalars['String'];
};


export type MutationReportCarRentalRequestIncidentAsOwnerArgs = {
  id: Scalars['String'];
  incidentDescription: Scalars['String'];
};


export type MutationRevertCustomerDeniedBundleSubscriptionResellerDiscountArgs = {
  resellerDiscountId: Scalars['String'];
};


export type MutationRevokeAdminPrivilegesArgs = {
  userId: Scalars['String'];
};


export type MutationRevokeBundleSubscriptionResellerDiscountArgs = {
  resellerDiscountId: Scalars['String'];
};


export type MutationSendBundleSubscriptionResellerDiscountNotificationArgs = {
  resellerDiscountId: Scalars['String'];
};


export type MutationSetCarAsFavouriteArgs = {
  carId: Scalars['String'];
};


export type MutationSetCarVisibleArgs = {
  carId: Scalars['String'];
  visible: Scalars['Boolean'];
};


export type MutationSetValidAsCarOwnerArgs = {
  userId: Scalars['String'];
  valid: Scalars['Boolean'];
};


export type MutationSetValidAsCarRenterArgs = {
  userId: Scalars['String'];
  valid: Scalars['Boolean'];
};


export type MutationSignBundlePdfUploadCredentialsArgs = {
  bundleTypeId: Scalars['String'];
  fileName: Scalars['String'];
};


export type MutationSignImageUploadCredentialsArgs = {
  imagePurpose: ImagePurposeEnum;
};


export type MutationSubmitContactFormRequestArgs = {
  input: ContactFormRequestInput;
};


export type MutationSubscribeNewsletterArgs = {
  email: Scalars['Email'];
};


export type MutationUnbanUserArgs = {
  userId: Scalars['String'];
};


export type MutationUnsubscribeNewsletterArgs = {
  email: Scalars['Email'];
};


export type MutationUpdateBundleInviteInternalNoteArgs = {
  note: Scalars['String'];
  noteId: Scalars['String'];
};


export type MutationUpdateBundleSubscriptionPaymentMethodArgs = {
  paymentMethodId: Scalars['String'];
};


export type MutationUpdateBundleTypeArgs = {
  id: Scalars['String'];
  updateInput: UpdateBundleTypeInput;
};


export type MutationUpdateBundleTypeResellerArgs = {
  update: BundleTypeResellerUpdateInput;
};


export type MutationUpdateBusinessArgs = {
  businessId: Scalars['String'];
  updateInput: BusinessUpdateInput;
};


export type MutationUpdateBusinessLogoImageArgs = {
  businessId: Scalars['String'];
  imageId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCallRequestArgs = {
  input: CallRosterRequestUpdateInput;
};


export type MutationUpdateCarDetailsArgs = {
  carId: Scalars['String'];
  updateInput: CarDetailsUpdateInputType;
};


export type MutationUpdateCarFeatureArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
  type: CarFeatureTypeEnum;
};


export type MutationUpdateCarFeaturesArgs = {
  carId: Scalars['String'];
  features: Array<Scalars['String']>;
};


export type MutationUpdateCarFlagsArgs = {
  carId: Scalars['String'];
  flags: CarFlagsUpdateInput;
};


export type MutationUpdateCarGuideArgs = {
  carId: Scalars['String'];
  guide: Scalars['String'];
};


export type MutationUpdateCarLocationArgs = {
  addressPrivate: Scalars['String'];
  addressPublic: Scalars['String'];
  carId: Scalars['String'];
  lat: Scalars['Float'];
  lon: Scalars['Float'];
};


export type MutationUpdateCarLocationTipsArgs = {
  carId: Scalars['String'];
  locationTips: Scalars['String'];
};


export type MutationUpdateCarMakerArgs = {
  carMakerId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUpdateCarModelArgs = {
  carModelId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type MutationUpdateCarPricesArgs = {
  carId: Scalars['String'];
  input: UpdateCarPricesInputType;
};


export type MutationUpdateCarPricingThresholdArgs = {
  input: CarPricingUpdateThresholdInputType;
};


export type MutationUpdateCarRentalRequestInternalNoteArgs = {
  id: Scalars['String'];
  note: Scalars['String'];
};


export type MutationUpdateCarSalesInfoArgs = {
  carId: Scalars['String'];
  salesInfoInput: CarSalesInfoInputType;
};


export type MutationUpdateCommunicationPreferencesArgs = {
  preferencesInput: CommunicationPreferencesRequestInput;
};


export type MutationUpdateEmailTemplateArgs = {
  update: EmailTemplateUpdateInputType;
};


export type MutationUpdateInternalUserNoteArgs = {
  isDraft: Scalars['Boolean'];
  note: Scalars['String'];
  noteId: Scalars['String'];
};


export type MutationUpdateMyAvatarArgs = {
  avatarImageId: Scalars['String'];
};


export type MutationUpdateMyDetailsArgs = {
  isDraft?: InputMaybe<Scalars['Boolean']>;
  update: UserDetailsUpdateInput;
};


export type MutationUpdateMyPhoneNumberArgs = {
  phoneNumber: Scalars['String'];
};


export type MutationUpdateUserBusinessRoleArgs = {
  businessRole: BusinessUserRoleEnum;
  userId: Scalars['String'];
};


export type MutationUpdateUserDetailsArgs = {
  update: UserDetailsUpdateInput;
  userId: Scalars['String'];
};


export type MutationUpdateUserInternalDetailsArgs = {
  input: UserInternalDetailsUpdateInput;
  userId: Scalars['String'];
};


export type MutationValidatePromotionCodeArgs = {
  code: Scalars['String'];
};


export type MutationValidatePromotionCodeV2Args = {
  code: Scalars['String'];
};

export type PaymentMethodType = {
  __typename?: 'PaymentMethodType';
  brand?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  last4: Scalars['String'];
};

export type PredictCarDetailsResultType = {
  __typename?: 'PredictCarDetailsResultType';
  color?: Maybe<Scalars['String']>;
  doorCount?: Maybe<Scalars['Float']>;
  make?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  motor?: Maybe<CarMotorEnum>;
  seatCount?: Maybe<Scalars['Float']>;
  transmission?: Maybe<CarTransmissionTypeEnum>;
  value?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Float']>;
};

export type PrepareReportResultType = {
  __typename?: 'PrepareReportResultType';
  url: Scalars['String'];
};

export enum PromotionCodeDurationEnum {
  Forever = 'Forever',
  Once = 'Once',
  Repeating = 'Repeating'
}

export type PromotionCodeMetadataType = {
  __typename?: 'PromotionCodeMetadataType';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type PromotionCodeType = {
  __typename?: 'PromotionCodeType';
  active: Scalars['Boolean'];
  amountOff?: Maybe<Scalars['Int']>;
  code: Scalars['String'];
  couponId: Scalars['String'];
  currency?: Maybe<Scalars['String']>;
  duration: PromotionCodeDurationEnum;
  id: Scalars['String'];
  metadata?: Maybe<Array<PromotionCodeMetadataType>>;
  name?: Maybe<Scalars['String']>;
  percentOff?: Maybe<Scalars['Int']>;
  valid: Scalars['Boolean'];
};

export type PurchaseBundleSubscriptionInput = {
  addressLine1: Scalars['String'];
  addressLine2: Scalars['String'];
  bundleTypeId?: InputMaybe<Scalars['String']>;
  carMakerName?: InputMaybe<Scalars['String']>;
  carModelName?: InputMaybe<Scalars['String']>;
  county: Scalars['String'];
  couponPromoCode?: InputMaybe<Scalars['String']>;
  estimatedCarDeliveryDate?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  isCarPartOfFleet?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  paymentMethodId?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  postCode: Scalars['String'];
  town: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns list of available reports */
  availableReports: Array<ReportType>;
  /** Returns BundleCode retrieved by given id or code */
  bundleCode: BundleCodeType;
  /** Returns list of BundleCodes */
  bundleCodes: Array<BundleCodeType>;
  /** Returns overall number of codes */
  bundleCodesCount: Scalars['Int'];
  /** Returns list of BundleCodes with overallCount */
  bundleCodesV2: BundleCodesV2QueryResultType;
  /** Returns bundleSubscription selected by given id */
  bundleSubscription?: Maybe<BundleSubscriptionType>;
  /** Returns BundleSubscriptions selected by given params */
  bundleSubscriptions: Array<BundleSubscriptionType>;
  /** Returns overall number of subscriptions */
  bundleSubscriptionsCount: Scalars['Int'];
  /** Returns BundleSubscriptions selected by given params with overallCount */
  bundleSubscriptionsV2: BundleSubscriptionsV2QueryResultType;
  /** Returns bundleType selected by given bundleTypeId */
  bundleType?: Maybe<BundleTypeType>;
  /** Returns URL of BundleType-related PDF file */
  bundleTypePdfUrl?: Maybe<Scalars['String']>;
  /** Returns BundleType which user can buy (default or granted by reseller) */
  bundleTypeThatICanPurchase: BundleTypeType;
  /** Returns all available bundleTypes */
  bundleTypes: Array<BundleTypeType>;
  /** Returns all BundleTypes that requesting user can grant to other users */
  bundleTypesThatMyBusinessCanGrant: Array<BundleTypeType>;
  /** Returns business selected by given id */
  business?: Maybe<BusinessType>;
  /** Returns invitation created for requesting user */
  businessInvitationForMe?: Maybe<BusinessUserInvitationType>;
  /** Returns all invitations for given businessId (when called by Administrator), or for current business (when called by Business Owner) */
  businessUserInvitations: Array<BusinessUserInvitationType>;
  /** Returns all businesses existing in database */
  businesses: Array<BusinessType>;
  /** Returns the call request by id */
  callRequest?: Maybe<CallRosterRequestType>;
  /** get all call roster requests */
  callRequests: CallRosterQueryResultType;
  /** Returns requested car */
  car?: Maybe<CarType>;
  /** Returns single CarFeature by id */
  carFeature: CarFeatureType;
  /** Returns all available CarFeatures */
  carFeatures: Array<CarFeatureType>;
  /** Returns guide for given car */
  carGuide?: Maybe<Scalars['String']>;
  /** Returns locationTips for given car */
  carLocationTips?: Maybe<Scalars['String']>;
  /** Returns carMaker selected by given id */
  carMaker: CarMakerType;
  /** Returns CarMakers */
  carMakers: Array<CarMakerType>;
  /** Returns maximum possible car price aberration from recommended */
  carPriceMaximumAberration: Scalars['Int'];
  /** Returns recommended car pricing (for business or individual) */
  carPricing: Array<CarPricingThresholdType>;
  carRealLocation?: Maybe<CarRealLocationType>;
  /** Returns recently created car (by requesting user or business) */
  carRecentlyCreated?: Maybe<CarType>;
  /** Returns car owner and zoom commission split */
  carRentalMarginSplit: CarRentalMarginSplitType;
  /** Returns overview rows for business */
  carRentalOverview: CarRentalOverviewResultType;
  /** Returns CarRental price */
  carRentalPrice: CarRentalRequestPricesType;
  /** Returns CarRentalRequest by given id */
  carRentalRequest: CarRentalRequestType;
  /** Returns list of CarRentalRequests */
  carRentalRequests: CarRentalRequestsQueryResultType;
  /** Returns list of cars */
  cars: Array<CarType>;
  /** Returns cars in given radius filtered by parameters */
  carsInRadius: CarSearchResultObjectType;
  /** Returns cars which was recently created */
  carsRecentlyCreated: Array<CarType>;
  /** Returns cars which was recently rented */
  carsRecentlyRented: Array<CarType>;
  /** Returns list of cars and overallCount based on filters */
  carsV2: CarsV2QueryResultType;
  /** Returns all ContactFormRequests */
  contactFormRequests: Array<ContactFormRequestType>;
  /** Returns all email templates */
  emailTemplates: Array<EmailTemplateType>;
  /** Returns bundle invite notes */
  getBundleInviteInternalNotes: BundleInviteInternalNoteType;
  /** Returns BundleSubscriptionResellerDiscount selected by given id */
  grantedBundleSubscriptionResellerDiscount: BundleSubscriptionResellerDiscountType;
  /** List all BundleSubscriptionResellerDiscount granted by business */
  grantedBundleSubscriptionResellerDiscounts: Array<BundleSubscriptionResellerDiscountType>;
  /** Returns list of BundleSubscriptionResellerDiscounts */
  grantedBundleSubscriptionResellerDiscountsV2: GrantedBundleSubscriptionResellerDiscountsV2Type;
  /** Returns UserInternalNote by given id */
  internalUserNote: UserInternalNoteType;
  /**
   * Returns state of StripeConnectedAccount setup
   * @deprecated Helper for debugging
   */
  isStripeConnectProperlySetup: Scalars['Boolean'];
  /** Returns currently authenticated user */
  me: User;
  /** Returns the users current active call request */
  myCallRequest?: Maybe<CallRosterRequestType>;
  /** Returns user owned or user-business owned cars */
  myCars: Array<CarType>;
  myFavouriteCarsIds: Array<Scalars['String']>;
  /** returns current plugsurfing benefit request for user */
  plugSurfingBenefitRequest?: Maybe<BundleBenefitRequestType>;
  /** Returns recommended price for car based on its value and age */
  recommendedCarPrice: CarPricingRecommendedPriceType;
  /** Returns additionalData from ResellerDiscount that is eligible for requesting user */
  resellerDiscountAdditionalData?: Maybe<BundleSubscriptionResellerDiscountAdditionalDataType>;
  /** Returns Review selected by given id */
  review: ReviewType;
  /** Returns connected stripe account balance */
  stripeConnectedAccountBalance?: Maybe<StripeConnectedAccountBalanceType>;
  /** Returns StripeSetupIntents for given (by default requesting) user */
  stripeSetupIntents: Array<StripeSetupIntentType>;
  /** Returns all available tags */
  tags: Array<TagType>;
  /** Returns user selected by given id */
  user?: Maybe<User>;
  /** Returns list of users queried by given params */
  users: Array<User>;
  /** Returns count of users present in database */
  usersCount: Scalars['Int'];
  /** Returns list of users queried by given params and overallCount */
  usersV2: UsersV2QueryResultType;
};


export type QueryBundleCodeArgs = {
  code?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};


export type QueryBundleCodesArgs = {
  params: BundleCodesQueryParamsInput;
};


export type QueryBundleCodesV2Args = {
  params: BundleCodesQueryParamsInput;
};


export type QueryBundleSubscriptionArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryBundleSubscriptionsArgs = {
  params: BundleSubscriptionsQueryParamsInput;
};


export type QueryBundleSubscriptionsV2Args = {
  params: BundleSubscriptionsQueryParamsInput;
};


export type QueryBundleTypeArgs = {
  id: Scalars['String'];
};


export type QueryBundleTypePdfUrlArgs = {
  bundleTypeId: Scalars['String'];
};


export type QueryBusinessArgs = {
  id: Scalars['String'];
};


export type QueryBusinessUserInvitationsArgs = {
  businessId?: InputMaybe<Scalars['String']>;
};


export type QueryCallRequestArgs = {
  id: Scalars['String'];
};


export type QueryCallRequestsArgs = {
  params: CallRosterQueryParamsInput;
};


export type QueryCarArgs = {
  id: Scalars['String'];
};


export type QueryCarFeatureArgs = {
  id: Scalars['String'];
};


export type QueryCarGuideArgs = {
  carId: Scalars['String'];
};


export type QueryCarLocationTipsArgs = {
  carId: Scalars['String'];
};


export type QueryCarMakerArgs = {
  id: Scalars['String'];
};


export type QueryCarMakersArgs = {
  visible?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCarPricingArgs = {
  business: Scalars['Boolean'];
};


export type QueryCarRealLocationArgs = {
  carId: Scalars['String'];
};


export type QueryCarRecentlyCreatedArgs = {
  onlyWithRealLocation?: InputMaybe<Scalars['Boolean']>;
};


export type QueryCarRentalPriceArgs = {
  carId: Scalars['String'];
  timeEnd: Scalars['Float'];
  timeStart: Scalars['Float'];
};


export type QueryCarRentalRequestArgs = {
  id: Scalars['String'];
};


export type QueryCarRentalRequestsArgs = {
  params: CarRentalRequestsQueryParamsInput;
};


export type QueryCarsArgs = {
  params: CarsQueryParamsInput;
};


export type QueryCarsInRadiusArgs = {
  params: CarSearchParamsInputType;
};


export type QueryCarsRecentlyCreatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryCarsRecentlyRentedArgs = {
  byMe?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryCarsV2Args = {
  params: CarsQueryParamsInput;
};


export type QueryGetBundleInviteInternalNotesArgs = {
  bundleInviteId: Scalars['String'];
};


export type QueryGrantedBundleSubscriptionResellerDiscountArgs = {
  id: Scalars['String'];
};


export type QueryGrantedBundleSubscriptionResellerDiscountsArgs = {
  businessId?: InputMaybe<Scalars['String']>;
};


export type QueryGrantedBundleSubscriptionResellerDiscountsV2Args = {
  businessId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  searchPhrase?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  sort: GrantedBundleSubscriptionsResellerDiscountsSortEnum;
  status?: InputMaybe<BundleSubscriptionResellerDiscountStatusEnum>;
};


export type QueryInternalUserNoteArgs = {
  id: Scalars['String'];
};


export type QueryRecommendedCarPriceArgs = {
  business: Scalars['Boolean'];
  carAge: Scalars['Int'];
  carValue: CarValueEnum;
};


export type QueryReviewArgs = {
  id: Scalars['String'];
};


export type QueryStripeSetupIntentsArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QueryUsersArgs = {
  params: UsersQueryParamsInput;
};


export type QueryUsersV2Args = {
  params: UsersQueryParamsInput;
};

export type ReportType = {
  __typename?: 'ReportType';
  name: Scalars['String'];
  type: Scalars['String'];
};

export type ReviewType = {
  __typename?: 'ReviewType';
  business?: Maybe<BusinessType>;
  id: Scalars['String'];
  note: Scalars['String'];
  resourceId: Scalars['String'];
  reviewType: ReviewTypeEnum;
  score: Scalars['Int'];
  user?: Maybe<User>;
};

export enum ReviewTypeEnum {
  Car = 'Car',
  CarOwnerBusiness = 'CarOwnerBusiness',
  CarOwnerIndividual = 'CarOwnerIndividual',
  CarRenter = 'CarRenter'
}

export type StripeConnectedAccountBalanceType = {
  __typename?: 'StripeConnectedAccountBalanceType';
  available: Scalars['Int'];
  pending: Scalars['Int'];
};

export enum StripeInvoiceStatusEnum {
  Deleted = 'Deleted',
  Draft = 'Draft',
  Open = 'Open',
  Paid = 'Paid',
  Refunded = 'Refunded',
  Uncollectible = 'Uncollectible',
  Void = 'Void'
}

export type StripeInvoiceType = {
  __typename?: 'StripeInvoiceType';
  id: Scalars['String'];
  status: StripeInvoiceStatusEnum;
  stripeInvoiceUrl?: Maybe<Scalars['String']>;
};

export enum StripeSetupIntentStatusEnum {
  Cancelled = 'Cancelled',
  Processing = 'Processing',
  RequiresAction = 'RequiresAction',
  RequiresConfirmation = 'RequiresConfirmation',
  Succeeded = 'Succeeded'
}

export type StripeSetupIntentType = {
  __typename?: 'StripeSetupIntentType';
  cardBrand: Scalars['String'];
  cardLast4: Scalars['String'];
  id: Scalars['String'];
};

export type TagType = {
  __typename?: 'TagType';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateBundleTypeInput = {
  /** contentful page slug associated with this bundle */
  contentPageUrl?: InputMaybe<Scalars['String']>;
  /** contentful banner component id associated with bundle */
  contentfulBannerComponentId?: InputMaybe<Scalars['String']>;
  /** contentful benefits component id associated with bundle */
  contentfulBenefitsComponentId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  /** internal name to be used for mailchimp lists */
  internalName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Int']>;
};

export type UpdateCarPricesInputType = {
  pricePerDay: Scalars['Int'];
  pricePerHour: Scalars['Int'];
  pricePerWeek: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  bannedAt?: Maybe<Scalars['Float']>;
  business?: Maybe<BusinessType>;
  businessUserRole?: Maybe<BusinessUserRoleEnum>;
  callRequest?: Maybe<CallRosterRequestType>;
  communicationPreferences?: Maybe<CommunicationPreferencesType>;
  createdAt: Scalars['Float'];
  details: UserDetailsType;
  detailsRequested?: Maybe<UserDetailsType>;
  email: Scalars['String'];
  id: Scalars['String'];
  internalDetails: UserInternalDetailsType;
  invites: Array<BundleSubscriptionResellerDiscountType>;
  isAdmin: Scalars['Boolean'];
  isBusinessInvitationPopupClosed: Scalars['Boolean'];
  isOwnerProfileSetupFlowInitiated: Scalars['Boolean'];
  /** @deprecated please use communicationPreferences instead */
  marketingPermissionsProvided: Scalars['Boolean'];
  paymentMethods: Array<PaymentMethodType>;
  reviews: Array<ReviewType>;
  reviewsAverageScore?: Maybe<Scalars['Float']>;
  reviewsCount: Scalars['Int'];
  stripeConnectedAccountId?: Maybe<Scalars['String']>;
  stripeConnectedAccountSetupRequired?: Maybe<Scalars['Boolean']>;
  stripeConnectedAccountUrl?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  stripeCustomerUrl?: Maybe<Scalars['String']>;
  subscriptions: Array<BundleSubscriptionType>;
  tags: Array<TagType>;
  validAsCarOwner: Scalars['Boolean'];
  validAsCarRenter: Scalars['Boolean'];
};


export type UserStripeCustomerIdArgs = {
  createIfNotExist?: InputMaybe<Scalars['Boolean']>;
};

export type UserDeleteType = {
  __typename?: 'UserDeleteType';
  deleted: Scalars['Boolean'];
};

export enum UserDetailsApprovalStatusEnum {
  Approved = 'Approved',
  Draft = 'Draft',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type UserDetailsType = {
  __typename?: 'UserDetailsType';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  approvalStatus?: Maybe<UserDetailsApprovalStatusEnum>;
  avatarImage?: Maybe<ImageType>;
  checkCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  county?: Maybe<Scalars['String']>;
  dateOfBirth?: Maybe<Scalars['String']>;
  drivingLicenseCountryOfIssue?: Maybe<Scalars['String']>;
  drivingLicenseFrontImage?: Maybe<ImageType>;
  drivingLicenseNumber?: Maybe<Scalars['String']>;
  drivingLicenseSelfieImage?: Maybe<ImageType>;
  drivingLicenseValidFrom?: Maybe<Scalars['String']>;
  drivingLicenseValidTo?: Maybe<Scalars['String']>;
  drivingRecordCheckCode?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  passportFrontImage?: Maybe<ImageType>;
  phoneNumber?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  rejectionReason?: Maybe<Scalars['String']>;
};

export type UserDetailsUpdateInput = {
  addressLine1?: InputMaybe<Scalars['String']>;
  addressLine2?: InputMaybe<Scalars['String']>;
  avatarImageId?: InputMaybe<Scalars['String']>;
  checkCode?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  county?: InputMaybe<Scalars['String']>;
  dateOfBirth?: InputMaybe<Scalars['String']>;
  drivingLicenseCountryOfIssue?: InputMaybe<Scalars['String']>;
  drivingLicenseFrontImageId?: InputMaybe<Scalars['String']>;
  drivingLicenseNumber?: InputMaybe<Scalars['String']>;
  drivingLicenseSelfieImageId?: InputMaybe<Scalars['String']>;
  drivingLicenseValidFrom?: InputMaybe<Scalars['String']>;
  drivingLicenseValidTo?: InputMaybe<Scalars['String']>;
  drivingRecordCheckCode?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  passportFrontImageId?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  postCode?: InputMaybe<Scalars['String']>;
};

export type UserInternalDetailsType = {
  __typename?: 'UserInternalDetailsType';
  isThreeWayVerified?: Maybe<Scalars['Boolean']>;
  notes: Array<UserInternalNoteType>;
  numberOfPoints?: Maybe<Scalars['String']>;
  restrictionsOnLicense?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UserInternalDetailsUpdateInput = {
  isThreeWayVerified?: InputMaybe<Scalars['Boolean']>;
  numberOfPoints?: InputMaybe<Scalars['String']>;
  restrictionsOnLicense?: InputMaybe<Scalars['String']>;
};

export type UserInternalNoteType = {
  __typename?: 'UserInternalNoteType';
  createdAt: Scalars['Float'];
  createdBy: User;
  id: Scalars['String'];
  isDraft: Scalars['Boolean'];
  note: Scalars['String'];
};

export enum UsersOrderEnum {
  CreatedAtAsc = 'CreatedAtAsc',
  CreatedAtDesc = 'CreatedAtDesc',
  EmailAsc = 'EmailAsc',
  EmailDesc = 'EmailDesc'
}

export type UsersQueryParamsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  onlyWithRequestedChanges?: InputMaybe<Scalars['Boolean']>;
  order?: InputMaybe<UsersOrderEnum>;
  searchPhrase?: InputMaybe<Scalars['String']>;
  showDeleted?: InputMaybe<Scalars['Boolean']>;
  validAsCarOwner?: InputMaybe<Scalars['Boolean']>;
  validAsCarRenter?: InputMaybe<Scalars['Boolean']>;
};

export type UsersV2QueryResultType = {
  __typename?: 'UsersV2QueryResultType';
  overallCount: Scalars['Int'];
  users: Array<User>;
};

export type CreateCallRequestMutationVariables = Types.Exact<{
  input: Types.CallRosterRequestCreateInput;
}>;


export type CreateCallRequestMutation = { __typename?: 'Mutation', createCallRequest: { __typename?: 'CallRosterRequestType', id: string } };


export const CreateCallRequestDocument = gql`
    mutation createCallRequest($input: CallRosterRequestCreateInput!) {
  createCallRequest(input: $input) {
    id
  }
}
    `;
export type CreateCallRequestMutationFn = Apollo.MutationFunction<CreateCallRequestMutation, CreateCallRequestMutationVariables>;

/**
 * __useCreateCallRequestMutation__
 *
 * To run a mutation, you first call `useCreateCallRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCallRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCallRequestMutation, { data, loading, error }] = useCreateCallRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCallRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateCallRequestMutation, CreateCallRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCallRequestMutation, CreateCallRequestMutationVariables>(CreateCallRequestDocument, options);
      }
export type CreateCallRequestMutationHookResult = ReturnType<typeof useCreateCallRequestMutation>;
export type CreateCallRequestMutationResult = Apollo.MutationResult<CreateCallRequestMutation>;
export type CreateCallRequestMutationOptions = Apollo.BaseMutationOptions<CreateCallRequestMutation, CreateCallRequestMutationVariables>;