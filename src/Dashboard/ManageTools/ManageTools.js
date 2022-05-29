import React, { useState } from 'react';
import { useQuery } from 'react-query';
import DeleteToolModal from '../../Shared/DeleteToolModal/DeleteToolModal';
import Loading from '../../Shared/Loading/Loading';
import ManageToolsRow from '../ManageToolsRow/ManageToolsRow';

const ManageTools = () => {
    const [deletingTool, setDeletingTool] = useState(null);
    const { data: tools, isLoading, refetch } = useQuery('tools', () => fetch('https://elite-toolboxes.herokuapp.com/tool', {
        headers: {
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    return (
        <div style={{ fontFamily: 'Poppins,sans-serif' }}>
            <h1 className='text-center text-2xl font-semibold my-4'>Manage {tools.length} tools</h1>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Picture</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tools.map((tool, index) => <ManageToolsRow index={index} key={tool?._id} tool={tool}
                            setDeletingTool={setDeletingTool} refetch={refetch} />)
                    }
                </tbody>
            </table>
            {deletingTool && <DeleteToolModal deletingTool={deletingTool} setDeletingTool={setDeletingTool} refetch={refetch} />}
        </div>
    );
};

export default ManageTools;