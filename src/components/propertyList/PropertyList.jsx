import useFetch from "../../hooks/useFetch"
import "./propertyList.css"

const PropertyList = () => {

  const {data, loading, error} = useFetch("/hotels/countByType");

  const images = [
    "https://www.travelplusstyle.com/wp-content/gallery/cache/35109__940x_ritzparis-2016-lw0608_75329918_suite_coco_chanel_1.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAHajbnt_ZDTXufkMfH_v_2P1J04DPIZwcew&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUK08h5ABzLO9KnyB7amMA94dJvR2Ee7oVfA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1J3WWtCGZKHfWoeZT_Tov7E2lLehNcAW4A&usqp=CAU"
  ]

  return (
    <div className='pList'>
      {loading ? ("Loading... Please wait.") : (<>
      {data && images.map((img, i) =>(<div className="pListItem" key={i}>
        <img src= {img} alt="" className="pListImg" />
        <div className="pListTitles">
            <h1>{data[i]?.type}</h1>
            <h2>{data[i]?.count} {data[i]?.type}</h2>
        </div>
      </div>))}
      </>)}
    </div>
  )
}

export default PropertyList;