module.exports = {
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/EugnUUYChT',
        permanent: false,
      },
      {
        source: '/fan-art',
        destination: 'https://thedungeonrun.tv/fan-art',
        permanent: false,
      },
      {
        source: '/(.*)',
        destination: 'https://thedungeonrun.tv',
        permanent: false,
      },
    ];
  },
};
