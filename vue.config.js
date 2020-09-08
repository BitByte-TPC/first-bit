module.exports = {
  devServer: {
    disableHostCheck: true,
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'First Bit';
        return args;
      });
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/first-bit/'
    : '/',

};
