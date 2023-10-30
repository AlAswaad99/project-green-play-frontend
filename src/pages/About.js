import React from "react";
import Footer from "../components/Footer";
import "./About.css";

function About() {
  return (
    <div className="about-contatiner">
      <div className="image-container">
        <img
          src={require("../assets/images/img-2.jpg")}
          alt="Forest trees"
          className="image"
        />
        <div className="text-wrapper">
          <h1>Making environmentalism fun and competitive!</h1>
        </div>
      </div>
      <div className="content-container">
        <h1 className="heading">About</h1>
        <hr className="about-separator" />
        <p className="text">
          Various tree tracking and reforestation initiatives exist to combat
          deforestation, address climate change, and restore ecosystems around
          the world. The Arbor Day Foundation is a nonprofit organization known
          for its community tree planting events and partnerships. One Tree
          Planted facilitates global reforestation through donations, providing
          transparency on the projects it supports. Tree-Nation connects
          individuals and organizations with reforestation projects and allows
          them to track progress. Eden Reforestation Projects focuses on
          large-scale reforestation efforts with a strong social impact. These
          and other diverse solutions offer various ways for individuals and
          organizations to participate in the vital mission of reforestation and
          environmental conservation.
        </p>
        <p className="text">
          Project GreenPlay stands out from these initiatives in two distinctive
          ways. Firstly, it introduces a unique gamified approach, fostering
          competitiveness among Green Partners. Unlike traditional tree tracking
          solutions, Green Partners compete to plant the most trees effectively
          during a certain timed campaign, motivated by the desire to secure top
          positions on the leaderboard. This element of competition not only
          encourages active participation but also adds a layer of excitement
          and engagement that is often absent in other reforestation platforms.
        </p>
        <p className="text">
          Secondly, Project GreenPlay is purpose-built to meet the specific
          guidelines and requirements of Ethiopia, making it uniquely applicable
          to the country's environmental regulations and goals. While other
          initiatives are global in scope, Project GreenPlay tailors its
          approach to align with Ethiopia's reforestation and environmental
          policies, ensuring a seamless integration into the local context. This
          localized focus positions Project GreenPlay as a relevant and
          impactful solution for a specific region, addressing the country's
          unique needs and priorities in its reforestation efforts.
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default About;
