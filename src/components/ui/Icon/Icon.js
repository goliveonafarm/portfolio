import { React } from 'react';

import CustomTooltip from '../CustomTooltip/CustomTooltip';

import { ReactComponent as bootstrap5Icon } from '../../../assets/images/icons/bootstrap5Logo.svg'
import { ReactComponent as cPlusIcon } from '../../../assets/images/icons/cLogo.svg'
import { ReactComponent as cSharpIcon } from '../../../assets/images/icons/cSharpLogo.svg'
import { ReactComponent as cssIcon } from '../../../assets/images/icons/cssLogo.svg'
import { ReactComponent as jsIcon } from '../../../assets/images/icons/jsLogo.svg'
import { ReactComponent as mongoDbIcon } from '../../../assets/images/icons/mongoDbLogo.svg'
import { ReactComponent as nodeJsIcon } from '../../../assets/images/icons/nodeJsLogo.svg'
import { ReactComponent as reactIcon } from '../../../assets/images/icons/reactLogo.svg'
import { ReactComponent as sqlIcon } from '../../../assets/images/icons/sqlLogo.svg'
import { ReactComponent as htmlIcon } from '../../../assets/images/icons/htmlLogo.svg'

import styles from './Icon.module.css';

const icons = {
    bootstrap: bootstrap5Icon,
    c: cPlusIcon,
    csharp: cSharpIcon,
    css: cssIcon,
    javascript: jsIcon,
    mongodb: mongoDbIcon,
    nodejs: nodeJsIcon,
    react: reactIcon,
    sql: sqlIcon,
    html: htmlIcon
};

const Icon = ({ iconName }) => {
    const SvgIcon = iconName ? icons[iconName.toLowerCase()] : null;
    
    return (
            <CustomTooltip tooltipText={iconName}>
                <SvgIcon aria-label={iconName} className={styles['icon']}  tabIndex="0"/>
            </CustomTooltip>
    );
};

export default Icon;