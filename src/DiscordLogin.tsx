import { useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './DiscordLogin.css';
import { Spinner } from 'react-bootstrap';

type DiscordValidationType = {
    token: string;
    username: string;
    avatar: string;
    profile: any;
}

const DiscordLogin = () => {
    const { token, setToken, loading, userData, setUserData } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState<string>();
    const [profile, setProfile] = useState<any>();

    useEffect(() => console.log(loading), [loading]);

    useEffect(() => {
        if (code) return;
        const responseCode = searchParams.get('code') || '';
        setCode(responseCode);
        axios<DiscordValidationType>({
            method: 'get',
            url: '/api/discordValidate?code=' + responseCode,
        }).then(response => {
            var { token: t, username, avatar, profile } = response.data;
            console.log(response.data);
            localStorage.setItem('token', t);
            setToken(t);
            setUserData({ username, avatar });
            setProfile(profile);
        }).catch((reason) => {
            console.log('could not validate', reason);
            setUserData({ username: '', avatar: '' });
        });

        useEffect(() => {
            // try connecting to backend
            axios({
                method: 'get',
                url: 'http://75.158.147.208/8000'
            }).then(response => {
                console.log('http://75.158.147.208/8000', response);
            });
    
            axios({
                method: 'get',
                url: 'https://75.158.147.208/8000'
            }).then(response => {
                console.log('https://75.158.147.208/8000', response);
            });
        }, []);
    }, []);

    return (
        <div className='login page justify-content-center align-items-center'>
            {/* loading */}
            { loading && (
                <div className='center-text'>
                    <div className='mb-5'><Spinner /></div>
                    <div>logging in</div>
                </div>
            )}
            {/* success */}
            { !loading && userData.username && userData.avatar && (
                <div className='center-text'>
                    <div className='mb-5'><img src={userData.avatar} style={{ borderRadius: '50%' }} /></div>
                    <div className='mb-3'>hi { userData.username }</div>
                    <div className='mb-3'><Link className='btn btn-primary' to={'/quotelist'}>go to quote list</Link></div>
                    <div><Link to={'/'}>back</Link></div>
                </div> 
            )}
            {/* failure */}
            { !loading && !(userData.username || userData.avatar) && (
                <div className='center-text'>
                    <div className='mb-3'>failed to log in</div>
                    <div><Link to={'/'}>home</Link></div>
                </div> 
            )}
        </div>
    );
};

export default DiscordLogin;
