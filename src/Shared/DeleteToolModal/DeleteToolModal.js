import React from 'react';
import { toast } from 'react-toastify';

const DeleteToolModal = ({ deletingTool, refetch, setDeletingTool }) => {
    const { name, _id } = deletingTool;
    const handleDelete = () => {
        const url = `https://elite-toolboxes.herokuapp.com/tool/${_id}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Tool: ${name} deleted successfully`)
                    refetch();
                    setDeletingTool(null);
                }
                else {
                    toast.error(`Can't delete tool: ${name}`)
                }
            })
    }

    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='flex justify-center items-center'>
                        <i className="fal fa-triangle-exclamation p-3 my-2 text-xl text-center bg-red-200 text-red-600 rounded-full"></i>
                    </div>
                    <h3 className="font-bold text-lg text-red-600">Are you sure you want to delete {name}</h3>
                    <p className="py-4">You will not be able to recover item once you have deleted it!</p>
                    <div className="modal-action flex gap-4">
                        <label htmlFor="delete-confirm-modal" className="cursor-pointer border-2 hover:border-green text-white hover:text-red-600 hover:bg-white p-2 rounded bg-red-600 border-red-600">Cancel</label>
                        <label onClick={handleDelete} htmlFor="delete-confirm-modal" className="cursor-pointer border-2 hover:border-green text-white hover:text-green-400 hover:bg-white p-2 rounded bg-green-400 border-green-400">Confirm</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteToolModal;