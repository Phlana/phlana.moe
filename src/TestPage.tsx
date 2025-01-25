import React from "react"
import { Link } from "react-router-dom";

const TestPage = ({ content }: { content: string }) => {
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
