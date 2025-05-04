export const getNavLinkStyle = (isActive: boolean) => ({
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    borderLeft: isActive ? '3px solid #3a7bd5' : 'none',
    borderRadius: '4px',
    color: isActive ? 'white' : 'rgba(255,255,255,0.8)',
    transition: 'all 0.3s ease',
});
  
export const getSubNavLinkStyle = (isActive : boolean) => ({
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: isActive ? 'rgba(107, 106, 106, 0.2)' : 'transparent',
    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s ease',
});
  
export const getAccordionSummaryStyle = (isActive : boolean) => ({
    padding: '0.5rem 1rem',
    minHeight: 'auto',
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
    borderLeft: isActive ? '3px solid #3a7bd5' : 'none',
    color: 'rgba(255,255,255,0.8)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)',
    },
    '&.Mui-expanded': {
      color: 'white',
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
});