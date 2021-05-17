import './RatingBox.css'
import { useEffect } from 'react'
import Rating from 'react-rating'
import { connect } from 'react-redux'
import {
  fetchRatingData,
  ratingBoxAction
} from '../../../actions/ratingBoxAction'
import { SoftBox } from '../../../components/SoftBox'

export const unconnectedRatingBox = (props) => {
  useEffect(() => {
    props.fetchRatingData()
  }, [props.mapVideos])

  return (
    <div className="RatingBox">
      <SoftBox
        title="RATING"
        content={
          <div className="RatingBoxContent">
            <div>User rating </div>
            <Rating
              initialRating={props.mapUserRating}
              emptySymbol="far fa-star fa-2x" // behöver kunna förklara vad som händer... js?? css??
              fullSymbol="fa fa-star fa-2x"
              color="orange"
              fractions={2}
              readonly={props.mapUserRating}
              onClick={(value) => {
                props.ratingBoxAction(value)
                props.fetchRatingData()
              }}
            />
            <br />
            <div>Group rating</div>
            <div>
              <Rating
                readonly
                initialRating={props.mapAverageRating}
                //initialRating={props.initialRating}
                emptySymbol="far fa-star fa-2x"
                fullSymbol="fa fa-star fa-2x"
                fractions={4}
              />
            </div>
          </div>
        }
      ></SoftBox>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    mapUserRating: state.ratingBox.userRating,
    mapAverageRating: state.ratingBox.averageRating,
    mapVideos: state.playlist.videos
  }
}

const mapDispatchToProps = (dispatch) => ({
  ratingBoxAction: (value) => dispatch(ratingBoxAction(value)),
  fetchRatingData: () => dispatch(fetchRatingData())
})

export const RatingBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(unconnectedRatingBox)
