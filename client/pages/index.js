import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>landing page</h1>;
};

LandingPage.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    // server
    const {
      data,
    } = await axios.get(
      'http://nginx-ingress-1601889914-controller.default.svc.cluster.local/api/users/currentuser',
      { headers: { Host: 'ticketing.dev' } }
    );
    return data;
  } else {
    // browser
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;
