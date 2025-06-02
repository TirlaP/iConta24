module.exports = (config, webpack) => {
  // Reduce memory usage during build
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          maxSize: 200000,
        },
      },
    },
    // Minimize memory usage
    minimize: false,
  };

  // Reduce bundle size
  config.resolve.alias = {
    ...config.resolve.alias,
    // Use smaller versions of libraries
    'date-fns': require.resolve('date-fns'),
  };

  return config;
};