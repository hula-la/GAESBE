
import { InGameUsersInterface } from '../../../models/algo'

import styled from 'styled-components'

const UserProfiles = styled.div`
  display: flex;
  flex-direction: row;
`

function BeforeSolveUsers({inGameUsers}:any) {
  return <UserProfiles>
    {inGameUsers.map((user: InGameUsersInterface) => {
      return <div key={user.id}>
        <h2>{user.nickname}</h2>
        <img src={`/img/rank/character${user.profileChar}.png`} alt="프로필이미지" />
      </div>
    })}
  </UserProfiles>
}
export default BeforeSolveUsers