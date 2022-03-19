import React, { useState, useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import './ProfilePage.css';
import khristian from './images/khristian.jpeg';

const ProfilePage = () => {
  const [user, setUser] = useState({ name: 'Khristian Lopez', type: 'Individual', location: 'Los Angeles', votes: 6, trustLevel: 5, listings: [1, 2, 3, 4, 5, 6], claimed: [1,2,3] });

  useEffect(() => {

  })

  return (
    <section>
      <div className="navbar"></div>
      <div className="heading">
        <img className="pic" src={khristian} alt="profile-pic" />
        <div className="profile-name">
          <h2>{user.name}</h2>
          <h4>{user.type}</h4>
          <h4>{user.location}</h4>
        </div>
        <div className="votes">
          <div>
          <h2>Trust Votes</h2>
          <h4>{user.votes} votes</h4>
          </div>
          <div>
          <h2>Trust Level</h2>
          <h4>lv. {user.trustLevel}</h4>
          </div>
        </div>
        <button className="msg-btn">Message</button>
      </div>
      <div className="body">
        <div className="cards-container">
          <h2>Listings</h2>
          <div className="cards-container-two">
            <Carousel verticalMode itemsToShow={4}>
              {user.listings.map((card, i) =>
                <div className="card"></div>
              )}
            </Carousel>
          </div>
        </div>
        <div className="cards-container">
          <h2>Claimed</h2>
          <div className="cards-container-two">
            <Carousel verticalMode itemsToShow={4}>
              {user.claimed.map((card, i) =>
                <div className="card"></div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
};

export default ProfilePage;