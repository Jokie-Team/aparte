import React from 'react';
import { useTranslation } from '../i18n';

const Main = async ({ params }: { params: { lng: string } }) => {
    const { t } = await useTranslation(params.lng, 'common')

    return (
        <div>
            <h1>{t('homepage')}</h1>
            {/* Page Content */}
        </div>
    );
};

export default Main;
