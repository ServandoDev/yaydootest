import type { NextPage } from 'next';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Post: NextPage = () => {

    // constructor
    const router = useRouter();
    const user = router.query;
    let [posts, setPosts]: any = useState([]);
    const [loading, setLoading] = useState(false);

    // get album information of user
    const getPost = async () => {
        setLoading(true);
        await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json()).then((postData: any) => {
            setPosts(postData);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            // show error message
            alert('Error saving user information');
        });
    };

    // return random days to show in card
    const getRandomDays = () => {
        return (Math.floor(Math.random() * 10) + 1) + ' days ago';
    };

    // delete post funciton
    const deletePost = (post: any) => {
        let filteredArray = posts.filter((obj: any) => obj.id !== post.id);
        setPosts(filteredArray);
    };

    // runs on load
    useEffect(() => {
        getPost();
    }, []);

    return (
        <div>
            <main>
                <div className="d-flex justify-content-between align-items-center w-100 navbar-page p-2">
                    <Link href={'/list'}>
                        <button className='btn btn-sm d-flex align-content-center'>
                            <span className='material-icons'>
                                undo
                            </span>
                            Go back
                        </button>
                    </Link>
                    <Link href={'./'}>
                        <button className='btn btn-sm d-flex align-content-center'>
                            Logout
                            <span className='material-icons'>
                                logout
                            </span>
                        </button>
                    </Link>
                </div>
                <div className='container-fluid p-5'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12'>
                            <div className='card mt-2 border-0'>
                                <div className="card-body text-center">
                                    <img className='rounded' src={user.avatar?.toString()} alt="avatar" />
                                    <h5 className="card-title">
                                        {user.first_name + ' ' + user.last_name}
                                    </h5>
                                    <p className="card-text">
                                        {user.email}
                                    </p>
                                    <p className="card-text">
                                        Welcome to my profile, feel free to take a look to my posts and don't forget to leave a like or a comment!
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12 scroll-vertical'>
                            {
                                posts.map((post: any) =>
                                    <div key={post.id} className='row mt-2 border-bottom'>
                                        <div className='col-12'>
                                            <div className="card w-100 border-0">
                                                <div className="card-header d-flex justify-content-between border-0">
                                                    <h5>{user.first_name + " " + user.last_name + ' says:'}</h5>
                                                    <button type='button' className='btn btn-outline-danger'
                                                        onClick={() => deletePost(post)}>
                                                        <span className='material-icons'>
                                                            delete
                                                        </span>
                                                    </button>
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {post.title}
                                                    </h5>
                                                    <p className="card-text">
                                                        {post.body}
                                                    </p>
                                                    <div className="card-footer border-0 d-flex w-100 justify-content-between text-muted">
                                                        <p>{getRandomDays()}</p>
                                                        <div className='d-inline'>
                                                            <div className="badge rounded-pill text-bg-light d-flex align-items-center">
                                                                <span className='material-icons'>
                                                                    thumb_up
                                                                </span>23
                                                            </div>
                                                            <div className="mt-1 badge rounded-pill text-bg-light d-flex align-items-center">
                                                                <span className='material-icons'>
                                                                    question_answer
                                                                </span>12
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                {
                    loading ?
                        <div className='loading-page'>
                        </div>
                        : null
                }
            </main>
        </div>
    )
};

export default Post
