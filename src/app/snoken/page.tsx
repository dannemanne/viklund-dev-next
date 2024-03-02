import { Metadata, NextPage } from "next";
import { SnokenView } from "../../views/snoken";

export const metadata: Metadata = {
  title: 'Snoken',
  description: 'Snok (a type of snake in Sweden) is my take on the classical mobile game Snake',
}

const SnokenPage: NextPage = () => {
  return <SnokenView />;
};

export default SnokenPage;
