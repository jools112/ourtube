import './Poll.css'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'
import { connect } from 'react-redux'
import { pollAction, fetchPollData } from '../../../actions/pollAction'
import { useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export const unconnectedPoll = (props) => {
  useEffect(() => {
    setTimeout(props.fetchPollData, 2000)
  }, [])
  return (
    <div className="PollBoxContainer">
      <SoftBox
        title="POLL"
        content={
          <div className="PollContentContainer">
            <div>which video do we watch next?</div>
            <div>
              <Button
                onClick={() => {
                  props.pollAction(0)
                  props.fetchPollData()
                }}
              >
                0
              </Button>
              <Button
                onClick={() => {
                  props.pollAction(1)
                  props.fetchPollData()
                }}
              >
                1
              </Button>
              <Button
                onClick={() => {
                  props.pollAction(2)
                  props.fetchPollData()
                }}
              >
                2
              </Button>
            </div>
            <br />
            <div>
              result
              {props.mapResult.length > 0 ? (
                <ResponsiveContainer aspect={2}>
                  <BarChart
                    data={[
                      {
                        name: props.mapResult[0].alternative,
                        amount: props.mapResult[0].score
                      },
                      {
                        name: props.mapResult[1].alternative,
                        amount: props.mapResult[1].score
                      },
                      {
                        name: props.mapResult[2].alternative,
                        amount: props.mapResult[2].score
                      }
                    ]}
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
              ) : (
                '\nloading...'
              )}
            </div>
          </div>
        }
      ></SoftBox>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { mapResult: state.poll.result }
}

const mapDispatchToProps = (dispatch) => ({
  pollAction: (value) => dispatch(pollAction(value)),
  fetchPollData: () => dispatch(fetchPollData())
})

export const Poll = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedPoll)
