import { Pie } from '@ant-design/plots';

const SimplePie = () => {
  const config = {
    data: [
      { type: 'Products', value: 27 },
      { type: 'Users', value: 25 },
      { type: 'Requests', value: 18 },
      { type: 'Delivery', value: 15 },
      { type: 'Returns', value: 10 },
      { type: 'Profit', value: 5 },
    ],
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} className="w-48" />;
};

export default SimplePie