process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/horoscope-api-test';
process.env.JWT_SECRET = 'test-jwt-secret';

jest.setTimeout(30000); 
 