/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreatePersonInput = {
  birthDate?: InputMaybe<Scalars['String']['input']>;
  birthLocationId?: InputMaybe<Scalars['ID']['input']>;
  createdBy?: InputMaybe<Scalars['ID']['input']>;
  deathDate?: InputMaybe<Scalars['String']['input']>;
  deathLocationId?: InputMaybe<Scalars['ID']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CreateRelationshipInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  personId: Scalars['ID']['input'];
  relatedPersonId: Scalars['ID']['input'];
  type: RelationshipType;
};

export type FamilyTree = {
  __typename?: 'FamilyTree';
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<FamilyTreeMember>>>;
  name: Scalars['String']['output'];
};

export type FamilyTreeMember = {
  __typename?: 'FamilyTreeMember';
  data?: Maybe<FamilyTreeMemberData>;
  id?: Maybe<Scalars['String']['output']>;
  rels?: Maybe<FamilyTreeRelationships>;
};

export type FamilyTreeMemberData = {
  __typename?: 'FamilyTreeMemberData';
  birthday?: Maybe<Scalars['String']['output']>;
  death?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
};

export type FamilyTreeRelationships = {
  __typename?: 'FamilyTreeRelationships';
  children?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  parents?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  spouses?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPerson: Person;
  createRelationship: Relationship;
};


export type MutationCreatePersonArgs = {
  input: CreatePersonInput;
};


export type MutationCreateRelationshipArgs = {
  input: CreateRelationshipInput;
};

/** Person represents an individual in a family tree. */
export type Person = {
  __typename?: 'Person';
  birthDate?: Maybe<Scalars['String']['output']>;
  birthLocation?: Maybe<Location>;
  children?: Maybe<Array<Scalars['ID']['output']>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['ID']['output']>;
  deathDate?: Maybe<Scalars['String']['output']>;
  deathLocation?: Maybe<Location>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Gender>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  parents?: Maybe<Array<Scalars['ID']['output']>>;
  spouses?: Maybe<Array<Scalars['ID']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  familyTreesByUser: Array<FamilyTree>;
  person?: Maybe<Person>;
  persons: Array<Person>;
  relationships: Array<Relationship>;
};


export type QueryFamilyTreesByUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPersonArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRelationshipsArgs = {
  personId: Scalars['ID']['input'];
};

export type Relationship = {
  __typename?: 'Relationship';
  id: Scalars['ID']['output'];
  person: Scalars['ID']['output'];
  relatedPerson: Scalars['ID']['output'];
  type: RelationshipType;
};

export enum RelationshipType {
  Child = 'CHILD',
  Parent = 'PARENT',
  Spouse = 'SPOUSE'
}

/** User represents an individual who can create and manage persons in the family tree. */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type GetPersonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPersonsQuery = { __typename?: 'Query', persons: Array<{ __typename?: 'Person', id: string, firstName?: string | null, lastName?: string | null }> };


export const GetPersonsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"persons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}}]}}]} as unknown as DocumentNode<GetPersonsQuery, GetPersonsQueryVariables>;