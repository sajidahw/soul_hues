import { TypeAnimation } from "react-type-animation";

const Animate = () => {
  return (
    <TypeAnimation
      style={{
        whiteSpace: "pre-line",
        height: "195px",
        // display: "block",
        textAlign: "center",
        fontSize: "40px",
        color: "white",
        display: "flex",
        textShadow: "1px 1px 20px #000",
      }}
      sequence={[
        // Same substring at the start will only be typed once, initially
        "💡 Discover your mood color 🌈\nbased off of your personality! 🧠\n\n🛠️ Integrated with OpenAI's GPT-4 and Dall-E-3",
        2500,
        "",
      ]}
      // sequence={[
      //   // Same substring at the start will only be typed once, initially
      //   "💡 Discover your mood color 🌈 \nbased off of your personality! 🧠 ",
      //   2000, // every 1s
      //   "",
      //   1000,
      //   "🛠️ Integrated with OpenAI's GPT-4 ",
      //   2500,
      // ]}
      // speed={60} //70
      // style={{
      //   fontSize: "40px",
      //   color: "white",
      //   display: "flex",
      //   textShadow: "1px 1px 20px #000",
      // }}
      repeat={Infinity}
    />
  );
};

export default Animate;
