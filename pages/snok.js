import React, { useState } from 'react';

import Layout from "../components/Layout";
import SnokGame from "../components/SnokGame"

const Index = (props) => {

  return (
    <Layout
      description={'Snok (a type of snake in Sweden) is my take on the classical mobile game Snake'}
      title={'Snok'}
    >
      <SnokGame />
    </Layout>
  );
};

export default Index;
