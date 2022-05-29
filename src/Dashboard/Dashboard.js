import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import useAdmin from '../hooks/useAdmin';
const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div style={{ fontFamily: 'Poppins,sans-serif' }} className="drawer drawer-mobile bg-transparent">
            <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle bg-transparent" />
            <div style={{ fontFamily: 'Poppins,sans-serif' }} className="drawer-content bg-transparent">
                <Outlet></Outlet>
            </div>
            <div style={{ fontFamily: 'Poppins,sans-serif' }} className="drawer-side bg-transparent">
                <label htmlFor="dashboard-sidebar" className="drawer-overlay bg-transparent"></label>
                <ul className="menu p-4 overflow-y-auto w-80 text-base-content lg:bg-transparent bg-white">
                    <li><Link to='/dashboard'><i className="fal fa-list-check"></i> Dashboard</Link></li>
                    {admin &&
                        <>
                            <li><Link to='/dashboard/users'><i className="fal fa-users"></i> All Users</Link></li>
                            <li><Link to='/dashboard/orders'><i className="fal fa-ballot-check"></i> All Orders</Link></li>
                            <li><Link to='/dashboard/add-tool'><i className="fal fa-file-plus"></i> Add Tool</Link></li>
                            <li><Link to='/dashboard/manage-tool'><i className="fal fa-screwdriver-wrench"></i> Manage Tools</Link></li>
                        </>
                    }

                    {admin ? null : <li><Link to='/dashboard/review'><i className="fal fa-comment-plus"></i>Add a review</Link></li>}
                    <li><Link to='/dashboard/profile'><i className="fa-light fa-square-user"></i> My profile</Link></li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;

