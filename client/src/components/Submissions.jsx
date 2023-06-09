import { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import emptyState from "../assets/submission.svg";
import { formService } from "../service";
import SubmissionCard from "./SubmissionCard";
import { AuthContext } from "../context/AuthContext";

const Submissions = ({ formId }) => {
  const [submissions, setSubmissions] = useState([]);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  useEffect(() => {
    AOS.init({ duration: 1000 });
    return () => {
      AOS.refresh();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await formService.getSubmissions(formId);
      if (res.isSuccessful()) {
        setSubmissions(...submissions, res.data);
      }
      if (res.hasError()) {
        setCurrentUser(null);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentUser == null) {
      window.location.href = "/signin";
      return <div>Redirecting...</div>;
    }
  }, [currentUser]);

  return submissions.length < 1 ? (
    <div data-aos="fade" className="flex justify-center flex-col items-center">
      <img src={emptyState} alt="no submissions" className="h-80 w-96" />
      <h1 className="dark:text-white text-center xl:text-4xl text-3xl font-Nunito font-bold ">
        Ooops! You have no submissions.
      </h1>
    </div>
  ) : (
    <div
      id="grid2"
      className="grid w-full xl:grid-cols-3 grid-cols-1 tablet:grid-cols-2 bigScreen:gap-4 gap-6  p-4 max-h-11/12 overflow-x-hidden overflow-y-scroll"
    >
      {submissions.map((submission, index) => (
        <SubmissionCard key={index} submission={submission} />
      ))}
    </div>
  );
};

export default Submissions;
