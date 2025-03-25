import axios from "axios";
import React, { useEffect } from "react"
import { Link } from "react-router-dom";

const TestPage = ({ content }: { content: string }) => {

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
