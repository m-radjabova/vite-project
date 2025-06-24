import { FiPackage, FiShoppingBag, FiHome} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

function NotProduct() {

    const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '2rem',
      background: 'linear-gradient(135deg, #fff5f7 0%, #ffe0ec 100%)',
      borderRadius: '2rem',
      boxShadow: '0 8px 32px rgba(251, 111, 146, 0.1)',
      maxWidth: '600px',
      margin: '2rem auto',
      border: '1px solid rgba(251, 111, 146, 0.15)'
    }}>
      <div style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'rgba(251, 111, 146, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <FiPackage 
          size={48} 
          color="#fb6f92" 
          style={{ transform: 'rotate(15deg)' }}
        />
      </div>
      
      <h2 style={{
        color: '#d14d82',
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '1rem',
        lineHeight: 1.3
      }}>
        Please Select a Product First
      </h2>
      
      <p style={{
        color: '#b5839d',
        fontSize: '1.1rem',
        marginBottom: '2rem',
        maxWidth: '400px',
        lineHeight: 1.6
      }}>
        It looks like you haven't selected any product yet. Browse our collection and choose something you love!
      </p>
      
      <button 
        onClick={() => navigate('/')}
        style={{
          background: 'linear-gradient(135deg, #ff8fab, #fb6f92)',
          color: 'white',
          border: 'none',
          padding: '0.8rem 2rem',
          borderRadius: '2rem',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 16px rgba(251, 111, 146, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(251, 111, 146, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(251, 111, 146, 0.3)';
        }}
      >
        <FiShoppingBag size={18} />
        Browse Products
      </button>
      
      <div style={{
        marginTop: '3rem',
        display: 'flex',
        gap: '1rem'
      }}>
        <a href="#" onClick={() => navigate('/')} style={{
          color: '#fb6f92',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          fontSize: '0.9rem'
        }}>
          <FiHome size={14} />
          Home
        </a>
      </div>
    </div>
  );
}

export default NotProduct;