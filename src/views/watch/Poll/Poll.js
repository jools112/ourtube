import './Poll.css'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'

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
    <div className="PollBoxContainer">
      <SoftBox
        title="Poll"
        content={
          <div>
            <div>poll text</div>
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
        }
      ></SoftBox>
    </div>
  )
}
