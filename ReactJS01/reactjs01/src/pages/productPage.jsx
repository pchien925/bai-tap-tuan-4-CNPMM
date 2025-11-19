import { notification, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getProductsApi } from '../util/api';

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });

  const fetchProducts = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await getProductsApi(page, pageSize);
      if (res?.EC === 0) {
        setDataSource(res.DT || []);
        setPagination({ current: res.page, pageSize: res.limit, total: res.total });
      } else {
        notification.error({ message: 'Lỗi', description: res.EM || 'Lỗi khi lấy danh sách sản phẩm' });
      }
    } catch (err) {
      notification.error({ message: 'Lỗi server', description: err.message });
    }
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    const loadProducts = async () => { if (isMounted) await fetchProducts(pagination.current, pagination.pageSize); };
    loadProducts();
    return () => { isMounted = false; };
  }, []);

  const handleTableChange = (pag) => fetchProducts(pag.current, pag.pageSize);

  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Tên sản phẩm', dataIndex: 'name', key: 'name' },
    { title: 'Giá', dataIndex: 'price', key: 'price', render: (price) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) },
    { title: 'Số lượng', dataIndex: 'stock', key: 'stock' },
    { title: 'Danh mục', dataIndex: 'category', key: 'category' },
    { title: 'Tình trạng', dataIndex: 'soldOut', key: 'soldOut', render: (soldOut) => soldOut ? <Tag color="red">Hết hàng</Tag> : <Tag color="green">Còn hàng</Tag> },
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Danh sách sản phẩm</h2>
      <Table
        bordered
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductPage;
