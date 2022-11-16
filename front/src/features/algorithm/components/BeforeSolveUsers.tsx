import { InGameUsersInterface } from '../../../models/algo';

import styled from 'styled-components';

const UserProfiles = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%,0); */

  .user-item{

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
    margin: auto 0;

  }
  .nickname{
    background-color: #2e2e2e;
    color: white;
    padding: 7px;
    font-size: 12px;
    border-radius: 8px;
  }
  p{
    font-size: 1.3rem;
    margin: 0;
  }

  .profile{
    height:120px;
    width: 90%;
    z-index: 1;

  }
  .stand {
    width: 8rem;
    margin: 0 auto; 
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
            <p>{user.min?user.min+" 분" :null} </p>
            <p className='nickname'>{user.nickname}</p>
            <img
              src={`${process.env.REACT_APP_S3_URL}/profile/${user.profileChar}_normal.gif`}
              alt="프로필이미지"
              className='profile'
            />
            {/* <img className="stand" src={`/img/stand.png`}></img> */}
          </div>
        );
      })}
    </UserProfiles>
  );
}
export default BeforeSolveUsers;
