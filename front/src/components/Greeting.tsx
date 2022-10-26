import React, {useState} from 'react';

interface GreetingProps {
  children?: React.ReactNode
};

// const Greeting: React.FC<GreetingProps> = ({ name }) => (
//   <div>Hello, {name}</div>
// );

const Greeting = ({ children } : GreetingProps) => {
  return(
    <div>{children}</div>
  )
}

export default Greeting;