import React from 'react';
import { Link } from 'react-router-dom';

export default function Notfound() {
    return (
        <div className='not-found'>
            <h1>🤖</h1>
            <h2 className='blue-cl'>Sorry</h2>
            <p>I am Still working on it </p>
            <Link className='btn btn-primary' to='/'>Back to homepage</Link>
        </div>
    )
}
