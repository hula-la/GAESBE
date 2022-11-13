import { InGameUsersInterface } from '../../../models/algo';

import styled from 'styled-components';

const UserProfiles = styled.div`
  display: flex;
  flex-direction: row;
  .stand {
    width: 8rem;
    margin: 0 3%;
  }
`;

function BeforeSolveUsers({ inGameUsers }: any) {
  return (
    <UserProfiles>
      {inGameUsers.map((user: InGameUsersInterface) => {
        return (
          <div key={user.id}>
            <h2>{user.nickname}</h2>
            <img
              src={`/img/rank/character${user.profileChar}.png`}
              alt="프로필이미지"
            />
            <img className="stand" src={`/img/stand.png`}></img>
          </div>
        );
      })}
    </UserProfiles>
  );
}
export default BeforeSolveUsers;
