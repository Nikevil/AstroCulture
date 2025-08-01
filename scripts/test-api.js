const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('Testing Personalized Horoscope API\n');

    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:3000/health');
    console.log('Health Check:', healthResponse.data.status);
    console.log('');


    console.log('2. Testing User Registration...');
    const signupData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      birthdate: '1990-05-15'
    };

    const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, signupData);
    console.log('User Registered:', signupResponse.data.user.name);
    console.log('Zodiac Sign:', signupResponse.data.user.zodiacSign);
    console.log('JWT Token:', signupResponse.data.token.substring(0, 20) + '...');
    console.log('');

    const token = signupResponse.data.token;

    console.log('3. Testing User Login...');
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, loginData);
    console.log('Login Successful');
    console.log('');

    console.log('4. Testing Today\'s Horoscope...');
    const horoscopeResponse = await axios.get(`${BASE_URL}/horoscope/today`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Today\'s Horoscope:');
    console.log(`   Zodiac: ${horoscopeResponse.data.horoscope.zodiacSign}`);
    console.log(`   Category: ${horoscopeResponse.data.horoscope.category}`);
    console.log(`   Mood: ${horoscopeResponse.data.horoscope.mood}`);
    console.log(`   Content: ${horoscopeResponse.data.horoscope.content.substring(0, 100)}...`);
    console.log('');

    console.log('5. Testing Horoscope History...');
    const historyResponse = await axios.get(`${BASE_URL}/horoscope/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`History Retrieved: ${historyResponse.data.history.length} entries`);
    console.log('');

    console.log('6. Testing Public Horoscope...');
    const publicResponse = await axios.get(`${BASE_URL}/horoscope/Aries`);
    console.log('Public Horoscope for Aries:');
    console.log(`   Content: ${publicResponse.data.horoscope.content.substring(0, 100)}...`);
    console.log('');

    console.log('7. Testing User Profile...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('User Profile:');
    console.log(`   Name: ${profileResponse.data.user.name}`);
    console.log(`   Email: ${profileResponse.data.user.email}`);
    console.log(`   Zodiac: ${profileResponse.data.user.zodiacSign}`);
    console.log('');

    console.log('All API tests completed successfully!');
    console.log('\nAPI Documentation available at: http://localhost:3000/api-docs');

  } catch (error) {
    console.error('API Test Failed:', error.response?.data || error.message);
    console.log('\nMake sure the server is running on http://localhost:3000');
  }
}

async function checkServer() {
  try {
    await axios.get('http://localhost:3000/health');
    return true;
  } catch (error) {
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.log('Server is not running. Please start the server first:');
    console.log('npm run dev');
    return;
  }
  
  await testAPI();
}

main(); 