# 🌟 Personalized Horoscope API

A Node.js backend service that generates and serves personalized daily horoscopes for users based on their zodiac sign. This project includes user authentication, zodiac sign auto-detection, daily horoscope generation, and user history tracking.

## ✨ Features

- **User Authentication**: Signup and login with JWT tokens
- **Auto Zodiac Detection**: Automatically calculates zodiac sign from birthdate
- **Daily Horoscopes**: Generate and serve personalized daily horoscopes
- **History Tracking**: Track user horoscope viewing history
- **Rate Limiting**: Prevent API abuse with configurable rate limits
- **API Documentation**: Complete Swagger/OpenAPI documentation
- **User History**: Store and retrieve user horoscope viewing patterns

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Rate Limiting**: express-rate-limit
- **API Documentation**: Swagger/OpenAPI
- **CORS**: Cross-origin resource sharing enabled

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personalized-horoscope-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env with your configuration
   # Update MongoDB URI, JWT secret, and other settings
   ```

4. **Database Setup**
   - Ensure MongoDB is running locally or update the `MONGODB_URI` in your `.env` file
   - The application will automatically create the necessary collections

5. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
```
http://localhost:3000/api-docs
```

## 🔐 API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "birthdate": "1990-05-15"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "zodiacSign": "Taurus",
    "birthdate": "1990-05-15T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

#### POST `/api/auth/login`
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/profile`
Get user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Horoscope

#### GET `/api/horoscope/today`
Get today's horoscope for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "horoscope": {
    "_id": "horoscope_id",
    "zodiacSign": "Taurus",
    "date": "2024-01-15T00:00:00.000Z",
    "content": "Your steady and reliable nature brings stability...",
    "category": "general",
    "mood": "positive"
  }
}
```

#### GET `/api/horoscope/history`
Get horoscope history for the last 7 days.

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### GET `/api/horoscope/{zodiacSign}`
Get today's horoscope for a specific zodiac sign (public endpoint).

**Example:**
```
GET /api/horoscope/Aries
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  birthdate: Date,
  zodiacSign: String (enum),
  createdAt: Date,
  lastLogin: Date,
  updatedAt: Date
}
```

### Horoscope Collection
```javascript
{
  _id: ObjectId,
  zodiacSign: String (enum),
  date: Date,
  content: String,
  category: String (enum),
  mood: String (enum),
  createdAt: Date,
  updatedAt: Date
}
```

### UserHistory Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  horoscopeId: ObjectId (ref: Horoscope),
  zodiacSign: String (enum),
  viewedAt: Date,
  date: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/horoscope-api |
| `JWT_SECRET` | JWT signing secret | your-super-secret-jwt-key |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 60000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 5 |

## 🧪 Testing

```bash
# Run tests
npm test
```

## 📊 Rate Limiting

The API implements rate limiting to prevent abuse:
- **Limit**: 5 requests per minute per IP address
- **Headers**: Includes `X-RateLimit-*` headers in responses
- **Configurable**: Can be adjusted via environment variables

## 🔮 Horoscope Generation

The system generates horoscopes using:
- **Zodiac-specific templates**: Each sign has unique personality traits
- **Multiple categories**: General, love, career, health, finance
- **Mood variations**: Positive, neutral, challenging
- **Daily uniqueness**: Same zodiac sign gets different content each day

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🎯 Design Decisions

### Architecture
- **MVC Pattern**: Separated models, routes, and middleware for maintainability
- **Middleware-based**: Authentication, validation, and rate limiting as middleware
- **Database Design**: Normalized schema with proper indexing for performance

### Security
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Stateless authentication with configurable expiration
- **Input Validation**: Joi schema validation for all user inputs
- **Rate Limiting**: Prevents API abuse and ensures fair usage

### Scalability Considerations
- **Database Indexing**: Proper indexes on frequently queried fields
- **Caching Ready**: Structure allows for easy Redis integration
- **Microservice Ready**: Modular design for future service separation

## 🔮 Future Improvements

### With More Time
1. **Redis Caching**: Cache frequently accessed horoscopes
2. **Email Notifications**: Daily horoscope email delivery
3. **Push Notifications**: Mobile app integration
4. **Advanced Analytics**: User behavior tracking and insights
5. **Multi-language Support**: Internationalization
6. **Premium Features**: Advanced horoscope categories and predictions

### Personalization Scaling
For truly personalized horoscopes instead of zodiac-specific ones:

1. **User Preferences**: Store user interests, career, relationship status
2. **Behavioral Data**: Track user interactions and preferences
3. **AI Integration**: Use machine learning for content generation
4. **Astrological Data**: Include birth time, location, and planetary positions
5. **Dynamic Content**: Real-time content generation based on user context

### Technical Enhancements
1. **GraphQL**: More flexible data querying
2. **WebSocket**: Real-time horoscope updates
3. **Microservices**: Separate authentication, horoscope generation, and user management
4. **Event Sourcing**: Track all user interactions for better personalization
5. **A/B Testing**: Test different horoscope styles and content

## 🛠️ AI Tool Usage

This project was developed with assistance from AI tools for:
- Code generation and structure
- Documentation writing
- Best practices implementation
- Error handling patterns

The core logic, business requirements, and architectural decisions were made by the developer with AI assistance for implementation details.

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, environment configuration, and thorough testing. 