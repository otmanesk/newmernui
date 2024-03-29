import * as React from "react";
import {
  Theme,
  withStyles,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Grid,
  Typography
} from "@material-ui/core";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer
} from "recharts";
const classNames = require("classnames");
import GroupIcon from "@material-ui/icons/Group";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";
import BusinessIcon from "@material-ui/icons/BusinessCenter";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import * as moment from "moment";

import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const GET_USERS = gql`
  {
    allUsers {
      id
      name
      status
      agency
      gender
      birthday
    }
  }
`;
let id = 0;
function createData(
  name: string,
  status: string,
  agency: string,
  gender: string,
  birthday: string
) {
  id += 1;
  return { id, name, status, agency, gender, birthday };
}

interface IDashboardProps {
  fetchUsers: (context?: any) => void;
  users: any;
  materialChartData: any[];
  classes?: any;
  theme?: any;
  children?: any;
}

interface IPageState {
  usersTablePage?: number;
  usersTableRowsPerPage: number;
}

class HomePage extends React.Component<IDashboardProps, IPageState> {
  public state: IPageState = {
    usersTablePage: 0,
    usersTableRowsPerPage: 5
  };

  private handleChangeUsersPage = (event: any, page: number) => {
    console.log(event);
    this.setState({ usersTablePage: page });
  };

  private handleChangeTableRowsPerPage = (event: any) => {
    this.setState({ usersTableRowsPerPage: event.target.value });
  };

  private renderUsers(): JSX.Element {
    const { users, classes } = this.props;
    if (!users) {
      return null;
    }

    return (
      <ApolloProvider client={client}>
        <div>
          <Query query={GET_USERS}>
            {({ loading, error, data }) => {
              if (loading) {
                return "Loading...";
              }
              if (error) {
                return `Error! ${error.message}`;
              }
              const datas = data.allUsers.map(
                (user: {
                  name: string;
                  status: string;
                  agency: string;
                  gender: string;
                  birthday: string;
                }) =>
                  createData(
                    user.name,
                    user.status,
                    user.agency,
                    user.gender,
                    moment(new Date(user.birthday)).format("DD-MM-YYYY")
                  )
              );
              return (
                <Paper className={classNames(classes.paper, classes.users)}>
                  <h3 className={classes.sectionTitle}>Customers</h3>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell className={classes.tableCell}>
                          Status
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          Agency
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          Gender
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          birthday
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {datas.map(
                        (
                          n: {
                            id: React.ReactNode;
                            name: React.ReactNode;
                            status: React.ReactNode;
                            agency: React.ReactNode;
                            gender: React.ReactNode;
                            birthday: React.ReactNode;
                          },
                          index: number
                        ) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className={classes.tableCell}>
                                {n.id}
                              </TableCell>
                              <TableCell
                                component="th"
                                scope="row"
                                className={classes.TableCell}
                              >
                                {n.name}
                              </TableCell>

                              <TableCell className={classes.tableCell}>
                                {n.status}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {n.agency}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {n.gender}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {n.birthday}
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    component="div"
                    count={users.items.length}
                    rowsPerPage={this.state.usersTableRowsPerPage}
                    page={this.state.usersTablePage}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangeUsersPage}
                    onChangeRowsPerPage={this.handleChangeTableRowsPerPage}
                  />
                </Paper>
              );
            }}
          </Query>
        </div>
      </ApolloProvider>
    );
  }

  private renderRadialBarChart(): JSX.Element {
    return (
      <Paper className={this.props.classes.paper}>
        <h3 className={this.props.classes.sectionTitle}>Material Inventory</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={this.props.materialChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              label={true}
              fill="#8884d8"
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    );
  }

  private renderBarChart(): JSX.Element {
    return (
      <Paper className={this.props.classes.paper}>
        <h3 className={this.props.classes.sectionTitle}>Material Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={this.props.materialChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    );
  }

  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container={true} spacing={24}>
          <Grid item={true} lg={3} xs={12} sm={6}>
            <Paper className={classNames(classes.paper, classes.headerTiles)}>
              <GroupIcon className={classes.headerTileIcon} />
              <Typography className={classes.tileText}>
                {" "}
                {this.props.users.items.length} Customers
              </Typography>
            </Paper>
          </Grid>
          <Grid item={true} lg={3} xs={12} sm={6}>
            <Paper className={classNames(classes.paper, classes.headerTiles)}>
              <MailIcon className={classes.headerTileIcon} />
              <Typography className={classes.tileText}>Inbox</Typography>
            </Paper>
          </Grid>
          <Grid item={true} lg={3} xs={12} sm={6}>
            <Paper className={classNames(classes.paper, classes.headerTiles)}>
              <BusinessIcon className={classes.headerTileIcon} />
              <Typography className={classes.tileText}>Purchases</Typography>
            </Paper>
          </Grid>
          <Grid item={true} lg={3} xs={12} sm={6}>
            <Paper className={classNames(classes.paper, classes.headerTiles)}>
              <SettingsIcon className={classes.headerTileIcon} />
              <Typography className={classes.tileText}>Settings</Typography>
            </Paper>
          </Grid>
          <Grid item={true} xs={12} md={6}>
            {this.renderBarChart()}
          </Grid>
          <Grid item={true} xs={12} md={6}>
            {this.renderRadialBarChart()}
          </Grid>
          <Grid item={true} xs={12}>
            {this.renderUsers()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 24
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  headerTiles: {
    overflowX: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRight: `5px solid ${theme.palette.secondary.main}`
  },
  headerTileIcon: {
    fontSize: 40,
    color: theme.palette.primary.dark,
    paddingRight: 5
  },
  tileText: {
    fontSize: 20,
    color: theme.palette.grey["900"]
  },
  sectionTitle: {
    paddingLeft: theme.spacing.unit * 2,
    color: theme.palette.grey["900"]
  },
  users: {
    marginBottom: 24,
    overflowX: "scroll"
  },
  chart: {
    width: "100%"
  }
});

export default withStyles(styles as any)(HomePage as any) as any;
