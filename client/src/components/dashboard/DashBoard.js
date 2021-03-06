import React, { useEffect, useState } from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Upcoming from "../upcoming_matches/Upcoming";
import Polls from "../live-polls/Polls";
import AllPolls from "../poll_winner/AllPolls";
import Bets from "../AllBets/Bets";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: { width: "1100px" },
  listItemText: {
    fontSize: "17px",
    fontWeight: "bold", //Insert your required size
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: { marginTop: "5.8rem" },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function DashBoard(props, userdata) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [RenderComponent, SetRenderComponent] = useState(<Upcoming />);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dashboard = [
    {
      name: "DashBoard",
      component: <Upcoming />,
    },
    {
      name: "Live Polls",
      component: <Polls />,
    },
    {
      name: "Your Polls",
      component: <AllPolls />,
    },
    {
      name: "Bets placed",
      component: <Bets />,
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {}, [RenderComponent]);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider style={{ width: "100%" }} />
      <List>
        {dashboard.map((text, index) => (
          <ListItem button key={text.name}>
            <ListItemIcon></ListItemIcon>
            <ListItemText
              primary={text.name}
              classes={{ primary: classes.listItemText }}
              onClick={() => SetRenderComponent(text.component)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
  console.log(RenderComponent, userdata);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <div>{RenderComponent}</div>
      {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
    </div>
  );
}
const mapStateToProps = ({ user }) => ({
  userdata: user.userdata,
});
export default withRouter(connect(mapStateToProps)(DashBoard));
