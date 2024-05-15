import { DataContext } from '@/app/layout';
import React, { useContext } from 'react'

const page = () => {
    const { user, setUser } = useContext(DataContext);

  return (
    <div className="h-screen w-screen pt-20">
      {issues.map(issue =>{ 
        return(
            <div>
                {issue.status == false &&
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                        <h2 className="card-title">Card title!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        {/* <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div> */}
                        </div>
                    </div>
                }
            </div>    
          
        )
      })}
      
    </div>
  )
}

export default page
