import './tailwind/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <title>Szczaw i Mirabelki</title>
        <meta name="description" content="Restauracja z kuchnią wegańską" />
        <meta name="keywords" content="wegańskie, wegańskie restauracje, wegańskie jedzenie" />
        <meta name="author" content="Marceli Borowczak" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  )
}
