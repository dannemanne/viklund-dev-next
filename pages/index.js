import React, { Component } from 'react';

import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Item from "../components/Item";
import StatusItem from "../components/StatusItem";

class Index extends Component {
  render() {
    return (
      <Layout>
        <div style={{position: 'fixed', top: 0, left: 0, padding: '0.2rem'}}>
          <h1>My Dev Sandbox <small>by Daniel Viklund (@dannemanne)</small></h1>
        </div>
        
        <h2 style={{margin: '2rem 0 1rem'}}>My Projects</h2>
        <Grid>
        <Item href="https://dannemanne.pythonanywhere.com" icon="fas fa-envelope-square" text="DMARC Processor" />
          <Item href="https://heroic-heritage.viklund.dev" icon="far fa-hand-pointer" text="Click / Idle Game" />
        </Grid>

        <h2 style={{margin: '2rem 0 1rem'}}>Server Status</h2>
        <Grid>
          <StatusItem
            imageSrc={"/terraria.svg"}
            imageWhite={true}
            text="Terraria"
            url="https://fwgp5pffti.execute-api.ap-east-1.amazonaws.com/default/getServerStatus"
          />
        </Grid>

        <h2 style={{margin: '2rem 0 1rem'}}>Other Sites</h2>
        <Grid>
          <Item href="https://dannemanne.com" icon="fa fa-blog" text="My Blog" />
          <Item href="https://wiklund.dev" icon="fas fa-user-friends" text="My Brother.dev" />
        </Grid>
      </Layout>
    );
  }
}

export default Index;
