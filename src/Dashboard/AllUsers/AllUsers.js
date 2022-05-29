import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import DeleteUserModal from '../../Shared/DeleteUserModal/DeleteUserModal';
import AllUserRow from './AllUserRow';

const AllUsers = () => {
    const [user] = useAuthState(auth);
    const [deletingUser, setDeletingUser] = useState(null);
    const myEmail = user?.email;
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://elite-toolboxes.herokuapp.com/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className='text-2xl font-semibold text-center mb-2'>Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <AllUserRow setDeletingUser={setDeletingUser} myEmail={myEmail} key={user?._id} user={user} refetch={refetch} />)
                        }
                    </tbody>
                </table>
            </div>
            {deletingUser && <DeleteUserModal deletingUser={deletingUser} setDeletingUser={setDeletingUser} refetch={refetch} />}
        </div>
    );
};

export default AllUsers;