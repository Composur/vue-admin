// stylelint.config.js
module.exports = {
  'defaultSeverity': 'warning',
  'extends': ['stylelint-config-standard', 'stylelint-config-recommended-scss'],
  'plugins': ['stylelint-scss'],
  'rules': {
    // 不要使用已被 autoprefixer 支持的浏览器前缀
    'media-feature-name-no-vendor-prefix': true,
    'at-rule-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true
  }
}
