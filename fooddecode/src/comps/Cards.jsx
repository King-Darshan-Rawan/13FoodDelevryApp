import React from 'react'
// foodOption = {filteredItem.options}
export const Cards = (props) => {

  let options = props.foodOption;
  let foodDeleverOptions = Object.keys(options)

  return (
    <div>
        <div className="card mt-3 shadow bg-slate-500" style={{width: "100%", maxWidth: "18rem", minWidth: "13rem"}}>
          <img src={props.foodimage} className="card-img-top" style={{"maxHeight": "250px", "minHeight": "249px", "objectFit": 'cover'}} alt="..." />
          <div className="card-body">
            <h5 className="card-title ">{props.foodname}</h5>
            <p className="card-text">
              {props.foodDiscription}
            </p>
            <div className="container w-100">
                <select name="" className="m-2 h-100 w-40 bg-success rounded" id="">
                    {Array.from(Array(6), (e,i)=>{
                        return(
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        )
                    })}
                </select>
                <select  className="m-2 h-100 w-50 bg-success rounded" id="">
                    {foodDeleverOptions.map((data)=> {
                      return <option key={data} value={data}>{data}</option>
                    })}
                </select>
                <div className="d-inline h-100 fs-5">
                    Total Price
                </div>
            </div>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
  )
}
