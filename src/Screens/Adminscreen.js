/*import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import FarmersData from './components/FarmersData';
import AddFarmers from './components/AddFarmers';
import Users from './components/Users';

function AdminScreen() {
    const isLoggedIn = !!localStorage.getItem('token');

    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    }

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/admin/farmers">Farmers Data</Link>
                        </li>
                        <li>
                            <Link to="/admin/add-farmer">Add Farmer</Link>
                        </li>
                        <li>
                            <Link to="/admin/users">Users</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/adminfarmers"  exact Component={FarmersData} />
                <Route path="/admin/add-farmer" exact Component={AddFarmers} />
                <Route path="/admin/users" exact Component={Users} />
            </div>
        </Router>
    );
}

export default AdminScreen;
*/
