import React from 'react';
import { ContentLayout } from '../../../components/layouts/ContentLayout';

export const Dashboard = () => {
    return (
        <ContentLayout breadCrumb={['Dashboard']}>
            <p>This is Dashboard</p>
        </ContentLayout>
    );
};
