export function startKeepAlive() {
  const PING_INTERVAL = 15000; // 15 seconds
  const HEALTH_URL = process.env.PUBLIC_URL || 'https://iconta24-strapi.onrender.com';
  
  console.log('🔄 Starting keep-alive service...');
  console.log(`📍 Pinging: ${HEALTH_URL}/api/health every ${PING_INTERVAL / 1000} seconds`);

  const pingHealth = async () => {
    try {
      const response = await fetch(`${HEALTH_URL}/api/health`, {
        method: 'GET',
        headers: {
          'User-Agent': 'Strapi-KeepAlive/1.0'
        }
      });
      
      if (response.ok) {
        const data = await response.json() as { status: string; uptime: number };
        console.log(`✅ Health check OK - Status: ${data.status}, Uptime: ${Math.floor(data.uptime)}s`);
      } else {
        console.warn(`⚠️  Health check returned ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Health check failed:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Start pinging immediately, then every 15 seconds
  pingHealth();
  const interval = setInterval(pingHealth, PING_INTERVAL);

  // Clean up on process exit
  process.on('SIGINT', () => {
    console.log('🛑 Stopping keep-alive service...');
    clearInterval(interval);
  });

  process.on('SIGTERM', () => {
    console.log('🛑 Stopping keep-alive service...');
    clearInterval(interval);
  });

  return interval;
}