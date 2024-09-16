import React from 'react'

export const Cards = () => {
  return (
    <div>
        <div className="card mt-3 shadow bg-slate-500" style={{width: "100%", maxWidth: "18rem", minWidth: "13rem"}}>
          <img src="./../../public/photos/photo-1414235077428-338989a2e8c0.jpeg" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title ">Card title</h5>
            <p className="card-text">
              text something
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
                    <option value="half">Half</option>
                    <option value="full">Full</option>
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
