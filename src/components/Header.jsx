import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SearchIcon from "../assets/images/search.svg";
import { Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchSearchResults } from "../redux/actions/search";
import { fetchNotes } from "../redux/actions/noteAction";
import API from "../API";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      const response = await API.post("/user/logout", {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const openOffcanvas = () => {
    setIsOffcanvasOpen(true);
  };

  // console.log(user.first_name)
  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };


  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      dispatch(fetchSearchResults(value)); // Search API call
    } else {
      dispatch(fetchNotes()); // Reset to full data
    }
  };

  const handleBack = () => {
    setSearchTerm("");
    dispatch(fetchNotes());
  };



  return (
    <nav className="navbar navbar-light bg-white navbar-expand-lgg top-header sticky-top shadow-sm py-2" data-bs-theme="light" style={{ minHeight: "61px" }}>
      <div className="container-fluid gap-2">
        <div className="left-sec col d-flex align-items-center justify-content-start gap-3">
          <Button variant="link" className="navbar-togglerr border-0 bg-transparent text-primary d-lg-none p-0" onClick={openOffcanvas}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>

          <div className="icon text-primary d-none d-lg-block">
            <div className="searchfield-wrapper">
              <input type="search" className="form-control bg-secondary bg-opacity-10" placeholder="Search username..." autoComplete="off" style={{ width: '280px' }}
                value={searchTerm}
                onChange={handleSearch} />
              <img src={SearchIcon} alt="Search Icon" className="position-absolute top-50 end-0 translate-middle-y pe-3" />

              {searchTerm && (
                <button
                  className="btn btn-sm btn-link position-absolute top-50 end-0 translate-middle-y me-4"
                  onClick={() => {
                    setSearchTerm("");
                    dispatch(fetchNotes()); // Reset data
                  }}
                  style={{ fontSize: "18px", border: "none", background: "transparent", color: "red" }}
                >
                  ✖
                </button>
              )}
            </div>
          </div>


        </div>

        <div className="middle-sec col text-center">
          <Link className="navbar-brand d-flex flex-column d-lg-none align-items-center p-0 px-2 m-0" to="/" >
            <div className="d-flex align-items-center gap-2">
              <div className="left-part">
                <img className="img-fluid" src={require("../assets/images/logo.png")} alt="Logo" style={{ maxWidth: '44px', maxHeight: '44px' }} />
              </div>
              <div className="right-part text-start">
                <div className="fs-5 fw-semibold text-primary lh-sm">WakeWall</div>
                <div className="text-primary text-capitalize" style={{ fontSize: '10px' }}>Application tagline here</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Start: Mobile Sidebar Drawer */}
        <Offcanvas show={isOffcanvasOpen} onHide={closeOffcanvas} style={{ maxWidth: "250px" }}>
          <div className="sidebar-wrapper" style={{ display: "block" }}>
            <Sidebar closeOffcanvas={closeOffcanvas} />
          </div>
        </Offcanvas>

        {/* {isOffcanvasOpen && (
          <div className="offcanvas-backdrop fade show"></div>
        )} */}

        {/* End: Mobile Sidebar Drawer */}

        <ul className="right-sec col d-flex justify-content-end m-0 p-0">
          <li className="nav-item dropdown bell-notification position-relative me-2 me-lg-3">
            <button type="button" className="bell-icon border-0 rounded-circle bg-light p-0" id="dLabel" data-bs-toggle="dropdown" aria-expanded="false" >
              <div className="chip-wrapper">
                <div className="chip-img d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-25 overflow-hidden">
                  <i className="bi bi-bell-fill text-primary"></i>
                </div>
                <span className="position-absolute p-1 bg-danger border border-light rounded-circle" style={{ top: "3px", right: 0 }}>
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
            </button>

            <div className="dropdown-menu dropdown-menu-end notifications shadow p-0" aria-labelledby="dLabel">
              <div className="bg-light border-bottom d-flex align-items-center justify-content-between gap-2 p-3 mb-2">
                <div className="menu-title fs-6 fw-semibold m-0">
                  Notifications
                </div>
                <div className="menu-title m-0">
                  <i className="bi bi-gear"></i>
                </div>
              </div>
              <div className="notifications-wrapper small overflow-auto px-3" style={{ maxHeight: "300px" }}>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
                <Link className="content d-block" to={"#"}>
                  <div className="notification-item">
                    <div className="item-title text-dark fw-medium m-0">
                      Evaluation Deadline{" "}
                      <span className="text-danger">1 day ago</span>
                    </div>
                    <p className="item-info m-0">
                      Marketing 101, Video Assignment
                    </p>
                  </div>
                </Link>
              </div>
              <div className="bg-primary text-light small border-top rounded-bottom text-center p-3 mt-2">
                See all Notification{" "}
                <i className="bi bi-arrow-right-circle-fill"></i>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown user-logout">
            <Dropdown>
              <Dropdown.Toggle
                id="dropdown-basic"
                className="nav-link text-white text-center border-0 bg-transparent p-0">
                <div className="chip-wrapper">
                  <div className="chip-img bg-primary d-flex align-items-center justify-content-center rounded-circle border border-primary overflow-hidden">
                    <img
                      className="w-100 h-100"
                      src={require("../assets/images/dummy-user.jpeg")}
                      // src={user.profile_pic ? user.profile_pic : require("../assets/images/dummy-user.jpeg")}
                      alt="User"
                    />
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="shadow-lg p-3 pb-4 mt-2">
                <div className="d-flex justify-content-between gap-2">
                  <div className="orgainization-name title-label fw-medium">Wakewall Admin</div>
                  <Link to="/login" className="signout title-label text-primary fw-medium" onClick={handleLogout}>Sign out</Link>
                </div>
                <div className="d-flex align-items-center gap-2 mt-3">
                  <div className="chip-wrapper">
                    <div
                      className="chip-img bg-primary d-flex align-items-center justify-content-center rounded-pill border border-primary overflow-hidden"
                      style={{ height: "70px", width: "70px" }}
                    >
                      <img
                        className="w-100 h-100"
                        src={require("../assets/images/dummy-user.jpeg")}
                        // src={user.profile_pic ? user.profile_pic : require("../assets/images/dummy-user.jpeg")}
                        alt="User"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="user-info overflow-hidden">
                    <div className="user-name fw-semibold text-capitalize text-truncate lh-sm">Wakewall</div>
                    {/* <div className="user-email title-label text-truncate text-lowercase">{user.email}</div> */}
                    {/* <div className="user-email title-label text-truncate">Role : {user.role}</div> */}
                    <div className="title-label">
                      {/* <Link to="" className="btn-link">View account</Link> */}
                    </div>
                  </div>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Header