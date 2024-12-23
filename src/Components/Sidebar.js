import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [showSubSidebar, setShowSubSidebar] = useState(false);

    const toggleSubSidebar = () => {
        setShowSubSidebar(!showSubSidebar);
    };

    return (
        <nav className="Sidebar">
            {/* <h1>IQAC</h1> */}
            <h2>Main Menu</h2>
            <ul>
                <li><Link to="/department">Department Activity</Link></li>
                <li><Link to="/student">Student Activity</Link></li>
                <li><Link to="/faculty">Faculty Activity</Link></li>
                <li onClick={toggleSubSidebar}>
                    Institute Activity
                    {showSubSidebar && (
                        <ul className="SubSidebar">
                            <li><Link to="/institute/society">Professional Societies</Link></li>
                            <li><Link to="/institute/placement">Placement & Training Cell</Link></li> 
                            {/* <li><Link to="/institute/research">Research & Development Cell</Link></li>
                            <li><Link to="/institute/alumni">Alumni Cell</Link></li> 
                            <li><Link to="/institute/meeting"> Meeting Details</Link></li>  */}
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
