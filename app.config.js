export default {
    expo: {
      // ... autres configurations
      extra: {
        apiUrl: process.env.API_URL || 'http://localhost:3000/',
      },
    },
  };