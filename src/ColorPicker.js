import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color'
import { makeStyles } from '@material-ui/core';
import { FormControlLabel, Popover } from '@material-ui/core';
import CUtils from '../../core/CUtils';


const _ColorPicker = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState(null);
    const isOpen = Boolean(anchorEl);

    useEffect(() => {
        if (isEmpty(props.value)) {
            setColor('#fff');
            return;
        }

        if (String(right(color,6)) === getn(props.value).toString(16)) return;

        setColor(qualifyColor(props.value, true));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value])

    const setFormChanged = (mColor) => {
        setColor(mColor.hex);
        props.onChange(props.id, parseInt(right(mColor.hex,6), 16));
    }

    const qualifyColor = (mColor, bInit = false) => {
        if (bInit) {
            const mHex = String(getn(mColor).toString(16));
            return rgbToHex(hexToRgb(mHex));
        }

        if (left(mColor, 1) === '#')
            return mColor;

        return '#' + mColor;
    }

    const hexToRgb = (hex) => {
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
    
        return [r,g,b];
    }
    
    const rgbToHex = (rgb) => '#' + rgb.map(x => {
        const hex = x.toString(16)
        return hex.length === 1 ? '0' + hex : hex
    }).join('');

    const openPicker = (e) => {
        if (props.disabled) return;

        setAnchorEl(e ? e.currentTarget : null)
    }

    const classes = style(props);


    return (
        <React.Fragment>
            <FormControlLabel
                classes={{
                    root: classes.root,
                }}
    
                label={props.label}
                control={
                    <div className={classes.colorPanel} 
                        style={{backgroundColor: qualifyColor(color)}} 
                        onClick={openPicker}
                        />
                }
                />


            <Popover
                id={isOpen ? 'picker-popover' : undefined}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ChromePicker
                    color={color}
                    onChange={setFormChanged}
                    />        
            </Popover>
        </React.Fragment>
    )   
}

const { left, getn, isEmpty, right } = CUtils();

const style = makeStyles({
    root: {
        marginLeft: props => props.noMargin ? -12 : 5,
        marginRight: 0,
        flexDirection: 'row',
        justifyContent: 'baseline',
        width: props => props.width || 'unset',
    },
    colorPanel: {
        width: '25px',
        height: '25px',
        margin: '10px',
        borderRadius: '5px',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
    }
});

_ColorPicker.propTypes = {
    id: PropTypes.string.isRequired,
    //value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
}

export {
    _ColorPicker as ColorPicker
}