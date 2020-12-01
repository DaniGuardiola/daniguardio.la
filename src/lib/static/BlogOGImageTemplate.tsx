export type BlogOGImageParams = {
  id: string
  title: string
  description: string
}

const css = `
.font-slab {
  font-family: 'Roboto Slab', serif;
}

.font-mono {
  font-family: 'Roboto Mono', mono;
}
`

export default function BlogOGImageTemplate ({
  title,
  description
}: BlogOGImageParams) {
  return (
    <>
      <html className='w-full h-full'>
        <head>
          <link
            href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
            rel='stylesheet'
            type='text/css'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300;351;400;700&amp;display=swap'
          />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto+Mono&amp;display=swap'
          />
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>

        <body className='w-full h-full'>
          <p className='absolute top-0 left-0 pt-6 pl-16 font-mono text-4xl text-white'>
            daniguardio.la
            <span className='font-bold text-black'>{' > blog'}</span>
          </p>
          <div className='flex items-end w-full p-16 pb-10 text-6xl font-light text-white bg-green-900 h-96 font-slab'>
            <p className='leading-tight'>{title}</p>
          </div>
          <p className='px-16 pt-8 text-4xl italic leading-relaxed text-green-900 font-slab'>
            {description}
          </p>
        </body>
      </html>
    </>
  )
}
