interface ISender {
  id: string;
}

interface IWebhookEvent {
  sender: ISender;
  message: any;
}

interface IEntry {
  messaging: IWebhookEvent[];
}

export default interface IWebhookBodyRequest {
  object: string;
  entry: IEntry[];
}
