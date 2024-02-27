const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    // other options
  });
  
  module.exports = withPWA({
    // your existing Next.js config
  });
  

