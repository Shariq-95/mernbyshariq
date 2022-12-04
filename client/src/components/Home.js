import React, { useState, useEffect } from 'react';

const Home = () => {

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const userHome = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    userHome();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className='pt-5'>WELCOME</p>
          <h1>{userName}</h1>
          <h2>{ show ? 'Happy to see you back' : 'We are the MERN Developer'}</h2>
        </div>
      </div>
    </>
  )
}

export default Home
