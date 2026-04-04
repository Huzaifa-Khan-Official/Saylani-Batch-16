import { BellOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space } from 'antd';
const Notification = () => (
  <Space size="medium">
    <Badge count={5}>
      <Avatar shape="BellOutlined" size="large" className='bg-white' />
      {/* <BellOutlined /> */}
    </Badge>
  </Space>
);
export default Notification;