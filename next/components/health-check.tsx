'use client';

import { useEffect } from 'react';

export default function HealthCheck() {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await fetch('/api/health-check', { cache: 'no-store' });
      } catch (error) {
        console.log('Health check ping failed:', error);
      }
    };

    // Ping immediately
    pingBackend();

    // Then ping every 5 minutes to keep backend alive
    const interval = setInterval(pingBackend, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}