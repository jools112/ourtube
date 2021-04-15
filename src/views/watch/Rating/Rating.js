import './Rating.css'
import { Button } from '../../../components/Button'
import { TextField } from '../../../components/TextField'
import { SoftBox } from '../../../components/SoftBox'

const getDisplayStars = (starInt) => {
  switch (starInt) {
    case 1:
      return '⭐'
    case 2:
      return '⭐⭐'
    case 3:
      return '⭐⭐⭐'
    case 4:
      return '⭐⭐⭐⭐'
    case 5:
      return '⭐⭐⭐⭐⭐'
    default:
      return 'no input'
  }
}

export const Rating = () => {
  const userInput = 4

  return (
    <div className="RatingBoxContainer">
      <SoftBox
        className="RatingBox"
        title="RATING"
        content={
          <div className="RatingContentContainer">
            <div>User rating {getDisplayStars(userInput)}</div>
            <div>Group rating: ⭐⭐</div>
          </div>
        }
      ></SoftBox>
    </div>
  )
}
