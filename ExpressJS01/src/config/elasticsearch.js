const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200', // URL Elasticsearch server
  auth: {
    username: 'elastic', // mặc định username
    password: 'changeme' // thay bằng password của bạn
  }
});

// Kiểm tra kết nối
async function checkConnection() {
  try {
    const health = await client.cluster.health();
    console.log('Elasticsearch cluster health:', health);
  } catch (err) {
    console.error('Elasticsearch connection error:', err);
  }
}

checkConnection();

module.exports = client;
