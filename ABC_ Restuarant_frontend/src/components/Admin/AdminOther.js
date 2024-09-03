import React from 'react';
import Feedback from './AdminFeedback';
import Branch from './AdminBranch'

const AdminOther = () => {
    return (
        <div>
            <Feedback />
            <Branch />
            
            
            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>

        </div>
    )
}

export default AdminOther;