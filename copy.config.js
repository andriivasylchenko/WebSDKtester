module.exports = {
  copyAssets: {
    src: ['{{SRC}}/assets/**/*'],
    dest: '{{WWW}}/assets'
  },
  copyIndexContent: {
    src: ['{{SRC}}/index.html', '{{SRC}}/manifest.json', '{{SRC}}/service-worker.js'],
    dest: '{{WWW}}'
  },
  copyFonts: {
    src: ['{{ROOT}}/node_modules/ionicons/dist/fonts/**/*', '{{ROOT}}/node_modules/ionic-angular/fonts/**/*'],
    dest: '{{WWW}}/assets/fonts'
  },
  copyPolyfills: {
    src: ['{{ROOT}}/node_modules/ionic-angular/polyfills/polyfills.js'],
    dest: '{{BUILD}}'
  },
  copyMFPcore: {
    src: ['{{ROOT}}/node_modules/ibm-mfp-web-sdk/*.js'],
    dest: '{{BUILD}}/mfp'
  },
  copyMFPmessages: {
    src: ['{{ROOT}}/node_modules/ibm-mfp-web-sdk/lib/messages/**/*.json'],
    dest: '{{BUILD}}/mfp/lib/messages'
  },
  copyMFPanalytics: {
    src: ['{{ROOT}}/node_modules/ibm-mfp-web-sdk/lib/analytics/*.js'],
    dest: '{{BUILD}}/mfp/lib/analytics'
  },
  copySJCL: {
    src: ['{{ROOT}}/node_modules/sjcl/*.js'],
    dest: '{{BUILD}}/mfp/node_modules/sjcl'
  },
  copyJSSHA: {
    src: ['{{ROOT}}/node_modules/jssha/src/*.js'],
    dest: '{{BUILD}}/mfp/node_modules/jssha/src'
  },
  copyPromiz: {
    src: ['{{ROOT}}/node_modules/promiz/*.js'],
    dest: '{{BUILD}}/mfp/node_modules/promiz'
  }
}
