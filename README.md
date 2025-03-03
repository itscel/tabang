# Todo App

A modern, minimalist Todo application built with React Native, featuring a clean UI inspired by Notion.

## Features

- 📱 Clean, minimalist UI with Notion-inspired design
- ✨ Smooth animations and transitions
- ✅ Task completion with animated checkboxes
- 🗑️ Task deletion with swipe actions
- 📝 Form validation using Zod
- 🎨 Styled with NativeWind (Tailwind CSS)
- 🔒 Authentication flow with sign-in and sign-up
- ⌨️ Proper keyboard handling
- 📱 Responsive design
- 💪 TypeScript for type safety

## Tech Stack

- React Native with Expo
- TypeScript
- NativeWind (Tailwind CSS)
- React Hook Form
- Zod for validation
- Expo Router for navigation
- Context API for state management

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Run on your preferred platform:

- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
todo_app/
├── app/                    # App screens and navigation
│   ├── (app)/             # Authenticated screens
│   ├── (auth)/            # Authentication screens
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
├── contexts/             # Context providers
├── types/               # TypeScript types
└── README.md
```

## Features in Detail

### Authentication

- Sign in with email and password
- Sign up with name, email, and password
- Form validation with error messages
- Loading states during authentication

### Todo Management

- Add new tasks
- Mark tasks as complete/incomplete
- Delete tasks
- Task counter in header
- Smooth animations for task interactions

### UI/UX

- Clean, minimalist design
- Responsive keyboard handling
- Smooth transitions and animations
- Error states and loading indicators
- Modern typography and spacing

## Contributing

Feel free to submit issues and pull requests.

## License

MIT License

# todo-app
