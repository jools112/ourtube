import './Explore.css'
import { Group } from './Groups/Groups'
import { SoftBox } from '../../components/SoftBox'
import { Button } from '../../components/Button'
import { TextField } from '../../components/TextField'
import { RatedVideos } from './RatedVideos/RatedVideos'

export const Explore = () => {
  return (
    <div className="Explore">
      <Group />
      <RatedVideos />
    </div>
  )
}
