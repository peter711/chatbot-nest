import IWebhookResponse from './IWebhookResponse';

interface IRecipient {
  id: string;
}

export default interface IWebhookAPIRequestBody {
  recipient: IRecipient;
  message: IWebhookResponse;
}
