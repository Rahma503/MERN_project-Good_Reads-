import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Sidebar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../../store/authSlicer";

export default function Sidebar(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const status = useSelector((state) => state.auth.status);
  const data = props.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://readify-production.up.railway.app/api/sign-out");
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      dispatch(authActions.logout());
      dispatch(authActions.changeStatus("unauthorized"));
      localStorage.setItem("isSubscribed", "false");
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  // const handleverifyEmail = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "https://readify-production.up.railway.app/api/send-verify-email"
  //     );
  //     toast.success(response.data.msg, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //     dispatch(authActions.logout());
  //     localStorage.setItem("isSubscribed", "false");
  //     navigate("/");
  //   } catch (error) {
  //     toast.error(error.response.data.msg, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //       transition: Bounce,
  //     });
  //   }
  // };

  return (
    <div className="bg-light p-2 rounded d-flex flex-column align-items-center justify-content-between w-75 h-100">
      <div className="d-flex flex-column align-items-center justify-content-center w-100">
        <img src={data.avatar} style={{ height: "12vh" }} />
        <p
          className="mt-3"
          style={{ fontSize: "1.5rem", fontWeight: "bolder" }}
        >
          {data.username}
        </p>
        <p className="mt-1 fs-4 fs-md-5 fs-sm-6 text-center text-wrap w-100">
          {data.email}
        </p>
        <div className="w-100 mt-1 border border-2"></div>
      </div>

      <div className="w-100 d-flex flex-column align-items-center justify-content-center">
        {isLoggedIn && role === "user" && (
          <>
            <Link
              to="/profile/favourites"
              className="w-100 py-1 rounded p-link"
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderHistory"
              className="w-100 py-1 rounded p-link "
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              Order History
            </Link>
            <Link
              to="/profile/settings"
              className="w-100 py-1 rounded p-link"
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              Settings
            </Link>
            {status === "unauthorized" && (
              <Link
                to="/verifyEmail"
                className="w-100 py-1 rounded p-link"
                style={{ fontSize: "1.3rem", textAlign: "center" }}
              >
                Verify Email
              </Link>
            )}
          </>
        )}

        {isLoggedIn && role === "admin" && (
          <>
            <Link
              to="/profile"
              className="w-100 py-1 rounded p-link"
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              Manage Books
            </Link>
            <Link to="/profile/add-book"
             className="w-100 py-1 rounded p-link"
             style={{ fontSize: "1.3rem", textAlign: "center" }}
            >Add Book</Link>
            <Link
              to="/profile/allOrders"
              className="w-100 py-1 rounded p-link"
              style={{ fontSize: "1.3rem", textAlign: "center" }}
            >
              All orders
            </Link>
          </>
        )}
      </div>
      <button className="btn logout-btn" onClick={handleSignout}>
        Log out <FontAwesomeIcon icon={faRightFromBracket} />
      </button>
    </div>
  );
}
