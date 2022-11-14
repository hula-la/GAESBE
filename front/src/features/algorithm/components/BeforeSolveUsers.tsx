import { InGameUsersInterface } from '../../../models/algo';

import styled from 'styled-components';

const UserProfiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;


  .user-item{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
    margin: auto 0;
    position: relative;
  }
  p{
    color:#2e2e2e;
    font-size: 1.3rem;
    margin: 0;
  }

  .profile{
    height:150px;
    width: 90%;
    z-index: 1;

  }
  .stand {
    width: 8rem;
    margin: 0 auto; 
    border : 1px solid white;
    position: absolute;
    top:80%
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
