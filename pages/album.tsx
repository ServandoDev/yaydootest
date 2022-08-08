import type { NextPage } from 'next';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Album: NextPage = () => {

    // constructor
    const router = useRouter();
    const user = router.query;
    const [albums, setAlbums]: any = useState([]);
    const [loading, setLoading] = useState(false);

    // get album information of user
    const getAlbum = async () => {
        setLoading(true);
        await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response.json()).then((albumData: any) => {
            setAlbums(albumData);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            // show error message
            alert('Error saving user information');
        });
    };

    // runs on load
    useEffect(() => {
        getAlbum();
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
                        <div className='col-12'>
                            <h3>Album of {user.first_name + ' ' + user.last_name}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {
                            albums.map((album: any) =>
                                <div key={album.id} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-2 d-flex align-items-stretch'>
                                    <div className="card w-100">
                                        <img src="/notFound.png" className="card-img-top" alt={album.title} />
                                        <div className="card-body">
                                            <p className="card-text">
                                                {album.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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

export default Album
