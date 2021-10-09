import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Auth extends Entity {

  @property({
    type: 'string',
    required: false,
  })
  hash: string;

  @property({
    type: 'string',
    required: false,
  })
  token: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  role: string[];

  @property({
    type: 'string',
    required: true,
    id: true
  })
  name: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Auth>) {
    super(data);
  }
}

export interface AuthRelations {
  // describe navigational properties here
}

export type AuthWithRelations = Auth & AuthRelations;
