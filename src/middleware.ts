import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Lista de locais suportados
  locales: ['en', 'pt'],
  // Local padrão se não for especificado
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'], // Aplica o middleware às rotas necessárias
};
