const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: 'http://localhost:9200',
});

const indexName = 'products';

function getRandomPrice(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomProductName(id) {
  return `Sản phẩm ${id}`;
}

async function run() {
  // 1. Tạo index nếu chưa tồn tại
  const indexExists = await esClient.indices.exists({ index: indexName });
  if (!indexExists) {
    await esClient.indices.create({
      index: indexName,
      settings: { number_of_shards: 1, number_of_replicas: 0 },
      mappings: {
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text' },
          price: { type: 'float' },
          description: { type: 'text' },
          createdAt: { type: 'date' },
        },
      },
    });
    console.log(`Index "${indexName}" created.`);
  } else {
    console.log(`Index "${indexName}" already exists.`);
  }

  // 2. Tạo 50 product mẫu
  const products = [];
  for (let i = 1; i <= 50; i++) {
    products.push({
      id: i.toString(),
      name: getRandomProductName(i),
      price: getRandomPrice(10, 1000), 
      description: `Mô tả sản phẩm ${i}`,
      createdAt: new Date(),
    });
  }

  // 3. Index tất cả sản phẩm
  for (const product of products) {
    await esClient.index({
      index: indexName,
      id: product.id,
      body: product,
    });
  }

  // 4. Refresh index để dữ liệu hiển thị ngay
  await esClient.indices.refresh({ index: indexName });
  console.log('50 sample products added.');
}

run().catch(console.error);
