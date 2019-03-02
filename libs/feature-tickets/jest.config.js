module.exports = {
  name: 'feature-tickets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/feature-tickets',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
