import React, { useEffect, useState } from "react"




export type ChatMessageType = {
	message: string
	photo: string
	userId: number
	userName: string
}


const ChatPage: React.FC = () => {
	return <div>
		<Chat/>
	</div>
}


const Chat: React.FC = () => {
	let wsChannel: WebSocket

	useEffect(()=> {
		

		function createChannel() {
			wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
			wsChannel.addEventListener('close', () => {
				console.log('CLOSE WS');

			})
		}

		createChannel();
		
	}, [])


	return <div>
		<Messages wsChannel={wsChannel} />
		<AddMessageForm wsChannel={wsChannel} />
	</div>
}

const Messages: React.FC<{ wsChannel: WebSocket }> = ({ wsChannel }) => {
	const [messages, setMessages] = useState<ChatMessageType []>([])
	useEffect(() => {
		wsChannel.addEventListener('message', (e: MessageEvent) => {
			let newMessage = JSON.parse(e.data)
			setMessages((prevMessages) => [...prevMessages, ...newMessage]); 

		})
	}, [])

	return <div style={{height: '400px', overflowY: 'auto'}}>
		{messages.map((m, index) => <Message key={index} message={m} />)}
	</div>
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
	
	return <div>
		<img src={message.photo} style={{ width: '30px' }}/> <b>{message.userName}</b>
		<br />
		{message.message}
		<hr />
	</div>
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket }> = ({ wsChannel }) => {
	const [message, setMessage] = useState('')
	const [readyStatus, setReadystatus] = useState<'pending' | 'ready'>('pending');

	useEffect(() => {
		wsChannel.addEventListener('open', () => {
			setReadystatus('ready')
		})
	}, [])
	
	const sendMessage =  () => {
		if (!message) {
			return
		}
		wsChannel.send(message)
		setMessage('')
	}

	return <div>
		<div>
			<textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
		</div>
		<div>
			<button disabled={readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
		</div>
	</div>
}


export default ChatPage;