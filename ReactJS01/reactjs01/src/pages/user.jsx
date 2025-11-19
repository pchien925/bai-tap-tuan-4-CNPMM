import { useEffect, useState } from 'react';
import { notification, Table } from 'antd';
import { getUserApi } from '../util/api';

const UserPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await getUserApi();
      console.log('res', res);
      if (res?.message === "Unauthorized") {
        notification.error({
          message: "Unauthorized",
          description: res.message,
        });
      } else {
        setDataSource(res?.DT);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
  ];

  return (
    <div style={{ padding: 30 }}>
      <Table
        bordered
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
};

export default UserPage;