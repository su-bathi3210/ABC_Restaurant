import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Branch = () => {
    const [branches, setBranches] = useState([]);

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

    return (
        <div className="customer-branch-container">
            <h1>Our Branches</h1>
            <div className="customer-branch-list">
                {branches.map(branch => (
                    <div key={branch.branchId} className="customer-branch-box">
                        <h2>{branch.branchName}</h2>
                        <p>{branch.address}</p>
                        <p>{branch.phoneNumber}</p>
                        <p>{branch.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Branch;
