import "./dataTable.scss";
import {DataGrid} from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import {useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const DataTable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);  
  const {data, loading, error} = useFetch(`/${path}`);
  const dataGridRef = useRef(null)
  
  useEffect(() => {
    setList(data)
  },[data]);
  
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    axios.get("/users/admins").then(response => {
      setAdmins(response.data)
    });
  }, []);

  const handleDelete = async(id) =>{
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter(item=> item._id !== id))
    } catch (error) {
      console.error("Error deleting item",error)
    }
  }

    const actionColumn=[
      {
        field:  'action',
        headerName: 'Action',
        width: 200,
        renderCell: (params) =>{
            return(
                <div className="cellAction">
                  <Link to={`/${path}/${params.row._id}`} style={{'textDecoration':'none'}}>
                    <div className="viewButton">View</div>
                  </Link>
                    <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
                </div>
            )
        }
      }
    ];

const [rowSelectionModel, setRowSelectionModel] = useState([]);
const handleRowSelectionModelChange = (newSelectionModel) => {
  setRowSelectionModel(newSelectionModel);
}
  const handleAssignTo = async () => {
    const selectedAdminId = document.querySelector('select').value;
    console.log("Selected Admin ID:",selectedAdminId); 
    console.log("Selected Enquiry IDs: ", rowSelectionModel);

    if(rowSelectionModel.length === 0){
      console.log("No enquiries selected for assignment.")
      return
    }

    try {
      const response = await axios.post('/enquiry/assignEnquiry', {enquiryIDs: rowSelectionModel, adminID: selectedAdminId});
      console.log("Enquiries assigned: ", response.data);
    } catch (error) {
      console.error("Error assigning enquiries",error)
    }
  }
    
  return (
    <div className="dataTable">
      <div className="dataTableTitle">
        <p>{path}</p>
        {path === "packages" && 
        (
        <Link to={`/${path}/new`} style={{'textDecoration':'none'}} className="link">
          Add new
        </Link>
        )}
      </div>
        <DataGrid
        className="dataGrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 20]} checkboxSelection getRowId={row=>row._id} 
        onRowSelectionModelChange={handleRowSelectionModelChange} rowSelectionModel={rowSelectionModel} ref={dataGridRef}
      />
      {path === "enquiry" && 
          <div className="assignTo">
          <button onClick={handleAssignTo}>Assign To</button>
          <select defaultValue="Select Admin to assign an enquiry">
            {admins.map(admin => (
              <option key={admin._id} value={admin._id}>{admin.full_name}</option>
            ))}
          </select>
        </div>
        }
    </div>
  )
}

export default DataTable;