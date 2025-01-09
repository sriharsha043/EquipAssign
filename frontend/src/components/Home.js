import React, { useEffect, useState } from 'react';
import '../styles/Home.css'

function Home() {
    const [greeting, setGreeting] = useState('');
    const [userName, setUserName] = useState('User');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(`${user.first_name} ${user.last_name}`);
        }
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    }, []);

    return (
        <div className="home-container">
            <h2>{`${greeting}, ${userName}! Welcome to the Home Page.`}</h2>
        </div>
    );
}

export default Home