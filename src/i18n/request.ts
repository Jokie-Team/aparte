// src/i18n/request.ts
import {getRequestConfig, type GetRequestConfigParams} from 'next-intl/server';
import {locales, type Locale} from '../i18n.config';

export default getRequestConfig(({locale}: GetRequestConfigParams) => {
  // valida / define fallback
  const currentLocale: Locale = (locales as readonly string[]).includes(locale as Locale)
    ? (locale as Locale)
    : ('pt' as Locale);

  // carrega o JSON das mensagens (ajustado ao teu path)
  const messages = require(`../app/locales/${currentLocale}.json`);

  // 👉 o teu tipo pede 'locale' + 'messages'
  return {
    locale: currentLocale,
    messages
  };
});
