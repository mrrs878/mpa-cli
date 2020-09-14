module.exports = function (api) {
  api.cache(true);

  const plugins = [];
  const presets = ['@babel/preset-env', '@babel/preset-react'];

  return {
    plugins,
    presets,
  };
};
