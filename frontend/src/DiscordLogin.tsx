import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

type UserInfoType = {
    username: string;
    avatar: string;
    valid: boolean;
};

const DiscordLogin = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfoType>();

    useEffect(() => {
        if (code) return;
        const responseCode = searchParams.get('code') || '';
        setCode(responseCode);
        axios({
            method: 'get',
            url: '/getDiscordInformation?code=' + responseCode,
        }).then(response => {
            // console.log(response.data);
            setUserInfo(response.data);
        })
    }, []);

    return (
        <div>
            { userInfo && <div>
                <div>
                    you have been successfully logged in
                </div>
                <div>
                    your code is {code}
                </div>
                <div>
                    hi { userInfo.username }
                </div>
                <div>
                    <img src={userInfo.avatar}></img>
                </div>
                <div>
                    valid: { userInfo.valid }
                </div>
                <Link to={"/quotelist"}>go to quote list</Link>
            </div> }
            { !userInfo && <div>
                <div>
                    failed to log in
                </div>
            </div>}
        </div>
    );
};

export default DiscordLogin;