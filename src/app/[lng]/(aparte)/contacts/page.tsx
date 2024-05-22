import React from 'react';
import { useTranslation } from '../../../i18n';

const Contacts = async ({ params }: { params: { lng: string } }) => {
    const { t } = await useTranslation(params.lng, 'common')

    return (
        <div>
            <h1>{t('contacts')}</h1>
            {/* Page Content */}
        </div>
    );
};

export default Contacts;
