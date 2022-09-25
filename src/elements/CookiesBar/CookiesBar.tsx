import CookieConsent from 'react-cookie-consent';
import { Heading, StyledLink } from '..';
import { useMediaDevice } from '../../hooks';
import Padlock from '../../icons/Padlock';
import CookiesBarWrapper from './CookiesBar.styled';

const CookiesBar = () => {
  const { isMobile } = useMediaDevice();

  return (
    <CookiesBarWrapper>
      <CookieConsent
        buttonStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          padding: '16px 90px',
          borderRadius: '72px',
          boxSizing: 'border-box',
          fontWeight: 600,
          fontSize: '14px',
          height: '50px',
          width: 'auto',
          cursor: 'pointer',
          margin: '0',
          overflow: 'hidden',
          textDecoration: 'none',
          outline: 'none',
          whiteSpace: 'nowrap',
          borderColor: 'transparent',
          background: 'linear-gradient(90deg, #54c0ef 0%, #16d3a4 100%)',
        }}
        buttonText="OK"
        contentStyle={{
          margin: isMobile ? '0' : '15px',
        }}
        cookieName="cookiesAccept"
        expires={150}
        location="bottom"
        style={{
          color: '#fff',
          background: '#061027',
          border: '1px solid #fff',
          padding: isMobile ? '15px' : '20px 40px',
          width: isMobile ? '96%' : '80%',
          marginLeft: isMobile ? '2%' : '10%',
          marginBottom: isMobile ? '10px' : '50px',
          borderRadius: '20px',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: '1000px', marginBottom: '15px' }}>
          <Heading variant="h5">
            Your Privacy <Padlock fill="white" height="16" width="16" />
          </Heading>
          We use cookies and similar technologies to help personalise content and provide a better
          user experience. By clicking OK or continuing to use our website, you agree to this, as
          outlined in our{' '}
          <StyledLink color="secondary" href="/privacy-policy">
            <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>
          </StyledLink>
          . Please exit the website if you do not agree.
        </div>
      </CookieConsent>
    </CookiesBarWrapper>
  );
};

export default CookiesBar;
