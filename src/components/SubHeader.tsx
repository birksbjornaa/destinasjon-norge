//header that can be changes in home.tsx

// const SubHeader = () => {
//     return (
//         <div>
//             <h2>SubHeader</h2>
//         </div>
//     )
// }

function SubHeader({string}: {string: string}) {
    return (
        <div>
            <h2>{string}</h2>
            <br></br>
        </div>
    )
}

export default SubHeader;
