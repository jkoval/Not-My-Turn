import React from 'react';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

class Home extends React.Component {

   constructor(props) {
      super(props);
   }

   render() {
      return (
         <Grid container justify="center" spacing={2}>
            <Grid item style={{marginTop:"25%"}}>
               <div>
                  <br />
                  <Typography color="primary" variant="h1">NOT MY TURN</Typography>

                  <br />
                  <Typography color="secondary" variant="h3">Find the next designated driver</Typography>
               </div>
            </Grid>
         </Grid>
      );
   }
}

export default Home;