import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

console.log(process.env.SERVICE_DB_URL);


const config = {
  name: 'messages',
  connector: 'mongodb',
  url: process.env.SERVICE_DB_URL,
  useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServiceDatasource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'messages';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.messages', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
