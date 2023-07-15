import React from 'react';
import { useState, CSSProperties } from "react";
import PulseLoader from "react-spinners/PulseLoader"
function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{ marginTop: '150px' }}>
            <div className="sweet-loading text-center">


                <PulseLoader
                    color='#000'
                    loading={loading}
                    cssOverride=''
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader;