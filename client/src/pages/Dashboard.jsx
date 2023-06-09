import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import emptyState from "../assets/empty-state.svg";
import ReactModal from "react-modal";
import { formService } from "../service";
import Card from "../components/Card";

ReactModal.setAppElement("#root");

const Dashboard = ({ isDark, ...props }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [forms, setForms] = useState([]);

  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    return () => {
      AOS.refresh();
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const res = await formService.getForms();
      if (res.isSuccessful()) {
        setForms(...forms, res.data);
      }
      if (res.hasError()) {
        setCurrentUser(null);
      }
    }
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (currentUser == null) {
      window.location.href = "/signin";
      return <div>Redirecting...</div>;
    }
  }, [currentUser]);

  const handleCreateForm = async () => {
    const res = await formService.createForm({ formName });
    setModalIsOpen(false);
    if (res.isSuccessful()) {
      props.history.push(`/form/${res.data._id}`);
    }
    if (res.hasError()) {
      setCurrentUser(null);
    }
  };

  return (
    <div className="h-screen transition-colors duration-200 ease-linear  w-screen flex flex-col justify-end items-center dark:text-white dark:bg-black ">
      <div
        className="h-5/6 w-screen flex justify-center flex-col items-center"
        data-aos="fade"
      >
        <div className="flex justify-between items-center w-5/6 mb-4">
          <h1 className="xl:text-5xl text-3xl font-extrabold font-sans">
            My forms
          </h1>
          <button
            className="font-mono border border-mygreen font-bold py-2 px-4 rounded-sm transform transition-transform hover:scale-95 hover:opacity-95 duration-200 ease-in"
            onClick={() => setModalIsOpen(true)}
          >
            Create
          </button>
        </div>
        {forms.length > 0 ? (
          <div
            id="grid"
            className="h-5/6 w-5/6 mb-5 p-4 rounded-md grid tablet:grid-cols-2 xl:grid-cols-4 xl:gap-6 grid-cols-1 gap-5  overflow-x-hidden overflow-y-scroll"
          >
            {forms.map((form) => (
              <Card
                key={form._id}
                name={form.formName}
                createdAt={form.createdAt}
                id={form._id}
                isDark={isDark}
              />
            ))}
          </div>
        ) : (
          <div className="h-5/6 w-5/6 mb-5 p-2 rounded-md">
            <div className="flex flex-col items-center">
              <img src={emptyState} alt="nothing here" className="h-80 w-80" />
              <h1 className="dark:text-white text-4xl font-Comic font-bold">
                Nothing here...
              </h1>
            </div>
          </div>
        )}

        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          closeTimeoutMS={200}
          className={`absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 rounded-2xl flex z-50 flex-col justify-center items-center h-64 w-80 py-1 bg-white text-black space-y-5 ${
            isDark ? `bg-black text-white` : ``
          }`}
          overlayClassName="overlay"
        >
          <h1 className="text-2xl font-Inter font-bold dark:text-white">
            Enter Form Name
          </h1>
          <input
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            required
            type="text"
            className={`w-2/3 border px-3 py-2 rounded-lg shadow-sm focus:outline-none text-center ${
              isDark
                ? `text-white bg-myblack border-gray-500`
                : `border-gray-300`
            }`}
          />
          <button
            className="py-2 px-4  bg-mygreen3 shadow-lg hover:scale-95 font-semibold text-center text-lg rounded-lg duration-300 ease-in-out focus:outline-none font-Nunito transform transition-transform"
            onClick={handleCreateForm}
          >
            Submit
          </button>
        </ReactModal>
      </div>
    </div>
  );
};

export default Dashboard;
