import React from 'react';

const Card = (props) => {
    return (
        <div className="card card-container">
            {props.children}
        </div>
    )
}

export default Card;