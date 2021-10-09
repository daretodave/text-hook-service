import {model, property} from '@loopback/repository';
import {Auth} from '.';

@model({settings: {strict: false}})
export class AuthRequest extends Auth {
  @property({
    type: 'string',
    required: false,
  })
  hash: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<AuthRequest>) {
    super(data);
  }
}

export interface AuthRequestRelations {
  // describe navigational properties here
}

export type AuthRequestWithRelations = AuthRequest & AuthRequestRelations;
