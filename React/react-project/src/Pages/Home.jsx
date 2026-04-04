import ActivityComponent from "../components/ActivityComponent";
import CardComponent from "../components/Cards";
import { DownOutlined, UpOutlined } from "@ant-design/icons"

const analytics = [
  {
    trendingValue: <p className="text-green-400">
      +36% <UpOutlined />
    </p>,
    value: 42,
    title: "New Tickets"
  },
  {
    trendingValue: <p className="text-red-400">
      -36% <DownOutlined />
    </p>,
    value: 42,
    title: "Closed Today"
  },
  {
    trendingValue: <p className="text-green-400">
      +46% <UpOutlined />
    </p>,
    value: 42,
    title: "New Replies"
  },
  {
    trendingValue: <p className="text-green-400">
      +46% <UpOutlined />
    </p>,
    value: 42,
    title: "Followers"
  },
]

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <div className="flex gap-2 mb-4">
        {
          analytics.map((item) => <CardComponent trendingValue={item.trendingValue} value={item.value} title={item.title} key={item.title} />)
        }
      </div>

      <ActivityComponent />
    </div>
  )
}