const axios = require('axios');
const io = require('socket.io-client');

// Test configuration
const API_BASE_URL = 'http://localhost:3001';
const SOCKET_URL = 'http://localhost:4300';

// Test data
const testUsers = {
  user1: {
    email: 'test1@example.com',
    password: 'password123',
    name: 'Test User 1'
  },
  user2: {
    email: 'test2@example.com', 
    password: 'password123',
    name: 'Test User 2'
  }
};

let userId1, userId2;

// Helper function to make API requests
async function makeRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: { 'Content-Type': 'application/json' }
    };
    if (data) config.data = data;
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status || 500
    };
  }
}

// Test functions
async function testServerHealth() {
  console.log('\n🔍 Testing server health...');
  const result = await makeRequest('GET', '/message');
  console.log('Server health:', result.success ? '✅ OK' : '❌ FAILED');
  if (!result.success) console.log('Error:', result.error);
  return result.success;
}

async function testUserCreation() {
  console.log('\n👤 Testing user creation...');
  
  // Create first user
  const user1Result = await makeRequest('POST', '/user', testUsers.user1);
  if (user1Result.success) {
    userId1 = user1Result.data.data.id;
    console.log('✅ User 1 created:', userId1);
  } else {
    console.log('❌ User 1 creation failed:', user1Result.error);
    return false;
  }
  
  // Create second user
  const user2Result = await makeRequest('POST', '/user', testUsers.user2);
  if (user2Result.success) {
    userId2 = user2Result.data.data.id;
    console.log('✅ User 2 created:', userId2);
  } else {
    console.log('❌ User 2 creation failed:', user2Result.error);
    return false;
  }
  
  return true;
}

async function testMessageSending() {
  console.log('\n💬 Testing message sending...');
  
  const messageData = {
    senderId: userId1,
    receiverId: userId2,
    content: 'Hello from test! This is a test message.'
  };
  
  const result = await makeRequest('POST', '/message/send', messageData);
  if (result.success) {
    console.log('✅ Message sent successfully');
    console.log('Message ID:', result.data.data.id);
    return result.data.data.id;
  } else {
    console.log('❌ Message sending failed:', result.error);
    return null;
  }
}

async function testGetMessages() {
  console.log('\n📨 Testing get messages...');
  
  // Test get all messages
  const allMessagesResult = await makeRequest('GET', '/message');
  if (allMessagesResult.success) {
    console.log('✅ Get all messages:', allMessagesResult.data.data?.length || 0, 'messages found');
  } else {
    console.log('❌ Get all messages failed:', allMessagesResult.error);
  }
  
  // Test get messages between users
  if (userId1 && userId2) {
    const betweenResult = await makeRequest('GET', `/message/between/${userId1}/${userId2}`);
    if (betweenResult.success) {
      console.log('✅ Get messages between users:', betweenResult.data.data?.length || 0, 'messages found');
    } else {
      console.log('❌ Get messages between users failed:', betweenResult.error);
    }
  }
}

async function testSocketConnection() {
  console.log('\n🔌 Testing Socket.IO connection...');
  
  return new Promise((resolve) => {
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      timeout: 5000
    });
    
    let connected = false;
    
    socket.on('connect', () => {
      console.log('✅ Socket.IO connected successfully');
      connected = true;
      
      // Test message sending via socket
      socket.emit('register', userId1);
      socket.emit('message', {
        content: 'Test message via socket',
        sender: { id: userId1 },
        receiver: { id: userId2 }
      });
      
      setTimeout(() => {
        socket.disconnect();
        resolve(true);
      }, 2000);
    });
    
    socket.on('connect_error', (error) => {
      console.log('❌ Socket.IO connection failed:', error.message);
      resolve(false);
    });
    
    socket.on('newMessage', (message) => {
      console.log('✅ Received message via socket:', message.content);
    });
    
    // Timeout after 10 seconds
    setTimeout(() => {
      if (!connected) {
        console.log('❌ Socket.IO connection timeout');
        resolve(false);
      }
    }, 10000);
  });
}

async function runAllTests() {
  console.log('🚀 Starting comprehensive server and message tests...\n');
  
  const results = {
    serverHealth: false,
    userCreation: false,
    messageSending: false,
    getMessages: false,
    socketConnection: false
  };
  
  // Test server health
  results.serverHealth = await testServerHealth();
  
  // Test user creation
  results.userCreation = await testUserCreation();
  
  // Test message sending
  if (results.userCreation) {
    results.messageSending = await testMessageSending() !== null;
  }
  
  // Test get messages
  if (results.messageSending) {
    await testGetMessages();
    results.getMessages = true;
  }
  
  // Test socket connection
  results.socketConnection = await testSocketConnection();
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  console.log(`Server Health: ${results.serverHealth ? '✅' : '❌'}`);
  console.log(`User Creation: ${results.userCreation ? '✅' : '❌'}`);
  console.log(`Message Sending: ${results.messageSending ? '✅' : '❌'}`);
  console.log(`Get Messages: ${results.getMessages ? '✅' : '❌'}`);
  console.log(`Socket Connection: ${results.socketConnection ? '✅' : '❌'}`);
  
  const allPassed = Object.values(results).every(result => result === true);
  console.log(`\nOverall Status: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
  
  if (!allPassed) {
    console.log('\n🔧 Troubleshooting tips:');
    if (!results.serverHealth) {
      console.log('- Check if the server is running on port 3001');
      console.log('- Verify MongoDB connection');
    }
    if (!results.socketConnection) {
      console.log('- Check if Socket.IO server is running on port 4300');
      console.log('- Verify CORS settings');
    }
  }
}

// Run the tests
runAllTests().catch(console.error);