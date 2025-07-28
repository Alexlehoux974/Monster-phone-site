import Footer from '@/components/Footer';

export default function TestSimple() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div style={{ padding: '20px' }}>
        <h1>Test Simple Page</h1>
        <p>If you can see this, the server is working.</p>
      </div>
      <Footer />
    </div>
  );
}