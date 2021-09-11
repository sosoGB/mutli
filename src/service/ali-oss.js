const OSS = require('ali-oss');

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'LTAICwQeRqd1Ycdi',
  accessKeySecret: 'gVUlOtf6aq9Xc9vIKeEz59AE6JUIoO',
  bucket: 'qibot-saas',
  endpoint: 'oss-cn-beijing.aliyuncs.com'
});

// 配置响应头实现通过URL访问时自动下载文件，并设置下载后的文件名。
const filename = '机器人数据.xlsx' // filename为自定义下载后的文件名。
const response = {
  'content-disposition': `attachment; filename=${encodeURIComponent(filename)}`
}
// object-key表示从OSS下载文件时需要指定包含文件后缀在内的完整路径，例如abc/efg/123.jpg。
// const url = client.signatureUrl('object-key', { response });
export {
  client,
  response
}