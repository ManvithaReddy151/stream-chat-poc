import { DefaultAttachmentData, DefaultChannelData } from 'stream-chat-react';

declare module 'stream-chat' {
  interface CustomAttachmentData extends DefaultAttachmentData {
    image?: string;
    name?: string;
    url?: string;
    entityType?: string;
    entityId?: string;
    status?: string;
    address?: string;
  }

  interface CustomChannelData extends DefaultChannelData {
    image?: string;
  }
}
