import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #fff;
  img{
    width:70%;
  }
  
`

function CSUser({user}:any){
  console.log(user)
  return(
    <Wrapper>
      <div className='user-item' key={user[0]}>
        <p className='nickname'>{user[1]}</p>
        <img
          src={`${process.env.REACT_APP_S3_URL}/profile/${user[2]}_normal.gif`}
          alt="프로필이미지"
          className='profile'
        />
       </div>
    </Wrapper>
  )
}

export default CSUser;