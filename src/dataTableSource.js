export const userColumns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
        field: "user", 
        headerName: "User",
        width: 150,
        renderCell: (params) => {
            return(
                <div className="cellWithImg">
                    {/* <img src={params.row.img || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5_Li-j89C5rMoQFaDGk3mzNEor47HdoFeCw&usqp=CAU"} alt= "" className="cellImg"/> */}
                    { params.row.username }
                </div>
            )
        }
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "phone",
        headerName:"Phone",
        width: 150,
    }
    // {
    //     field: "status",
    //     headerName: "Status",
    //     width: 150,
    //     renderCell: (params)=>{
    //         return(
    //             <div className={`cellWithStatus ${params.row.status}`}>
    //                 {params.row.status}
    //             </div>
    //         )
    //     }
    // }
    
];

export const packageColumns = [
    { field: '_id', headerName: 'ID', width: 230 },
    {
        field: "title",
        headerName: "Title",
        width: 230,
    },
    {
        field: "destinationName",
        headerName: "Place",
        width: 120,
    },
    {
        field: "duration",
        headerName: "Duration",
        width: 120,
    },
    {
        field: "packageType",
        headerName: "Type",
        width: 130,
    },
    {
        field: "price",
        headerName: "Price",
        width: 100,
    },
];

export const enquiryColumns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
        field: "full_name",
        headerName: "Full Name",
        width: 120,
    },
    {
        field: "phone",
        headerName:"Phone",
        width: 150,
    },
    {
        field: "email",
        headerName: "Email",
        width: 200,
    },
    {
        field: "dates",
        headerName: "Dates",
        width: 150,
    },
    {
        field: "destinationName",
        headerName: "Destination",
        width: 120,
    },
    {
        field: 'handledByName',
        headerName: 'Handled By',
        width: 120,
        valueGetter: (params) => params.row.handledByName || "Not Handled!"
    },
    {
        field: "status",
        headerName: "Status",
        width: 100,
        renderCell: (params) => {
          return(
            <div className={`status ${params.value?.toLowerCase()}`}>
              {params.value}
            </div>
          )
        }
      },   
];