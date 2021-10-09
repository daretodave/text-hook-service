import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class HookRequest extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  target: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<HookRequest>) {
    super(data);
  }
}

export interface HookRequestRelations {
  // describe navigational properties here
}

export type HookRequestWithRelations = HookRequest & HookRequestRelations;
