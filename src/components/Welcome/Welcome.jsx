import React from 'react'
import './Welcome.scss'



const Welcome = () => {
    const [time, setTime] = React.useState();

        React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => {
      clearInterval(timer);
    };
  }, []);


  return (
    <div className='welcome-component'>
        <h1>Welcome!</h1>
        <h2>{time}</h2>

    </div>
  )
}

export default Welcome