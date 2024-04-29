import { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

type UserInfoType = {
    username: string;
    avatar: string;
    valid: boolean;
};

type DiscordValidationType = {
    token: string;
    username: string;
    avatar: string;
    valid: boolean;
    profile: any;
}

const DiscordLogin = () => {
    const { setToken } = useContext(AuthContext);
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
            var { token, username, avatar, valid, profile } = response.data;
            console.log(response.data);

            setToken(token);            
            setUserInfo({ username, avatar, valid });
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
                    { userInfo.valid ? "valid" : "invalid" }
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