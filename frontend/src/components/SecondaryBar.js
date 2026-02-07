import { NavLink } from "react-router-dom";
import "./SecondaryBar.css";

export default function SecondaryBar() {
  return (
    <div className="secondary-bar">
      <div className="secondary-wrap">
        <NavLink to="/current-affairs?type=daily">Daily</NavLink>
        <NavLink to="/current-affairs?type=monthly">Monthly</NavLink>
        <NavLink to="/current-affairs?type=upsc">UPSC</NavLink>
        <NavLink to="/current-affairs?type=ssc">SSC</NavLink>
        <NavLink to="/current-affairs?type=banking">Banking</NavLink>
        <NavLink to="/current-affairs?type=state-psc">State PSC</NavLink>
      </div>
    </div>
  );
}
