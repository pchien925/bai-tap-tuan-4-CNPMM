const esClient = require('../config/elasticsearch');
const indexName = 'products';

// 1. Create / Index a product
async function createProduct(product) {
    try {
        await esClient.index({
            index: indexName,
            id: product.id,
            body: product
        });
        await esClient.indices.refresh({ index: indexName });

        return {
            EC: 0,
            EM: 'Tạo sản phẩm thành công',
            DT: product
        };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
}

// 2. Get a product by ID
async function getProductById(id) {
    try {
        const response = await esClient.get({
            index: indexName,
            id
        });
        return {
            EC: 0,
            DT: response._source
        };
    } catch (err) {
        if (err.meta?.statusCode === 404) {
            return { EC: 1, EM: 'Sản phẩm không tồn tại' };
        }
        console.log(err);
        return { EC: -1, EM: 'Lỗi server' };
    }
}

// 3. Search all products (basic)
async function getAllProducts(page = 1, limit = 10) {
    try {
        const from = (page - 1) * limit;
        const response = await esClient.search({
            index: indexName,
            query: { match_all: {} },
            from,
            size: limit,
            sort: [{ createdAt: { order: 'desc' } }]
        });

        return {
            EC: 0,
            DT: response.hits.hits.map(hit => hit._source),
            total: response.hits.total?.value,
            page: Number(page),
            limit: Number(limit)
        };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
}
// 4. Update a product
async function updateProduct(id, data) {
    try {
        await esClient.update({
            index: indexName,
            id,
            body: { doc: data }
        });
        await esClient.indices.refresh({ index: indexName });

        return {
            EC: 0,
            EM: 'Cập nhật sản phẩm thành công',
            DT: data
        };
    } catch (err) {
        if (err.meta?.statusCode === 404) {
            return { EC: 1, EM: 'Sản phẩm không tồn tại' };
        }
        console.log(err);
        return { EC: -1, EM: 'Lỗi server' };
    }
}

// 5. Delete a product
async function deleteProduct(id) {
    try {
        await esClient.delete({ index: indexName, id });
        await esClient.indices.refresh({ index: indexName });

        return {
            EC: 0,
EM: 'Xóa sản phẩm thành công'
        };
    } catch (err) {
        if (err.meta?.statusCode === 404) {
            return { EC: 1, EM: 'Sản phẩm không tồn tại' };
        }
        console.log(err);
        return { EC: -1, EM: 'Lỗi server' };
    }
}

async function filterProducts(filters) {
    try {
        const { name, minPrice, maxPrice, startDate, endDate, page = 1, limit = 10 } = filters;

        const must = [];
        if (name) must.push({ match: { name } });
        if (minPrice || maxPrice) {
            const range = {};
            if (minPrice) range.gte = minPrice;
            if (maxPrice) range.lte = maxPrice;
            must.push({ range: { price: range } });
        }
        if (startDate || endDate) {
            const range = {};
            if (startDate) range.gte = startDate;
            if (endDate) range.lte = endDate;
            must.push({ range: { createdAt: range } });
        }

        const from = (page - 1) * limit;
        const response = await esClient.search({
            index: indexName,
            query: must.length ? { bool: { must } } : { match_all: {} },
            from,
            size: limit,
            sort: [{ createdAt: { order: 'desc' } }]
        });

        return {
            EC: 0,
            DT: response.hits.hits.map(hit => hit._source),
            total: response.hits.total.value,
            page: Number(page),
            limit: Number(limit)
        };
    } catch (error) {
        console.log(error);
        return { EC: -1, EM: 'Lỗi server' };
    }
}
module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct,
    filterProducts
};
