import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceDatasource} from '../datasources';
import {Message, MessageRelations} from '../models';

export class MessageRepository extends DefaultCrudRepository<
  Message,
  typeof Message.prototype.sid,
  MessageRelations
> {
  constructor(
    @inject('datasources.messages') dataSource: ServiceDatasource,
  ) {
    super(Message, dataSource);
  }
}
