import React from 'react';

const ManageToolsRow = ({ tool, index, setDeletingTool }) => {
    const { name, image, price } = tool;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <img className='w-20 h-20' alt={name} src={image}></img>
            </td>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <label
                    onClick={() => setDeletingTool(tool)} htmlFor="delete-confirm-modal" className="fal fa-trash-arrow-up text-red-600 cursor-pointer"></label>
            </td>
        </tr>
    );
};

export default ManageToolsRow;