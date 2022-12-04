import React from 'react';
import {NavLink} from "react-router-dom"

const ErrorPage = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>We are sorry, page not found!</h2>
                    <p className="mb-5">
                        THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED , HAD IT'S NAME CHANGED OR IS TEMPORARILY UNAVAILABLE
                    </p>
                    <NavLink to="/">Back To Homepage</NavLink>
                </div>
            </div>
        </>
    )
}

export default ErrorPage
