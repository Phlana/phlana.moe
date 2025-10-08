import axios from "axios";
import React, { useEffect } from "react"
import { Link } from "react-router-dom";
import { apiUrl } from "./Constants";

const TestPage = ({ content }: { content: string }) => {

    useEffect(() => {
        // try connecting to backend
        axios({
            method: 'get',
            url: apiUrl
        }).then(response => {
            console.log(apiUrl, response);
        });

        axios({
            method: 'get',
            url: apiUrl + '/api'
        }).then(response => {
            console.log(apiUrl + '/api', response);
        });

        axios({
            method: 'get',
            url: apiUrl + '/api/discordValidate'
        }).then(response => {
            console.log(apiUrl + '/api/discordValidate', response);
        });

        axios({
            method: 'get',
            url: apiUrl + '/discordValidate'
        }).then(response => {
            console.log(apiUrl + '/discordValidate', response);
        });
    }, []);

    return (
        <React.Fragment>
            <div className='center-text'>
                <div>
                    this is a test page
                </div>
                <div>
                    {content}
                </div>
                <div>
                    <Link to={`/`}>home</Link>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TestPage;
