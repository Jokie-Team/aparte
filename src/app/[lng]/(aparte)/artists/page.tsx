import React from 'react';
import { useTranslation } from '../../../i18n';

const Artists = async ({ params: { lng } }: { params: { lng: string} }) => {
    const { t } = await useTranslation(lng)
    return (
        <div>
            <h1>{t("artists")}</h1>
            {/* Page Content */}
        </div>
    );
};

export default Artists;
