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
};

export type Contract = {
  __typename?: 'Contract';
  address?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  seller?: Maybe<User>;
};

export type CreateOrderInput = {
  buyerAddress?: InputMaybe<Scalars['String']>;
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
  nonce?: Maybe<Scalars['Float']>;
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

export type Message = {
  __typename?: 'Message';
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<CreateOrderMutationResponse>;
  login?: Maybe<UserMutationResponse>;
  logout?: Maybe<UserMutationResponse>;
  register?: Maybe<UserMutationResponse>;
  registerMerchant?: Maybe<MutationResponse>;
};


export type MutationCreateOrderArgs = {
  createOrderInput?: InputMaybe<CreateOrderInput>;
};


export type MutationLoginArgs = {
  loginInput?: InputMaybe<LoginInput>;
};


export type MutationLogoutArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationRegisterArgs = {
  registerInput?: InputMaybe<RegisterInput>;
};


export type MutationRegisterMerchantArgs = {
  registerMerchantInput?: InputMaybe<RegisterMerchantInput>;
};

export type MutationResponse = IMutationResponse & {
  __typename?: 'MutationResponse';
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type NeedToRefreshData = {
  __typename?: 'NeedToRefreshData';
  type?: Maybe<Scalars['String']>;
};

export type Order = {
  __typename?: 'Order';
  buyer?: Maybe<Array<Maybe<User>>>;
  confirmDeadline?: Maybe<Scalars['Float']>;
  contract?: Maybe<Array<Maybe<Contract>>>;
  decentralizedId?: Maybe<Scalars['ID']>;
  id?: Maybe<Scalars['ID']>;
  orderTime?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
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
  messages?: Maybe<Array<Maybe<Message>>>;
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
  messageCreated?: Maybe<Message>;
  needToRefreshData?: Maybe<NeedToRefreshData>;
};

export type User = {
  __typename?: 'User';
  contract?: Maybe<Array<Maybe<Contract>>>;
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  id?: Maybe<Scalars['ID']>;
  identityCode?: Maybe<Scalars['String']>;
  merchantMetaData?: Maybe<Array<Maybe<MerchantMetaData>>>;
  metaMaskPublicKey?: Maybe<Scalars['String']>;
  ordersAsBuyer?: Maybe<Array<Maybe<Order>>>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['Float']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null, message?: string | null, accessToken?: string | null } | null };

export type LogoutMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null } | null };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'UserMutationResponse', code?: number | null, success?: boolean | null } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users?: Array<{ __typename?: 'User', id?: string | null, email?: string | null, gender?: Gender | null, fullName?: string | null, phoneNumber?: string | null, identityCode?: string | null, metaMaskPublicKey?: string | null, contract?: Array<{ __typename?: 'Contract', id?: string | null, address?: string | null, seller?: { __typename?: 'User', id?: string | null } | null } | null> | null, merchantMetaData?: Array<{ __typename?: 'MerchantMetaData', id?: string | null, companyName?: string | null, companyIdentify?: string | null, businessField?: string | null, websiteUrl?: string | null, storeLocation?: string | null, note?: string | null, merchantSecretKey?: string | null } | null> | null, ordersAsBuyer?: Array<{ __typename?: 'Order', id?: string | null, decentralizedId?: string | null, price?: number | null } | null> | null } | null> | null };


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
    mutation Logout($userId: ID!) {
  logout(userId: $userId) {
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
 *      userId: // value for 'userId'
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
export const UsersDocument = gql`
    query Users {
  users {
    id
    email
    gender
    fullName
    phoneNumber
    identityCode
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