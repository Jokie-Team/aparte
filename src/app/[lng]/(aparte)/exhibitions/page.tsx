'use client'
import React from 'react';
import { useTranslation } from '../../../i18n';
import Carousel from '@/src/components/carousel';

const Exhibitions = async ({ params }: { params: { lng: string } }) => {
    const { t } = await useTranslation(params.lng, 'common')

    const images = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
    ];

    return (
        <div>
            <h1>{t('exhibitions')}</h1>

            <Carousel images={images} visibleCount={6} />
        </div>
    );
};

export default Exhibitions;
