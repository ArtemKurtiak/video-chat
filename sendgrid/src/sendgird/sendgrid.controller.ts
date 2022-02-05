import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { ConfigService } from '@nestjs/config';

@Controller()
export class SendgridController {
  constructor(
    @InjectSendGrid() private sendGridClient: SendGridService,
    private configService: ConfigService,
  ) {}

  @EventPattern('send-email')
  async sendEmail(data: { email: string; template: string }) {
    await this.sendGridClient.send({
      from: this.configService.get('SENDER_EMAIL'),
      to: data.email,
      templateId: data.template,
      dynamicTemplateData: {
        userEmail: data.email,
      },
    });
  }
}
