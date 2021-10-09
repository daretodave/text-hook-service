import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Hook extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  target: string;

  @property({
    type: 'number',
    default: 60 * 1000,
  })
  timeout?: number;

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

  constructor(data?: Partial<Hook>) {
    super(data);
  }
}

export interface HookRelations {
  // describe navigational properties here
}

export type HookWithRelations = Hook & HookRelations;
