import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async check(ctx) {
    try {
      // Basic health check - verify database connection
      const result = await strapi.db.connection.raw('SELECT 1 as healthy');
      
      // Check if we can access a basic content type
      const globalCount = await strapi.entityService.count('api::global.global');
      
      ctx.body = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: result ? 'connected' : 'disconnected',
        contentTypes: {
          global: globalCount || 0
        },
        memory: process.memoryUsage(),
        version: strapi.config.info.version
      };
      
      ctx.status = 200;
    } catch (error) {
      ctx.body = {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error.message,
        uptime: process.uptime()
      };
      ctx.status = 503;
    }
  },
});