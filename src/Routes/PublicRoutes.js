import { Header, Footer } from "Component/index";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { dataRouters } from "./Data";
// import {CabinEntryForm} from '../Pages/index'

function Routers() {
  return (
    <Switch>
      {/* <div class="bgroute" style={{backgroundColor:'#E4E4E4', flex:1, height:'100%'}}>
      </div> */}
      {dataRouters.map((item, index) => (
        <Route key={index} exact path={item.path} component={item.page} />
      ))}
      {/* <Route path='/app/public/operational/cabinEntry' component={CabinEntryForm} /> */}
    </Switch>
  );
}

export default Routers;
