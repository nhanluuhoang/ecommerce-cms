import { useEffect } from 'react';
import { REACT_APP_WEBSITE_NAME } from '../config';

export const useTitle = (title: string) => {
    useEffect(() => {
        document.title = title + ' | ' + REACT_APP_WEBSITE_NAME
    })
};
