import "../css/Main.css";
function SubHeader({string}: {string: string}) {
    return (
        <div className="SubHeader">
            <h2>{string}</h2>
            <br></br>
        </div>
    )
}

export default SubHeader;
