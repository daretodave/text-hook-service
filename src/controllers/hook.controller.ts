import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Hook} from '../models';
import {repository} from '@loopback/repository';
import {HookRepository, MessageRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('basic')
export class HookController {
  constructor(
    @repository(HookRepository)
    public hookRepository : HookRepository,
    @repository(MessageRepository)
    public messageRepository : MessageRepository,
  ) {}

  @post('/hook')
  @response(200, {
    description: 'Register Hook Event',
    content: {'application/json': {schema: getModelSchemaRef(Hook)}},
  })
  async twilio(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hook, {
            title: 'Register Hook',
          }),
        },
      },
    })
      hook: Hook,
  ): Promise<any> {
    const db: any = (this.messageRepository as any).dataSource
      .connector;

    const timeout = hook.timeout ?? 60000;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Timeout " + timeout);
      }, timeout);

      db.connect(() => {
        const cursor = db.collection("Message").watch();

        cursor.on("change", next => {
          const message = next.fullDocument;
          if (message.to === hook.target) {

            resolve(message);
          }

        });
      });


    });

  }
}
