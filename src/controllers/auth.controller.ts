import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {hashSync} from 'bcrypt';
import {Auth} from '../models';
import {AuthRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('basic')
export class AuthController {
  constructor(
    @repository(AuthRepository)
    public authRepository : AuthRepository,
  ) {}

  @post('/auth')
  @response(200, {
    description: 'Auth model instance',
    content: {'application/json': {schema: getModelSchemaRef(Auth)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Auth, {
            title: 'NewAuth'
          }),
        },
      },
    })
    auth: Auth,
  ): Promise<any> {
    auth.hash = hashSync(auth.token, 5);

    delete (auth as any)['token'];

    const model = await this.authRepository.create(auth);

    return {
      ...model,
      hash: undefined,
      token: undefined
    }
  }

}
