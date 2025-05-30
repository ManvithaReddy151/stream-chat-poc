import type { ChannelFilters, ChannelSort, User } from 'stream-chat';
//import React from 'react';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
  useMessageContext,
  MessageSimple,
} from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { EmojiPicker } from 'stream-chat-react/emojis';
import { init, SearchIndex } from 'emoji-mart';
import data from '@emoji-mart/data';
import './layout.css';
import { useEffect } from 'react';

const apiKey = '7zjsze3zk93s';

const queryParams = new URLSearchParams(window.location.search);
const userId = queryParams.get('userId')!;
const userName = queryParams.get('userName')!;
const userToken = queryParams.get('userToken')!;

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};
const rawClient = StreamChat.getInstance(apiKey);
(window as any).chatClient = rawClient;

const sort: ChannelSort = { last_message_at: -1 };
const filters: ChannelFilters = {
  type: 'messaging',
  members: { $in: [userId] },
};

init({ data });

const CustomMessage = () => {
  const { message } = useMessageContext();
  const entity = message?.attachments?.find(att => att.type === 'entity');

  if (entity) {
    const isProperty = entity.entityType === 'Property';
    const imageUrl =
      entity.image || (isProperty
        ? `https://source.unsplash.com/80x80/?house,building&sig=${entity.entityId}`
        : null);

        return (
          <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '12px 0' }}>
            <div
              style={{
                border: '1px solid #e0e0e0',
                padding: '16px',
                borderRadius: '12px',
                background: '#ffffff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                fontFamily: 'system-ui, sans-serif',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                maxWidth: '380px',
                width: '100%',
              }}
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="entity"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '8px',
                    objectFit: 'cover',
                  }}
                />
              )}
    
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '6px', fontWeight: '600', fontSize: '16px', color: '#333' }}>
                  {entity.name} <span style={{ fontSize: '14px', color: '#666' }}>({entity.entityType})</span>
                </div>
    
                <div style={{ fontSize: '14px', color: '#444' }}>
                  {entity.status && <div><b>Status:</b> {entity.status}</div>}
                  {entity.address && <div><b>Address:</b> {entity.address}</div>}
                </div>
    
                <button
                  style={{
                    marginTop: '12px',
                    padding: '8px 12px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                  onClick={() => alert(`Quick view: ${entity.entityType} - ${entity.entityId}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      }
    
      return <MessageSimple />;
    };
const App = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });
  useEffect(() => {
        rawClient.connectUser(user, userToken);
      }, []);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      <ChannelList filters={filters} sort={sort} />
      <Channel Message={CustomMessage} EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput audioRecordingEnabled />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
