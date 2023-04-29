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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ActivityHistory = {
  __typename?: 'ActivityHistory';
  amount?: Maybe<Scalars['Float']>;
  blockNumber?: Maybe<Scalars['Float']>;
  creationTime?: Maybe<Scalars['DateTime']>;
  id?: Maybe<Scalars['ID']>;
  receiver?: Maybe<User>;
  receiverAddress?: Maybe<Scalars['String']>;
  sender?: Maybe<User>;
  targetContract?: Maybe<Contract>;
  targetOrder?: Maybe<Order>;
  transactionHash?: Maybe<Scalars['String']>;
  type?: Maybe<ActivityHistoryType>;
};

export type ActivityHistoryMutationResponse = IMutationResponse & {
  __typename?: 'ActivityHistoryMutationResponse';
  activityHistory?: Maybe<ActivityHistory>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** Activity History Type */
export enum ActivityHistoryType {
  BuyerConfirmOrderShipped = 'BUYER_CONFIRM_ORDER_SHIPPED',
  CreateOrder = 'CREATE_ORDER',
  OrderCompleted = 'ORDER_COMPLETED',
  PayOrder = 'PAY_ORDER',
  RegisterMerchant = 'REGISTER_MERCHANT',
  SellerConfirmOrderShipped = 'SELLER_CONFIRM_ORDER_SHIPPED',
  ShipOrder = 'SHIP_ORDER',
  TimeOutOrder = 'TIME_OUT_ORDER',
  TransferMoney = 'TRANSFER_MONEY'
}

export type Contract = {
  __typename?: 'Contract';
  activityHistory?: Maybe<ActivityHistory>;
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  orders?: Maybe<Array<Maybe<Order>>>;
  seller?: Maybe<User>;
};

export type CreateActivityHistoryInput = {
  amount?: InputMaybe<Scalars['Float']>;
  destinationAddress?: InputMaybe<Scalars['String']>;
  destinationUserId?: InputMaybe<Scalars['Float']>;
  transactionHash?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ActivityHistoryType>;
};

export type CreateOrderInput = {
  buyerAddress?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  nonce?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  shipDeadline?: InputMaybe<Scalars['Float']>;
  signature?: InputMaybe<Scalars['String']>;
};

export type CreateOrderMutationResponse = IMutationResponse & {
  __typename?: 'CreateOrderMutationResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  order?: Maybe<Order>;
  success?: Maybe<Scalars['Boolean']>;
};

/** The basic genders */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Other = 'OTHER'
}

export type IMutationResponse = {
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type InformationForCreateOrderInput = {
  buyerEmail?: InputMaybe<Scalars['String']>;
};

export type InformationForCreateOrderResponse = IMutationResponse & {
  __typename?: 'InformationForCreateOrderResponse';
  buyerAddress?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  currentBlockTimestamp?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  nonce?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type MerchantMetaData = {
  __typename?: 'MerchantMetaData';
  businessField?: Maybe<Scalars['String']>;
  companyIdentify?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  merchantSecretKey?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  storeLocation?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type MerchantMetadataMutationResponse = IMutationResponse & {
  __typename?: 'MerchantMetadataMutationResponse';
  code?: Maybe<Scalars['Float']>;
  merchantMetaData?: Maybe<MerchantMetaData>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type MerchantMutationResponse = IMutationResponse & {
  __typename?: 'MerchantMutationResponse';
  code?: Maybe<Scalars['Float']>;
  merchantMetaData?: Maybe<MerchantMetaData>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createActivityHistory?: Maybe<ActivityHistoryMutationResponse>;
  createOrder?: Maybe<CreateOrderMutationResponse>;
  login?: Maybe<UserMutationResponse>;
  logout?: Maybe<UserMutationResponse>;
  register?: Maybe<UserMutationResponse>;
  registerMerchant?: Maybe<MerchantMutationResponse>;
  updatePassword?: Maybe<MutationResponse>;
  updateUserInfo?: Maybe<UserInfoMetaDataMutationResponse>;
  updateUserMerchantMetadata?: Maybe<MerchantMetadataMutationResponse>;
};


export type MutationCreateActivityHistoryArgs = {
  createActivityHistoryInput?: InputMaybe<CreateActivityHistoryInput>;
};


export type MutationCreateOrderArgs = {
  createOrderInput?: InputMaybe<CreateOrderInput>;
};


export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type MutationRegisterArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};


export type MutationRegisterMerchantArgs = {
  registerMerchantInput?: InputMaybe<RegisterMerchantInput>;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput?: InputMaybe<UpdatePasswordInput>;
};


export type MutationUpdateUserInfoArgs = {
  updateUserInfoInput?: InputMaybe<UpdateUserInfoInput>;
};


export type MutationUpdateUserMerchantMetadataArgs = {
  updateUserMerchantMetadataInput?: InputMaybe<UpdateUserMerchantMetadataInput>;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Order = {
  __typename?: 'Order';
  activityHistories?: Maybe<Array<Maybe<ActivityHistory>>>;
  base64QrCode?: Maybe<Scalars['String']>;
  buyer?: Maybe<User>;
  confirmDeadline?: Maybe<Scalars['Float']>;
  contract?: Maybe<Contract>;
  creationTime?: Maybe<Scalars['DateTime']>;
  decentralizedId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  isBuyerConfirm?: Maybe<Scalars['Boolean']>;
  isSellerConfirm?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  orderTime?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['String']>;
  shipDeadline?: Maybe<Scalars['Float']>;
  status?: Maybe<OrderStatus>;
};

/** The order status */
export enum OrderStatus {
  Canceled = 'CANCELED',
  Complete = 'COMPLETE',
  Created = 'CREATED',
  Paid = 'PAID',
  Shipping = 'SHIPPING'
}

export type Query = {
  __typename?: 'Query';
  informationForCreateOrder?: Maybe<InformationForCreateOrderResponse>;
  user?: Maybe<UserInfoMetaData>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryInformationForCreateOrderArgs = {
  informationForCreateOrderInput?: InputMaybe<InformationForCreateOrderInput>;
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  identityCode?: InputMaybe<Scalars['String']>;
  metaMaskPublicKey?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type RegisterMerchantInput = {
  businessField?: InputMaybe<Scalars['String']>;
  companyIdentify?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  storeLocation?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  activityHistory?: Maybe<ActivityHistory>;
};

export type UpdatePasswordInput = {
  newPassword?: InputMaybe<Scalars['String']>;
  oldPassword?: InputMaybe<Scalars['String']>;
  reEnterNewPassword?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInfoInput = {
  base64Avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Gender>;
  identityCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserMerchantMetadataInput = {
  businessField?: InputMaybe<Scalars['String']>;
  companyIdentify?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  storeLocation?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  activityHistoriesAsReceiver?: Maybe<Array<Maybe<ActivityHistory>>>;
  activityHistoriesAsSender?: Maybe<Array<Maybe<ActivityHistory>>>;
  base64Avatar?: Maybe<Scalars['String']>;
  contract?: Maybe<Contract>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']>;
  identityCode?: Maybe<Scalars['String']>;
  merchantMetaData?: Maybe<MerchantMetaData>;
  metaMaskPublicKey?: Maybe<Scalars['String']>;
  ordersAsBuyer?: Maybe<Array<Maybe<Order>>>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserInfoMetaData = {
  __typename?: 'UserInfoMetaData';
  activityHistoriesAsReceiver?: Maybe<Array<Maybe<ActivityHistory>>>;
  activityHistoriesAsSender?: Maybe<Array<Maybe<ActivityHistory>>>;
  base64Avatar?: Maybe<Scalars['String']>;
  contract?: Maybe<Contract>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['Float']>;
  identityCode?: Maybe<Scalars['String']>;
  merchantMetaData?: Maybe<MerchantMetaData>;
  metaMaskPublicKey?: Maybe<Scalars['String']>;
  ordersAsBuyer?: Maybe<Array<Maybe<Order>>>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserInfoMetaDataMutationResponse = IMutationResponse & {
  __typename?: 'UserInfoMetaDataMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<UserInfoMetaData>;
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type CreateActivityHistoryMutationVariables = Exact<{
  createActivityHistoryInput?: InputMaybe<CreateActivityHistoryInput>;
}>;


export type CreateActivityHistoryMutation = { __typename?: 'Mutation', createActivityHistory?: { __typename: 'ActivityHistoryMutationResponse', code?: number | null, success?: boolean | null, message?: string | null, activityHistory?: { __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, receiverAddress?: string | null, transactionHash?: string | null, creationTime?: any | null, sender?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null, receiver?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null } | null } | null };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null, message?: string | null, accessToken?: string | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null } | null };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null } | null };

export type RegisterMerchantMutationVariables = Exact<{
  registerMerchantInput: RegisterMerchantInput;
}>;


export type RegisterMerchantMutation = { __typename?: 'Mutation', registerMerchant?: { __typename?: 'MerchantMutationResponse', code?: number | null, success?: boolean | null, merchantMetaData?: { __typename: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null, merchantSecretKey?: string | null } | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword?: { __typename?: 'MutationResponse', code?: number | null, success?: boolean | null, message?: string | null } | null };

export type UpdateUserInfoMutationVariables = Exact<{
  updateUserInfoInput?: InputMaybe<UpdateUserInfoInput>;
}>;


export type UpdateUserInfoMutation = { __typename?: 'Mutation', updateUserInfo?: { __typename?: 'UserInfoMetaDataMutationResponse', code?: number | null, success?: boolean | null, message?: string | null, user?: { __typename?: 'UserInfoMetaData', email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, base64Avatar?: string | null } | null } | null };

export type UpdateUserMerchantMetadataMutationVariables = Exact<{
  updateUserMerchantMetadataInput?: InputMaybe<UpdateUserMerchantMetadataInput>;
}>;


export type UpdateUserMerchantMetadataMutation = { __typename?: 'Mutation', updateUserMerchantMetadata?: { __typename?: 'MerchantMetadataMutationResponse', code?: number | null, success?: boolean | null, message?: string | null, merchantMetaData?: { __typename?: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null } | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename: 'UserInfoMetaData', id?: number | null, email?: string | null, gender?: Gender | null, fullName?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, phoneNumber?: string | null, base64Avatar?: string | null, contract?: { __typename: 'Contract', id?: string | null, address?: string | null, orders?: Array<{ __typename: 'Order', id?: string | null, decentralizedId?: string | null, price?: string | null, shipDeadline?: number | null, confirmDeadline?: number | null, isBuyerConfirm?: boolean | null, isSellerConfirm?: boolean | null, status?: OrderStatus | null, orderTime?: number | null, base64QrCode?: string | null, creationTime?: any | null, name?: string | null, buyer?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null, activityHistories?: Array<{ __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, transactionHash?: string | null, creationTime?: any | null } | null> | null } | null> | null, activityHistory?: { __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, transactionHash?: string | null, creationTime?: any | null } | null } | null, merchantMetaData?: { __typename: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null, merchantSecretKey?: string | null } | null, ordersAsBuyer?: Array<{ __typename: 'Order', id?: string | null, decentralizedId?: string | null, price?: string | null, shipDeadline?: number | null, confirmDeadline?: number | null, isBuyerConfirm?: boolean | null, isSellerConfirm?: boolean | null, status?: OrderStatus | null, orderTime?: number | null, creationTime?: any | null, name?: string | null, contract?: { __typename: 'Contract', id?: string | null, address?: string | null, seller?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null, merchantMetaData?: { __typename: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null, merchantSecretKey?: string | null } | null } | null } | null, activityHistories?: Array<{ __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, transactionHash?: string | null, creationTime?: any | null } | null> | null } | null> | null, activityHistoriesAsSender?: Array<{ __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, amount?: number | null, receiverAddress?: string | null, transactionHash?: string | null, creationTime?: any | null, receiver?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null } | null> | null, activityHistoriesAsReceiver?: Array<{ __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, amount?: number | null, creationTime?: any | null, transactionHash?: string | null, sender?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null } | null> | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, base64Avatar?: string | null, metaMaskPublicKey?: string | null, contract?: { __typename?: 'Contract', id?: string | null, address?: string | null, seller?: { __typename?: 'User', id?: string | null } | null } | null, merchantMetaData?: { __typename?: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null, merchantSecretKey?: string | null } | null, ordersAsBuyer?: Array<{ __typename?: 'Order', id?: string | null, decentralizedId?: string | null, price?: string | null } | null> | null } | null> | null };

export type ActivityHistorySubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ActivityHistorySubscription = { __typename?: 'Subscription', activityHistory?: { __typename: 'ActivityHistory', id?: string | null, type?: ActivityHistoryType | null, receiverAddress?: string | null, transactionHash?: string | null, creationTime?: any | null, sender?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null, receiver?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null, targetOrder?: { __typename: 'Order', id?: string | null, decentralizedId?: string | null, price?: string | null, shipDeadline?: number | null, confirmDeadline?: number | null, isBuyerConfirm?: boolean | null, isSellerConfirm?: boolean | null, status?: OrderStatus | null, orderTime?: number | null, base64QrCode?: string | null, creationTime?: any | null, name?: string | null, buyer?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null, contract?: { __typename: 'Contract', id?: string | null, address?: string | null, seller?: { __typename: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, base64Avatar?: string | null } | null } | null } | null, targetContract?: { __typename: 'Contract', id?: string | null, address?: string | null } | null } | null };


export const CreateActivityHistoryDocument = gql`
    mutation CreateActivityHistory($createActivityHistoryInput: CreateActivityHistoryInput) {
  createActivityHistory(createActivityHistoryInput: $createActivityHistoryInput) {
    code
    success
    message
    activityHistory {
      id
      sender {
        id
        email
        gender
        fullName
        phoneNumber
        identityCode
        metaMaskPublicKey
        base64Avatar
        __typename
      }
      type
      receiver {
        id
        email
        gender
        fullName
        phoneNumber
        identityCode
        metaMaskPublicKey
        base64Avatar
        __typename
      }
      receiverAddress
      transactionHash
      creationTime
      __typename
    }
    __typename
  }
}
    `;
export type CreateActivityHistoryMutationFn = Apollo.MutationFunction<CreateActivityHistoryMutation, CreateActivityHistoryMutationVariables>;

/**
 * __useCreateActivityHistoryMutation__
 *
 * To run a mutation, you first call `useCreateActivityHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateActivityHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createActivityHistoryMutation, { data, loading, error }] = useCreateActivityHistoryMutation({
 *   variables: {
 *      createActivityHistoryInput: // value for 'createActivityHistoryInput'
 *   },
 * });
 */
export function useCreateActivityHistoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityHistoryMutation, CreateActivityHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityHistoryMutation, CreateActivityHistoryMutationVariables>(CreateActivityHistoryDocument, options);
      }
export type CreateActivityHistoryMutationHookResult = ReturnType<typeof useCreateActivityHistoryMutation>;
export type CreateActivityHistoryMutationResult = Apollo.MutationResult<CreateActivityHistoryMutation>;
export type CreateActivityHistoryMutationOptions = Apollo.BaseMutationOptions<CreateActivityHistoryMutation, CreateActivityHistoryMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    code
    success
    message
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    code
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RegisterMerchantDocument = gql`
    mutation RegisterMerchant($registerMerchantInput: RegisterMerchantInput!) {
  registerMerchant(registerMerchantInput: $registerMerchantInput) {
    code
    success
    merchantMetaData {
      id
      companyName
      companyIdentify
      businessField
      websiteUrl
      storeLocation
      note
      merchantSecretKey
      __typename
    }
  }
}
    `;
export type RegisterMerchantMutationFn = Apollo.MutationFunction<RegisterMerchantMutation, RegisterMerchantMutationVariables>;

/**
 * __useRegisterMerchantMutation__
 *
 * To run a mutation, you first call `useRegisterMerchantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMerchantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMerchantMutation, { data, loading, error }] = useRegisterMerchantMutation({
 *   variables: {
 *      registerMerchantInput: // value for 'registerMerchantInput'
 *   },
 * });
 */
export function useRegisterMerchantMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMerchantMutation, RegisterMerchantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMerchantMutation, RegisterMerchantMutationVariables>(RegisterMerchantDocument, options);
      }
export type RegisterMerchantMutationHookResult = ReturnType<typeof useRegisterMerchantMutation>;
export type RegisterMerchantMutationResult = Apollo.MutationResult<RegisterMerchantMutation>;
export type RegisterMerchantMutationOptions = Apollo.BaseMutationOptions<RegisterMerchantMutation, RegisterMerchantMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
  updatePassword(updatePasswordInput: $updatePasswordInput) {
    code
    success
    message
  }
}
    `;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserInfoDocument = gql`
    mutation UpdateUserInfo($updateUserInfoInput: UpdateUserInfoInput) {
  updateUserInfo(updateUserInfoInput: $updateUserInfoInput) {
    code
    success
    message
    user {
      email
      gender
      fullName
      phoneNumber
      identityCode
      base64Avatar
    }
  }
}
    `;
export type UpdateUserInfoMutationFn = Apollo.MutationFunction<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;

/**
 * __useUpdateUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserInfoMutation, { data, loading, error }] = useUpdateUserInfoMutation({
 *   variables: {
 *      updateUserInfoInput: // value for 'updateUserInfoInput'
 *   },
 * });
 */
export function useUpdateUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(UpdateUserInfoDocument, options);
      }
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutation>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>;
export const UpdateUserMerchantMetadataDocument = gql`
    mutation UpdateUserMerchantMetadata($updateUserMerchantMetadataInput: UpdateUserMerchantMetadataInput) {
  updateUserMerchantMetadata(
    updateUserMerchantMetadataInput: $updateUserMerchantMetadataInput
  ) {
    code
    success
    message
    merchantMetaData {
      id
      companyName
      companyIdentify
      businessField
      websiteUrl
      storeLocation
      note
    }
  }
}
    `;
export type UpdateUserMerchantMetadataMutationFn = Apollo.MutationFunction<UpdateUserMerchantMetadataMutation, UpdateUserMerchantMetadataMutationVariables>;

/**
 * __useUpdateUserMerchantMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateUserMerchantMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMerchantMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMerchantMetadataMutation, { data, loading, error }] = useUpdateUserMerchantMetadataMutation({
 *   variables: {
 *      updateUserMerchantMetadataInput: // value for 'updateUserMerchantMetadataInput'
 *   },
 * });
 */
export function useUpdateUserMerchantMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMerchantMetadataMutation, UpdateUserMerchantMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMerchantMetadataMutation, UpdateUserMerchantMetadataMutationVariables>(UpdateUserMerchantMetadataDocument, options);
      }
export type UpdateUserMerchantMetadataMutationHookResult = ReturnType<typeof useUpdateUserMerchantMetadataMutation>;
export type UpdateUserMerchantMetadataMutationResult = Apollo.MutationResult<UpdateUserMerchantMetadataMutation>;
export type UpdateUserMerchantMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateUserMerchantMetadataMutation, UpdateUserMerchantMetadataMutationVariables>;
export const UserDocument = gql`
    query user {
  user {
    id
    email
    gender
    fullName
    identityCode
    metaMaskPublicKey
    phoneNumber
    contract {
      id
      address
      orders {
        id
        decentralizedId
        price
        shipDeadline
        confirmDeadline
        isBuyerConfirm
        isSellerConfirm
        buyer {
          id
          email
          gender
          fullName
          phoneNumber
          identityCode
          metaMaskPublicKey
          base64Avatar
          __typename
        }
        status
        orderTime
        activityHistories {
          id
          type
          transactionHash
          creationTime
          __typename
        }
        base64QrCode
        creationTime
        name
        __typename
      }
      activityHistory {
        id
        type
        transactionHash
        creationTime
        __typename
      }
      __typename
    }
    merchantMetaData {
      id
      companyName
      companyIdentify
      businessField
      websiteUrl
      storeLocation
      note
      merchantSecretKey
      __typename
    }
    ordersAsBuyer {
      id
      decentralizedId
      price
      shipDeadline
      confirmDeadline
      isBuyerConfirm
      isSellerConfirm
      contract {
        id
        address
        seller {
          id
          email
          gender
          fullName
          phoneNumber
          identityCode
          metaMaskPublicKey
          merchantMetaData {
            id
            companyName
            companyIdentify
            businessField
            websiteUrl
            storeLocation
            note
            merchantSecretKey
            __typename
          }
          base64Avatar
          __typename
        }
        __typename
      }
      status
      orderTime
      activityHistories {
        id
        type
        transactionHash
        creationTime
        __typename
      }
      creationTime
      name
      __typename
    }
    activityHistoriesAsSender {
      id
      type
      amount
      receiver {
        id
        email
        gender
        fullName
        phoneNumber
        identityCode
        metaMaskPublicKey
        base64Avatar
        __typename
      }
      receiverAddress
      transactionHash
      creationTime
      __typename
    }
    activityHistoriesAsReceiver {
      id
      sender {
        id
        email
        gender
        fullName
        phoneNumber
        identityCode
        metaMaskPublicKey
        base64Avatar
        __typename
      }
      type
      amount
      creationTime
      transactionHash
      __typename
    }
    base64Avatar
    __typename
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    gender
    fullName
    phoneNumber
    identityCode
    base64Avatar
    metaMaskPublicKey
    contract {
      id
      address
      seller {
        id
      }
    }
    merchantMetaData {
      id
      companyName
      companyIdentify
      businessField
      websiteUrl
      storeLocation
      note
      merchantSecretKey
    }
    ordersAsBuyer {
      id
      decentralizedId
      price
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const ActivityHistoryDocument = gql`
    subscription activityHistory {
  activityHistory {
    id
    sender {
      id
      email
      gender
      fullName
      phoneNumber
      identityCode
      metaMaskPublicKey
      base64Avatar
      __typename
    }
    type
    receiver {
      id
      email
      gender
      fullName
      phoneNumber
      identityCode
      metaMaskPublicKey
      base64Avatar
      __typename
    }
    receiverAddress
    targetOrder {
      id
      decentralizedId
      price
      shipDeadline
      confirmDeadline
      isBuyerConfirm
      isSellerConfirm
      buyer {
        id
        email
        gender
        fullName
        phoneNumber
        identityCode
        metaMaskPublicKey
        base64Avatar
        __typename
      }
      contract {
        id
        address
        seller {
          id
          email
          gender
          fullName
          phoneNumber
          identityCode
          metaMaskPublicKey
          base64Avatar
          __typename
        }
        __typename
      }
      status
      orderTime
      base64QrCode
      creationTime
      name
      __typename
    }
    targetContract {
      id
      address
      __typename
    }
    transactionHash
    creationTime
    __typename
  }
}
    `;

/**
 * __useActivityHistorySubscription__
 *
 * To run a query within a React component, call `useActivityHistorySubscription` and pass it any options that fit your needs.
 * When your component renders, `useActivityHistorySubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivityHistorySubscription({
 *   variables: {
 *   },
 * });
 */
export function useActivityHistorySubscription(baseOptions?: Apollo.SubscriptionHookOptions<ActivityHistorySubscription, ActivityHistorySubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<ActivityHistorySubscription, ActivityHistorySubscriptionVariables>(ActivityHistoryDocument, options);
      }
export type ActivityHistorySubscriptionHookResult = ReturnType<typeof useActivityHistorySubscription>;
export type ActivityHistorySubscriptionResult = Apollo.SubscriptionResult<ActivityHistorySubscription>;