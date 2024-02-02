import { React, useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import './CustomTooltip.css';
import generateUniqueId from '../../../utils/generateUniqueId';


const CustomTooltip = ({ children, tooltipText, placement, variant = {} }) => {
    const [hasScrollbar, setHasScrollbar] = useState(false);
    
    const key = generateUniqueId();

    useEffect(() => {
        const checkScrollbar = () => {
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            setHasScrollbar(documentHeight > viewportHeight);
        };

        checkScrollbar();
        window.addEventListener('resize', checkScrollbar);

        return () => {
            window.removeEventListener('resize', checkScrollbar);
        };
    }, []);

    if (tooltipText === '') { return <span key={key}>{children}</span> };
    return (
        <OverlayTrigger
        delay={30}
            key={key}
            placement={placement || 'top'}
            overlay={
                <Tooltip
                    className={hasScrollbar ? 'position-absolute' : 'position-fixed'}
                >
                    <div className={variant ? `text-${variant}` : ''} >
                        {tooltipText}
                    </div>
                </Tooltip>
            }
        >
            {children}
        </OverlayTrigger>
    )
}

export default CustomTooltip;