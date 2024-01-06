import { useState, useEffect, useRef } from "react";
import { Scrollama, Step } from "react-scrollama";
import * as d3 from "d3";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

function Story(props) {
  const styles = {
    navbar: {
      position: "fixed",
      display: "flex",
      top: 0,
      right: 0,
      zIndex: 1,
      "& a": {
        display: "block",
        fontSize: "20px",
        padding: "20px",
      },
    },
    pageTitle: {
      textAlign: "center",
      fontSize: 22,
      margin: "90px 0 10px",
      visibility: "hidden",
    },
    description: {
      maxWidth: 600,
      margin: "10px auto 30px",
      fontSize: 22,
      lineHeight: "28px",
      "& a": {
        color: "black",
      },
    },
    pageSubtitle: {
      textAlign: "center",
      fontSize: 22,
      color: "#888",
    },
    graphicContainer: {
      padding: "40vh 2vw 20vh",
      display: "flex",
      justifyContent: "space-between",
    },
    graphic: {
      flexBasis: "60%",
      position: "sticky",
      width: "100%",
      height: "60vh",
      top: "20vh",
      backgroundColor: "#aaa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
        fontSize: "5rem",
        fontWeight: 700,
        textAlign: "center",
        color: "#fff",
      },
    },
    scroller: {
      flexBasis: "35%",
    },
    step: {
      margin: "0 auto 3rem auto",
      padding: "180px 0",
      border: "1px solid #333",
      "& p": {
        textAlign: "center",
        padding: "1rem",
        fontSize: "1.8rem",
        margin: 0,
      },
      "&:last-child": {
        marginBottom: 0,
      },
    },
    button: {
      backgroundColor: "#3773ac",
      color: "white",
      borderRadius: "4px",
      cursor: "pointer",
      padding: "6px",
      textAlign: "center",
      display: "block",
      maxWidth: 220,
      margin: "10px auto 30px",
      fontSize: 19,
      lineHeight: "28px",
      textDecoration: "none",
    },
    subhed: {
      maxWidth: 600,
      margin: "10px auto 15px",
      fontSize: 22,
      lineHeight: "28px",
      "& a": {
        color: "black",
      },
      textAlign: "center",
    },
    whoUsing: {
      maxWidth: 960,
      margin: "30px auto 100px",
      fontSize: 19,
      lineHeight: "26px",
      gridAutoRows: "minmax(100px, auto)",
      "& a": {
        color: "black",
      },
      "& img": {
        width: "100%",
      },
      display: "grid",
      gridTemplateColumns: "2fr 5fr",
      "& > div": {
        padding: "16px 0",
        borderTop: "1px solid #ccc",
        "&:nth-child(odd)": {
          paddingRight: "13px",
          borderRight: "1px solid #ccc",
        },
        "&:nth-child(even)": {
          paddingLeft: "13px",
        },
      },
    },
  };

  const mapContainerRef = useRef(null);

  const [data, setData] = useState(0);
  const [steps, setSteps] = useState([10, 20, 30]);
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("pink");
  const map = 'https://gist.githubusercontent.com/carmoreira/49fd11a591e0ce2c41d36f9fa96c9b49/raw/e032a0174fc35a416cff3ef7cf1233973c018294/ukcounties.json'

  const onStepEnter = (e) => {
    const { data, entry, direction } = e;
   
    setData(data);
    const colo = ["purple", "blue", "yellow"];
    const no = Math.floor(Math.random() * colo.length);
    console.log(colo[no]);
 
    const item = d3.selectAll('path').attr('fill', colo[no])
  };

  const onStepExit = ({ direction, data }) => {
    if (direction === "up" && data === steps[0]) {
      setData(0);
    }
  };

  // const onStepProgress = ({ progress }) => {
  //   // console.log("progress", progress);
  //   setProgress(progress);
  // };

  // console.log("0verpro", progress);
  //   const { data, steps, progress } = this.state;
  //   const { classes } = this.props;

  useEffect(() => {
    const svg = d3.select(mapContainerRef.current);

    // Define your map projection, scale, and translate
    const projection = d3.geoMercator().scale(2000).translate([-1100, 200]);

    // Create a path generator using the projection
    const path = d3.geoPath().projection(projection);
    //https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json
    //"https://gist.githubusercontent.com/carmoreira/49fd11a591e0ce2c41d36f9fa96c9b49/raw/e032a0174fc35a416cff3ef7cf1233973c018294/ukcounties.json
    // Load the world map data
    d3.json(
      "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
    ).then((world) => {
      console.log('m', world)
      // Draw the map
      svg
        .append("g")
        .selectAll("path")
        .data(world.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", color)
        .attr("stroke", "yellow")
        .attr("stroke-width", 2); // Set the map fill color

      // Update the map size when the window is resized
      const resizeMap = () => {
        const width = mapContainerRef.current.clientWidth;
        const height = mapContainerRef.current.clientHeight;

        svg.attr("width", width).attr("height", height);

        projection
          .scale(150 * (width / 960))
          .translate([width / 2, height / 2]);

        svg.selectAll("path").attr("d", path);
      };

      // Call resizeMap function on window resize
      window.addEventListener("resize", resizeMap);

      // Cleanup function to remove event listener on component unmount
      return () => {
        window.removeEventListener("resize", resizeMap);
      };
    });
  }, []);

  return (
    <div>
      <div style={styles.navbar}>
        <a href="https://github.com/jsonkao/react-scrollama">GitHub</a>
      </div>
      <p style={styles.pageTitle}>
        <a href="https://github.com/jsonkao/react-scrollama">React Scrollama</a>{" "}
        Demo
      </p>
      {/* <p style={styles.description}>
        <b>React Scrollama</b> is a lightweight and simple interface for
        scrollytelling in React that uses IntersectionObserver in favor of
        scroll events. The library has been used by the{" "}
        <a href="https://datatopics.worldbank.org/sdgatlas/">World Bank's</a>{" "}
        Atlas of Sustainable Development Goals and Politico.
      </p> */}

      <a
        style={styles.button}
        href="https://github.com/jsonkao/react-scrollama"
      >
        Learn and get started
      </a>

      <p style={styles.pageSubtitle}>Scroll ↓</p>
      <div style={styles.graphicContainer}>
        <div style={styles.scroller}>
          <Scrollama
            onStepEnter={onStepEnter}
            onStepExit={onStepExit}
            // progress
            // onStepProgress={onStepProgress}
            offset="400px"
            debug
          >
            {steps.map((value) => {
              const isVisible = value === data;
              const background = isVisible
                ? `rgba(44,127,184, ${progress})`
                : "white";
              const visibility = isVisible ? "visible" : "hidden";
              return (
                <Step data={value} key={value}>
                  <div style={styles.step}>
                    <div style={{ background }}>
                      <p>step value: {value}</p>
                      <p style={{ visibility }}>
                        {Math.round(progress * 1000) / 10 + "%"}
                      </p>
                    </div>
                  </div>
                </Step>
              );
            })}
          </Scrollama>
        </div>
        <div style={styles.graphic}>
          {/* svg container */}
          <div className="map-container">
            <p>{data}</p>
            <svg className="map-svg" ref={mapContainerRef}></svg>
            {/* <BarChart /> */}
            {/* <LineChart /> */}
          </div>
        </div>
      </div>
      <p style={styles.subhed}>
        <b>Who's using React Scrollama?</b>
      </p>
      {/* <div style={styles.whoUsing}>
        <div>
          <a href="https://www.worldbank.org/en/home" rel="nofollow">
            <img
              src="https://user-images.githubusercontent.com/15334952/111389696-ca705b00-8687-11eb-9db9-4f0919715834.png"
              width="220"
              style={{ maxWidth: "100%" }}
            />
          </a>{" "}
          <br />
          <a href="https://www.un.org/en/" rel="nofollow">
            <img src="https://user-images.githubusercontent.com/15334952/111392820-c0515b00-868d-11eb-9b82-5eaace6612c9.png" />
          </a>
          <br />
          <a href="https://datatopics.worldbank.org/sdgatlas/" rel="nofollow">
            17 interactive visualization stories
          </a>{" "}
          <a
            href="https://twitter.com/maartenzam/status/1371951848039579664"
            rel="nofollow"
          >
            using
          </a>{" "}
          React Scrollama for scrollytelling
        </div>
        <div>
          <a href="https://datatopics.worldbank.org/sdgatlas/" rel="nofollow">
            <img src="https://user-images.githubusercontent.com/15334952/111390361-fb04c480-8688-11eb-9fa1-3991ee73dd05.png" />
          </a>
        </div>
        <div>
          <a href="https://www.politico.com/" rel="nofollow">
            <img
              src="https://camo.githubusercontent.com/5e5aaf160fb5b4446d2c0dff5dc8781a14f2b5608e380a7c1d70962541f9e9a5/68747470733a2f2f6a6f6c7474782e6f72672f77702d636f6e74656e742f75706c6f6164732f323031392f31302f706f6c697469636f2d6c6f676f2e706e67"
              style={{ maxWidth: "170px" }}
              data-canonical-src="https://jolttx.org/wp-content/uploads/2019/10/politico-logo.png"
            />
          </a>
          <br />
          <a
            href="https://www.politico.com/interactives/2019/election-security-americas-voting-machines"
            rel="nofollow"
          >
            <i>The scramble to secure America’s voting machines</i>
          </a>{" "}
          by{" "}
          <a href="https://bzjin.github.io" rel="nofollow">
            Beatrice Jin
          </a>
        </div>
        <div>
          <a
            href="https://www.politico.com/interactives/2019/election-security-americas-voting-machines"
            rel="nofollow"
          >
            <img src="https://user-images.githubusercontent.com/15334952/111391036-2dfb8800-868a-11eb-9c64-3f322ef1e588.png" />
          </a>
        </div>
        <div>
          <a href="http://graphicsdesk.github.io/" rel="nofollow">
            <img
              src="https://camo.githubusercontent.com/9c8c61dc63925ee922545f0d0468d5d0d25623459d7b46de3dce4cc85a57c98a/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f737065632d696d616765686f7374696e672f737065637461746f722d6c6f676f2e706e67"
              width="180"
              data-canonical-src="https://s3.amazonaws.com/spec-imagehosting/spectator-logo.png"
              style={{ maxWidth: "100%" }}
            />
          </a>
          <br />{" "}
          <a
            href="https://www.columbiaspectator.com/eye-lead/graduate-sex-diversity"
            rel="nofollow"
          >
            <i>Sex Diversity Among Grad Students is Stagnating</i>
          </a>{" "}
          by Jason Kao
        </div>
        <div>
          <a
            href="https://www.columbiaspectator.com/eye-lead/graduate-sex-diversity"
            rel="nofollow"
          >
            <img src="https://user-images.githubusercontent.com/15334952/111391310-b843ec00-868a-11eb-9744-72ee913cdbe1.png" />
          </a>
        </div>
      </div> */}
      <a
        style={styles.button}
        href="https://github.com/jsonkao/react-scrollama"
      >
        Learn and get started
      </a>
    </div>
  );
}

export default Story;
