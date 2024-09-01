const { alias } = require('react-app-rewire-alias');
const path = require('path');

const resolvePath = p => path.resolve(__dirname, p);

module.exports = function override(config) {
  alias({
    $components: resolvePath('./src/components'),
    $icons: resolvePath('./src/assets/icons'),
    $common: resolvePath('./src/components/common'),
    $pages: resolvePath('./src/pages'),
    $assets: resolvePath('./src/assets'),
    $colors: resolvePath('./src/styles/colors.module.scss'),
    $styles: resolvePath('./src/styles'),
    $types: resolvePath('./src/types/index.d.ts'),
    $api: resolvePath('./src/api/Api.service.ts'),
    $hooks: resolvePath('./src/hooks'),
    $helpers: resolvePath('./src/helpers'),
    $services: resolvePath('./src/services'),
    $images: resolvePath('./src/assets/img'),
    $media: resolvePath('./src/assets/styles/media.scss'),
    process: 'process/browser'
  })(config);

  return config;
};
