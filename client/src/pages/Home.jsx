import { useEffect } from "react";
import hero from "../assets/hero.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    return () => {
      AOS.refresh();
    };
  }, []);
  return (
    <>
      <div className="dark:bg-black transition-colors duration-200 ease-linear flex tablet:mt-20 mt-0 justify-center items-center flex-col text-center h-screen home">
        <p
          id="heading"
          className="text-4xl tablet:text-6xl dark:text-white"
          data-aos="fade"
        >
          Make{" "}
          <span className="dark:text-mygreen text-mygreen3">
            &#60;form&#62;
          </span>{" "}
          our problem. Not yours.
        </p>
        <p
          id="hero-subtitle"
          className="tablet:leading-8 smallTable:text-lg tablet:mt-8 mt-4 font-Nunito text-mygrey2 dark:text-mygrey font-medium tablet:text-2xl text-sm"
          data-aos="fade"
        >
          Formify completely automates your HTML &#60;form&#62; <br />
          So you can focus on your most important work. <br />
          Easy to set-up & free to use.
        </p>
        <img
          src={hero}
          alt="hero"
          data-aos="fade"
          className="tablet:h-80 tablet:w-80 h-72 tablet:mt-0 smallTable:mt-5 mt-10"
        />
      </div>
      <div className="h-screen flex flex-col tablet:justify-evenly justify-around dark:bg-black">
        <div
          data-aos="fade-up"
          className="container mx-auto dark:bg-black font-Roboto text-center tablet:px-0 px-6"
        >
          <p
            id="heading"
            className="font-bold tablet:text-5xl text-3xl dark:text-white"
          >
            Stress free HTML forms.
          </p>
          <p className="tablet:mt-8  mt-2 text-mygrey2 dark:text-mygrey tablet:leading-8 leading-normal  font-medium font-Nunito tablet:text-2xl text-lg tablet:px-0 px-4">
            Collect form submissions from your HTML form without any backend
            code
            <br />
            and enjoy our best features that will save you a lot of time.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="container dark:bg-black mx-auto tablet:my-0 -mt-32  tablet:px-24 px-5 flex tablet:items-center tablet:flex-row flex-col justify-evenly items-center font-Roboto w-full"
        >
          <div className="flex flex-col tablet:mt-0 mt-4 text-center tablet:text-left justify-start tablet:w-2/4 w-full">
            <p
              id="heading"
              className="tablet:text-4xl text-3xl dark:text-white"
            >
              Easy to setup.
            </p>
            <p className="tablet:mt-8 mt-2 text-mygrey2 dark:text-mygrey tablet:leading-normal leading-6  font-medium font-Nunito tablet:text-2xl text-base tablet:px-0 px-2">
              Get your unique endpoint URL from formify.
              <br />
              Add name attribute to each of your input field.
              <br />
              Start collecting submissions.
            </p>
          </div>
          <div className="tablet:w-2/4 w-full tablet:mt-0 mt-10 flex dark:bg-black items-center tablet:justify-end justify-center">
            <code className="text-left tablet:text-sm text-xs  dark:text-white dark:bg-myblack tablet:leading-8 leading-normal px-8 py-4  rounded-xl shadow-customDark2">
              &#60;form <strong>action=&quot;</strong>
              <span className="text-mygreen">
                https://formify-app.herokuapp.com/f/XXXXXX
              </span>
              <strong>&quot;</strong>
              <br /> method=&quot;POST&quot;
              enctype=&quot;multipart/form-data&quot;&#62;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#60;input type=&quot;email&quot;
              name=&quot;email&quot;&#62;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&#60;input type=&quot;file&quot;
              name=&quot;photo&quot;&#62;
              <br />
              &nbsp;&nbsp;&nbsp; &#60;
              <strong>
                button type=&quot;submit&quot;&#62;Submit&#60;/button&#62;
              </strong>
              <br />
              &#60;&#8725;form&#62;
            </code>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
