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
        title="POLL"
        content={
          <div className="PollContentContainer">
            <div>poll text</div>
            <div>
              choices:
              <input type="checkbox" /> a
              <input type="checkbox" /> b
              <input type="checkbox" /> c
            </div>
            <div>
              result
              <ResponsiveContainer aspect={2}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <XAxis
                    dataKey="name"
                    tick={{ fill: '#efe198' }}
                    stroke="#efe198"
                  />
                  <YAxis tick={{ fill: '#efe198' }} stroke="#efe198" />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#3876a6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        }
      ></SoftBox>
    </div>
  )
}
