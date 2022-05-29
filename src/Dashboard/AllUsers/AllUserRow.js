import React from 'react';
import { toast } from 'react-toastify';

const AllUserRow = ({ user, refetch, myEmail, setDeletingUser }) => {
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`https://elite-toolboxes.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`You are not an admin. You can't do that`)
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`Admin role add to user ${email}`)
                    refetch();
                }
            })
    }
    const makeUser = () => {
        fetch(`https://elite-toolboxes.herokuapp.com/users/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error(`You are not an admin. You can't do that`)
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success(`User role added to admin ${email}`)
                    refetch();
                }
            })
    }
    // const onMydlt = () => {
    //     toast.error(`Can't delete your ownself`)
    // }
    return (
        <tr className='bg-white'>
            <th></th>
            <td>
                <img className='w-12 h-12 rounded-full' alt={user?.user_name} src={user?.photo}></img>
            </td>
            <td>{user?.user_name}</td>
            <td>{user?.email}</td>
            <td className='flex items-center justify-center'>
                {role !== 'admin' ?
                    <button className="fal fa-user-plus text-center text-green-600" onClick={makeAdmin}></button>
                    :
                    <button className="fal fa-user-slash text-center  text-red-600" onClick={makeUser}></button>
                }
            </td>
            <div className='flex items-center justify-center bg-white'>
                <label
                    onClick={() => setDeletingUser(user)} htmlFor="delete-confirm-modal" className="fal fa-trash-arrow-up text-red-600  cursor-pointer text-center"></label>
            </div>

        </tr>
    );
};

export default AllUserRow;