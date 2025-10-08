import axios from "axios";
import React, { useEffect } from "react"
import { Link } from "react-router-dom";

const TestPage = ({ content }: { content: string }) => {

    useEffect(() => {
        // try connecting to backend
        axios({
            method: 'get',
            url: 'http://api.phlana.moe/8000'
        }).then(response => {
            console.log('http://api.phlana.moe/8000', response);
        });

        axios({
            method: 'get',
            url: 'https://api.phlana.moe/8000'
        }).then(response => {
            console.log('https://api.phlana.moe/8000', response);
        });

        axios({
            method: 'get',
            url: 'http://api.phlana.moe'
        }).then(response => {
            console.log('http://api.phlana.moe', response);
        });

        axios({
            method: 'get',
            url: 'https://api.phlana.moe'
        }).then(response => {
            console.log('https://api.phlana.moe', response);
        });

        axios({
            method: 'get',
            url: 'http://api.phlana.moe/8000/'
        }).then(response => {
            console.log('http://api.phlana.moe/8000/', response);
        });

        axios({
            method: 'get',
            url: 'https://api.phlana.moe/8000/'
        }).then(response => {
            console.log('https://api.phlana.moe/8000/', response);
        });

        axios({
            method: 'get',
            url: 'http://api.phlana.moe/'
        }).then(response => {
            console.log('http://api.phlana.moe/', response);
        });

        axios({
            url: 'https://api.phlana.moe/'
        }).then(response => {
            console.log('https://api.phlana.moe/', response);
        });

        axios({
            url: 'http://api.phlana.moe/8000'
        }).then(response => {
            console.log('http://api.phlana.moe/8000', response);
        });

        axios({
            url: 'https://api.phlana.moe/8000'
        }).then(response => {
            console.log('https://api.phlana.moe/8000', response);
        });

        axios({
            url: 'http://api.phlana.moe'
        }).then(response => {
            console.log('http://api.phlana.moe', response);
        });

        axios({
            url: 'https://api.phlana.moe'
        }).then(response => {
            console.log('https://api.phlana.moe', response);
        });

        axios({
            url: 'http://api.phlana.moe/8000/'
        }).then(response => {
            console.log('http://api.phlana.moe/8000/', response);
        });

        axios({
            url: 'https://api.phlana.moe/8000/'
        }).then(response => {
            console.log('https://api.phlana.moe/8000/', response);
        });

        axios({
            url: 'http://api.phlana.moe/'
        }).then(response => {
            console.log('http://api.phlana.moe/', response);
        });

        axios({
            url: 'https://api.phlana.moe/'
        }).then(response => {
            console.log('https://api.phlana.moe/', response);
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
