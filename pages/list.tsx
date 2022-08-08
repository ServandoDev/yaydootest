import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

const List: NextPage = () => {

    // constructor
    const [users, setUsers]: any = useState([]);
    const [user, setUser]: any = useState(null);
    const router = useRouter();
    const email = router.query.email;

    // flags
    const [error, setError] = useState(false);

    // fetch api get users
    const getUsers = async () => {
        await fetch(`https://reqres.in/api/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(response => response.json()).then((data: any) => {
            setUsers(data.data);
        }).catch(() => {
            setError(true);
        });
    }

    // save edited user function
    const save = async (event: any) => {
        // prevent form default action
        event.preventDefault();
        const userChange = {
            firstName: event.target.firstName.value,
            lastName: event.target.lastName.value,
            job: event.target.job.value
        };
        // fetch api post login
        await fetch(`https://reqres.in/api/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userChange)
        }).then(() => {
            const userIndex = users.findIndex((userArray: any) => userArray.id === user.id);
            const usersEdited = users;
            usersEdited[userIndex].first_name = event.target.firstName.value;
            usersEdited[userIndex].last_name = event.target.lastName.value;
            usersEdited[userIndex].job = event.target.job.value;
            setUsers([...usersEdited]);
        }).catch(() => {
            // show error message
            alert('Error saving user information');
        });
    }

    // calls function on load
    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <main>
                <div className="d-flex justify-content-end align-items-center w-100 navbar-page p-2">
                    <Link href={'./'}>
                        <button className='btn btn-sm d-flex align-content-center'>
                            Logout
                            <span className='material-icons'>
                                logout
                            </span>
                        </button>
                    </Link>
                </div>
                {
                    error ?
                        <div className='row p-5'>
                            <div className="alert alert-danger" role="alert">
                                An error occurred while trying to get the list of users.
                            </div>
                        </div>
                        : null
                }
                <div className='container-fluid p-5'>
                    <div className='row'>
                        <div className='col-12'>
                            <h5>Welcome back {email}!</h5>
                        </div>
                    </div>
                    <div className='row border p-2'>
                        <div className='col-12'>
                            <h3>Friends</h3>
                        </div>
                        {
                            users.map((user: any) =>
                                <div key={user.id} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-2 d-flex align-items-stretch">
                                    <div className="card w-100 card-selection">
                                        <div className='card-img-wrap' onClick={() => setUser(user)}
                                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                            <img className='card-img-top cursor-pointer' src={user.avatar} alt="avatar" />
                                        </div>
                                        <div className="card-body cursor-pointer" onClick={() => setUser(user)}
                                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                                            <h5 className="card-title">
                                                {user.first_name + ' ' + user.last_name}
                                            </h5>
                                            <p>
                                                {user.email}
                                            </p>
                                            <p>
                                                {user.job}
                                            </p>
                                        </div>
                                        <div className="card-body d-flex justify-content-between align-items-end">
                                            <Link href={{
                                                pathname: "/album",
                                                query: user
                                            }}>
                                                <button className='btn btn-primary btn-card'>Album</button>
                                            </Link>
                                            <Link href={{
                                                pathname: "/post",
                                                query: user
                                            }}>
                                                <button className='btn btn-success btn-card'>Post</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className='row mt-2 mb-2 border'>
                        <div className='col-12'>
                            <h3>Last updates</h3>
                        </div>
                        <div className='col-12'>
                            <div className="list-group border-0">
                                <a href="#" className="list-group-item border-0" aria-current="true">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Friend name 1</h5>
                                        <small>3 days ago</small>
                                    </div>
                                    <p className="mb-1">Do u see the last movie of thor?</p>
                                    <small>Click for more</small>
                                </a>
                                <a href="#" className="list-group-item border-0">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Friend name 2</h5>
                                        <small className="text-muted">5 days ago</small>
                                    </div>
                                    <p className="mb-1">Eating at Sierra Madre Brewing</p>
                                    <small>Click for more</small>
                                </a>
                                <a href="#" className="list-group-item border-0">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">Friend name 3</h5>
                                        <small className="text-muted">12 days ago</small>
                                    </div>
                                    <p className="mb-1">Someone to go out tonight?</p>
                                    <small>Click for more</small>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="true" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Edit user</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <form onSubmit={save}>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input required type="text" className="form-control" id="firstName" name='firstName' placeholder="First name"></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input required type="text" className="form-control" id="lastName" name='lastName' placeholder="Last name"></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="job" className="form-label">Job</label>
                                    <input required type="text" className="form-control" id="job" name='job' placeholder="Job"></input>
                                </div>
                                <div className='mb-3 w-100 d-flex justify-content-center'>
                                    <button type='submit' className='btn btn-primary w-100'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default List
