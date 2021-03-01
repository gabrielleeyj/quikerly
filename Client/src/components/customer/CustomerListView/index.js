import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  
} from '@material-ui/core';
import Page from '../../Page/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import GeneralToolbar from '../../GeneralToolbar/GeneralToolbar';
import { connect } from 'react-redux'
import { getCustomers } from '../../../Store/actions/customerActions'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
  },
  top: {
    paddingTop: theme.spacing(7)
  }

}));

const CustomerListView = ({ customersList, getCustomers, orders }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('')

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    getCustomers()
  }, [])
  let customers = []
  if (customersList) {
    customers = customersList.filter(customer => customer.userEmail.includes(search))
  }
  return (
    <Page
      className={classes.root}
    >
      <GeneralToolbar name='Customers' >

        <Container className={classes.top} maxWidth={false}>
          <Toolbar handleChange={handleChange} />
          <Box mt={3}>
            <Results customers={customers} orders={orders} />
          </Box>
        </Container>

      </GeneralToolbar>
    </Page>
  );
};


const mapStateToProps = (state) => {
  return {
    customersList: state.customer.customers,
    orders: state.order.orders
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCustomers: () => dispatch(getCustomers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerListView);