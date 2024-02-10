import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import "./Home.css";

function Home() {

  return (
    <>
      <Hero />
      <div className="home-container">
        <div className="about">
          <div className="about-text">
            <p>
              Project Green Play is a gamified platform that makes it fun and
              easy to plant trees. Users can earn points for planting trees,
              completing challenges, and inviting friends. Points can be
              redeemed for rewards like exclusive badges, merchandise, and even
              more trees.
            </p>
            <p>
              Project Green Play is partnered with trusted organizations to
              plant trees in areas where they're needed most. This ensures that
              the trees are planted in a sustainable and responsible way.
            </p>
            <p>
              Project Green Play is a great way for people of all ages to make a
              difference in the world. Join today and start gamifying green!
            </p>
          </div>
          <img
            className="home-image"
            src={require("../assets/images/img-1.jpg")}
            alt="Forest Trees"
          />
        </div>

        <div className="mission">
          <div className="mission-image">
            <img
              className="home-image"
              src={require("../assets/images/img-1.jpg")}
              alt="Forest Trees"
            />
          </div>
          <div className="mission-text">
            <p>
              Our mission is to gamify green and increase the number of trees
              planted worldwide. We believe that everyone has a role to play in
              protecting our planet. That's why we're making it fun and easy for
              people to plant trees with our gamified platform.
            </p>
            <p>
              With Project Green Play, you can earn points for planting trees,
              completing challenges, and inviting friends. You can then redeem
              your points for rewards like exclusive badges, merchandise, and
              even more trees.
            </p>
            <p>
              We're committed to making a real difference in the world. That's
              why we partner with trusted organizations to plant trees in areas
              where they're needed most.
            </p>
          </div>
        </div>

        <div className="features">
          <div className="features-text">
            <p>
              <strong>Gamified platform:</strong> Users can earn points for
              planting trees, completing challenges, and inviting friends.
              Points can be redeemed for rewards like exclusive badges,
              merchandise, and even more trees.
            </p>
            <p>
              <strong>Partnered with trusted organizations:</strong> Project
              Green Play partners with trusted organizations to plant trees in
              areas where they're needed most. This ensures that the trees are
              planted in a sustainable and responsible way.
            </p>
            <p>
              <strong>Community features:</strong> The app includes features
              that allow users to connect with other people who are passionate
              about protecting the environment. This includes forums, chat
              groups, and leaderboards.
            </p>
          </div>
          <div className="features-image">
            <img
              className="home-image"
              src={require("../assets/images/img-1.jpg")}
              alt="Forest Trees"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
