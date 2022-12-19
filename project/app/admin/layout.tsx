

export default function AdmintLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <head>
        <title>Admin Panel</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}