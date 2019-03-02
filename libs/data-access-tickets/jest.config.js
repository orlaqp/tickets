module.exports = {
  name: 'data-access-tickets',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/data-access-tickets',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
