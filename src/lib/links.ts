/**
 * Props para links que abrem outro site em nova aba.
 * `noopener` impede que a página aberta controle esta; `noreferrer` não envia a URL de origem.
 */
export const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;
