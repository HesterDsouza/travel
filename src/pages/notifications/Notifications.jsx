import "./notifications.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from "../../components/navbar/Navbar"
import Tables from "../../components/tables/Tables"

const Notifications = () => {

  const statusFilter = ["Pending"];

  return (
    <div className="notifications">
      <Sidebar />
      <div className="notificationsContainer">
        <Navbar />
        <div className="list">
          <h3 className="listTitle">Notifications</h3>
          <Tables statusFilter={statusFilter}/>
        </div>
      </div>
    </div>
  )
}

export default Notifications