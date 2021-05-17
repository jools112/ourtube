import './Poll.css'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'
import { connect } from 'react-redux'
import {
  pollAction,
  fetchPollData,
  endPollAction
} from '../../../actions/pollAction'
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
  //console.log('video stuff: ', props.mapPlaylist)
  return (
    <div className="PollBoxContainer">
      <SoftBox
        title="POLL"
        content={
          <div className="PollContentContainer">
            <h4>Please vote for which video to watch next</h4>
            {props.mapResult.length > 0 ? (
              <div>
                <div className="PollButtonContainer">
                  <Button
                    onClick={() => {
                      props.pollAction(0)
                    }}
                  >
                    {props.mapResult[0].alternative.name}
                  </Button>
                  <Button
                    onClick={() => {
                      props.pollAction(1)
                    }}
                  >
                    {props.mapResult[1].alternative.name}
                  </Button>
                  <Button
                    onClick={() => {
                      props.pollAction(2)
                    }}
                  >
                    {props.mapResult[2].alternative.name}
                  </Button>
                </div>
                <br />
                <div>
                  <h4>Result</h4>
                  <ResponsiveContainer aspect={2}>
                    <BarChart
                      data={[
                        {
                          name: props.mapResult[0].alternative.name.slice(
                            0,
                            10
                          ),
                          amount: props.mapResult[0].score
                        },
                        {
                          name: props.mapResult[1].alternative.name.slice(
                            0,
                            10
                          ),
                          amount: props.mapResult[1].score
                        },
                        {
                          name: props.mapResult[2].alternative.name.slice(
                            0,
                            10
                          ),
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
                  <Button onClick={() => props.endPollAction()}>
                    End poll
                  </Button>
                </div>{' '}
              </div>
            ) : (
              '\nno active poll'
            )}
          </div>
        }
      ></SoftBox>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { mapResult: state.poll.result, mapPlaylist: state.playlist.videos }
}

const mapDispatchToProps = (dispatch) => ({
  pollAction: (value) => dispatch(pollAction(value)),
  fetchPollData: () => dispatch(fetchPollData()),
  endPollAction: () => dispatch(endPollAction())
})

export const Poll = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedPoll)
