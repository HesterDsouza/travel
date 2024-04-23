import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Save time, Save Money!</h1>
      <span className="mailDesc">Sign Up to join our community!</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your E-Mail"/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList
