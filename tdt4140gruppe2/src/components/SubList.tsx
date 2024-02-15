import React from 'react';

function SubList() {
    return (
        <div>
            <ul>
                <li>
                    <img src="../assets/profile.jpg" width={25} height={25} alt="BC_Logo" />
                    <span>Stavanger</span>
                </li>
                <li>
                    <img src="../assets/profile.jpg" width={25} height={25} alt="BC_Logo" />
                    <span>Oslo</span>
                </li>
                <li>
                    <img src="../assets/profile.jpg" width={25} height={25} alt="BC_Logo" />
                    <span>Bergen</span>
                </li>
                {/* {props.subList.map((sub) => <li key={sub}>{sub}</li>)} */}
            </ul>
        </div>
    );
}

export default SubList;