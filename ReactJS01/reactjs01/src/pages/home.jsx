import { CrownOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const HomePage = () => {
  return (
    <div style={{ padding: 30 }}>
      <Result
        status="success"
        icon={<CrownOutlined />}
        title="150W Web Token (React/Node.JS) - lotstar.vn"
      />
    </div>
  );
};

export default HomePage;