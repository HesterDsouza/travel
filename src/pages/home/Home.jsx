import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Tables from "../../components/tables/Tables";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = () => {

  const statusFilter = ["Pending","Checked"];

  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="users" />
            <Widget type="packages" />
            <Widget type="enquiries" />
          </div>
          <div className="listContainer">
            <div className="listTitle">Enquiries</div>
            <Tables statusFilter={statusFilter}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
