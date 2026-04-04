import { Card } from 'antd';

const CardComponent = ({ trendingValue, value, title }) => (
  <Card style={{ width: 300 }}>
    <div className='flex justify-end mb-2'>
      {
        trendingValue
      }
    </div>
    <div>
      <p className='text-4xl text-center'>{value}</p>
      <p className='capitalize text-center'>{title}</p>
    </div>
  </Card>
);
export default CardComponent;