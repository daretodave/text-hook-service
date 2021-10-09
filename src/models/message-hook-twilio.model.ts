import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class MessageHookTwilio extends Model {
  @property({
    type: 'string',
    required: true,
  })
  AccountSid: string;

  @property({
    type: 'string',
    required: true,
  })
  From: string;

  @property({
    type: 'boolean',
    required: false,
  })
  Debug: boolean;

  @property({
    type: 'string',
    required: true,
  })
  Body: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  MessageSid: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<MessageHookTwilio>) {
    super(data);
  }
}

export interface MessageHookRelations {
  // describe navigational properties here
}

export type MessageHookWithRelations = MessageHookTwilio & MessageHookRelations;
