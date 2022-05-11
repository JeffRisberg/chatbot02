import React, {useEffect, useState} from "react";
import { useParams} from "react-router-dom";
import axios from "axios";
import './HRTeamDashboard.css';

function HRTeamDashboard() {
  let { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios("http://3.216.97.226:5001/api/teams/" + id);
      setData(result.data[0]);
    })();
  }, [id]);

  return (
    <div className="HTeamDashboard">

      <div className="row">
        <div className="col-md-12">
          Team: {data.name}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          Courses Taken
          [chart]
        </div>
        <div className="col-md-4">
          Top Courses Taken
          <p>1. Database</p>
          <p>2. Machine Learning</p>
          <p>3. Team Management</p>
        </div>
      </div>

    </div>
  )
}

export default HRTeamDashboard;
