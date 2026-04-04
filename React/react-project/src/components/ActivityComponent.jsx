import { Card } from "antd"
import SegmentedLine from "./SegmentLine"
import UsersTable from "./UsersTable"
import SimplePie from "./SimplePie"
import OutlinePie from "./OutlinePie"

function ActivityComponent() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card className="px-0! leftSide">
        <p className="border-b-2 border-black px-2">Development Activity</p>
        <SegmentedLine />

        <UsersTable />
      </Card>
      <div>
        <Card className="bg-blue-300!">
          <span className="font-bold">Read our Documentation</span> and code snippets
        </Card>

        <div className="flex gap-2">
          <SimplePie />
          <OutlinePie />
        </div>
      </div>
    </div>
  )
}

export default ActivityComponent