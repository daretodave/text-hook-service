import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceDatasource} from '../datasources';
import {Hook, HookRelations} from '../models';

export class HookRepository extends DefaultCrudRepository<
  Hook,
  typeof Hook.prototype.id,
  HookRelations
> {
  constructor(
    @inject('datasources.messages') dataSource: ServiceDatasource,
  ) {
    super(Hook, dataSource);
  }
}
