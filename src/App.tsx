
// import type { ChannelFilters, ChannelSort, User } from 'stream-chat';
// import {
//   Chat,
//   Channel,
//   ChannelHeader,
//   ChannelList,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
//   useCreateChatClient,
// } from 'stream-chat-react';

// import { EmojiPicker } from 'stream-chat-react/emojis';

// import { init, SearchIndex } from 'emoji-mart';
// import data from '@emoji-mart/data';

// import './layout.css';

// const apiKey = '7zjsze3zk93s';
// // const userId = 'lily-chen';
// // const userName = 'Lily Chen';
// // const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGlseS1jaGVuIn0.ucqsoYrjXJyI7BYPezFT98-VwrpCukmaPUuQFgnporA';
// //URL Lily Chen- http://localhost:5173/?userId=lily-chen&userName=Lily%20Chen&userToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGlseS1jaGVuIn0.ucqsoYrjXJyI7BYPezFT98-VwrpCukmaPUuQFgnporA
// //Liam Carter- http://localhost:5173/?userId=liam-carter&userName=Liam%20Carter&userToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGlhbS1jYXJ0ZXIifQ.JNtrCAV8Vp459AbvaRgsK1S9JJkujTyWHjqn_c3YJT8
// //manvi- http://localhost:5173/?userId=manvi1501&userName=Manvi%201501&userToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibWFudmkxNTAxIn0.HkFkfNLU_TeAPbSqPsg59VvRaFgZGpV8fxKMIKHfqL0


// const queryParams = new URLSearchParams(window.location.search);
// const userId = queryParams.get('userId')!;
// const userName = queryParams.get('userName')!;
// const userToken = queryParams.get('userToken')!;

// const user: User = {
//   id: userId,
//   name: userName,
//   image: `https://getstream.io/random_png/?name=${userName}`,
// };


// const sort: ChannelSort = { last_message_at: -1 };
// const filters: ChannelFilters = {
//   type: 'messaging',
//   members: { $in: [userId] },
// };

// init({ data });

// const App = () => {
//   const client = useCreateChatClient({
//     apiKey,
//     tokenOrProvider: userToken,
//     userData: user,
//   });

//   if (!client) return <div>Setting up client & connection...</div>;

//   return (
//     <Chat client={client}>
//       <ChannelList filters={filters} sort={sort} />
//       <Channel EmojiPicker={EmojiPicker} emojiSearchIndex={SearchIndex}>
//         <Window>
//           <ChannelHeader />
//           <MessageList />
//           <MessageInput audioRecordingEnabled/>
//         </Window>
//         <Thread />
//       </Channel>
//     </Chat>
//   );
// };

// export default App;
import type { ChannelFilters, ChannelSort, User } from 'stream-chat';
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
} from 'stream-chat-react';

import { EmojiPicker } from 'stream-chat-react/emojis';

import { init, SearchIndex } from 'emoji-mart';
import data from '@emoji-mart/data';

import './layout.css';

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

const sort: ChannelSort = { last_message_at: -1 };
const filters: ChannelFilters = {
  type: 'messaging',
  members: { $in: [userId] },
};

init({ data });

const CustomMessage = () => {
  const { message } = useMessageContext();
  const entity = message.attachments?.find(att => att.type === 'entity');

  if (entity) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '8px', background: '#f9f9f9' }}>
        <strong>{entity.name}</strong> <span style={{ fontSize: '0.85rem' }}>({entity.entityType})</span>
        <div>Status: {entity.status}</div>
        <div>{entity.address}</div>
        <button
          style={{ marginTop: '6px' }}
          onClick={() => alert(`Quick view: ${entity.entityType} - ${entity.entityId}`)}
        >
          View Details
        </button>
      </div>
    );
  }

  return (
    <div>
      <b>{message.user?.name}</b>: {message.text}
    </div>
  );
};

const App = () => {
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

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
