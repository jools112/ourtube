import './Rating.css'

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
  const userInput = 3

  return (
    <div className="RatingBox">
      Rating
      <div>User rating {getDisplayStars(userInput)}</div>
      <div>Group rating: ⭐⭐</div>
    </div>
  )
}
