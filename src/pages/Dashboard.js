import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="space-y-2">
        <div className="bg-white p-4 rounded shadow">Manage Equipment</div>
        <div className="bg-white p-4 rounded shadow">Manage Requests</div>
        <div className="bg-white p-4 rounded shadow">Checkout Equipment</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
