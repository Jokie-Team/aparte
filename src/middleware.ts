import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // Lista de locais suportados
  locales: ["en", "pt"],
  // Idioma padrão se não for especificado
  defaultLocale: "en",
  // Personalize o comportamento do redirecionamento (opcional)
  localeDetection: true, // Habilita a detecção automática do idioma com base nos cabeçalhos do navegador
});

export const config = {
  matcher: [
    // Aplica o middleware a todas as rotas, exceto APIs, rotas estáticas e arquivos internos
    "/((?!api|_next|.*\\..*).*)",
  ],
};
