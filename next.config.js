module.exports = {
  experimental: {
    outputStandalone: true,
  },
  swcMinify: false, // it should be false by default
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.(le|c)ss$/,
  //     use: [
  //       {
  //         loader: "css-loader",
  //       },
  //       {
  //         loader: "less-loader",
  //         options: {
  //           sourceMap: true,
  //         },
  //       },
  //     ],
  //   });

  //   return config;
  // },
};
