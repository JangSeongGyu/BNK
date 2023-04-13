import { useEffect, useRef } from 'react';

const useEffectOnlyFirst = (func, dependencyList) => {
    const fisrtFlgRef = useRef(true);

    useEffect(() => {
        if (!fisrtFlgRef.current) {
            func();
        } else {
            fisrtFlgRef.current = false;
        }
    }, dependencyList);
};

export default useEffectOnlyFirst;
