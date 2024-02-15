const MainText = () => {
    return (
          <>
          <div>    
            {/* <img src={profile} alt="profile" /> */}
            <h1>Velkommen til hjemmesiden</h1>
          </div>
            <div>
              <form>
                <label>Enter Message</label>
                <input type="text" />
                <button type="submit" >Save</button>
              </form>
            </div>
          </>
        )
}

export default MainText;