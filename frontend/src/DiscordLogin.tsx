import { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

type UserInfoType = {
    username: string;
    avatar: string;
};

type DiscordValidationType = {
    token: string;
    username: string;
    avatar: string;
    profile: any;
}

const DiscordLogin = () => {
    const { token, setToken } = useContext(AuthContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState<string>();
    const [userInfo, setUserInfo] = useState<UserInfoType>();
    const [profile, setProfile] = useState<any>();

    useEffect(() => {
        if (code) return;
        const responseCode = searchParams.get('code') || '';
        setCode(responseCode);
        axios<DiscordValidationType>({
            method: 'get',
            url: '/api/discordValidate?code=' + responseCode,
        }).then(response => {
            var { token, username, avatar, profile } = response.data;
            console.log(response.data);
            localStorage.setItem('token', token);
            setToken(token);
            setUserInfo({ username, avatar });
            setProfile(profile);
        })
    }, []);

    return (
        <div>
            { userInfo && <div>
                <div>
                    <img src={userInfo.avatar}></img>
                </div>
                <div>
                    hi { userInfo.username }
                </div>
                <div>
                    { token ? "valid" : "invalid" }
                </div>
                <div>
                    <Link to={"/quotelist"}>go to quote list</Link>
                </div>
                <div>
                    <Link to={"/"}>home</Link>
                </div>
            </div> }
            { !userInfo && <div>
                <div>
                    failed to log in
                </div>
                <div>
                    <Link to={"/"}>home</Link>
                </div>
            </div>}
        </div>
    );
};

export default DiscordLogin;