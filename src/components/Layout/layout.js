import React, {Component} from 'react';
import AuxNew from '../../hoc/AuxNew'
import classes from './layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        ShowSideDrawer: false
    }

    sideDrawerClosedHandler =() => {
        this.setState({ShowSideDrawer:false});
        
    }

    sideDrawerToggleHandler =() =>
    {
        this.setState((prevState) => {
            return(
                {ShowSideDrawer: !prevState.ShowSideDrawer}
            );
        }
               );
    }

    render(){ 
        return(
            <AuxNew >
            {/* <div>Toolbar ,SideDrawer, Backdrop   </div> */}
            <ToolBar  drawerToggleClicked = {this.sideDrawerToggleHandler}/>
            <SideDrawer open ={this.state.ShowSideDrawer}
                         closed ={this.sideDrawerClosedHandler}/>
            <main className = {classes.Content }>
                {this.props.children}
            </main>
            </AuxNew>

        )
    }
}
export default Layout; 