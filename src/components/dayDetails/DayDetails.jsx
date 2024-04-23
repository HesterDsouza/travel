import {useState, useEffect} from 'react';
import "./dayDetails.css";
// import useFetch from '../../hooks/useFetch';
// import { useLocation } from 'react-router-dom';

const Collapsible = ({title, children, isOpen, toggleCollapse}) =>{
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleCollapse = () =>{
    //     setIsOpen(!isOpen)
    // };
    return(
        <div className="collapsible">
            <div className="collapsibleHeader" onClick={toggleCollapse}>
                {title}
                <span className={isOpen ? 'arrowIcon open' : 'arrowIcon'}>▼</span>
            </div>
            {isOpen && <div className="collapsibleContent">{children}</div>}
        </div>
    );
};

const DayDetails = ({dayData}) => {
  // const location = useLocation();
  // const id = location.pathname.split("/")[2];

  const [openIndex, setOpenIndex] = useState(-1);
  //const [dayData, setDayData] = useState([]);

  //const {data, loading, error} = useFetch(`/packages/find/${id}`);

  // useEffect(() =>{
  //   if(Array.isArray(data)){
  //     // const zippedData = data.map((day) => ({
  //     //   title: day.daytitle,
  //     //   desc: day.daydesc
  //     // }));
  //     setDayData(data);
  //   } 
  // }, [data]);

  const toggleCollapse = (index) => {
      setOpenIndex((prevIndex) => (prevIndex  === index ? -1 : index));
  };

  useEffect(() =>{
    setOpenIndex(-1);
  },[dayData]);

  if(!dayData || dayData.length === 0){
    return <div>No data available!</div>
  }
  
  return (
    <div className="dayDetails">
      {dayData.map((day, i) => (
          <Collapsible
            key={`collapsible - ${i}`}
            title={`Day ${i+1} - ${day.title}`}
            isOpen = {openIndex === i}
            toggleCollapse = {() => toggleCollapse(i)}>
            <div className="dayDesc">
                <ul>
                  {
                    Array.isArray(day.daydesc) ? (
                      day.daydesc.map((desc,ind) =>(
                        <li key={`daydesc-${i}-${ind}`}>{desc}</li>
                      ))
                    ) : (
                      <li>{day.daydesc}</li>
                    )}
                </ul>
            </div>
          </Collapsible>
        ))}
    </div>
  );
};

export default DayDetails;
