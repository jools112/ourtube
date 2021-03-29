import './Poll.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  {
    name: 'a',
    amount: 1
  },
  {
    name: 'b',
    amount: 4
  },
  {
    name: 'c',
    amount: 2
  }
]
export const Poll = () => {
  return (
    <div className="PollBox">
      Poll
      <div>
        input poll text: <input placeholder="type a question here..." />
      </div>
      <div>
        choices:
        <input type="checkbox" /> a
        <input type="checkbox" /> b
        <input type="checkbox" /> c
      </div>
      <div>
        result
        <ResponsiveContainer aspect={2} width="100%" height="200px">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
