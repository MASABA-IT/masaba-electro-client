import React from "react";
import aboutImg from "../../assets/imgs/about.jpg";
import AboutStatsSection from "../../components/AboutStatsSection/AboutStatsSection";
const AboutUs = () => {
  const statsData = [
    {
      value: "400+",
      title: "Projects Completed",
      description: "We’ve delivered hundreds of unique solutions.",
    },
    {
      value: "600%",
      title: "Growth Rate",
      description: "Steady and scalable client growth every year.",
    },
    {
      value: "10K",
      title: "Happy Users",
      description: "Our platform supports over 10,000+ active users.",
    },
  ];
  return (
    <div className="aboutUs_content bg-slate-50">
      {/* about us hero */}
      <div className="aboutUs_content--childOne py-10">
        {/* 1st */}
        <div className="flex flex-col justify-center items-center py-14 bg-white">
          <p className="text-3xl text-yellow-700 ">About Us</p>
          <h2 className="text-3xl sm:text-7xl font-mono text-zinc-600">
            We do things differently
          </h2>
          <p className="sm:w-2/3 mx-auto p-10 text-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci
            perferendis asperiores numquam est? Totam animi veritatis nihil
            incidunt excepturi a! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Animi, sit.
          </p>
          <AboutStatsSection statsData={statsData} backgroundImage={aboutImg} />
        </div>
      </div>
      <div className="aboutUs_content--childTwo">
        <div className="w-full  flex flex-col justify-center items-center py-10 text-black">
          <h5 className="text-3xl text-amber-700">Our Mission</h5>{" "}
          {/* small title */}
          <h2 className="text-6xl font-mono">What We Offer</h2>
        </div>
        {/* bottom heading */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  my-auto  bg-black p-10 rounded-lg">
          {[1, 2, 3, 4, 5, 6].map((card) => (
            <div
              key={card}
              className="card"
              style={{
                backgroundColor: "#222",
                color: "#fff",
                margin: "10px",
                padding: "15px",
                borderRadius: "6px",
                boxShadow: "0 2px 5px rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <h3 className="text-2xl">Card Title {card}</h3>
              <p className="text-white/80">
                Some brief details about this card. It explains the feature or
                service offered.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
