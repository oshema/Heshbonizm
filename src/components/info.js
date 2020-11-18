import React, { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import './info.css';

function Info(props) {

    const [infoText, setInfoText] = useState('')

    useEffect(() => {
        setInfoText(props.info)

    }, [props.info])

    return (
        <div>
            <Tooltip arrow={true} title={infoText}>
                <IconButton >
                    <InfoIcon size="small" />
                </IconButton>
            </Tooltip>
        </div>

    )
}

export default Info