import {AuthenticationBindings, AuthenticationMetadata, AuthenticationStrategy} from '@loopback/authentication';
import {BindingKey, Getter, inject, injectable} from '@loopback/core';
import {Request} from '@loopback/rest';
import {repository} from '@loopback/repository';
import {AuthRepository} from '../repositories';
import {compareSync} from 'bcrypt';
import {Auth} from '../models';

export interface AuthenticationStrategyOptions {
  [property: string]: any;
}

export namespace BasicAuthenticationStrategyBindings {
  export const DEFAULT_OPTIONS =
    BindingKey.create<AuthenticationStrategyOptions>(
      'authentication.strategies.basic.defaultoptions',
    );
}

export interface Credentials {
  name?: string;
  token?: string;
}

@injectable()
export class BasicAuthenticationStrategy
  implements AuthenticationStrategy {

  @inject(BasicAuthenticationStrategyBindings.DEFAULT_OPTIONS, {optional: true})
  options: AuthenticationStrategyOptions;

  @repository(AuthRepository)
  public authRepository : AuthRepository;

  name = 'basic';


  constructor(@inject.getter(AuthenticationBindings.METADATA)
              readonly getMetaData: Getter<AuthenticationMetadata>,) {
  }

  async authenticate(request: Request): Promise<any | undefined> {
    const credentials: Credentials = this.extractCredentials(request);
    if (!credentials.token) {
      throw new Error(`Missing token.`);
    }
    if (!credentials.name) {
      throw new Error(`Missing name.`);
    }

    await this.processOptions();

    const auth = await this.authRepository.findById(credentials.name) as Auth;

    const result = compareSync(credentials.token, auth.hash);
    if (!result) {
      throw new Error(`Invalid token.`);
    }

    return auth;
  }

  extractCredentials(request: Request): Credentials {
    return {
      token: `${request.query.token ?? ''}`,
      name: `${request.query.name ?? ''}`
    };
  }

  async processOptions() {
    /**
     Obtain the options object specified in the @authenticate decorator
     of a controller method associated with the current request.
     The AuthenticationMetadata interface contains : strategy:string, options?:object
     We want the options property.
     */
    const controllerMethodAuthenticationMetadata = await this.getMetaData();

    if (!this.options) this.options = {}; //if no default options were bound, assign empty options object

    //override default options with request-level options
    this.options = Object.assign(
      {},
      this.options,
      controllerMethodAuthenticationMetadata.options,
    );
  }
}
