import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppointmentsIcon from '../assets/images/appointments-list.svg';
import SidebarLogo from '../assets/images/wakewall.png';

const Sidebar = (props) => {
    const [activepage, setActivepage] = useState('')

    const handlePageClick = (page) => {
        setActivepage(page)
    }

    const closeSidebar = (value) => {
        handlePageClick('activepage', value)
        if (window.innerWidth >= '1024') {
            handlePageClick(value)
        } else {
            handlePageClick(value)
            props.closeOffcanvas()
        }
    }

    return (
        <aside className="sidebar d-flex flex-column flex-shrink-0">
            <Link to={'/'} className='sidebar-logo text-center text-decoration-none btn-link border-bottom border-light border-opacity-25 px-3 py-2 mb-3'>
                <div className="d-flex align-items-center gap-2">
                    <div className="left-part">
                        <img className="img-fluid" src={SidebarLogo} alt="Logo" style={{ maxWidth: '44px', maxHeight: '44px' }} />
                    </div>
                    <div className="right-part text-start">
                        <div className="fs-5 fw-semibold text-white lh-sm">Wakewall</div>
                        {/* <div className="text-white text-capitalize" style={{fontSize:'10px'}}>Application tagline here</div> */}
                    </div>
                </div>
            </Link>

            <ul className="sidebar-item-cover list-inline m-0">
                <li className="nav-item">
                    <Link to={'/'} className={`${activepage === '/' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('/')}>
                        <i className="bi bi-house-door"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <Link to={'/user-list'} className={`${activepage === 'user-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('user-list')}>
                        {/* <i className="bi bi-buildings"></i> */}
                        <i className="bi bi-people-fill"></i>
                        <span>User List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/category-list'} className={`${activepage === 'category-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('category-list')}>
                        {/* <i className="bi bi-buildings"></i> */}
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                        <span>Category List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/business-list'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('business-list')}>
                        {/* <i className="bi bi-person-badge-fill"></i> */}
                        <i className="bi bi-briefcase-fill"></i>
                        <span>Business List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/note-list'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('note-list')}>
                        {/* <i class="bi bi-file-earmark-text"></i> */}
                        <i class="bi bi-journal-text"></i>
                        <span>Notes Management</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/reminder-list'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('reminder-list')}>
                        {/* <i class="bi bi-file-earmark-text"></i> */}
                        <i class="bi bi-alarm"></i>
                        <span>Reminder Management</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/walls-list'} className={`${activepage === 'media' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('walls-list')}>
                        <i className="bi bi-images"></i>
                        <span>Media</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/users-activity'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('users-activity')}>
                        <i class="bi bi-clock-history"></i>
                        <span>Users Activity Logs</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/report-list'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('report-list')}>
                        <i class="bi bi-bar-chart"></i>
                        <span>Report List</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/app-anouncement'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('app-anouncement')}>
                        <i class="bi bi-megaphone"></i>
                        <span>App Anouncement</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/frequency-list'} className={`${activepage === 'client-list' ? 'active' : ' '} nav-link d-flex align-items-center gap-2`} onClick={() => closeSidebar('frequency-list')}>
                        <i class="bi bi-arrow-repeat"></i>
                        <span>Frequency List</span>
                    </Link>
                </li>






            </ul>
        </aside>
    );
};

export default Sidebar;