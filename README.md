# Task Manager Mobile App

A modern and intuitive task management mobile application built with React Native and Expo.

## Features

- 🎨 Modern and clean UI design
- 🔐 User authentication (Sign In/Sign Up)
- ✅ Create, read, update, and delete tasks
- 📱 Cross-platform (iOS and Android)
- 🎯 Form validation with Zod
- 🚀 Navigation with Expo Router
- 💅 Custom styled components

## Tech Stack

- [React Native](https://reactnative.dev/) - A framework for building native apps using React
- [Expo](https://expo.dev/) - A framework and platform for universal React applications
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
- [Expo Router](https://docs.expo.dev/routing/introduction/) - File-based routing for Expo apps
- [React Hook Form](https://react-hook-form.com/) - Forms with easy-to-use validation
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator
- Expo Go app on your mobile device (optional)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd todo-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npx expo start
```

4. Run on your desired platform:

- Press 'i' for iOS Simulator
- Press 'a' for Android Emulator
- Scan the QR code with Expo Go (iOS/Android)

## Project Structure

```
todo-app/
├── app/                    # Main application code
│   ├── (app)/             # App routes
│   ├── (auth)/            # Authentication routes
│   └── index.tsx          # Entry point (Onboarding)
├── components/            # Reusable components
├── contexts/             # React Context providers
├── assets/              # Images, fonts, etc.
└── package.json         # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# todo-app
