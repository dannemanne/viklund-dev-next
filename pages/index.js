import React from 'react';

import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Item from "../components/Item";

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div style={{position: 'fixed', top: 0, left: 0, padding: '0.2rem'}}>
          <h1>My Dev Sandbox <small>by Daniel Viklund (@dannemanne)</small></h1>
        </div>
        
        <h2 style={{margin: '2rem 0 1rem'}}>My Projects</h2>
        <Grid>
          <Item href="https://heroic-heritage.viklund.dev" icon="far fa-hand-pointer" text="Click / Idle Game" />
        </Grid>

        <h2 style={{margin: '2rem 0 1rem'}}>Other Sites</h2>
        <Grid>
          <Item href="http://www.dannemanne.com" icon="fa fa-blog" text="My Blog" />
          <Item href="https://wiklund.dev" icon="fas fa-user-friends" text="My Brother.dev" />
        </Grid>
      </Layout>
    );
  }
}

export default Index;
