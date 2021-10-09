import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServiceDatasource} from '../datasources';
import {Auth, AuthRelations} from '../models';

export class AuthRepository extends DefaultCrudRepository<
  Auth,
  typeof Auth.prototype.id,
  AuthRelations
> {
  constructor(
    @inject('datasources.messages') dataSource: ServiceDatasource,
  ) {
    super(Auth, dataSource);
  }
}
