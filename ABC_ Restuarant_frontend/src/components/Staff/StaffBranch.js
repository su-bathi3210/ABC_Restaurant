import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Staff.css'; // Ensure this file exists for styling

const StaffBranch = () => {
    const [branches, setBranches] = useState([]);
    const [editingBranch, setEditingBranch] = useState(null);

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

    const handleUpdateBranch = async () => {
        try {
            await axios.put(`/branch/${editingBranch.branchId}`, editingBranch);
            setBranches(branches.map(branch => branch.branchId === editingBranch.branchId ? editingBranch : branch));
            setEditingBranch(null);
        } catch (error) {
            console.error('Error updating branch:', error);
        }
    };

    return (
        <div className="staff-branch-container">
            <h1>Manage Branch</h1>
            <p>As a staff member, you have the capability to manage and update branch information directly through this interface. This allows you to ensure that all details about each branch are accurate and up-to-date. </p>
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
                                            style={{ backgroundColor: 'tomato', color: 'white' }} 
                                            onClick={() => setEditingBranch(branch)}>Edit</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
            
        </div>
    );
};

export default StaffBranch;
