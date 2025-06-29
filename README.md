# HopeFlow - Your Compassionate AI Companion

![HopeFlow Logo](https://img.shields.io/badge/HopeFlow-Emotional%20Support%20AI-blue?style=for-the-badge&logo=heart)

HopeFlow is a compassionate AI-powered emotional support platform that provides 24/7 mental health assistance through voice and text conversations. Built with empathy at its core, HopeFlow offers immediate, personalized emotional support to help users navigate life's challenges.

## 🌟 Features

### Core Functionality
- **24/7 Emotional Support**: Always available AI companion for immediate emotional assistance
- **Voice & Text Communication**: Flexible interaction through speech or text input
- **Personalized Responses**: AI trained in therapeutic communication and emotional intelligence
- **Conversation History**: Secure storage and retrieval of past conversations
- **Crisis Detection**: Advanced algorithms to identify and respond to crisis situations
- **Multi-Modal Interface**: Seamless switching between voice and text interactions

### Advanced AI Capabilities
- **Emotional Intelligence**: Analyzes emotional tone and provides contextually appropriate responses
- **Therapeutic Techniques**: Incorporates evidence-based emotional support methods
- **Conversation Memory**: Maintains context across sessions for personalized support
- **Crisis Intervention**: Specialized responses for mental health emergencies
- **Cultural Sensitivity**: Designed with inclusivity and cultural awareness

### Security & Privacy
- **End-to-End Encryption**: All conversations are encrypted and confidential
- **User Authentication**: Secure sign-in with Supabase authentication
- **Data Protection**: GDPR compliant data handling and storage
- **Anonymous Support**: Option for anonymous conversations
- **Privacy Controls**: User control over data retention and deletion

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and functional components
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for single-page application

### Backend & Services
- **Supabase** - Backend-as-a-Service for authentication and database
- **PostgreSQL** - Relational database for user data and conversation history
- **Google Gemini AI** - Advanced language model for emotional support responses
- **Web Speech API** - Browser-native speech recognition and synthesis

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Lucide React** - Beautiful, customizable icons

## 📋 Prerequisites

Before running HopeFlow, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Supabase Account** for backend services
- **Google AI Studio Account** for Gemini API access

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hopeflow.git
   cd hopeflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables in `.env`:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Gemini AI Configuration
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Database Setup**
   
   The project includes Supabase migrations. Run them to set up your database:
   ```bash
   # If using Supabase CLI
   supabase db reset
   
   # Or manually run the migration files in supabase/migrations/
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## 🗄️ Database Schema

### Tables

#### `user_profiles`
- `id` (uuid, primary key) - References auth.users
- `email` (text) - User's email address
- `full_name` (text, optional) - User's full name
- `created_at` (timestamp) - Account creation time
- `updated_at` (timestamp) - Last profile update

#### `chat_messages`
- `id` (uuid, primary key) - Unique message identifier
- `user_id` (uuid, foreign key) - References user_profiles.id
- `message` (text) - User's input message
- `response` (text) - AI's response
- `is_voice` (boolean) - Whether input was voice or text
- `created_at` (timestamp) - Message timestamp

### Security
- **Row Level Security (RLS)** enabled on all tables
- **Authentication policies** ensure users can only access their data
- **Automatic profile creation** on user registration

## 📱 Usage

### Getting Started
1. **Sign Up/Sign In**: Create an account or sign in to access personalized features
2. **Start Conversation**: Click "Start Your Journey" or navigate to the Talk page
3. **Choose Input Method**: Use the voice button for speech or type in the text input
4. **Receive Support**: Get immediate, empathetic responses from HopeFlow
5. **Access History**: Review past conversations in the History section

### Voice Interaction
- Click the microphone button to start voice input
- Speak naturally - HopeFlow will process your speech
- Click again to stop recording
- AI responses can be played back using text-to-speech

### Crisis Support
HopeFlow includes specialized crisis detection and response:
- Automatic identification of crisis keywords
- Immediate provision of emergency contact information
- Specialized therapeutic responses for crises


## 🔒 Security Considerations

### Data Protection
- All user conversations are encrypted in transit and at rest
- Personal information is stored securely in Supabase
- No conversation data is shared with third parties
- Users can delete their data at any time

### API Security
- Environment variables protect sensitive API keys
- Supabase RLS policies prevent unauthorized data access
- Rate limiting prevents API abuse
- Input validation prevents injection attacks

## 🤝 Contributing

We welcome contributions to HopeFlow! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style
- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design for all components
- Test across different browsers and devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mental Health Professionals** who guided therapeutic communication
- **Open Source Community** for the amazing tools and libraries
- **Beta Testers** who helped refine the user experience
- **Supabase Team** for excellent backend infrastructure
- **Google AI Team** for the Gemini language model
- **OmniDimension** for the Web Call AI Agent

## 📞 Support


## ⚠️ Important Disclaimer

HopeFlow provides emotional support and is not a substitute for professional medical advice, diagnosis, or treatment. If you're experiencing a mental health crisis or having thoughts of self-harm, please contact emergency services or professional mental health services immediately.

---

**Made with ❤️ for mental health and emotional wellness**


