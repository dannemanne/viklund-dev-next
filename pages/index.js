import React, { useState } from 'react';

import Layout from "../components/Layout";
import Grid from "../components/Grid";
import Item from "../components/Item";
import StatusItem from "../components/StatusItem";

const Index = (props) => {
  const [recentDns, setRecentDns] = useState(null);
  
  const updateOnlineStatus = (args = {}) => {
    const { serverKey, dns, status } = args;

    if (status === 'running') {
      setRecentDns(dns);
    } else {
      setRecentDns(null);
    }
  };

  return (
    <Layout>
      <div style={{position: 'fixed', top: 0, left: 0, padding: '0.2rem'}}>
        <h1>My Dev Sandbox <small>by Daniel Viklund (@dannemanne)</small></h1>
      </div>
      
      <h2 style={{margin: '2rem 0 1rem'}}>My Projects</h2>
      <Grid>
        <Item href="https://dannemanne.pythonanywhere.com" icon="fas fa-envelope-square" text="DMARC Processor" />
        <Item
          href="/snoken"
          imageSrc={'/snake.svg'}
          imageWhite={true}
          text="Snoken"
        />
      </Grid>

      <h2 style={{margin: '2rem 0 1rem'}}>Server Status</h2>
      <Grid>
        <StatusItem
          imageSrc={"/terraria.svg"}
          imageWhite={true}
          updateOnlineStatus={updateOnlineStatus}
          serverKey={'terraria'}
          text={'Terraria'}
          url={"https://fwgp5pffti.execute-api.ap-east-1.amazonaws.com/default/getServerStatus"}
        />

        <StatusItem
          imageSrc={"/minecraft_icon_138374.svg"}
          imageWhite={true}
          updateOnlineStatus={updateOnlineStatus}
          serverKey={'minecraft'}
          text={"Minecraft"}
          url={"https://fwgp5pffti.execute-api.ap-east-1.amazonaws.com/default/getServerStatus"}
        />
      </Grid>
      {recentDns ? (<div style={{fontSize: '0.8rem'}}>{recentDns}</div>) : null}

      <h2 style={{margin: '2rem 0 1rem'}}>Other Sites</h2>
      <Grid>
        <Item href="https://dannemanne.com" icon="fa fa-blog" text="My Blog" />
        <Item href="https://wiklund.dev" icon="fas fa-user-friends" text="My Brother.dev" />
      </Grid>
    </Layout>
  );
};

export default Index;
