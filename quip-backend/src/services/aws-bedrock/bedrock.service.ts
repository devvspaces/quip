import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime'; // ES Modules import

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class BedrockService {
  private readonly logger = new Logger(BedrockService.name);
  private client: BedrockRuntimeClient;
  constructor() {
    this.client = new BedrockRuntimeClient({
      region: 'eu-north-1',
    });
  }

  async askAi(message: string) {
    const request = {
      inputText: message,
      textGenerationConfig: {
        temperature: 1,
        topP: 1,
        maxTokenCount: 512,
      },
    };

    const input = {
      body: JSON.stringify(request),
      contentType: 'application/json',
      accept: 'application/json',
      modelId: 'anthropic.claude-3-5-sonnet-20240620-v1:0',
    };

    const command = new InvokeModelCommand(input);

    const response = await this.client.send(command);

    return JSON.parse(Buffer.from(response.body).toString('utf8')).results[0]
      .outputText;
  }
}
