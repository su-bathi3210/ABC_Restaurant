import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Admin.css';

const AdminBranch = () => {
    const [branches, setBranches] = useState([]);
    const [newBranch, setNewBranch] = useState({
        branchName: '',
        address: '',
        phoneNumber: '',
        email: ''
    });
    const [editingBranch, setEditingBranch] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axios.get('/branch');
                setBranches(response.data);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };
        fetchBranches();
    }, []);

    const handleAddBranch = async () => {
        try {
            const response = await axios.post('/branch', newBranch);
            setBranches([...branches, response.data]);
            setNewBranch({ branchName: '', address: '', phoneNumber: '', email: '' });
            setIsFormVisible(false);
        } catch (error) {
            console.error('Error adding branch:', error);
        }
    };

    const handleUpdateBranch = async () => {
        try {
            await axios.put(`/branch/${editingBranch.branchId}`, editingBranch);
            setBranches(branches.map(branch => branch.branchId === editingBranch.branchId ? editingBranch : branch));
            setEditingBranch(null);
        } catch (error) {
            console.error('Error updating branch:', error);
        }
    };

    const handleDeleteBranch = async (branchId) => {
        try {
            await axios.delete(`/branch/${branchId}`);
            setBranches(branches.filter(branch => branch.branchId !== branchId));
        } catch (error) {
            console.error('Error deleting branch:', error);
        }
    };

    return (
        <div className="admin-branch-container">
            <h1>Branch</h1>
            <p>The system for ABC Restaurant is designed to streamline the administration of multiple restaurant branches. It allows administrators to easily manage branch information, including adding new branches, updating existing details, and removing outdated or closed locations. </p>

            <button className="add-branch-button" onClick={() => setIsFormVisible(true)}>
                Add New Branch
            </button>

            {isFormVisible && (
                <div className="popup-form">
                    <h2>Add New Branch</h2>
                    <input
                        type="text"
                        placeholder="Branch Name"
                        value={newBranch.branchName}
                        onChange={(e) => setNewBranch({ ...newBranch, branchName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        value={newBranch.address}
                        onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={newBranch.phoneNumber}
                        onChange={(e) => setNewBranch({ ...newBranch, phoneNumber: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newBranch.email}
                        onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                    />
                    <button onClick={handleAddBranch}>Add Branch</button>
                    <button className="cancel-button" onClick={() => setIsFormVisible(false)}>Cancel</button>
                </div>
            )}

            <table className="branches-table">
                <thead>
                    <tr>
                        <th>Branch Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {branches.map(branch => (
                        <tr key={branch.branchId}>
                            {editingBranch && editingBranch.branchId === branch.branchId ? (
                                <>
                                    <td><input type="text" value={editingBranch.branchName} onChange={(e) => setEditingBranch({ ...editingBranch, branchName: e.target.value })} /></td>
                                    <td><input type="text" value={editingBranch.address} onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })} /></td>
                                    <td><input type="text" value={editingBranch.phoneNumber} onChange={(e) => setEditingBranch({ ...editingBranch, phoneNumber: e.target.value })} /></td>
                                    <td><input type="email" value={editingBranch.email} onChange={(e) => setEditingBranch({ ...editingBranch, email: e.target.value })} /></td>
                                    <td>
                                        <button onClick={handleUpdateBranch}>Update</button>
                                        <button className="cancel-button" onClick={() => setEditingBranch(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{branch.branchName}</td>
                                    <td>{branch.address}</td>
                                    <td>{branch.phoneNumber}</td>
                                    <td>{branch.email}</td>
                                    <td>
                                        <button 
                                        style={{ backgroundColor: 'tomato', color: 'white'}} 
                                        onClick={() => setEditingBranch(branch)}>Edit</button>

                                        <button 
                                        style={{ backgroundColor: '	#e39533', color: 'white'}} 
                                        onClick={() => handleDeleteBranch(branch.branchId)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminBranch;
