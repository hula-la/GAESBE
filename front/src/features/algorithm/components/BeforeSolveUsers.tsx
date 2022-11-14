import { InGameUsersInterface } from '../../../models/algo';

import styled from 'styled-components';

const UserProfiles = styled.div`
  display: flex;
  flex-direction: row;
  border : 1px solid white;
  justify-content: space-around;
  .user-item{
    display: flex;
    flex-direction: column;
    border : 1px solid white;
    justify-content: center;
  }
  p{
    color:#2e2e2e;
    border : 1px solid white;
    font-size: 1.3rem;

  }

  .profile{
    border : 1px solid white;
    height:50%; 

  }
  .stand {
    width: 8rem;
    margin: 0 auto; 
    border : 1px solid white;
  }

`;

function BeforeSolveUsers({ inGameUsers }: any) {
  return (
    <UserProfiles>
      {inGameUsers.map((user: InGameUsersInterface) => {
        return (

          <div className='user-item' key={user.id}>
            <p>{user.nickname}</p>
            <img
              src={`${process.env.REACT_APP_S3_URL}/profile/${user.profileChar}_normal.gif`}
              alt="프로필이미지"
              className='profile'
            />
            <img className="stand" src={`/img/stand.png`}></img>
          </div>
          

        );
      })}
    </UserProfiles>
  );
}
export default BeforeSolveUsers;
