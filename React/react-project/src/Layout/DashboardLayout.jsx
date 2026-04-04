import { Badge, Breadcrumb, Button, Image, Layout, Menu, Space, theme } from 'antd';
import { Outlet } from 'react-router';
import Navigation from '../components/Navigation';
import Notification from '../components/Notification';
import { BellOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const items = Array.from({ length: 3 }).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));
const DashboardLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className='min-h-screen overflow-x-hidden'>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: "space-between"
        }}
        className='gap-2'
      >
        <div className='flex gap-2'>
          <div className="demo-logo" />
          <Image
            alt='Logo'
            src='./favicon.svg'
          />
          <h1 className='text-white text-3xl'>Logo</h1>
        </div>
        <div className='flex gap-3 items-center'>
          {/* <Button variant="outlined" className='text-white'>
            Outlined
          </Button> */}
          <Button>Default</Button>
          <BellOutlined className='text-3xl' style={{ color: '#FFFFFF' }} />
          <Space size="medium">
            <Badge count={5}>
            </Badge>
          </Space>

          <div>
            <div className='flex items-center'>
              <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKT-zEVF-E4SEkm3us25N1DoHQLnC4XWumjw&s' width={30} className='rounded-full' />
            </div>
          </div>
          <div className='flex flex-col text-white gap-0 h-full'>
            <p>Rehman</p>
          </div>
        </div>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Navigation />
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default DashboardLayout;