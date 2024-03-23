# RiftChat

RiftChat is a real-time chat and video communication platform designed to connect users instantly and securely. Inspired by Omegle, RiftChat enhances the user experience with added safety features, real-time text messaging, and video calls facilitated by WebRTC, all built using React, TypeScript, Firebase, and Firestore.

## Future-Features

- **User Matching System**: Users are paired for chat sessions based on availability, with an algorithm that ensures timely and relevant connections.
- **Real-Time Text Chat**: Engage in live text conversations with session-based chat rooms, supported by typing indicators for a dynamic chatting experience.
- **Video and Audio Calls**: Direct, peer-to-peer video and audio calls powered by WebRTC, enabling seamless communication without external plugins.
- **Session Management**: Comprehensive control over chat sessions allows users to start, join, and effortlessly leave conversations.
- **Future-Proofing**: Designed with future integrations in mind, including AI-based content moderation to ensure a safe communication environment by detecting and preventing inappropriate content.

## Technologies

- **Frontend**: React, TypeScript
- **Backend**: Firebase, Firestore for real-time database interactions
- **Communication**: WebRTC for video and audio calls
- **Security**: Firebase Authentication, planned AI content moderation

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Firebase project

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/riftchat.git
```

2. Navigate to the project directory:

```bash
cd riftchat
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Set up your Firebase project and enable Firestore and Firebase Authentication. Update the `.env` file with your Firebase configuration keys.

5. Start the development server:

```bash
npm start
# or
yarn start
```

Your application should now be running on `http://localhost:3000`.

## Usage

1. **Start Matching**: Click on the "Find Match" button to start looking for another user to chat with.
2. **Chat Room**: Once matched, you'll be taken to a chat room where you can engage in text messaging or start a video call.
3. **Ending a Session**: You can leave the chat session at any time by clicking the "End Session" button.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss proposed changes or enhancements.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Acknowledgments

- React documentation
- Firebase documentation
- WebRTC API

---

This README provides a comprehensive guide for users and contributors to get started with RiftChat, outlining its features, setup instructions, usage, and contributing guidelines.
