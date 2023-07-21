import React from 'react';


function Navbar() {
    const farmer = JSON.parse(localStorage.getItem('currentUser'));
    function logout() {
        localStorage.removeItem('currentUser');
        window.location.href = '/loginfarmer';
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="/home">Bluecore</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon" ><i class="fa fa-bars" style={{color : 'white'}}></i></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mr-5">
                        {farmer ? (
                            <>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class='fa fa-user'></i>{farmer.data.Name}
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="/update-farmer-details">Profile</a>
                                        <a class="dropdown-item" href="/home" onClick={logout}>Logout</a>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <li class="nav-item active">
                                    <a class="nav-link" href="/registerfarmer">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/loginfarmer">Login</a>
                                </li>
                            </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar