import CryptoJS from 'crypto-js';
import pako from 'pako';


const CUtils = () => {
    /** 
     * Check if value is empty or null 
     * 
     * @param {any} v value to be checked if empty
     * @returns {boolean}
     */
    const isEmpty = (v) => {
        if (Array.isArray(v))
            return v.length === 0;
        
        if (v && typeof(v) === 'object')
            return Object.keys(v).length === 0;

        return gets(v) === '';
    }


	/**
	 * Convert any value to string
     * 
	 * @param {any} v Value to be converted.
	 * @param {string} [def=''] Default value if v is null.
	 * @param {number} [maxLen=null] Maximum length of v.
	 * @returns {string} String equivalent of the given params.
	 */
    const gets = (v, def = '', maxLen = null) => {
        if (!v && String(v) !== '0') return '';
        if (typeof v === 'object') return def;

        let s = String(v);
        if (maxLen) {
            s = s.substring(0, getn(maxLen));
        }
        
        return (s === '') ? def : s;
    }


	/**
	 * Return numeric equivalent, auto strip comma, whitespaces.
	 * @param {any} v Value to be converted.
	 * @param {number} [rounding=null] 0:nearest, 1:ceiling, -1:floor.
	 * @param {boolean} [bGetAsolute=false] Convert to absolute value.
	 * @returns Numeric value of v.
	 */
    const getn = (v, rounding = null, dp = null, bGetAsolute = false) => {
        if (!v || typeof v === "undefined") return 0;

        v = v.toString().replace(",","").trim();

        if (isNaN(v)) return 0;

        v = Number(v);

        if (rounding) {
            if (!dp) dp = 6;

            if (rounding > 0) {
                v = roundUp(v, dp);
            } else if (rounding < 0) {
                v = roundDown(v, dp);
            } else {  
                v = round(v, dp);
            }
        }

        if (bGetAsolute) {
            v = Math.abs(v);
        }
        
        return v;
    }


    /**
     * Round the given value up to specified decimal place
     * 
     * @param {number} Value to be rounded up
     * @param {number} Decimal place
     * @returns {number} Rounded value
     */
    const roundUp = (v, dp = 0) => {
        if (dp < 0) dp = 0;

        const multiplier = Math.pow(10, dp);
        return Math.ceil(v * multiplier) / multiplier;
    }


    /**
     * Round the given value down to the specified decimal place
     * 
     * @param {number} Value to be rounded down
     * @param {number} Decimal place
     * @returns {number} Rounded value
     */
    const roundDown = (v, dp = 0) => {
        if (dp < 0) dp = 0;

        const multiplier = Math.pow(10, dp);
        return (v >= 0 
                ? Math.ceil(v * multiplier)
                : Math.floor(v * multiplier)) 
            / multiplier;
    }


    /**
     * Round the given value down to the specified decimal place
     * 
     * @param {number} Value to be rounded down
     * @param {number} Decimal place
     * @returns {number} Rounded value
     */
    const round = (v, dp = 0) => {
        if (dp < 0) dp = 0;

        return Number(parseFloat(v).toFixed(dp));
    }

    
	/** 
	 * Slice/retrieve string from left
     * 
	 * @param {any} v orignal string to be sliced
	 * @param {number} len number of characters to be sliced
	 * @returns {string} sliced string
	 */
    const left = (v, len) => {
        v = gets(v);

        return v.substring(0, getn(len));
    }


	/** 
	 * Slice/retrieve string from right 
	 * @param {any} v orignal string to be sliced
	 * @param {number} len number of characters to be sliced
	 * @returns {string} sliced string
	 */
    const right = (v, len) => {
        v = gets(v);
        
        return v.substr((v.length - getn(len)), v.length);
    }


    return {
        //Public Functions
        isEmpty,
        getn,
        gets,
        left,
        right,
    }
}

export default CUtils;