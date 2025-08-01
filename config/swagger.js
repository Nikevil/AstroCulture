const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personalized Horoscope API',
      version: '1.0.0',
      description: 'A Node.js backend service that generates and serves personalized daily horoscopes for users based on their zodiac sign.',
      contact: {
        name: 'API Support',
        email: 'support@horoscope-api.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            name: {
              type: 'string',
              description: 'User name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            birthdate: {
              type: 'string',
              format: 'date',
              description: 'User birthdate'
            },
            zodiacSign: {
              type: 'string',
              enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
              description: 'User zodiac sign'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date'
            },
            lastLogin: {
              type: 'string',
              format: 'date-time',
              description: 'Last login date'
            }
          }
        },
        Horoscope: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Horoscope ID'
            },
            zodiacSign: {
              type: 'string',
              enum: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
              description: 'Zodiac sign'
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Horoscope date'
            },
            content: {
              type: 'string',
              description: 'Horoscope content'
            },
            category: {
              type: 'string',
              enum: ['general', 'love', 'career', 'health', 'finance'],
              description: 'Horoscope category'
            },
            mood: {
              type: 'string',
              enum: ['positive', 'neutral', 'challenging'],
              description: 'Horoscope mood'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User registration and authentication endpoints'
      },
      {
        name: 'Horoscope',
        description: 'Horoscope-related endpoints'
      }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 