import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { PageNotFound } from './PageNotFound';
import Sidebar from '../components/Sidebar';
import Header  from '../components/Header';
import { Home } from './Home';
import { AddUser } from './AddUser';
import NoteList from './notes/NoteList';
import NoteDetails from './notes/NoteDetails';
import EditNote from './notes/EditNote';
import ReminderList from './reminders/ReminderList';
import ReminderDetails from './reminders/ReminderDetails';
import EditReminder from './reminders/EditReminder';
import { UsersList } from './users/UsersList';
import { UserDetails } from './users/UserDetails';
import { EditUser } from './users/EditUser';
import GlobalNoteLimit from './notes/GlobalNoteLimit';
import GlobalReminderLimit from './reminders/GlobalReminderLimit';
import UsersActivityLogs from './UsersActivityLogs';
import BusinessList from './business/BusinessList';
import BusinessDetails from './business/BusinessDetails';
import EditBusiness from './business/EditBusiness';
import WallList from './walls/WallList';
import EditWall from './walls/EditWall';
import WallDetails from './walls/wallDetails';
import CategoryList from './Category/CategoryList';
import GlobalWallLimit from './users/GlobalWallLimit';
import Announcement from './announcement/Announcement';
import GlobalBusinessWallLimit from './business/GlobalBusinessWallLimit';
import ReportList from './report/reportList';
import FrequencyList from './Frequency/FrequencyList';
import Chat from './Chat/Chat';

export const Layout = () => {


    return (
        <>
            <div className="main-wrapper d-flex w-100">
                <div className="sidebar-wrapper">
                    <Sidebar />
                </div>

                <div className="main-content">
                    <Header />
                    <Routes>


                        <Route path="/dashboard" element={<Home />} />

                        <Route path="/user-list" element={<UsersList />} />
                        <Route path="/add-user" element={<AddUser />} />
                        <Route path="/user-details/:id" element={<UserDetails />} />
                        <Route path="/edit-user/:id" element={<EditUser />} />

                        <Route path="/business-list" element={<BusinessList />} />
                        <Route path="/business-details/:id" element={<BusinessDetails />} />
                        <Route path="/edit-business/:id" element={<EditBusiness />} />
                        <Route path="/global-business-limit" element={<GlobalBusinessWallLimit />} />
                        

                        <Route path="/note-list" element={<NoteList />} />
                        <Route path="/note-details/:id" element={<NoteDetails />} />
                        <Route path="/edit-note/:id" element={<EditNote />} />
                        <Route path="/global-note-limit" element={<GlobalNoteLimit />} />

                        <Route path="/reminder-list" element={<ReminderList />} />
                        <Route path="/reminder-details/:id" element={<ReminderDetails />} />
                        <Route path="/edit-reminder/:id" element={<EditReminder />} />
                        <Route path="/global-reminder-limit" element={<GlobalReminderLimit />} />

                        <Route path="/walls-list" element={<WallList />} />
                        <Route path="/edit-wall/:id" element={<EditWall />} />
                        <Route path="/wall-details/:id" element={<WallDetails />} />
                        <Route path="/global-wall-limit" element={<GlobalWallLimit />} />


                        <Route path="/category-list" element={<CategoryList />} />

                        <Route path="/users-activity" element={<UsersActivityLogs />} />

                        <Route path="/app-anouncement" element={<Announcement />} />

                        <Route path="/report-list" element={<ReportList />} />

                        <Route path="/frequency-list" element={<FrequencyList />} />

                        <Route path="/chat" element={<Chat />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </div>

            <Outlet />
        </>
    )
}
