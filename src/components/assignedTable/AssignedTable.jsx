import { useEffect, useState } from "react"
import "./assignedTable.scss"
import axios from "axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

const AssignedTable = () => {
    const [assignedEnquiries, setAssignedEnquiries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/enquiry/assigned");
                setAssignedEnquiries(response.data);
            } catch (error) {
                console.error("Error fetching assigned enquiries: ", error)
            }
        };
        fetchData();
    }, []);

    return(
        <TableContainer component={Paper} className="table">
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">Enquiry ID</TableCell>
                        <TableCell className="tableCell">Full Name</TableCell>
                        <TableCell className="tableCell">Email</TableCell>
                        <TableCell className="tableCell">Phone</TableCell>
                        <TableCell className="tableCell">Destination</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                        <TableCell className="tableCell">Assigned To</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {assignedEnquiries.map((enquiry) => (
                        <TableRow key={enquiry._id}>
                            <TableCell className="tableCell">{enquiry._id}</TableCell>
                            <TableCell className="tableCell">{enquiry.full_name}</TableCell>
                            <TableCell className="tableCell">{enquiry.email}</TableCell>
                            <TableCell className="tableCell">{enquiry.phone}</TableCell>
                            <TableCell className="tableCell">{enquiry.destinationName}</TableCell>
                            <TableCell className="tableCell" component={Link} to={`/enquiry/${enquiry._id}`} style={{textDecoration: "none"}}>
                                <span className={`status ${enquiry.status.toLowerCase()}`}>{enquiry.status}</span>
                            </TableCell>
                            <TableCell className="tableCell">{enquiry.assignedTo ? enquiry.assignedTo.full_name : "Not assigned"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AssignedTable;