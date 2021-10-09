import {repository} from '@loopback/repository';
import {getModelSchemaRef, post, requestBody, response} from '@loopback/rest';
import {Message, MessageHookTwilio} from '../models';
import {MessageRepository} from '../repositories';
import {authenticate} from '@loopback/authentication';

@authenticate('basic')
export class MessageHooksController {
  constructor(
    @repository(MessageRepository)
    public messageRepository: MessageRepository,
  ) {
  }

  @post('/hook-twilio')
  @response(200, {
    description: 'Twilio Message Event Reply',
    content: {'application/json': {schema: getModelSchemaRef(Message)}},
  })
  async twilio(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageHookTwilio, {
            title: 'Twilio Message Event',
          }),
        },
      },
    })
      messageHook: MessageHookTwilio,
  ): Promise<Message> {
    const sid = messageHook.MessageSid === "-1" ? `debug-${Date.now()}` : messageHook.MessageSid;

    return this.messageRepository.create(new Message({
      to: messageHook.To,
      from: messageHook.From,
      content: messageHook.Body,
      sid,
    }));

  }
}
