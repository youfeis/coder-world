// components/ably-ping.tsx

'use client';

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { ablyAtom } from '~/app/_atoms/ably-atom';
import { AblyProvider, useChannel, useConnectionStateListener, ChannelProvider } from 'ably/react';
import { type Message } from 'ably';


const AblyPing: React.FC = () => {
  const [ablyClient] = useAtom(ablyAtom);

  return <AblyProvider client={ablyClient}>
    <ChannelProvider channelName='get-started'>
      <AblyPingCore/>
    </ChannelProvider>
  </AblyProvider>;
};
const AblyPingCore: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useConnectionStateListener('connected', () => {
    console.log('Connected to Ably!');
  });

  // 使用 ablyClient 来实现你需要的功能，比如订阅频道、发送消息等
  const { channel } = useChannel('get-started', 'first', (message) => {
    setMessages(previousMessages => [...previousMessages, message]);
  });

  return    <div>
    <button onClick={() => { void channel.publish('first', 'Here is my first message!') }}>
      Publish
    </button>
    {
      messages.map(message => {
        return <p key={message.id}>{message.data}</p>
      })
    }
  </div>;
};

export default AblyPing;