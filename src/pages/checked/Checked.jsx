import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Tables from "../../components/tables/Tables"
import "./checked.scss"

const Checked = () => {

    const statusFilter = ["Checked"]
  return (
    <div className="checked">
        <Sidebar />
        <div className="checkedContainer">
            <Navbar />
            <div className="list">
              <h3 className="listTitle">Checked</h3>
              <Tables statusFilter={statusFilter} />
            </div>
        </div>
    </div>
  )
}

export default Checked