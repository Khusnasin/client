import React from 'react';


function Navbar() {
    const farmer = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/loginfarmer';
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <a className="navbar-brand" href="/home">Bluecore</a>
                <button 
                className="navbar-toggler"
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" >
                    <i className="fa fa-bars" style={{color: "white", marginTop: '5px'}}></i>
                </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-5">
                        {farmer ? (
                            <>
                                <div className="dropdown">
                                    <button 
                                    className="btn btn-secondary dropdown-toggle" 
                                    type="button" 
                                    id="dropdownMenuButton" 
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false">
                                    <i class='fa fa-user' style={{marginRight:'5px'}}></i>
                                     {farmer.data?.Name }
                                    
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="dropdown-item" href="/farmer-profile/:farmerid">Profile</a>
                                        <a className="dropdown-item" href="/home" onClick={logout}>Logout</a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/registerfarmer">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/loginfarmer">Login</a>
                                </li>
                            </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;