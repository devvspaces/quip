import {
  BedrockRuntimeClient,
  Message,
  ConverseCommand,
  ConverseCommandInput,
} from '@aws-sdk/client-bedrock-runtime'; // ES Modules import

import { Injectable, Logger } from '@nestjs/common';
import { EnvironmentConfigService } from 'src/config/environment-config/environment-config.service';

@Injectable()
export class BedrockService {
  private readonly logger = new Logger(BedrockService.name);
  private client: BedrockRuntimeClient;
  constructor(private readonly configService: EnvironmentConfigService) {
    console.log(
      'process.env.AWS_ACCESS_KEY_ID',
      configService.getAwsAccessKey(),
    );
    this.client = new BedrockRuntimeClient({
      region: 'us-east-1',
      credentials: {
        accessKeyId: configService.getAwsAccessKey(),
        secretAccessKey: configService.getAwsSecretKey(),
      },
    });
  }

  async askAi(message: string) {
    const messages: Message[] = [
      {
        role: 'user',
        content: [
          {
            text: message,
          },
        ],
      },
    ];
    const input: ConverseCommandInput = {
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
      messages,
      inferenceConfig: {
        maxTokens: 1024,
        temperature: 0.5,
        topP: 1,
      },
      system: [
        {
          text: 'You are a helpful healthcare assistant and all your responses must be in json',
        },
      ],
    };

    const command = new ConverseCommand(input);

    const response = await this.client.send(command);

    const text = response.output.message.content[0].text;
    if (text) {
      return JSON.parse(text);
    }
  }
}
