import React from 'react';

function SubList() {
    return (
        <div className="sublist">
            <ul>
                <li>
                    <img className="sublist-image" src="../assets/profile.jpg" alt="BC_Logo" />
                    <span>Stavanger</span>
                </li>
                <li>
                    <img className="sublist-image" src="../assets/profile.jpg" alt="BC_Logo" />
                    <span>Oslo</span>
                </li>
                <li>
                    <img className="sublist-image" src="../assets/profile.jpg" alt="BC_Logo" />
                    <span>Bergen</span>
                </li>
                {/* {props.subList.map((sub) => <li key={sub}>{sub}</li>)} */}
            </ul>
        </div>
    );
}

export default SubList;